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


export default function FilterAircraft(props) {
  const classes = useStyles();
  const [searchFilterCraft, setSearchFilterCraft] = useState({ tail_code: null, model_uuid: null });
  
  return (
    <Grid container item style={{ height: '290px', marginBottom: '5px', alignContent: 'center' }}>
      <Grid container item direction='column'>
        <Grid item>
          <Typography variant='subtitle1' className={classes.filterLabels}> 
            Search by Tail Code
          </Typography>
          <TextField 
            id='tail-code-search'
            size='small'
            variant='outlined'
            style={{ padding: '10px' }}
            value={ searchFilterCraft.tail_code === null ? '' : searchFilterCraft.tail_code }
            InputProps={{
              startAdornment: <InputAdornment position='start'>MY</InputAdornment>
            }}
            onChange={(e) => 
              {
                let newSearchFilter = {...searchFilterCraft};
                newSearchFilter['tail_code'] = e.target.value;
                setSearchFilterCraft(newSearchFilter);
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
            id='filter-aircraft'
            native
            style={{ width: '175px' }}
            value={ searchFilterCraft.model_uuid === null ? '' : searchFilterCraft.model_uuid }
            onChange={(e) => 
              { 
                let newSearchFilter = {...searchFilterCraft};
                newSearchFilter['model_uuid'] = e.target.value;
                setSearchFilterCraft(newSearchFilter);
              }
            }
          >
            <option value="">Select</option>
            <option value="2c04be67-fc24-4eba-b6ca-57c81daab9c4">HC-130J Combat King II</option>
            <option value="db2863ea-369e-4262-ad17-bda986ae9632">HH-60 Pave Hawk</option>
            <option value="b0f4cd21-9e4c-4b4d-b4ae-88668b492a7b">A-10C Thunderbolt II</option>
          </Select>
        </Grid>
        <Grid container item style={{ justifyContent: 'center', marginTop: '60px' }}>
          <ButtonGroup>
            <Button 
              className={classes.applyBtn}
              type='submit'  
              onClick={() => props.applyFilter(searchFilterCraft)}
            >
              Apply
            </Button>
            <Button 
              className={classes.clearBtn}
              onClick={() => 
                { 
                  props.clearFilter();
                  setSearchFilterCraft({ tail_code: null, model_uuid: null });
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