import { createContext, useState, useContext, ReactNode } from "react";

type UserRole = "Owner" | "General Contractor" | "Subcontractor"; // ✅ Updated role names

interface RoleContextProps {
    role: UserRole;
    setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole>("General Contractor"); // ✅ Default role

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (!context) throw new Error("useRole must be used within a RoleProvider");
    return context;
}
