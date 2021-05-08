import { Func } from '@prisma/client';
import React, { useMemo } from 'react'
import { useTable } from 'react-table'

export default function FuncCatalog({ funcs }: { funcs: Func[] }) {
  const columns = useMemo(() => [
    {
      Header: "Func ID",
      accessor: "id"
    },
    {
      Header: "Name",
      accessor: "name"
    },
  ], []);

  const data = useMemo(() => funcs, [funcs])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return <table {...getTableProps()}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps}>
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead >
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table >
}
