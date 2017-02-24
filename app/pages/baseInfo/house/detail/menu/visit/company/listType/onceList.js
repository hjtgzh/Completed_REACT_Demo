/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import {  Popconfirm } from 'antd'
import { Link } from 'react-router'
import TableList from 'components/tableList/tableList'

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // debugger
  }

  render() {
    const {
      dataSource,
      loading,
      onDelete,
      } = this.props

    // 表格展示项的配置
    const columns = [
      {
        title: '序号',
        key: 'index',
        width:50,
        render: (text, record, index) => <span>{index+1}</span>,
      }, {
        title: '单位名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
        render: (text, record, index) => (
          <p>
            <span className="left">{text}</span>
            <Link className="right" to={`/departmentDetail/${record.id}`}>详情</Link>
          </p>
        ),
      }, {
        title: '负责人姓名',
        dataIndex: 'frdb',
        key: 'frdb',
        width:"25%",
      }, {
        title: '联系电话',
        dataIndex: 'frlxdh',
        key: 'frlxdh',
        width:"25%",
      }, {
        title: '访查日期',
        dataIndex: 'fcsj',
        key: 'fcsj',
        width:"25%",
      }, {
        title: '操作',
        key: 'operate',
        render: (text, record, index) => (
          <span className="a-jxy">
            <Popconfirm title="删除?" placement="left" onConfirm={()=>onDelete(record.dwbm)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ]
    return (
      <TableList
        columns={columns}
        dataSource={dataSource}
        scroll={{ y:true }}
        loading={loading}
      />
    )
  }
}
