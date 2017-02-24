/**
 * Created by 余金彪 on 2016/12/27.现住地址
 *  editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import TypeList from '../../../../house/common/typeList'
@connect(
  (state, props) => ({
    config: state.config,
    amList: state.amList,
  })
)
export default class liveAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {}

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '现住地址',
        dataIndex: 'xzdz',
        key: 'xzdz',
      },
      {
        title: '人员标签',
        dataIndex: 'gkzdry',
        key: 'gkzdry',
        render: function (text, record) {
          return (
            <span>{record.base.gkzdry}</span>
          )
        },
      },
      {
        title: '居住状态',
        dataIndex: 'hjlb',
        key: 'hjlb',
      },
      {
        title: '最近访查',
        dataIndex: 'fcsj',
        key: 'fcsj',
      },
      {
        title: '录入人',
        dataIndex: 'cjr',
        key: 'cjr',
      },
      {
        title: '录入单位',
        dataIndex: 'gxdwName',
        key: 'gxdwName',
        render: function (text, record) {
          return (
            <span>{record.base.gxdwName}</span>
          )
        },
      },
      {
        title: '录入时间',
        dataIndex: 'cjsj',
        key: 'cjsj',
      },
      {
        title: '联系电话',
        key: 'dhhm',
        render: function (text, record) {
          return (
            <span>{record.base.dhhm}</span>
          )
        },
      },
    ]
  }

  render() {
    return (
      <TypeList
        columns={this.columns()}
        dataSource={this.props.addressDetail}
      />
    )
  }
}