import React from 'react'
import Skeleton from 'react-loading-skeleton'

const   TableSkeleton = () => {
  const skeletonRows = Array.from({ length: 4 }).map((_, index) => (
    <tr key={index}>
      <td><Skeleton count={1} width={45} height={66} /></td>
      <td><Skeleton count={1} width={100} height={20} /></td>
      <td><Skeleton count={1} width={100} height={20} /></td>
      <td><Skeleton count={1} width={100} height={20} /></td>
      <td><Skeleton count={1} width={100} height={20} /></td>
      <td><Skeleton count={1} width={100} height={20} /></td>
      <td><Skeleton circle count={1} width={40} height={40} /></td>
    </tr>
  ));
  return (
    <>
      <div className='return-table-body m-0'>
        <table className='table skeleton-table'>
          <tr>
            <th><Skeleton count={1} width={100} height={20} /></th>
            <th><Skeleton count={1} width={100} height={20} /></th>
            <th><Skeleton count={1} width={100} height={20} /></th>
            <th><Skeleton count={1} width={100} height={20} /></th>
            <th><Skeleton count={1} width={100} height={20} /></th>
            <th><Skeleton count={1} width={100} height={20} /></th>
            <th><Skeleton count={1} width={100} height={20} /></th>
          </tr>
          {skeletonRows}
        </table>
      </div>
      <div className='pagination-wrap skeleton'>
        <Skeleton count={1} width={200} height={20} className='d-block'/>
        <ul className='itemperpage-box pagination'>
          <li className='page-item border-0'><Skeleton count={1} width={40} height={40} className='d-block'/></li>
          <li className='page-item border-0'><Skeleton count={1} width={40} height={40} className='d-block'/></li>
          <li className='page-item border-0'><Skeleton count={1} width={40} height={40} className='d-block'/></li>
        </ul>
      </div>
    </>
  )
}

export default TableSkeleton