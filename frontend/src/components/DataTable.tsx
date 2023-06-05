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
      </tbody>
    </table>
  </div>
}

export default DataTable;