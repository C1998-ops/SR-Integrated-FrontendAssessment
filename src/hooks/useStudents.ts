import { useState } from "react";
import type { Student } from "../types/student";

type StudentAction = "add" | "update" | "delete" | null;

export const useStudents = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState<StudentAction>(null);
    const [activeStudentId, setActiveStudentId] = useState<string | null>(null);

    const simulateRequest = async (
        nextAction: Exclude<StudentAction, null>,
        studentId: string | null,
        callback: () => void
    ) => {
        setLoading(true);
        setAction(nextAction);
        setActiveStudentId(studentId);

        await new Promise((resolve) => window.setTimeout(resolve, 900));
        callback();

        setLoading(false);
        setAction(null);
        setActiveStudentId(null);
    };

    const addStudent = async (data: Omit<Student, "id">) => {
        await simulateRequest("add", null, () => {
            const newStudent: Student = {
                ...data,
                id: Date.now().toString(),
            };
            setStudents((prev) => [...prev, newStudent]);
        });
    };

    const updateStudent = async (id: string, data: Omit<Student, "id">) => {
        await simulateRequest("update", id, () => {
            setStudents((prev) =>
                prev.map((student) =>
                    student.id === id ? { ...student, ...data } : student
                )
            );
        });
    };

    const deleteStudent = async (id: string) => {
        await simulateRequest("delete", id, () => {
            setStudents((prev) => prev.filter((student) => student.id !== id));
        });
    };

    return {
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        loading,
        action,
        activeStudentId,
    };
};

