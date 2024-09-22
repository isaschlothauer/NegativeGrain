export interface NavMenuProps {
  id: number;
  item: string;
  destination: string;
}

export const burgerMenuItems: NavMenuProps[] = [
  {
    id: 1,
    item: 'Log in',
    destination: '/login'
  },
  {
    id: 2,
    item: 'Sign Up',
    destination: '/signup'
  },
  // { id: 3, 
  //   item: 'Icon',
  //   destination: '/'
  // }
]

export const burgerMenuItemsLoggedIn: NavMenuProps[]  = [
  // {
  //   id: 1,
  //   item: 'Profile',
  //   destination: '/'
  // },
  {
    id: 1,
    item: 'Upload',
    destination: '/contents/contentUpload'
  },
  {
    id: 2,
    item: 'Profile',
    destination: '/'
  },
  {
    id: 3,
    item: 'Account Setting',
    destination: '/'
  },
  // { id: 3, 
  //   item: 'Icon',
  //   destination: '/'
  // }
  // {
  //   id: 4,
  //   item: 'Log Off',
  //   destination: '/'
  // },
]
