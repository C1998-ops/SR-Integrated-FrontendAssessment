import React from 'react';

const getTextAlignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
};

interface TableClassNames {
    table?: string;
    tableHeader?: string;
    tableHeaderCell?: string;
    tableBody?: string;
    tableRow?: string | ((row: any) => string);
    tableCell?: string;
    pagination?: string;
    expendableRow?: string;
    expendableRowCell?: string;
}
export interface TableColumn<T> {
    key: string;
    header: string;
    render: (value: any, row: T, index: number, onAction?: (...args: any[]) => void) => React.ReactNode;
    headerRender?: () => React.ReactNode;
    headerClassName?: string;
    align?: 'left' | 'center' | 'right';
}
interface ExpandableRowConfig<T> {
    isExpanded: (row: T) => boolean;
    expandedRowRenderer: (row: T) => React.ReactNode;
}
type DataTableProps<T> = {
    columns: TableColumn<T>[];
    data: T[];
    searchQuery?: string;
    loading?: boolean; // Local loading state for table
    pagination?: {
        currentPage: number;
        onPageChange: (page: number) => void;
        pageSize: number;
        setPageSize: (size: number) => void;
    };
    totalCount?: number;
    onRowClick?: (row: T) => void;
    className?: TableClassNames;
    expandableRows?: ExpandableRowConfig<T>;
};

function DataTable<T>({
    columns,
    data,
    searchQuery: _searchQuery,
    loading: _loading = false, // Local loading state
    onAction,
    totalCount: _totalCount,
    onRowClick,
    className = {
        table: '',
        tableHeader: '',
        tableHeaderCell: '',
        tableBody: '',
        tableRow: '',
        tableCell: '',
        pagination: '',
        expendableRow: '',
        expendableRowCell: '',
    },
}: DataTableProps<T> & { onAction?: (...args: any[]) => void }) {
    return (
        <div className="w-full">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-[640px] w-full whitespace-nowrap">
                        <thead className="bg-slate-100 text-slate-600 sticky top-0 z-10">
                            <tr>
                                {columns?.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${getTextAlignClass(col.align)}`}
                                    >
                                        {col.headerRender ? col.headerRender() : col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className={"font-medium text-slate-700 p-4 border-t border-gray-200"}>
                            {data?.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-8">
                                        No data found.
                                    </td>
                                </tr>
                            ) : (
                                data?.map((row, rowIdx) => (
                                    <React.Fragment key={rowIdx}>
                                        <tr
                                            className={`${typeof className.tableRow === 'function'
                                                ? className.tableRow(row)
                                                : (className.tableRow ?? 'border-t hover:bg-gray-50')
                                                } ${onRowClick ? 'cursor-pointer' : ''}`}
                                            onClick={() => onRowClick && onRowClick(row)}
                                        >
                                            {columns?.map((col, colIdx) => (
                                                <td
                                                    key={colIdx}
                                                    className={`px-4 py-3 text-sm text-slate-700 ${getTextAlignClass(col.align)}`}
                                                >
                                                    {col.render
                                                        ? col.render((row as any)[col.key], row, rowIdx, onAction)
                                                        : (row as any)[col.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DataTable;
