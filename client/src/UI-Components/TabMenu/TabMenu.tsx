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
  menuItems: any[];
  isParent?: boolean;
  closeIcon?: boolean;
}

const TabMenu: React.FC<MenuProps> = ({
  setTabMenu,
  menuOptions,
  menuItems,
  isParent = true,
  closeIcon = false,
}) => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const menuButtons: MenuItem[] = useMemo(() => {
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
          {menuButtons.map((menuItem) => (
            <Button
              key={menuItem.id}
              variant="shadow"
              className={menuItem.selected ? "btn-primary" : "btn-ghost"}
              onPress={() => handleMenuItemClick(menuItem.id)}
            >
              {menuItem.label}
            </Button>
          ))}
        </div>
        <div className="menu-body">{menuItems[selectedMenu]}</div>
      </div>
    </div>
  );
};

export default TabMenu;
