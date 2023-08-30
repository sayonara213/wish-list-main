export interface IAuthForm {
  email: string;
  password: string;

  [key: string]: string;
}

export interface IAddLinkForm {
  linkName: string;
  linkUrl: string;

  [key: string]: string;
}

export interface IProfileForm {
  name: string;

  [key: string]: string;
}
