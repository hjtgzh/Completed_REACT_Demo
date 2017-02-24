/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import {
  fetchCountList,
} from 'actions/declare'

const gxdwid = sessionStorage.getItem('divisionid')

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    declareCountSearchResult: state.declareCountSearchResult,
  })
)

// 声明组件  并对外输出
export default class declareCount extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      laoding: true,
      totalCount: '',
    }
    this.params = {
      gxdwdm: gxdwid,
    }
    this.exportExcel = this.exportExcel.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)
  }

  // 获取数据
  getData() {
    this.props.dispatch(fetchCountList(this.params, (reply) => {
      this.setState({ loading: false, totalCount: reply.data.length })
    }))
  }

  // 组件已经加载到dom中
  componentDidMount() {
  }

// 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: 80,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '单位',
        dataIndex: 'gxdwname',
        key: 'gxdwname',
        width: 100,
      },
      {
        title: '申报总量',
        dataIndex: 'count',
        key: 'count',
        width: 100,
      },
      {
        title: '申报类型',
        children: [
          {
            title: '申报登记',
            dataIndex: 'sbdj',
            key: 'sbdj',
            width: 100,
          },
          {
            title: '申报注销',
            dataIndex: 'sbzx',
            key: 'sbzx',
            width: 100,
          },
        ],
      },
      {
        title: '未处理',
        children: [
          {
            title: '即将到期',
            dataIndex: 'wcl_jjdqcount',
            key: 'wcl_jjdqcount',
            width: 100,
          },
          {
            title: '人户不一致',
            dataIndex: 'wcl_rzhbzcount',
            key: 'wcl_rzhbzcount',
            width: 120,
          },
          {
            title: '未登记',
            dataIndex: 'wcl_wdjcount',
            key: 'wcl_wdjcount',
            width: 100,
          },
          {
            title: '已登记',
            dataIndex: 'wcl_ydjcount',
            key: 'wcl_ydjcount',
            width: 100,
          },
          {
            title: '已过期',
            dataIndex: 'wcl_ygqcount',
            key: 'wcl_ygqcount',
            width: 100,
          },
          {
            title: '其他',
            dataIndex: 'wcl_qtcount',
            key: 'wcl_qtcount',
            width: 100,
          },
          {
            title: '小计',
            dataIndex: 'wcl_xj',
            key: 'wcl_xj',
            width: 100,
          },
        ],
      },
      {
        title: '已处理',
        children: [
          {
            title: '已登记',
            dataIndex: 'ycl_ydjcount',
            key: 'ycl_ydjcount',
            width: 100,
          },
          {
            title: '已核实',
            dataIndex: 'ycl_yhscount',
            key: 'ycl_yhscount',
            width: 100,
          },
          {
            title: '已签证',
            dataIndex: 'ycl_yqzcount',
            key: 'ycl_yqzcount',
            width: 100,
          },
          {
            title: '已注销',
            dataIndex: 'ycl_yzxcount',
            key: 'ycl_yzxcount',
            width: 100,
          },
          {
            title: '已离开',
            dataIndex: 'ycl_ylkcount',
            key: 'ycl_ylkcount',
            width: 100,
          },
          {
            title: '信息错误',
            dataIndex: 'ycl_xxcwcount',
            key: 'ycl_xxcwcount',
            width: 100,
          },
          {
            title: '小计',
            dataIndex: 'ycl_xj ',
            key: 'ycl_xj ',
            width: 100,
          },

        ],

      },
    ]
  }

  componentWillMount() {
  }

  // 头部gForm配置
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
        needNum: false,
      },
    ]
  }

  // 筛选条件搜索
  gFormSubmit(query) {
    if (query.gxdw.length !== 0) {
      const fjdmIndex = query.gxdw.length - 1
      this.params.gxdwdm = query.gxdw[fjdmIndex].id
    } else {
      this.params.gxdwdm = gxdwid
    }
    this.getData()
  }

  // 点击导出
  exportExcel() {
    const urlBase = this.props.config.$ctx// 当前IP
    const token = sessionStorage.getItem('token')
    const gxdwdm = this.params.gxdwdm
    window.open(`${urlBase}/jcjw/shsb/exportShsbTongJi.json?gxdwdm =${gxdwdm}&token=${token}`)
  }

  render() {
    const {
      declareCountSearchResult,
      } = this.props
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          totalCount={this.state.totalCount}
          loading={false}
          cacheKey="fileCounts"
        />
        <TableList
          columns={this.columns()}
          dataSource={declareCountSearchResult.data}
          scroll={{ x: 1000, y: true }}
          loading={this.state.loading}
        />
        <div className="ability-button">
          <Button type="button" onClick={this.exportExcel}>导出</Button>
        </div>
      </div>
    )
  }
}

