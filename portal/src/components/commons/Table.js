import React from 'react';
import { useTable } from 'react-table'
import { Table } from 'semantic-ui-react'

function DataTable({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    })

    return (
        <Table {...getTableProps()}>
            <Table.Header>
                {headerGroups.map(headerGroup => (
                    <Table.Row {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <Table.HeaderCell {...column.getHeaderProps()}>{column.render('Header')}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Header>
            <Table.Body {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)

                    return (
                        <Table.Row {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <Table.Cell {...cell.getCellProps()}>{cell.render('Cell')}</Table.Cell>
                            })}
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default DataTable;
