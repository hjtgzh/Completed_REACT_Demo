/**
 * Created by 余金彪 on 2016/12/27.从业情况
 *  editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TypeList from '../../../../house/common/typeList'
@connect(
  (state, props) => ({
    config: state.config,
    amList: state.amList,
  })
)
export default class employmentSituation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
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
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '单位类别',
        dataIndex: 'jglb',
        key: 'jglb',
      },
      {
        title: '单位名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
      },
      {
        title: '联系方式',
        dataIndex: 'dhhm',
        key: 'dhhm',
      },
      {
        title: '工作部门',
        dataIndex: 'gzbm',
        key: 'gzbm',
      },
      {
        title: '聘任时间',
        dataIndex: 'prsj',
        key: 'prsj',
      },
      {
        title: '解聘时间',
        dataIndex: 'jpsj',
        key: 'jpsj',
      },
      {
        title: '录入单位',
        dataIndex: 'pcsmc',
        key: 'pcsmc',
      }
    ]
  }

  render() {
    return (
      <TypeList
        columns={this.columns()}
        dataSource={this.props.popDetail}
      />
    )
  }
}
