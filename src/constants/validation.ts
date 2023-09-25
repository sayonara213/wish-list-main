import * as yup from 'yup';

const email = yup.string().email('Email is not valid').required();
const password = yup.string().min(6, 'Password must be at least 6 characters').required();
const userName = yup
  .string()
  .optional()
  .when('name', {
    is: (value: string) => value?.length,
    then: (rule) => rule.min(3),
  });
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

export const profileSchema = yup.object().shape(
  {
    name: userName,
  },
  [['name', 'name']],
);
