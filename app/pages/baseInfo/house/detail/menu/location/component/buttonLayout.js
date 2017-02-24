/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Row, Col, Spin } from 'antd'
import StateButton from './stateButton'

export default class buttonLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: {
      },
      grade: '',
    }
    this.setBtnArr = this.setBtnArr.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const arrs = nextProps.arrs
    const selectCode = nextProps.selectCode
    if (this.props.arrs !== arrs) { //列表改变才会进入，不改变的时候state的状态值由自身决定
      for (let i = 0; i < arrs.length; i++) {
        const code = arrs[i][this.state.grade]
        this.state.show[code] = arrs[i]
        if (code == selectCode) { //这里可能会有类型转换
          this.state.show[code].show = true
        }
      }
    }
  }

  componentWillMount() {
    const arrs = this.props.arrs
    const selectCode = this.props.selectCode
    this.state.grade = this.props.grade
    for (let i = 0; i < arrs.length; i++) {
      const code = arrs[i][this.state.grade]
      this.state.show[code] = arrs[i]
      if (code == selectCode) { //这里可能会有类型转换
        this.state.show[code].show = true
      }
    }
  }

  // 改变对应的button值
  setBtnArr(btn) {
    const show = this.state.show
    show[btn.value] = btn
    for (const n in show) {
      show[n].show = (n == btn.value)
    }
    this.setState({ show: show })
    this.props.onClick(btn)
  }

  render() {
    const arrs = this.props.arrs
    const grade = this.state.grade
    const gradeName = this.props.gradeName
    const len = 8

    return (
      <Spin spinning={this.props.loading}>
        <div style={{ width: '500px' }} className="buttonLayout-lzr">
          <Row gutter={16}>
            {arrs.map((arr, i) =>
              <Col span={len} key={i} >
                <StateButton
                  setBtnArr={this.setBtnArr}
                  name={arr[grade]}
                  selectCode={this.props.selectCode}
                  show={this.state.show[arr[grade]].show}
                >
                  {arr[gradeName]}
                </StateButton>
              </Col>
            )}
          </Row>
        </div>
      </Spin>
    )
  }
}
