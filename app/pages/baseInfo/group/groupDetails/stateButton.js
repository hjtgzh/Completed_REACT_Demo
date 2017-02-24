import React from 'react';
import ReactDOM from 'react-dom';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon,Input
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const stateButton = Form.create()(React.createClass({
  getInitialState: function() {
    return {
      show:false,
    };
  },
  componentDidMount() {
  },
  change(){
  	this.props.setBtnArr({
      id:this.props.id,
      text:this.props.children,
      show:!this.props.show
    })
  },

  render() {
    return (
        <Button style={{width:'100%',marginTop:'10px',overflow:'hidden'}} type={this.props.show? "primary" : "ghost"} size="large" onClick={this.change} title={this.props.children}>{this.props.children}</Button>
    );
  },
}));

export default stateButton;
