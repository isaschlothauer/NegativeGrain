interface InputListItemsProp {
  id: number;
  loginFieldName: string,
  placeholder: string,
  type: string,
}

export const inputListItems: InputListItemsProp[] = [
  {
    id: 0,
    loginFieldName: 'Account',
    placeholder: 'xyz@sample.com', 
    type: 'text'
  },
  {
    id: 1,
    loginFieldName: 'Password',
    placeholder: '', 
    type: 'password'
  },
]