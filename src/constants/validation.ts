import * as yup from 'yup';

const email = yup.string().email('Email is not valid').required();
const password = yup.string().min(6, 'Password must be at least 6 characters').required();
const userName = yup.string().when('name', {
  is: (value: string) => value?.length,
  then: (rule) => rule.min(3).max(20),
});
const fullName = yup.string().when('fullname', {
  is: (value: string) => value?.length,
  then: (rule) => rule.min(3).max(30),
});
const bio = yup.string().max(300, 'Bio must be less than 300 characters');
export const linkUrl = yup.string().url('Link is not valid').required();
const linkName = yup.string().required();

export const authSchema = yup.object({
  email,
  password,
});

export const additionalAuthSchema = yup.object({
  fullName: yup
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(30, 'Full name must be less than 30 characters')
    .required(),
  birthDate: yup.date().required(),
});

export const addLinkSchema = yup.object({
  linkName,
  linkUrl,
});

export const profileSchema = yup.object().shape(
  {
    userName: userName,
    fullName: fullName,
    bio: bio,
  },
  [['name', 'fullname']],
);

export const wishlistItemSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  price: yup.number().optional(),
  link: yup.string().url('Link is not valid').optional(),
  imageUrl: yup.string().optional(),
});

export const wishlistSchema = yup.object({
  title: yup.string().required().min(3).max(15),
  isPrivate: yup.boolean().required(),
  description: yup.string().optional(),
  sharedWith: yup.string().optional(),
});
