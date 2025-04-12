import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();
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
