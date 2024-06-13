import * as React from 'react';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { useEffect, useState } from "react"


export default function TableUnstyled() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('On Page Change: ' + page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState([])
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [emptyRows, setEmptyRows] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/players/list?size=' + rowsPerPage + '&page=' + page,{
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Content-type": "application/json; charset=UTF-8"
    }})
      .then(response => response.json())
      .then(json => {setPlayers(json.players)
                     setTotalCount(json.totalItems)
                     setTotalPages(json.totalPages)
                     console.log(json) 
                     setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - json.totalItems) : 0)                   
                     console.log('EmptyRows' + emptyRows)
                     console.log('Page:' + page + 'rowsPerPage:' + rowsPerPage)
                     setLoading(false)})
      .catch(error => console.error(error));
  }, [rowsPerPage,page]);
  
  return (
    <Root sx={{ maxWidth: '100%', width: 500 }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {players.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td style={{ width: 160 }} align="right">
                {user.age}
              </td>
              <td style={{ width: 160 }} align="right">
                {user.address1}
              </td>
              <td style={{ width: 160 }} align="right">
                {user.address2}
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={4} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: totalCount }]}
              colSpan={4}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
