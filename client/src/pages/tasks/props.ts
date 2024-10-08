interface TaskStatsProps {
    statsData: any
    teamData: any
}

interface TaskViewModalProps {
    setModal: any
    setLoading: any
}

interface TitleBarButtonsProps {
    onClick?: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    tooltipContent?: string;
    isHovered: boolean;
    iconType?: string;
    hoverColor?: string;
    defaultColor?: string;
    tooltipColor?: "primary" | "secondary" | "danger";
}

interface UserProfileProps {
    setModal: any
    userId?: string
}

export type {
    TaskStatsProps, TaskViewModalProps, TitleBarButtonsProps, UserProfileProps
}