/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import getConfigItems from 'utils/getGformConfigItems'
import {
    fetchUnitList,
} from 'actions/appBaseApppop'
import './style.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    unitListSearchResult: state.unitListSearchResult,
  })
)

// 声明组件  并对外输出
export default class houseCheckList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      searchKey: {
        currentPage: 1,
        pageSize: 10,
      },
      activeTab: 'list',
    }
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.export=this.export.bind(this)
    this.pageChange=this.pageChange.bind(this)
    this.pageSizeChange=this.pageSizeChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchUnitList({ ...this.state.searchKey }))
    getConfigItems(this, {
      Gxdw: sessionStorage.getItem('divisionid'),
    })
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: 50,
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwname',
        key: 'gxdwname',
        width: 60,
      },
      {
        title: '地址新增',
        dataIndex: 'dzxz',
        key: 'dzxz',
        width: 60,
      },
      {
        title: '地址修改',
        dataIndex: 'dzxg',
        key: 'dzxg',
        width: 60,
      },
      {
        title: '地址删除',
        dataIndex: 'dzsc',
        key: 'dzsc',
        width: 60,
      },
      {
        title: '人员新增',
        dataIndex: 'xzry',
        key: 'xzry',
        width: 60,
      },
      {
        title: '人员修改',
        dataIndex: 'xgryxx',
        key: 'xgryxx',
        width: 60,
      },
      {
        title: '人员删除',
        dataIndex: 'scry',
        key: 'scry',
        width: 60,
      },
      {
        title: '单位新增',
        dataIndex: 'xzdw',
        key: 'xzdw',
        width: 60,
      },
      {
        title: '单位删除',
        dataIndex: 'scdw',
        key: 'scdw',
        width: 60,
      },
      {
        title: '线索采集',
        dataIndex: 'xscj',
        key: 'xscj',
        width: 60,
      },
      {
        title: '从业人员新增',
        dataIndex: 'addcyry',
        key: 'addcyry',
        width: 70,
      },
      {
        title: '从业人员删除',
        dataIndex: 'delcyry',
        key: 'delcyry',
        width: 70,
      },
      {
        title: '访查次数',
        dataIndex: 'fccs',
        key: 'fccs',
        width: 60,
      },
    ]
  }

  // 页数改变
  pageChange(newPage) {
    this.setState({
      searchKey: {
        ...this.state.searchKey,
        currentPage: newPage,
      },
    })
    // this只想改变需要bind一下
    this.props.dispatch(fetchUnitList({ ...this.state.searchKey, currentPage: newPage }))
  }

  // 页大小改变
  pageSizeChange(e, pageSize) {
    this.setState({
      searchKey: {
        ...this.state.searchKey,
        pageSize: pageSize,
        currentPage: 1,
      },
    })
    this.props.dispatch(fetchUnitList({ ...this.state.searchKey, currentPage: 1, pageSize: pageSize }))
  }

  // gForm配置
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.Gxdw,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwids',
      }, {
        sort: 'rangePicker',
        label: '时间',
        key: ['starttime', 'endtime'],
        numReqKey: ['starttime', 'endtime'],
        format: '',
      },
    ]
  }

  // gForm搜索提交
  gFormSubmit(query) {
    const params = this.state.searchKey;
    if (query.gxdw.length > 0) {
      params.gxdwid = query.gxdw[query.gxdw.length - 1].id
    } else {
      params.gxdwid = sessionStorage.getItem('divisionid')
      // delete params["gxdwid"];
    }
    if (query.keyword != '') {
      params.keyword = query.keyword
    } else {
      delete params['keyword'];
    }
    if (query.starttime.dateString) {
      params.starttime = query.starttime.dateString
      params.endtime = query.endtime.dateString
    } else {
      delete params['starttime'];
      delete params['endtime'];
    }
    this.setState({
      searchKey: {
        ...params,
        currentPage: 1,
      },
    })
    this.props.dispatch(fetchUnitList({ ...params, currentPage: 1 }))
  }

  // 导出
  export() {
    if (this.props.unitListSearchResult.totalCount > 5000) {
      message.info('当前数据大于5000条！');
      return;
    }
    const keys = this.state.searchKey.gxdwid || '';
    const token = sessionStorage.getItem('token')
    window.open(`${this.props.config.$ctx}/jcjw/sys/logStatistics/outputUnitStat.json?gxdwid=${keys}&token=${token}`)
  }

  render() {
    const {
      unitListSearchResult,
    } = this.props
    // 暂时用假数据来模拟列表项
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="apppop_unitCount"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={unitListSearchResult.totalCount}
        />
        <TableList
          columns={this.columns()}
          dataSource={unitListSearchResult.list}
          currentPage={this.state.searchKey.currentPage}
          pageSize={this.state.searchKey.pageSize}
          scroll={{ y: true }}
          loading={unitListSearchResult.loading}
          onChange={this.pageChange}
          onShowSizeChange={this.pageSizeChange}
          totalCount={unitListSearchResult.totalCount}
        />
        <div className="ability-button">
          <Button onClick={this.export}>导出</Button>
        </div>
      </div>
    )
  }
}
