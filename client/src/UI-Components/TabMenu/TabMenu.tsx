import React, { useEffect, useMemo, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import "./menu.css";
import { icon } from "../Icons/Icons";
import { closeModal } from "../../utils/commonFunctions";
import toast from "react-hot-toast";
import { message } from "../../utils/Constants";

interface MenuItem {
  id: number;
  label: string;
  selected: boolean;
}

interface MenuProps {
  setTabMenu: (value: boolean) => void;
  menuOptions: string[];
  isParent?: boolean;
  closeIcon?: boolean;
  children: React.ReactNode;
}

const TabMenu: React.FC<MenuProps> = ({
  setTabMenu,
  menuOptions,
  isParent = true,
  closeIcon = false,
  children,
}) => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const menuItems: MenuItem[] = useMemo(() => {
    return menuOptions.map((item, index) => ({
      id: index,
      label: item,
      selected: selectedMenu === index,
    }));
  }, [menuOptions, selectedMenu]);

  useEffect(() => {
    if (menuOptions.length < 2) {
      toast.error(message("").EMPTY_OPTIONS);
      return closeModal(setTabMenu);
    }
  }, []);

  const handleMenuItemClick = (index: number) => {
    setSelectedMenu(index);
  };

  return (
    <div className={isParent ? "blur-bg" : ""}>
      <div className="tab-menu fadeIn">
        {!closeIcon && (
          <Tooltip content="Close" placement="top" color="primary">
            <i
              className={icon.closeRounded}
              onClick={() => closeModal(setTabMenu)}
            ></i>
          </Tooltip>
        )}
        <div className="tab-item">
          {menuItems.map((menuItem) => (
            <Button
              key={menuItem.id}
              variant="shadow"
              className={menuItem.selected ? "btn-primary" : "btn-ghost"}
              onClick={() => handleMenuItemClick(menuItem.id)}
            >
              {menuItem.label}
            </Button>
          ))}
        </div>
        <div className="menu-body">
          {children && React.Children.toArray(children)[selectedMenu]}
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
