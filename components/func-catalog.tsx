import { Func } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'
import useSWR from 'swr'

async function getFuncs(): Promise<Func[]> {
  return (await axios.get<Func[]>("/api/funcs")).data
}

export default function FuncCatalog() {
  const { data: funcs, error } = useSWR('/api/funcs', getFuncs)

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, funcs })

  if (error) return <div>failed to load</div>
  if (!funcs) return <div>loading...</div>

  return <table {...getTableProps()}>
    <thead>
    </thead>
  </table>
}
