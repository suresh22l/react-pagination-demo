import * as React from 'react';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { useEffect, useState } from "react"


export default function TableUnstyled() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [nameSort, setNameSort] = React.useState('name,asc');
  const [ageSort, setAgeSort] = React.useState('age,asc');
  const [citySort, setCitySort] = React.useState('address2,asc');
  const [sort, setSort] = React.useState('name,asc');
  const [filterText, setFilterText] = useState("");
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");

  useEffect(() => {
  	setFilterText('&name='+filterText1+'&age='+filterText2);
  	setPage(0);
  }, [filterText1,filterText2]);
  
  const handleFilterText1 = (event) => {
  	setFilterText('name='+event.target.value);
  }

  const handleFilterText2 = (event) => {
  	setFilterText('age='+event.target.value);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('On Page Change: ' + page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNameSort = (event) => {
    nameSort.includes('name,asc') ? setNameSort('name,desc') : setNameSort('name,asc');
    setSort(nameSort);
  };
  
  const handleAgeSort = (event) => {
  	ageSort.includes('asc') ? setAgeSort('age,desc') : setAgeSort('age,asc'); 
    setSort(ageSort);
  };

  const handleCitySort = (event) => {
    citySort.includes('asc') ? setCitySort('address2,desc') : setCitySort('address2,asc');
    setSort(citySort);
  };
  
  const [loading, setLoading] = React.useState(false)
  const [players, setPlayers] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [emptyRows, setEmptyRows] = React.useState(0);

  useEffect(() => {
    setLoading(true);
    console.log(process.env.REACT_APP_BCKEND_API_URL+'/players/list?size='
    + rowsPerPage + '&page=' + page+ '&sort=' + sort
    + filterText);
    fetch(process.env.REACT_APP_BCKEND_API_URL+'/players/list?size='
    + rowsPerPage + '&page=' + page+ '&sort=' + sort
    + filterText,{
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
  }, [rowsPerPage,page,sort,filterText]);
  
  return (
    <Root sx={{ maxWidth: '100%', width: 500 }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>
	            <button type="button" onClick={handleNameSort}>
	              Name
	            </button>
		        <input
		          value={filterText1}
		          onChange={(e) => {
		            setFilterText1(e.target.value);
		          }}
		          type="text"
		        />
			</th>
            <th>
	            <button type="button" onClick={handleAgeSort}>
	              Age
	            </button>
		        <input
		          value={filterText2}
		          onChange={(e) => {
		            setFilterText2(e.target.value);
		          }}
		          type="text"
		        />
			</th>
            <th>Address</th>
            <th>
	            <button type="button" onClick={handleCitySort}>
	              City
	            </button>
			</th>
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
              rowsPerPageOptions={[10, 100, 1000, { label: 'All', value: totalCount }]}
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
