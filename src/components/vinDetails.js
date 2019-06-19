import React, { Component } from 'react';
import _ from 'lodash';
import Car from './car.js';
import Checkbox from './Checkbox.jsx';

export default class VinList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myVins: [],
      filterFuel: false,
      refresh: false
    }
  }

  filterByFuelHandler(checkedStatus) {
    if(checkedStatus) {
      this.setState({ filterFuel: true })
    }
    else {
      this.setState({ filterFuel: false })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(this.props.carDataList, prevProps.carDataList) || !_.isEqual(this.state.myVins, prevState.myVins)) {
      this.setState({ myVins: this.props.carDataList})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
  }

  render() {
    let tmpVinList = _.cloneDeep(this.state.myVins);
    const checkedTrueVins = _.filter(tmpVinList, v => v.checked);
    if(checkedTrueVins.length === 0) {
      return (
        <div className= "col-sm-6">
          <div className="card bg-info">
            <div className="card-header" style={{height:'65px'}}>
              <Checkbox onChange= {({target}) => this.filterByFuelHandler(target.value)}/>
              Filter events where fuel level is under 15%
            </div>
            <div className="card-body">
              <p style={{paddingBottom:'8px'}} className="vinListHeader">Online Tracked VINs status</p>
            </div>
          </div>
        </div>
      )
    }
    return (
        <div className= "col-sm-6">
          <div className="card bg-info">
            <div className="card-header" style={{height:'65px'}}>
              <Checkbox onChange= {({target}) => this.filterByFuelHandler(target.checked)}/>
              Filter events where fuel level is under 15%
            </div>
            <p className="vinListHeader">Online Tracked VINs status</p>
              <ul className="list-group list-group-flush bg-info">
              {_.map(checkedTrueVins, (v, idx) =>
                  <li key={v.id} className="list-group-item"><Car shouldFilterByFuel= {this.state.filterFuel} carData= {v}/></li>
                 )}
              </ul>
            </div>
          </div>
    )
  }
}
