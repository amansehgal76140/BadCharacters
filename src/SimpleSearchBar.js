import React from 'react';
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Proptypes from 'prop-types';

const SimpleSearchBar = ({ value, placeholder, onChangeHandler, minWidth }) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        size='small'
        style={minWidth ? {minWidth: minWidth} : {width: '100%'}}
        className={classes.searchBox}
        placeholder={placeholder || "Search..."}
        onChange={onChangeHandler}
        value={value}
        InputProps={{startAdornment: <Search className={classes.SearchIcon}/>, className:classes.underline}}
      />
    </>
  );
};

const useStyles = makeStyles(theme => ({
  searchBox: {
    background: theme.palette.background.default,
    borderRadius: '5px',
    border:`1px solid black`,
    padding: theme.spacing(0.5,0)
  },
  underline: {
    ...theme.typography.inputPlaceholder,
    padding: '0 5px',
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  SearchIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.grey.main
  },
}));

SimpleSearchBar.propTypes = {
  placeholder: Proptypes.string,
  onChangeHandler: Proptypes.func.isRequired
}
export default SimpleSearchBar;