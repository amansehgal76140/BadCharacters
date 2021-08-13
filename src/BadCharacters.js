import React, {useEffect, useState} from 'react';
import Typography  from '@material-ui/core/Typography';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {CircularProgress, TableCell} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import SimpleSearchBar from './SimpleSearchBar';
import CharacterProfile from './CharacterProfile';
import TablePagination from "@material-ui/core/TablePagination/TablePagination";

const useStyles = makeStyles(theme=>({
  table: {
    minWidth: 650,
  },
  smallIcon:{
    width:20,
    height:20
  },
  search: {
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor:theme.palette.common.white,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    pointerEvents: 'none',
    color:theme.palette.common.black,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  container:{
    minHeight:'100vh',
    backgroundColor:theme.palette.background.default,
  },
  heading:{
    textDecoration:'underline'
  }
}));

const CharactersListing=()=>{
  const classes=useStyles();

  const [characterDetails,setCharacterDetails]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [searchCharacters,setSearchCharacters]=useState([]);
  const [selectedCharacter,setSelectedCharacter]=useState({});
  const [searchedValue,setSearchedValue]=useState('');
  const [isCharacterSelected,setIsCharacterSelected]=useState(false);
  const [rowsPerPage,setRowsPerPage]=useState(10);
  const [page,setPage]=useState(0);

  const baseUrl='https://www.breakingbadapi.com/api/';

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const fetchData=()=>{
    axios.get(`${baseUrl}characters`)
    .then((res)=>{
      setSearchCharacters(res.data);
      setCharacterDetails(res.data);
      console.debug(res.data);
      setIsLoading(false);
    })
    .catch((err)=>{
      console.debug(err);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch=(event)=>{
      const characterName=event.target.value.toLowerCase();
      const filteredCharacters=searchCharacters.filter((character)=>{
        if(character.name.toLowerCase().includes(characterName)){
          return character;
        }
      })
      setPage(0);
      setSearchedValue(event.target.value);
      setCharacterDetails(filteredCharacters);
  }

  const handleCharacterSelect=(Character)=>{
    setSelectedCharacter(Character);
    setIsCharacterSelected(true);
  }

  return (
    isLoading ? 
    <Box display={'flex'} justifyContent={'center'} marginTop={8}>
      <CircularProgress />
      </Box>
    :
    <>
    {isCharacterSelected ? 
      <CharacterProfile 
        selectedCharacter={selectedCharacter} 
        setIsCharacterSelected={setIsCharacterSelected} 
      />:
      <Box paddingX={2} paddingY={3} className={classes.container}>
        <Box display={'flex'} justifyContent={'center'}>
          <Typography variant={'h5'} className={classes.heading}>Characters and their Description</Typography>
        </Box>
        <Box paddingY={3}>
          <SimpleSearchBar 
            value={searchedValue}
            minWidth={'300px'} 
            placeholder={'Seach By Character Name'} 
            onChangeHandler={handleSearch} 
          />
        </Box>
        <Paper>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Occupation</TableCell>
                  <TableCell align="center">Date of Birth</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {characterDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((detail,index)=>{
                  return  (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{detail.name}</TableCell>
                      <TableCell align="center">{detail.occupation[0]}</TableCell>
                      <TableCell align="center">{detail.birthday}</TableCell>
                      <TableCell align="center">{detail.status}</TableCell>
                      <TableCell 
                        align={'center'}
                      >
                        <Button 
                          onClick={()=>handleCharacterSelect(detail)} 
                          startIcon={<VisibilityIcon />} 
                          size={'small'}
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={'div'}
          count={characterDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    }
  </>
  );
}
export default CharactersListing;