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
    placeholder: 'TofuGraph', 
    data: 'userName',
    type: 'text',
    required: true,
  },
  {
    id: 1,
    registrationInputFieldItem: 'First Name',
    placeholder: 'Foto', 
    data: 'firstName',
    type: 'text',
    required: false,
  },
  {
    id: 2,
    registrationInputFieldItem: 'Last Name',
    placeholder: 'Graph', 
    data: 'lastName',
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
]