import React, { Component } from 'react';
import './App.css';
import createCarStreamer from './api/car-data-streamer';

import _ from 'lodash';

import VinList from './components/vinList.js'
import VinDetails from './components/vinDetails.js'

class App extends Component {
  state = {
    vinList: []
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.vinList !== nextState.vinList
  }

  handleCheckbox(checkedStatus, vin) {
    let tmpVinList = _.cloneDeep(this.state.vinList);
    let myCarObj = _.find(tmpVinList, c => c.vin === vin);
    myCarObj.checked = checkedStatus;
    _.union([myCarObj], tmpVinList);
    this.setState({ vinList: tmpVinList });
  }

  handleVinRecieve(carObj) {
    let tmpVinList = _.cloneDeep(this.state.vinList);
    if(_.isEmpty(_.find(tmpVinList, x => x.vin.toString() === carObj.vin.toString()))) {
      const streamer = createCarStreamer(carObj.vin);
      let myCarObj = {
        id: carObj.id,
        vin: carObj.vin,
        checked: carObj.checked,
        myStreamer: streamer
      };
      tmpVinList.push(myCarObj)
      this.setState({vinList: tmpVinList});
    }
    else {
      alert('Vin already exists!')
    }
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row mt-1">
            <VinList vinList= {this.state.vinList} handleCheckboxChange= {(checkedStatus, vin, id) => this.handleCheckbox(checkedStatus, vin)} addVinToApp= {carObj => this.handleVinRecieve(carObj)}/>
            <VinDetails carDataList = {this.state.vinList}/>
          </div>
        </div>
    )
  }
}

export default App
