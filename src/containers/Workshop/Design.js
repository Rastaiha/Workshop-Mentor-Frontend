import {
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import EditState from '../../components/SpecialComponents/EditWorkshopPage/EditState';
import StatesTabbar from '../../components/SpecialComponents/EditWorkshopPage/StatesTabbar';
import { getStateAction, getWorkshopAction } from '../../redux/slices/widget';
import {
  getAllWorkshopStatesInfoAction,
  getOneStateAction,
} from '../../redux/slices/workshop';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    overflow: 'hidden',
  },

  workshopTabsPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
    height: '100%',
  },
}));

const EditWorkshop = ({
  getAllWorkshopStatesInfo,
  getOneState,

  currentState,
  allStates,
}) => {
  const [tab, setTab] = React.useState(0);
  const { fsmId } = useParams();

  useEffect(() => {
    getAllWorkshopStatesInfo({ fsmId });
  }, [])

  useEffect(() => {
    if (allStates[tab]) {
      getOneState({ stateId: allStates[tab].id });
    }
  }, [allStates, tab])

  // useEffect(() => {
  //   getOneState({});
  // }, [])

  // useEffect(() => {
  //   if (fsmId) {
  //     getWorkshop({ fsmId });
  //   } else {
  //     history.push('/');
  //   }
  // }, [getWorkshop, fsmId, history]);

  // useEffect(() => {
  //   if (workshop?.states[tab]?.id) {
  //     getState({ stateId: workshop.states[tab].id });
  //   }
  // }, [tab, workshop, getState]);

  // useEffect(() => {
  //   if (workshop?.states[tab]?.id && needUpdateState) {
  //     getState({ stateId: workshop.states[tab].id });
  //   }
  // }, [needUpdateState]);

  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {/* <Grid item xs={12} sm={2} md={1} className={classes.smFullHeight}>
          <Paper className={classes.workshopTabsPaper}></Paper>
        </Grid> */}
      <Grid item xs={12}>
        <Paper className={classes.tabbar}>
          <StatesTabbar
            value={tab}
            setValue={setTab}
            tabs={allStates.map((state) => state.name)}
          />
        </Paper>
        <EditState state={currentState} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  allStates: state.workshop.allStates,
  currentState: state.workshop.currentState,

  // workshop: state.mentor.workshops.find(
  //   (workshop) => +workshop.id === +ownProps.match.params.fsmId
  // ),
  // currentState: state.currentState.state,
  // needUpdateState: state.currentState.needUpdateState,
  // fsmId: ownProps.match.params.fsmId,
});

export default connect(mapStateToProps, {
  getOneState: getOneStateAction,
  getAllWorkshopStatesInfo: getAllWorkshopStatesInfoAction,

  getWorkshop: getWorkshopAction,
  getState: getStateAction,
})(EditWorkshop);
