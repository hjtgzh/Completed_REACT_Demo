/**
 * Created by 黄建停---依靠力量
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import getConfigItems from 'utils/getGformConfigItems'
// 引入请求的模块
import { fetchRelyList } from 'actions/rely'
import TypeList from './typeList'
import 'style/rely.less'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      relyListSearchResult: state.relyListSearchResult,
      amList: state.amList,
    })
)

// 声明组件  并对外输
export default class relyList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    // const _self = this
    this.state = {
      currentPage: 1,
      pageSize: 10,
      activeTab: 'list',
      list: [],
    }
    this.requsetBody = {
      pageNo: 1,
      pageSize: 10,
    }
    this.initReqNum = {
      xzqhid: '',
      gxdwid: sessionStorage.getItem('divisionid'),
    }
    this.gFormSubmit = this.gFormSubmit.bind(this)
  }

  componentDidMount() {
    getConfigItems(this, {
      GXDW: sessionStorage.getItem('divisionid'),
      ZZMM: '',
      GZLB: '',
      YKLB: '',
      // RYXB:'',
    })
  }

  // 筛选条件组件调用
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwid',
        needNum: true,
        needMulti: false,
        needArrowIcon: true,
      },
      {
        sort: 'singleSelect',
        label: '政治面貌',
        items: config.ZZMM,
        key: 'zzmm',
        numResKey: 'zzmm',
        numReqKey: 'zzmm',
        needNum: true,
        needMulti: false,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '关注类别',
        items: config.GKZDRY,
        key: 'gzlb',
        numResKey: 'rylb',
        numReqKey: 'gzlbids',
        needNum: true,
        needMulti: false,
        needArrowIcon: true,
      },
      {
        sort: 'singleSelect',
        label: '依靠类别',
        items: config.YKLB,
        key: 'yklb',
        numResKey: 'yklb',
        numReqKey: 'yklb',
        needNum: true,
        needArrowIcon: false,
      },
      {
        sort: 'singleSelect',
        label: '人员性别',
        items: [
          { id: 1, name: '男' },
          { id: 2, name: '女' },
          { id: 3, name: '其他' },
        ],
        key: 'ryxb',
        numResKey: 'ryxb',
        numReqKey: 'ryxb',
        needNum: true,
        needArrowIcon: false,
      },
    ]
  }

  //gForm查询提交
  gFormSubmit(query) {
    // console.log(query)
    this.setState({ currentPage: query.page, pageSize: query.pageSize })
    const temp = {}
    temp.keyword = query.keyword
    temp.gxdwid = query.gxdw.id || sessionStorage.getItem('divisionid')
    temp.zzmm = query.zzmm.id
    temp.gzlb = query.gzlb.id
    temp.yklb = query.yklb.id
    temp.ryxb = query.ryxb.id
    temp.pageNo = query.page
    temp.pageSize = query.pageSize
    this.requsetBody = { ...this.requsetBody, ...temp }
    this.props.dispatch(fetchRelyList(this.requsetBody))
  }
  
  render() {
    const {
            relyListSearchResult,
          } = this.props
    return (
      <Panel>
        <div className="typeListWrap">
          <Gform
            gFormConfig={this.gFormConfig()}
            gFormSubmit={this.gFormSubmit}
            nums={{}}
            loading={relyListSearchResult.loading || this.state._requestLoading}
            // getStatisticsNum={this.getStatisticsNum}
            cacheKey="relyList"
            totalCount={relyListSearchResult.totalCount || 0}
            initParam={this.initReqNum}
            page={this.state.currentPage}
            pageSize={this.state.pageSize}
          />
        </div>
        <TypeList />
      </Panel>
    )
  }
}
