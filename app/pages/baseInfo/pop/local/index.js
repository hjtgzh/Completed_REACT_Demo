import React, { Component } from 'react'
import { connect } from 'react-redux'
import getConfigItems from 'utils/getGformConfigItems'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import { fetchLocalList } from 'actions/local'
import './style.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    localListSearchResult: state.localListSearchResult,
  })
)

// 声明组件  并对外输出
export default class localList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      searchKey: {
        currentPage: 1,
        pageSize: 10,
      },
      list: [
        {
          id: 1,
          name: '厉登高',
          sex: '男',
          age: '89',
          cardId: '330102192810200017',
          address: '宿迁市上城区望江街道近江家园五园11幢1203室',
          institutions: '上城分局望江派出所',
          moveInTime: 20070101010101,
          roomNum: 509022109,
        },
      ],
    }
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.getStatisticsNum = this.getStatisticsNum.bind(this)
    this.pageChange=this.pageChange.bind(this)
    this.pageSizeChange=this.pageSizeChange.bind(this)
  }
  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchLocalList({ ...this.state.searchKey }))
    getConfigItems(this, {
      Gxdw: 330100,
    })
  }

  pageChange(newPage) {
    this.setState({
      searchKey: {
        ...this.state.searchKey,
        currentPage: newPage,
      },
    })
    this.props.dispatch(fetchLocalList({ ...this.state.searchKey, currentPage: newPage }))
  }

  pageSizeChange(e, pageSize) {
    this.setState({
      searchKey: {
        ...this.state.searchKey,
        pageSize: pageSize,
        currentPage: 1,
      },
    })
    this.props.dispatch(fetchLocalList({ ...this.state.searchKey, currentPage: 1, pageSize: pageSize }))
  }

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
      },
    ]
  }

  gFormSubmit(query) {
    const params = this.state.searchKey;
    if (query.gxdw.length > 0) {
      params.gxdwid = query.gxdw[query.gxdw.length - 1].id
    } else {
      delete params.gxdwid;
    }
    if (query.keyword != '') {
      params.key = query.keyword
    } else {
      delete params.key;
    }
    this.setState({
      searchKey: {
        ...params,
        currentPage: 1,
      },
    })
    this.props.dispatch(fetchLocalList({ ...params, currentPage: 1 }))
  }

  // 获取统计值
  getStatisticsNum() {

  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: 80,
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: 100,
      },
      {
        title: '性别',
        dataIndex: 'xb',
        key: 'xb',
        width: 100,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 100,
      },
      {
        title: '身份证号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width: 200,
      },
      {
        title: '登记地址',
        dataIndex: 'djdz',
        key: 'djdz',
      },
      {
        title: '管辖单位',
        dataIndex: 'pcs',
        key: 'pcs',
        width: 200,
      },
      {
        title: '户号',
        dataIndex: 'hh',
        key: 'hh',
        width: 150,
      },
    ]
  }


  render() {
    const {
      localListSearchResult,
      } = this.props
    // 暂时用假数据来模拟列表项
    return (
      <Panel>
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="pop_local"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={localListSearchResult.totalCount}
        />
        <div className="list-tab">
          <TableList
            columns={this.columns()}
            dataSource={localListSearchResult.list}
            currentPage={this.state.searchKey.currentPage}
            pageSize={this.state.searchKey.pageSize}
            loading={localListSearchResult.loading}
            scroll={{ x: 100, y: true }}
            onChange={this.pageChange}
            onShowSizeChange={this.pageSizeChange}
            totalCount={localListSearchResult.totalCount}
          />
        </div>
      </Panel>
    )
  }
}
