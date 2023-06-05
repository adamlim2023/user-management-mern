import React, { FC, Fragment } from 'react';

interface Props {
  cols: any;
  rows: any;
  renderRow: any;
}

const DataTable: FC<Props> = ({ cols, rows, renderRow }) => {
  return <div>
    <table className='w-full'>
      <thead>
        <tr>
          {cols.map((col: string, i: number) => <th key={i}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row: any, i: number) => <Fragment key={i}>
            {renderRow(row, i)}
          </Fragment>)
        }
        {rows.length === 0 &&
          <tr>
            <td colSpan={cols.length} className='text-center'>No records</td>
          </tr>}
      </tbody>
    </table>
  </div>
}

export default DataTable;