/*
 *Create By 韩卿
 */

import React, { Component } from 'react'
import { Row, Col, DatePicker } from 'antd'

const RangePicker = DatePicker.RangePicker

export default class RangeTimePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: undefined,
      startDateString: '',
      endDate: undefined,
      endDateString: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    const dateArr = this.props.value
    this.state.startDate = dateArr[0].date
    this.state.startDateString = dateArr[0].dateString
    this.state.endDate = dateArr[1].date
    this.state.endDateString = dateArr[1].dateString
  }

  // 处理选择日期的函数
  handleChange(date, dateString) {
    const temp = {
      startDate: date[0],
      startDateString: dateString[0],
      endDate: date[1],
      endDateString: dateString[1],
    }
    this.setState(temp)
    this.props.getComponentInternalData(temp)
  }

  render() {
    // console.log('render RangePicker')
    return (
      <div>
        <Row gutter={16} className="group">
          <Col lg={{ span: 2 }} xs={{ span: 4 }} style={{ width: 80 }}>
            {this.props.label}
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 12 }} className="list-wrap">
            <RangePicker
              format={this.props.format}
              value={[this.state.startDate, this.state.endDate]}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
      </div>
      )
  }
}
