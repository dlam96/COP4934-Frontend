import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  TextField,
  InputAdornment,
  Select,
  makeStyles,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({ 
  filterLabels: {
    color: blueGrey[900],
    paddingLeft: '10px',
  },
  applyBtn: {
    backgroundColor: fade(blueGrey[300], 0.50),
    size: 'small',
    height: '30px',
  },
  clearBtn: {
    // backgroundColor: fade(blueGrey[300], 0.75),
    backgroundColor: fade(theme.palette.secondary.main, 0.25),
    size: 'small',
    height: '30px',
  },
}));

export default function FilterUsers(props) {
  const classes = useStyles();
  const { metaPositions } = props;
  const [searchFilterUser, setSearchFilterUser] = useState({ last_name: null, meta_position_status: null });
  
  const removeDuplicates = Array.from(new Set(metaPositions.map(pos => pos.meta_name)))
  .map(meta_name => {
    return metaPositions.find(pos => pos.meta_name === meta_name)
  })

  const capitalizeMetaPos = (metaName = null) => {
    let res = metaName.slice(5).replace(/_/g, ' ');
    return res.charAt(0).toUpperCase() + res.slice(1)
  }  

  return (
    <Grid container item style={{ height: '290px', marginBottom: '5px', alignContent: 'center' }}>
      <Grid container item direction='column'>
        <Grid item>
          <Typography variant='subtitle1' className={classes.filterLabels}> 
            Search by Last Name
          </Typography>
          <TextField 
            id='last-name-search'
            size='small'
            variant='outlined'
            style={{ padding: '10px' }}
            value={ searchFilterUser.last_name === null ? '' : searchFilterUser.last_name }
            onChange={(e) => 
              {
                let newSearchFilter = {...searchFilterUser};
                newSearchFilter['last_name'] = e.target.value;
                setSearchFilterUser(newSearchFilter);
              }
            }
          />
        </Grid>
        <Grid item style={{ marginTop: '10px' }}>
          <Typography variant='subtitle1' className={classes.filterLabels}>
            Filter by
          </Typography>
        </Grid>
        <Grid container item style={{ justifyContent: 'center' }}>
          <Select
            id="filter-users"
            native
            style={{ width: '175px' }}
            value={ searchFilterUser.meta_position_status === null ? '' : searchFilterUser.meta_position_status }
            onChange={(e) =>
              {
                let newUser = {...searchFilterUser}
                newUser['meta_position_status'] = e.target.value
                setSearchFilterUser(newUser);
              }
            }
          >
            <option value=''>Select</option>
            {removeDuplicates.map((pos, index) => (
              <option value={pos.meta_name} key={index}>{capitalizeMetaPos(pos.meta_name)}</option>
            ))}
          </Select>
        </Grid>
        <Grid container item style={{ justifyContent: 'center', marginTop: '60px' }}>
          <ButtonGroup>
            <Button 
              className={classes.applyBtn}
              type='submit'  
              onClick={() => props.applyFilter(searchFilterUser)}
            >
              Apply
            </Button>
            <Button 
              className={classes.clearBtn}
              onClick={() => 
                { 
                  props.clearFilter();
                  setSearchFilterUser({ last_name: null, meta_position_status: null });
                }
              }
            >
              Clear
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};