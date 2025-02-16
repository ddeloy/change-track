import { useState, useEffect } from "react";
import { useRole } from "../context/RoleContext";
import {mockData} from "../data/mockCORS";

// ✅ Define the COR type explicitly
export type COR = {
    id: string;
    customer: string;
    date: string;
    status: "Approved" | "In Review" | "Void";
    tmTag: string;
    role: "Owner" | "General Contractor" | "Subcontractor";
};

// ✅ Extract CORs from hierarchical data based on the current role
const extractCORsForRole = (role: string): COR[] => {
    switch (role) {
        case "Owner":
            // ✅ Owners see everything
            return mockData.flatMap(owner =>
                owner.contractors.flatMap(contractor =>
                    contractor.subcontractors.flatMap(subcontractor => subcontractor.changeOrders)
                )
            );

        case "General Contractor":
            // ✅ Contractors see only their subcontractors' CORs
            return mockData.flatMap(owner =>
                owner.contractors
                    .filter(contractor => contractor.name === "ABC Contractors") // ✅ Replace with dynamic filtering
                    .flatMap(contractor =>
                        contractor.subcontractors.flatMap(subcontractor => subcontractor.changeOrders)
                    )
            );

        case "Subcontractor":
            // ✅ Subcontractors only see their own CORs
            return mockData.flatMap(owner =>
                owner.contractors.flatMap(contractor =>
                    contractor.subcontractors
                        .filter(subcontractor => subcontractor.name === "XYZ Builders") // ✅ Replace with dynamic filtering
                        .flatMap(subcontractor => subcontractor.changeOrders)
                )
            );

        default:
            return [];
    }
};

export function useFetchCORs() {
    const { role } = useRole(); // ✅ Get current role from context
    const [data, setData] = useState<COR[]>([]);

    useEffect(() => {
        setData(extractCORsForRole(role)); // ✅ Dynamically filter CORs based on role
    }, [role]); // ✅ Re-run when role changes

    return data;
}
