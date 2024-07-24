interface RegistrationListItemsList {
  id: number;
  registrationInputFieldItem: string,
  placeholder: string,
  data: string,
  type: string,
  required: boolean,
}

export const RegistrationListItems: RegistrationListItemsList[] = [
  {
    id: 0,
    registrationInputFieldItem: 'User Name',
    placeholder: '', 
    data: 'username',
    type: 'text',
    required: true,
  },
  {
    id: 1,
    registrationInputFieldItem: 'First Name',
    placeholder: '', 
    data: 'firstname',
    type: 'text',
    required: false,
  },
  {
    id: 2,
    registrationInputFieldItem: 'Last Name',
    placeholder: '', 
    data: 'lastname',
    type: 'text',
    required: false,
  },
  {
    id: 3,
    registrationInputFieldItem: 'Email',
    placeholder: '', 
    data: 'email',
    type: 'email',
    required: true,
  },
  {
    id: 4,
    registrationInputFieldItem: 'Password',
    placeholder: '', 
    data: 'password',
    type: 'password',
    required: true,
  },
  {
    id: 5,
    registrationInputFieldItem: 'Confirm',
    placeholder: '', 
    data: 'cPassword',
    type: 'password',
    required: true,
  },
]