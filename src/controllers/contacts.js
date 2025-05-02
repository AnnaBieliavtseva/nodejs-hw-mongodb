import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactsSortFields } from '../db/models/Contact.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactsSortFields);
  const filters = parseContactFilterParams(req.query);
  filters.userId = req.user._id;
  const data = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactById(id, userId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoURL;
  if (photo) {
    photoURL = await saveFileToCloudinary(photo);
  }
  const data = await createContact({ ...req.body, photo: photoURL, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoURL;
  if (photo) {
    photoURL = await saveFileToCloudinary(photo);
  }

  const result = await updateContact(
    id,
    { ...req.body, photo: photoURL },
    userId,
  );

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContact(id, userId);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
