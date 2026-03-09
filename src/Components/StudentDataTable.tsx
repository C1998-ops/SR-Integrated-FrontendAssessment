import type { TableColumn } from "./DataTable";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import DataTable from "./DataTable";
import type { Student } from "../types/student";

export const StudentDataColumns: TableColumn<Student>[] = [
    {
        key: "id",
        header: "ID",
        headerClassName: "w-20 min-w-20",
        render: (value: string) => {
            return <div className="truncate text-gray-500 text-xs">{value}</div>;
        },
    },
    {
        key: "name",
        header: "Name",
        headerClassName: "min-w-32",
        render: (value: string) => {
            return <div className="font-medium text-gray-800">{value}</div>;
        },
    },
    {
        key: "email",
        header: "Email",
        headerClassName: "min-w-48",
        render: (value: string) => {
            return <div className="text-blue-600 truncate">{value}</div>;
        },
    },
    {
        key: "age",
        header: "Age",
        headerClassName: "w-16 min-w-16 text-center",
        align: "center",
        render: (value: number) => {
            return <div className="text-center text-gray-700">{value}</div>;
        },
    },
];

interface StudentDataTableProps {
    data: Student[];
    onEdit: (student: Student) => void;
    onDelete: (student: Student) => void;
}

export const StudentDataTable: React.FC<StudentDataTableProps> = ({
    data,
    onEdit,
    onDelete,
}) => {
    const columns: TableColumn<Student>[] = [
        ...StudentDataColumns,
        {
            key: "actions",
            header: "Actions",
            headerClassName: "w-24 min-w-24 text-center",
            align: "center",
            render: (_value, row) => (
                <div className="flex items-center justify-center gap-2">
                    <button
                        type="button"
                        aria-label={`Edit ${row.name}`}
                        className="cursor-pointer rounded-md p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(row);
                        }}
                    >
                        <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-label={`Delete ${row.name}`}
                        className="cursor-pointer rounded-md p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(row);
                        }}
                    >
                        <FiTrash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return <DataTable columns={columns} data={data} />;
};