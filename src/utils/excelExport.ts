import type { Student } from "../types/student";

// Very simple CSV export for students list
export const exportStudentsToExcel = (students: Student[]) => {
    if (!students || students.length === 0) return;

    const header = ["ID", "Name", "Email", "Age"];
    const rows = students.map((s) => [s.id, s.name, s.email, s.age.toString()]);

    const csvContent =
        [header, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

