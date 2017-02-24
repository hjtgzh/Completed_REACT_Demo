/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { DatePicker, Button, Row, Col } from 'antd'
import { connect } from 'react-redux'
import {
  fetchRecordListFromBld, // 获取地址关联线索记录列表
  fetchRecordListFromFj, // 获取房间关联线索记录列表
  fetchRecordListFromRy, // 获取人员关联线索记录列表
  fetchRecordListFromDw, // 获取单位关联线索记录列表
  fetchRecordListFromAj, // 获取案件关联线索记录列表
} from 'actions/people'
import ContentCard from './contentCard'

const { RangePicker } = DatePicker

@connect(
  (state) => ({
    config: state.config,
    clueListFromBldResult: state.clueListFromBldResult, // 地址
    clueListFromFjResult: state.clueListFromFjResult, // 房间
    clueListFromRyResult: state.clueListFromRyResult, // 人员
    clueListFromDwResult: state.clueListFromDwResult, // 单位
    clueListFromAjResult: state.clueListFromAjResult, //案件
  })
)

export default class Clue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      startdate: '',
      enddate: '',
      currentPage: 1,
      pageSize: 100,
      loading: false,
      address: '翁沛洋 330106200308152112',
    }
    this.searchClue = this.searchClue.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.searchClue(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.searchClue(nextProps)
    }
  }

  // 时间改变时 获取对应时间
  onChange(value, dateString) {
    this.state.startdate = dateString[0]
    this.state.enddate = dateString[1]
  }

  // 查询线索记录
  searchClue(newProps) {
    const props = newProps || this.props
    const value = {
      pageNo: this.state.currentPage, // 当前页面
      pageSize: this.state.pageSize,  // 每页条数
      startdate: this.state.startdate, // 开始时间
      enddate: this.state.enddate, // 结束时间
    }
    switch (props.clueType) {
    case 'recordBld':
      value.bldid = props.id
      this.setState({ loading: true })
      this.props.dispatch(fetchRecordListFromBld(value, () => {
        this.state.list = this.props.clueListFromBldResult.list
        this.setState({ loading: false })
      }))
      return
    case 'recordFj':
      value.fjid = props.id
      this.setState({ loading: true })
      this.props.dispatch(fetchRecordListFromFj(value, () => {
        this.state.list = this.props.clueListFromFjResult.list
        this.setState({ loading: false })
      }))
      return
    case 'recordRy':
      value.baseid = props.id || 5
      this.setState({ loading: true })
      this.props.dispatch(fetchRecordListFromRy(value, () => {
        this.state.list = this.props.clueListFromRyResult.list
        this.setState({ loading: false })
      }))
      return
    case 'recordDw':
      value.dptid = props.id
      this.setState({ loading: true })
      this.props.dispatch(fetchRecordListFromDw(value, () => {
        this.state.list = this.props.clueListFromDwResult.list
        this.setState({ loading: false })
      }))
      return
    case 'recordAj':
      value.caseid = props.id
      this.setState({ loading: true })
      this.props.dispatch(fetchRecordListFromAj(value, () => {
        this.state.list = this.props.clueListFromAjResult.list
        this.setState({ loading: false })
      }))
      return
    default:
      return
    }
  }

  render() {
    return (
      <div>
        <div className="timeChoose-lzr">
          <Row gutter={16}>
            <Col span={8}>
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                onChange={this.onChange}
              />
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={()=>this.searchClue()} loading={this.state.loading}>搜索</Button>
            </Col>
          </Row>
        </div>
        {this.state.list.length > 0 ? this.state.list.map((arr, i) => <ContentCard key={i} dataSource={arr} />) : null}
      </div>
    )
  }
}
