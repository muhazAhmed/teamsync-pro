import { createContext, ReactNode, useContext, useState } from "react";

const ContextAPI = createContext<any>(undefined);

export const useContextAPI = () => {
    const context = useContext(ContextAPI);
    if (!context) {
        throw new Error("useContextAPI must be used within a ContextAPI provider");
    }
    return context;
};

export const Context = ({ children }: { children: ReactNode }) => {
    const [chatModal, setChatModal] = useState<boolean>(false);

    const openChat = () => {
        return setChatModal(true);
    };

    const closeChat = () => {
        return setChatModal(false);
    };

    return (
        <ContextAPI.Provider value={{ openChat, closeChat, chatModal }}>
            {children}
        </ContextAPI.Provider>
    );
};
