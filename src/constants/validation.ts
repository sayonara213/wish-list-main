import * as yup from 'yup';

const email = yup.string().email('Email is not valid').required();
const password = yup.string().min(6, 'Password must be at least 6 characters').required();

export const authSchema = yup.object({
  email,
  password,
});
