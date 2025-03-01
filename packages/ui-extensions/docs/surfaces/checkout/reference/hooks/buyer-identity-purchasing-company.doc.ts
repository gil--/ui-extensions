import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

import {getLinksByTag, REQUIRES_PROTECTED_CUSTOMER_DATA} from '../helper.docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'usePurchasingCompany',
  description: '',
  descriptionType: 'UsePurchasingCompanyGeneratedType',
  requires: REQUIRES_PROTECTED_CUSTOMER_DATA,
  isVisualComponent: false,
  type: 'hook',
  category: 'React Hooks',
  subCategory: 'Buyer Identity',
  definitions: [
    {
      title: '',
      description: '',
      type: 'UsePurchasingCompanyGeneratedType',
    },
  ],
  related: getLinksByTag('apis'),
};

export default data;
