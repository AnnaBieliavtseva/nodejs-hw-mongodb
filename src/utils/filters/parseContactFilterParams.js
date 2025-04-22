import { contactTypeList } from '../../constants/contacts.js';

export const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : undefined;
  return {
    type: parsedType,
    isFavourite,
  };
};
