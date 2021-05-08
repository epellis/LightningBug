import { Func } from '@prisma/client';
import React, { useMemo } from 'react'
import { useTable } from 'react-table'

// async function getFuncs(url): Promise<Func[]> {
//   console.log("Get Funcs")
//   return (await axios.get<Func[]>(url)).data
// }

// export async function getStaticProps() {
//   const initialFuncs = await getFuncs("/api/funcs")
//   return { props: { initialFuncs } }
// }

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
    </thead>
  </table>
}
