import React, { InputHTMLAttributes } from "react";
import type { ButtonProps as NextUIButtonProps } from "@nextui-org/react";
import { HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<NextUIButtonProps, "children"> {
  label: string;
  icon?: string;
  iconPosition?: "left" | "right";
  tooltip?: TooltipProps;
  selected?: boolean;
  iconStyles?: React.CSSProperties;
  loading?: boolean;
}

interface TooltipProps {
  content: string;
  color?: "primary" | "danger";
  placement?: "top" | "bottom" | "left" | "right";
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  id?: any;
  items: ButtonProps[];
  selected?: boolean;
  disabled?: boolean;
}

export interface ModalProps extends Omit<HTMLMotionProps<"div">, "children"> {
  setModal: (value: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

export interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  boxShadow?: boolean;
  hoverStyles?: boolean;
  hoverEffect?: boolean;
}

export interface ChipProps extends Omit<HTMLMotionProps<"div">, "children"> {
  hoverEffect?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value: any;
  name: string;
  label?: string;
  required?: boolean;
  setInputs: (value: any) => void;
  variant?: "primary" | "underline" | "ghost";
  id?: any;
  readOnly?: boolean;
}

export interface GridProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
}
