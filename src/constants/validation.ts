import * as yup from 'yup';

const email = yup.string().email('Email is not valid').required();
const password = yup.string().min(6, 'Password must be at least 6 characters').required();
const linkUrl = yup.string().url('Link is not valid').required();
const linkName = yup.string().required();

export const authSchema = yup.object({
  email,
  password,
});

export const addLinkSchema = yup.object({
  linkName,
  linkUrl,
});
