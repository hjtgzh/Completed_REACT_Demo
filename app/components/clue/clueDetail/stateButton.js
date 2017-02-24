/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react';
import { Button } from 'antd';


export default class stateButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.change = this.change.bind(this)
  }

  componentDidMount() {
  }

  change() {
    this.props.setBtnArr({
      code: this.props.name,
      show: !this.props.show,
    })
  }

  render() {
    return (
      <Button
        type={this.props.show ? 'primary' : 'ghost'}
        size="large"
        onClick={this.change}
      >
        {this.props.children}
      </Button>
    )
  }
}
