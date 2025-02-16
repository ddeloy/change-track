import { COR } from "../services/useFetchCORS.ts";

export type Subcontractor = {
    id: string;
    name: string;
    role: "Subcontractor";
    changeOrders: COR[];
};

export type Contractor = {
    id: string;
    name: string;
    role: "General Contractor";
    subcontractors: Subcontractor[];
};

export type Owner = {
    id: string;
    name: string;
    role: "Owner";
    contractors: Contractor[];
};

export const mockData: Owner[] = [
    {
        id: "owner-1",
        name: "Acme Development",
        role: "Owner",
        contractors: [
            {
                id: "contractor-1",
                name: "ABC Contractors",
                role: "General Contractor",
                subcontractors: [
                    {
                        id: "sub-1",
                        name: "XYZ Builders",
                        role: "Subcontractor",
                        changeOrders: [
                            { id: "1001", customer: "ABC Contractors", date: "02/01/2025", status: "Approved", tmTag: "T123", role: "Subcontractor" },
                            { id: "1002", customer: "XYZ Builders", date: "02/03/2025", status: "In Review", tmTag: "T456", role: "Subcontractor" },
                            { id: "1003", customer: "ABC Contractors", date: "02/06/2025", status: "Void", tmTag: "T789", role: "Subcontractor" }
                        ]
                    },
                    {
                        id: "sub-2",
                        name: "Smith & Co.",
                        role: "Subcontractor",
                        changeOrders: [
                            { id: "1004", customer: "Smith & Co.", date: "02/07/2025", status: "Approved", tmTag: "T234", role: "Subcontractor" },
                            { id: "1005", customer: "ABC Contractors", date: "02/08/2025", status: "In Review", tmTag: "T345", role: "Subcontractor" }
                        ]
                    }
                ]
            },
            {
                id: "contractor-2",
                name: "Delta Construction",
                role: "General Contractor",
                subcontractors: [
                    {
                        id: "sub-3",
                        name: "Omega Construction",
                        role: "Subcontractor",
                        changeOrders: [
                            { id: "1006", customer: "Omega Construction", date: "02/05/2025", status: "Approved", tmTag: "T101", role: "Subcontractor" },
                            { id: "1007", customer: "Delta Construction", date: "02/06/2025", status: "Void", tmTag: "T567", role: "Subcontractor" }
                        ]
                    },
                    {
                        id: "sub-4",
                        name: "Highline Contractors",
                        role: "Subcontractor",
                        changeOrders: [
                            { id: "1008", customer: "Delta Construction", date: "02/03/2025", status: "In Review", tmTag: "T678", role: "Subcontractor" }
                        ]
                    }
                ]
            }
        ]
    }
];
