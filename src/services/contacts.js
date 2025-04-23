import { sortList } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find();
  if (filters.type) {
    contactQuery.where('contactType').equals(filters.type);
  }

  if (filters.isFavourite) {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const totalItems = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data,
    ...paginationData,
  };
};
export const getContactById = (id) => ContactCollection.findOne({ _id: id });
export const createContact = async (payload) =>
  await ContactCollection.create(payload);
export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
export const deleteContact = (id) =>
  ContactCollection.findOneAndDelete({ _id: id });
