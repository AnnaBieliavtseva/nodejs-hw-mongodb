import { contactTypeList } from '../../constants/contacts.js';

export const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : undefined;
  const parsedIsFavourite =
    isFavourite === "true" || isFavourite === "false" ? isFavourite : undefined;
  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
