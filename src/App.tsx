import { useMemo, useState } from "react";
import StudentForm, { type FormValues } from "./Components/StudentForm";
import { StudentDataTable } from "./Components/StudentDataTable";
import ConfirmDialog from "./Components/ConfirmDailog";
import { useStudents } from "./hooks/useStudents";
import type { Student } from "./types/student";
import { exportStudentsToExcel } from "./utils/excelExport";

function App() {

  const { students, addStudent, updateStudent, deleteStudent, loading, action } = useStudents();
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const initialFormValues: FormValues | undefined = useMemo(() => {
    if (!editingStudent) return undefined;
    return {
      name: editingStudent.name,
      email: editingStudent.email,
      age: editingStudent.age.toString(),
    };
  }, [editingStudent]);

  const handleSubmitForm = async (values: FormValues) => {
    const payload = {
      name: values.name ?? "",
      email: values.email ?? "",
      age: Number(values.age ?? 0),
    };

    if (editingStudent) {
      await updateStudent(editingStudent.id, payload);
      setEditingStudent(null);
    } else {
      await addStudent(payload);
    }
  };
  const handleCancel = () => {
    if (editingStudent) {
      console.log("editing cancelled by user!");
      setEditingStudent(null)
    }
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleDeleteRequest = (student: Student) => {
    setDeleteTarget(student);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await deleteStudent(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleExport = () => {
    exportStudentsToExcel(students);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
      <h1 className="text-center text-xl font-semibold sm:text-2xl">Student Data Entry Form</h1>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <StudentForm
          initialValues={initialFormValues}
          onSubmit={handleSubmitForm}
          onCancel={handleCancel}
          loading={loading && (action === "add" || action === "update")}
        />
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium">Students</h2>
            <button
              type="button"
              className="w-full rounded-md bg-green-600 px-3 py-2 text-sm text-white sm:w-auto"
              onClick={handleExport}
              disabled={students.length === 0 || loading}
            >
              Export to Excel
            </button>
          </div>
          <StudentDataTable
            data={students}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        </div>
      </div>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete student"
        message={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.name}?`
            : "Are you sure you want to delete this student?"
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}

export default App
