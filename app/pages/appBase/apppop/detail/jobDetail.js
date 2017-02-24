/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import getConfigItems from 'utils/getGformConfigItems'
import { updateTabList } from 'actions/tabList'
import { fetchPersonalDetail } from 'actions/appBaseApppop'
import moment from 'moment'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    personalHistorySearchResult: state.personalHistorySearchResult,
  })
)

// 声明组件  并对外输出
export default class jobDetail extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      searchKey: {
        usercode: props.params.jobId,
        currentPage: 1,
        pageSize: 10,
      },
    }
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.pageChange=this.pageChange.bind(this)
    this.pageSizeChange=this.pageSizeChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchPersonalDetail({ ...this.state.searchKey }))
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '个人统计详情',
        key: `/apppop$/jobDetail/${this.props.params.jobId}`,
      }))
    }
    getConfigItems(this, {
      Gxdw: sessionStorage.getItem('divisionid'),
    })
  }
// 组件接收新的东西
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.jobId != this.props.params.jobId) {
      this.props.dispatch(fetchPersonalDetail({ ...this.state.searchKey, usercode: nextProps.params.jobId }))
      if (this.props.params) {
        // 若非嵌套，则执行
        this.props.dispatch(updateTabList({
          title: '个人统计详情',
          key: `/apppop$/jobDetail/${nextProps.params.jobId}`,
        }))
      }
    }
  }
  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: 40,
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '警员编号',
        dataIndex: 'usercode',
        key: 'usercode',
        width: 60,
      },
      {
        title: '警员姓名',
        dataIndex: 'czr',
        key: 'czr',
        width: 60,
      },
      {
        title: '详细内容',
        dataIndex: 'opcontent',
        key: 'opcontent',
        width: 200,
      },
      {
        title: '操作时间',
        dataIndex: 'czsj',
        key: 'czsj',
        width: 160,
        render: function (text, record, index) {
          return moment(text).format('YYYY-MM-DD hh:mm:ss')
        },
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width: 200,
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
    this.props.dispatch(fetchPersonalDetail({ ...this.state.searchKey, currentPage: newPage }))
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
    this.props.dispatch(fetchPersonalDetail({ ...this.state.searchKey, currentPage: 1, pageSize: pageSize }))
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
      delete params['gxdwid'];
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
    this.props.dispatch(fetchPersonalDetail({ ...params, currentPage: 1 }))
  }

  render() {
    const {
      personalHistorySearchResult,
    } = this.props
    // 暂时用假数据来模拟列表项
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="pop_local"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
        />
        <TableList
          columns={this.columns()}
          dataSource={personalHistorySearchResult.list}
          currentPage={this.state.searchKey.currentPage}
          pageSize={this.state.searchKey.pageSize}
          scroll={{ y: true }}
          loading={personalHistorySearchResult.loading}
          onChange={this.pageChange}
          onShowSizeChange={this.pageSizeChange}
          totalCount={personalHistorySearchResult.totalCount}
        />
      </div>
    )
  }
}
