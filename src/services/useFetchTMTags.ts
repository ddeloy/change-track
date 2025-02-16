export type TMTag = {
    tagNumber: string;
    title: string;
    datePerformed: string;
    dateSigned: string;
    customerRef: string;
};

export function useFetchTMTags(): TMTag[] {
    return [
        { tagNumber: "EX0001", title: "Sample T&M Tag 1", datePerformed: "02/07/2025", dateSigned: "02/08/2025", customerRef: "CR-101" },
        { tagNumber: "EX0002", title: "Sample T&M Tag 2", datePerformed: "02/06/2025", dateSigned: "02/07/2025", customerRef: "CR-102" },
        { tagNumber: "EX0003", title: "Sample T&M Tag 3", datePerformed: "02/05/2025", dateSigned: "02/06/2025", customerRef: "CR-103" }
    ];
}
