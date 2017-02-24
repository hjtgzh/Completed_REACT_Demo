/**
 * Created by Administrator on 2016/12/27.三实人口地图
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Icon, Pagination } from 'antd'
import { fetchPeopleCheckList, insertVisitablePeople, insertForeigner, insertAddressForOne } from 'actions/people'
import TypeMap from '../../house/common/typeMap'
const TabPane = Tabs.TabPane;
@connect(
  (state, props) => ({
    config: state.config,
    peopleCheckSearchQuery: state.peopleCheckSearchQuery,
    peopleCheckSearchResult: state.peopleCheckSearchResult,
  })
)
export default class visitTypeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }


  render() {
    const {
      peopleCheckSearchQuery,
      peopleCheckSearchResult,
    } = this.props

    return (
      <TypeMap
        houseId={1}
        dataSource={peopleCheckSearchResult.list}
        currentPage={peopleCheckSearchResult.currentPage}
        loading={peopleCheckSearchResult.loading}
        pageSize={peopleCheckSearchResult.pageSize}
        totalCount={peopleCheckSearchResult.totalCount}
      />
    )
  }
}
