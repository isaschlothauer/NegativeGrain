export interface DropDownMenuItemProps {
  id: number;
  item: string;
  destination: string;
}

export const dropdownMenuListItems: DropDownMenuItemProps[] = [
  {
    id: 0,
    item: "Profile",
    destination: "/contents/profile",
  },
  {
    id: 1,
    item: "Account Setting",
    destination: "/contents/setting",
  }
]