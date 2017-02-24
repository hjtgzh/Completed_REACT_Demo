/**
 * Created by 余金彪 on 2017/1/5.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Input, Row, Col } from 'antd'
import { connect } from 'react-redux'
import StateButton from '../stateButton'
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class AddLeaderModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchState: this.props.searchState,
      loading: true,
    }
    this.setBtnArr = this.setBtnArr.bind(this)
    this.searchState = this.searchState.bind(this)
  }

  componentDidMount() {}

  setBtnArr(obj) {
    this.setState({
      loading: false,
    })
    this.props.setBtnArr(obj)
  }
  // 搜索
  searchState(e) {
    const name = e.target.value.trim()
    this.status = this.props.searchState
    if (name) {
      const searchState = this.status.filter((item) => (
          item.name.indexOf(name) > -1
        )
      )
      this.setState({ searchState: searchState })
    } else {
      this.setState({ searchState: this.status })
    }
  }
  render() {
    return (
      <div>
        <div>
          <Row gutter={16}>
            <Col span="4">
              <label>单位部位</label>
            </Col>
            <Col span="20">
              <Input placeholder="请输入搜索条件" onChange={this.searchState} />
            </Col>
          </Row>
        </div>
        <div>
          {
            this.state.searchState.map((subs, i) =>
              <Row gutter={16} key={i}>
                <Row gutter={16} key={i}>
                  <Col span="20">
                    <StateButton show={this.props.selBtn[subs.id] ? this.props.selBtn[subs.id].show : false}
                                 id={subs.id}
                                 setBtnArr={this.setBtnArr}
                    >{subs.name}</StateButton>
                  </Col>
                </Row>
              </Row>
            )
          }
        </div>
      </div>
    )
  }
}
