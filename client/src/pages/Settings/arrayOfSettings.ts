import { IconTypes } from "../../UI-Components/Icons/Icons";

export const switchItems: { name: string; icon: keyof IconTypes; access: any }[] = [
  { name: "Profile", icon: "user", access: ["employee", "admin", "hr"] },
  { name: "Notifications", icon: "notification", access: ["employee", "admin", "hr"] },
  { name: "Account", icon: "gear", access: ["employee", "admin", "hr"] },
  { name: "Access Management", icon: "key", access: ["admin", "hr"] },
];

export const settingsBreadCrumbs = (id: number) => {
  if (id === 2) return "Notifications";
  else if (id === 3) return "Account";
  else if (id === 4) return "Access Management";
};
