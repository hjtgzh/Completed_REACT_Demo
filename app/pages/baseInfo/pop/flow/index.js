import React, { Component } from 'react'
import { connect } from 'react-redux'
import getConfigItems from 'utils/getGformConfigItems'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import {
    fetchFlowList,
} from 'actions/flow'
import './style.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    flowListSearchResult: state.flowListSearchResult,
    amList: state.amList,
  })
)

// 声明组件  并对外输出
export default class flowList extends Component {
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
          name: '张雷',
          sex: '男',
          age: 21,
          cardId: '342425199604036734',
          censusSort: '341523',
          address: '三区79号',
          institutions: '江干分局九堡派出所',
          flowInTime: '20151119',
          recordNum: '330104200800010282',
        },
        {
          id: 2,
          name: '周凤霞',
          sex: '女',
          age: 55,
          cardId: '340823198001145627',
          censusSort: '340823',
          address: '一区72号',
          institutions: '江干分局九堡派出所',
          flowInTime: '20151119',
          recordNum: '330104200800010600',
        },
      ],
    }
    this.pageChange=this.pageChange.bind(this)
    this.pageSizeChange=this.pageSizeChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchFlowList({ ...this.state.searchKey }))
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
    this.props.dispatch(fetchFlowList({ ...this.state.searchKey, currentPage: newPage }))
  }

  pageSizeChange(e, pageSize) {
    this.setState({
      searchKey: {
        ...this.state.searchKey,
        pageSize: pageSize,
        currentPage: 1,
      },
    })
    this.props.dispatch(fetchFlowList({ ...this.state.searchKey, currentPage: 1, pageSize: pageSize }))
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
    if (query.keyword !== '') {
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
    this.props.dispatch(fetchFlowList({ ...params, currentPage: 1 }))
  }

  // 获取统计值
  getStatisticsNum(currentSelected) {

  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
        width: 60,
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: 60,
      },
      {
        title: '性别',
        dataIndex: 'xb',
        key: 'xb',
        width: 60,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 60,
      },
      {
        title: '身份证号码',
        dataIndex: 'idnumber',
        key: 'idnumber',
        width: 200,
      },
      {
        title: '户籍类别',
        dataIndex: 'hksx',
        key: 'hksx',
        width: 90,
      },
      {
        title: '登记地址',
        dataIndex: 'zzdz',
        key: 'zzdz',
        width: 200,
      },
      {
        title: '管辖单位',
        dataIndex: 'pcs',
        key: 'pcs',
        width: 200,
      },
      {
        title: '流口登记时间',
        dataIndex: 'djrq',
        key: 'djrq',
        width: 100,
      },
      {
        title: '档案号',
        dataIndex: 'zlfwdah',
        key: 'zlfwdah',
      },
    ]
  }


  render() {
    const {
      flowListSearchResult,
    } = this.props
    // 暂时用假数据来模拟列表项
    return (
      <Panel>
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="pop_flow"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={flowListSearchResult.totalCount}
        />
        <div className="list-tab maTop-jxy">
          <TableList
            columns={this.columns()}
            dataSource={flowListSearchResult.list}
            currentPage={this.state.searchKey.currentPage}
            pageSize={this.state.searchKey.pageSize}
            loading={flowListSearchResult.loading}
            scroll={{ x: true, y: true }}
            onChange={this.pageChange}
            onShowSizeChange={this.pageSizeChange}
            totalCount={flowListSearchResult.totalCount}
          />
        </div>
      </Panel>
    )
  }
}
