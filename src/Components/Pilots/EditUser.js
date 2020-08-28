import React, { Component } from 'react'
import { Paper } from "@material-ui/core";

export class EditUser extends Component {

    getStyle = () => {
      return {
        background: '#b7b7b7',
        padding: '5px 20px 5px 30px ',
        color: '#000000',
        margin: '5px',
      }
    }

    render() {
      // const { firstName, lastName, militaryId, rank } = this.props;
      return (
        <Paper style={ this.getStyle() }>
            <p>
              Test
            </p>
        </Paper>
      )
    }

}

export default EditUser;