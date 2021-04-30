import {resolve} from 'path';
import * as fs from 'fs';

import type {
  Paths,
  InterfaceType,
} from '../types';

import {createDependencyGraph, Module} from '../utilities/dependency-graph';
import {renderYamlFrontMatter, findUuid, dedupe, propsTable, strip, firstSentence} from './shared';
import type {Node} from './shared';

const additionalPropsTables: string[] = [];

export async function extensionApi(paths: Paths) {
  const extensionsIndex = resolve(`${paths.inputRoot}/src/extension-api/index.ts`);

  const graph = await createDependencyGraph(extensionsIndex);

  // Filter graph for interfaces only
  const allApis = filterApis(graph);

  // filter graph for all nodes (in case any interfaces reference them)
  const nodes = filterNodes(graph);

  let index = '';

  const extensionApisPath = resolve(`${paths.outputRoot}/api`);
  const extensionApisUrl = `${paths.shopifyDevUrl}/api`

  if (!fs.existsSync(extensionApisPath)) {
    fs.mkdirSync(extensionApisPath);
  }

  // Write API files
  allApis.forEach(({name, docs, properties}) => {
    const pathname = name.toLowerCase();
    const outputFile = `${extensionApisPath}/${pathname}.md`;
    const url = `${extensionApisUrl}/${pathname}`;

    const docsContent = docs ? strip(docs.content).trim() : '';

    let markdown = renderYamlFrontMatter({
      gid: findUuid(outputFile),
      url,
      title: `${name}`,
      description: `"${firstSentence(docsContent)}"`,
      hidden: true,
    });

    markdown += docsContent ? `${docsContent}\n\n` : '';

    markdown += propsTable(
      name,
      docs,
      properties,
      nodes,
      extensionsIndex,
      additionalPropsTables,
      false,
      undefined,
    );

    additionalPropsTables.length = 0;
    markdown += dedupe(additionalPropsTables).reverse().join('');

    index += `<li><a href="${url}">${name}</a></li>`;

    fs.writeFile(outputFile, markdown, function (err) {
      if (err) throw err;
    });
  });


  // Write index file

  const indexFile = resolve(`${extensionApisPath}/index.md`);
  let indexMarkdown = renderYamlFrontMatter({
    gid: findUuid(indexFile),
    url: extensionApisUrl,
    title: 'Extension points API',
    hidden: true,
  });

  indexMarkdown += '<ul style="column-count: auto;column-width: 12rem;">';
  indexMarkdown += index;
  indexMarkdown += '</ul>';

  fs.writeFile(indexFile, indexMarkdown, function (err) {
    if (err) throw err;
  });

}


function filterApis(graph: Map<string, Module>): InterfaceType[] {
  const allInterfaces: InterfaceType[] = [];

  graph.forEach(value => {
    const localValues = [...value.locals.values()];
    allInterfaces.push(
      ...(localValues.filter(
        ({name, kind}) => kind === 'InterfaceType' && name.indexOf('Api') !== -1
      ) as InterfaceType[]),
    );
  })

  return allInterfaces;
}

function filterNodes(graph: Map<string, Module>): Node[] {
  const nodes: Node[] = [];
  graph.forEach((value) => {
    value.locals.forEach((value: any, key) => {
      if (value.kind !== 'Imported') {
        if (value.name == null) {
          value.name = key;
        }
        nodes.push({value, module: undefined});
      }
    });
  });
  return nodes;
}