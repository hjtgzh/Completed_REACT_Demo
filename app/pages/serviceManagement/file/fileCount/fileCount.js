/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import Gform from 'components/gForm'
import {
  fetchCountList,
} from 'actions/file'
import TypeList from '../../../baseInfo/house/common/typeList'

const gxdwid = sessionStorage.getItem('divisionid')
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fileCountSearchResult: state.fileCountSearchResult,
  })
)

// 声明组件  并对外输出
export default class fileManagement extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      counts: '',
    }
    this.params = {
      gxdwid: gxdwid,
    }
    this.exportExcel = this.exportExcel.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {}

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: '5%',
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '管辖单位名称',
        dataIndex: 'gxdwmc',
        key: 'gxdwmc',
        width: '15%',
      },
      {
        title: '绑定房间总数',
        dataIndex: 'roomzs',
        key: 'roomzs',
        width: '10%',
      }, {
        title: '绑定地址总数',
        dataIndex: 'buildingzs',
        key: 'buildingzs',
        width: '10%',
      }, {
        title: '总数',
        dataIndex: 'zs',
        key: 'zs',
        width: '10%',
      }, {
        title: '绑定率',
        dataIndex: 'bdl',
        key: 'bdl',
        width: '10%',
      },
    ]
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

  // 筛选条件处理及搜索
  gFormSubmit(query) {
    const _self = this
    if (query.gxdw.length !== 0) {
      const fjdmIndex = query.gxdw.length - 1
      this.params.gxdwid = query.gxdw[fjdmIndex].id
    } else {
      this.params.gxdwid = gxdwid
    }
    this.props.dispatch(fetchCountList(_self.params, (reply) => {
      _self.setState({
        counts: reply.data.length,
      })
    }))
  }

  // 点击导出
  exportExcel() {
    const token = sessionStorage.getItem('token')
    const urlBase = this.props.config.$ctx// 当前IP
    if (this.state.counts > 5000) {
      message.info('导出数据不能超出5000条')
      return
    }
    const exportGxdwid = this.params.gxdwid
    window.open(`${urlBase}/jcjw/dahTjExpExcel.json?gxdwid=${exportGxdwid}&token=${token}`)
  }
  render() {
    const {
      fileCountSearchResult,
      } = this.props
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          totalCount={this.state.counts}
          loading={false}
          cacheKey="fileCount"
        />

        <div className="list-tab">
          <TypeList
            columns={this.columns()}
            dataSource={fileCountSearchResult.data}
            scroll={{ y: true }}
            pagination={false}
          />
        </div>

        <div className="ability-button">
          <Button onClick={this.exportExcel}>导出</Button>
        </div>
      </div>
    )
  }
}
