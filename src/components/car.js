import React, { Component } from 'react';
import _ from 'lodash';

import EventNotification  from './EventNotification.jsx'


export default class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carData: {}
    }
  }

  updateState = carData => {
    this.setState({ carData });
  }

  emptyState = () => {
    this.setState({ carData: {} })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
  }

  componentDidMount() {
    const myStreamer = this.props.carData.myStreamer;
    myStreamer.subscribe(this.updateState);
    myStreamer.start();
  }

  componentWillUnmount() {
    const myStreamer = this.props.carData.myStreamer;
    myStreamer.removeHandler(this.emptyState);
    myStreamer.stop();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.shouldFilterByFuel && this.state.carData.fuel < 0.15) {
      this.setState({ carData: {}})
    }
  }

  render() {
    if(_.isEmpty(this.state.carData)) {
      return null
    }
    return (
      <div className="col-sm-12">
        <EventNotification carEvent={this.state.carData}/>
      </div>
    )
  }
}
