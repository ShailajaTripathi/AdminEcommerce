import React, { useState } from 'react'
import {createColumnHelper,flexRender,getCoreRowModel, useReactTable} from '@tanstack/react-table'

const TableListing = ({table,className,  getfilter}) => {
  
    const [filter, setFilter] = useState({
        sortBy: '',
        sortKey: ''
    })
  return (
   <>
   <div className={`return-table-body ${className}`}>
        <table className='table'>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}

                                    // onClick={() => {
                                    //     if (header.id) {
                                    //         setFilter((pre) => {
                                    //             if (
                                    //                 pre.sortKey ===
                                    //                 header.id
                                    //             ) {
                                    //                 return {
                                    //                     ...pre,
                                    //                     sortBy:
                                    //                         pre.sortBy === 1
                                    //                             ? -1
                                    //                             : 1
                                    //                 }
                                    //             }
                                    //             return {
                                    //                 ...pre,
                                    //                 sortKey: header.id,
                                    //                 sortBy: 1
                                    //             }
                                    //         })
                                    //         if (
                                    //             typeof getfilter ===
                                    //             'function'
                                    //         ) {
                                    //             getfilter(
                                    //                 filter.sortKey ===
                                    //                     header.id
                                    //                     ? {
                                    //                           ...filter,
                                    //                           sortBy:
                                    //                               filter.sortBy ===
                                    //                               1
                                    //                                   ? -1
                                    //                                   : 1
                                    //                       }
                                    //                     : {
                                    //                           ...filter,
                                    //                           sortKey:
                                    //                               header.id,
                                    //                           sortBy: 1
                                    //                       }
                                    //             )
                                    //         }
                                        
                                    // }}}

                                    colSpan={header.colSpan}
                                    className={`${
                                        header?.column?.id ===
                                        'thoughtDescription'
                                            ? 'active'
                                            : ''
                                    }`}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )} {" "}
                                            {{
                                                asc: <>&uarr;</>,
                                                desc: <>&darr;</>
                                            }[header.column.getIsSorted()] ??
                                                null}

                                            {/* <span>
                                            {filter.sortBy !== '' &&
                                            filter.sortKey !== '' &&
                                            filter.sortKey === header.id ? (
                                                filter.sortBy === 1 ? (
                                                    <>&uarr;</>
                                                ) : (
                                                    <>&darr;</>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </span> */}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className={`${
                                                cell?.column?.id ===
                                                'thoughtDescription'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            style={{ background: row.value === "Selected" ? "#90EE90" : "" }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
   </div>
         
   </>
  )
}

export default TableListing

