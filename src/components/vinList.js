import React, { Component } from 'react';
import _ from 'lodash';

import Input from './Input.jsx';
import Button from './Button.jsx';
import Checkbox from './Checkbox.jsx';

export default class VinList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newVin: {},
      validateVin: null,
      id: 1
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState) || !_.isEqual(this.props, nextProps)
  }

  handleChange(field, value) {
    this.setState({newVin: value});
  }

  addVin() {
    if(this.validateVin(this.state.newVin)) {
      this.props.addVinToApp({vin: this.state.newVin, checked: false, id: this.state.id});
      let tmpId = this.state.id;
      tmpId++;
      this.setState({id: tmpId});
    }
    else {
      return null;
    }
  }

  validateVin(vin) {
    if (/[^0-9A-Z]/.test(vin) || vin.length !== 17) {
      this.setState({validateVin: true});
      return false;
    }
    else {
      this.setState({validateVin: false});
      return true;
    }
 }

  render() {
    return (
        <div className= "subscribe col-sm-6">
          <div className= "vinInput col-sm-12">
            <div className="card bg-info">
              <div className="card-header">
                <span><Input value={this.state.newVin.id} onChange= {({target}) => this.handleChange("input", target.value)}/></span>
                <span><Button type="button" onClick= {() => {this.addVin()}}/></span>
                <div className= "validationAlert">{this.state.validateVin === true ? "Your VIN is invalid! make sure it's 17 letters long and Alphanumeric and all caps!" : ''}</div>
              </div>
              <div className="card-body">
                <p className="vinListHeader mt-2">Tracked VINs</p>
                <ul className="ks-cboxtags">
                  {_.map(this.props.vinList, (v, idx) =>
                    <li key={idx}><Checkbox onChange= {({target}) => this.props.handleCheckboxChange(target.checked, v.vin)}/>{v.vin}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
