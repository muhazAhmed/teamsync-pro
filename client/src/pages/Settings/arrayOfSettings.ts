import { IconTypes } from "../../UI-Components/Icons/Icons";

export const switchItems: { name: string; icon: keyof IconTypes }[] = [
  { name: "Profile", icon: "user" },
  { name: "Notifications", icon: "notification" },
  { name: "Account", icon: "gear" },
];

export const settingsBreadCrumbs = (id: number) => {
  if (id === 2) return "Notifications";
  else if (id === 3) return "Account";
};
