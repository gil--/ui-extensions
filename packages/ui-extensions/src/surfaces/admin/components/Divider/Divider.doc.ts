import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'Divider',
  featureFlag: 'admin_extensibility',
  description:
    'Use this to create a clear visual separation between different elements in your user interface.',
  requires: '',
  thumbnail: 'divider-thumbnail.png',
  isVisualComponent: true,
  type: '',
  definitions: [
    {
      title: 'DividerProps',
      description: '',
      type: 'DividerProps',
    },
  ],
  category: 'Components',
  subCategory: 'Structure',
  defaultExample: {
    image: 'divider-default.png',
    codeblock: {
      title: 'Simple Divider example',
      tabs: [
        {
          title: 'React',
          code: '../../../../../../ui-extensions-react/src/surfaces/admin/components/Divider/examples/basic-Divider.example.tsx',
          language: 'tsx',
        },
        {
          title: 'JS',
          code: './examples/basic-Divider.example.ts',
          language: 'js',
        },
      ],
    },
  },

  related: [],
};

export default data;
