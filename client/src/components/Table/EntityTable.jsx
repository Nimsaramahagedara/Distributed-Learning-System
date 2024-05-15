import React from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const EntityTable = ({ heading, data, entityColumns, onEdit, onDelete }) => {
  return (
    <div className="mt-5">
      {heading && (
        <h2 className="text-2xl font-bold mb-3">{heading}</h2>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {entityColumns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
            {onEdit && <th className="px-6 py-3"></th>}
            {onDelete && <th className="px-6 py-3"></th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data &&
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {entityColumns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="text-left px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {row[column]}
                  </td>
                ))}
                {/* Add Edit and Delete buttons */}
                {onEdit && (
                  <td className="py-4 text-sm text-gray-900">
                    <button
                      onClick={() => onEdit(row)}
                      className="flex items-center text-blue-500 hover:text-blue-700 bg-blue-100 rounded-full p-1"
                    >
                      <EditIcon className="h-5 w-5" />
                    </button>
                  </td>
                )}
                {onDelete && (
                  <td className="py-4 text-sm text-gray-900">
                    <button
                      onClick={() => onDelete(row.id)}
                      className="flex items-center text-red-500 hover:text-red-700 bg-red-100 rounded-full p-1"
                    >
                      <DeleteIcon className="h-5 w-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntityTable;
