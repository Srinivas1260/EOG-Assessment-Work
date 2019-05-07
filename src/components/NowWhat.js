import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import AvatarRaw from "@material-ui/core/Avatar";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const Avatar = withStyles(avatarStyles)(AvatarRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

let firstTime = true;

class NowWhat extends Component {
  componentDidMount() {
    this.props.onLoad();
    console.log(this.props)
  }

  render() {
    const {
          loading,
          name,
          latitude,
          longitude,
          temperature,
          classes
        } = this.props;


    let data = [
      {
        name: 'Current State', temperature: temperature, latitude: latitude, longitude: longitude
      }
    ];

    if (loading && firstTime) {
        firstTime = false;
        return <LinearProgress />;
    }

      return (
        <Card className={classes.card}>
          <CardContent>
            <List>
              <ListItem>
                <ListItemText primary="Temperature:" />
                <ListItemText primary={ temperature } />
              </ListItem>
              <ListItem>
                <ListItemText primary="Latitude:" />
                <ListItemText primary={ latitude} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Longitude:" />
                <ListItemText primary={longitude} />
              </ListItem>
            </List>
          </CardContent>

          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="latitude" stroke="#82ca9d" />
            <Line type="monotone" dataKey="longitude" stroke="#ab0000" />
          </LineChart>

        </Card>
      );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    name,
    latitude,
    longitude,
    temperature
  } = state.weather;
  return {
    loading,
    name,
    latitude,
    longitude,
    temperature
  };
};

const mapDispatch = dispatch => ({
  onLoad: () => {
    dispatch({
      type: actions.FETCH_DRONE
    })

    setInterval(function(){
      dispatch({
        type: actions.FETCH_DRONE
      })
    }, 5000 );
  }
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(NowWhat));
