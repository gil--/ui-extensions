import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'Select',
  featureFlag: 'admin_extensibility',
  description:
    'Use this when you want to give users a predefined list of options to choose from.',
  requires: '',
  thumbnail: 'select-thumbnail.png',
  isVisualComponent: true,
  type: '',
  definitions: [
    {
      title: 'SelectProps',
      description: '',
      type: 'SelectProps',
    },
  ],
  category: 'Components',
  subCategory: 'Forms',
  defaultExample: {
    image: 'select-default.png',
    codeblock: {
      title: 'Simple Select example',
      tabs: [
        {
          title: 'React',
          code: '../../../../../../ui-extensions-react/src/surfaces/admin/components/Select/examples/basic-Select.example.tsx',
          language: 'tsx',
        },
        {
          title: 'JS',
          code: './examples/basic-Select.example.ts',
          language: 'js',
        },
      ],
    },
  },

  related: [],
};

export default data;
