export const buttonGroupStyles = {
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
    },
}

interface ButtonProps {
    label: string;
    color?: "default" | "danger" | "primary" | "secondary" | "warning";
    textColor?: string;
    id?: any;
    className?: string;
    variant?: "solid" | "shadow" | "ghost" | "flat" | "faded" | "bordered";
    action?: any;
    icon: string;
    iconPosition?: string;
    disabled?: boolean;
    tooltip?: TooltipProps;
}

interface TooltipProps {
    content: string;
    color?: "primary" | "danger";
    placement?: "top" | "bottom" | "left" | "right";
}

export type {
    ButtonProps,
    TooltipProps,
}