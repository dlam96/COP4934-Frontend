import React from "react";
import { 
  makeStyles,
  Grid,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { blueGrey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  details: {
    height: '40px',
    margin: '10px',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: fade(blueGrey[700], 0.25),
      '& $divBar': {
        backgroundColor: theme.palette.secondary.main,
      }
    }
  },
  divBar: {
    width: '5px',
    height: '100%',
    marginRight: '7%',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  editButton: {
    color: theme.palette.secondary.main,
  },
}));

export default function ActiveAircrafts(props) {
  const classes = useStyles();
  const { aircraft, aircraftModels } = props;

  const getModelName = ( aircraft = null ) => {
    let index = aircraftModels.findIndex((element) => element.model_uuid === aircraft.model_uuid)
    if (index < 0) return;
    return aircraftModels[index].model_name;
  }

  return( 
    <Grid container item direction='row' className={classes.details}>
      <Grid item className={classes.divBar} />
      <Grid item xs={3}>
        <Typography>
          { getModelName(aircraft) }
        </Typography>
      </Grid>
      <Grid item style={{ marginLeft: '10px' }}> 
        <Typography>
          { aircraft.tail_code } 
        </Typography>
      </Grid>
      <Grid item />
      <Grid item>
        <Typography>
          { aircraft.status } 
        </Typography>
      </Grid>
      <Grid item>
        <IconButton 
          className={classes.editButton}
          onClick={() => props.handleEdit(aircraft)}
        >
          <Edit />
        </IconButton>
      </Grid>

    </Grid>
  )
}