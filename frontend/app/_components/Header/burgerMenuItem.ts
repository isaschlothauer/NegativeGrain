interface NavMenuProps {
  id: number;
  item: string;
  destination: string;
}

export const burgerMenuItems: NavMenuProps[] = [
  {
    id: 1,
    item: 'Log in',
    destination: '/'
  },
  {
    id: 2,
    item: 'Sign Up',
    destination: '/SignUp'
  },
]

export const burgerMenuItemsLoggedIn = [
  {
    id: 1,
    item: 'Profile',
    destination: '/'
  },
  {
    id: 2,
    item: 'Upload',
    destination: '/'
  },
  {
    id: 3,
    item: 'Account Setting',
    destination: '/'
  },
  {
    id: 4,
    item: 'Log Off',
    destination: '/'
  },
]