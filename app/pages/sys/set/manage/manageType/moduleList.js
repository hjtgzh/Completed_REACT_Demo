/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Table, Row, Popconfirm, Col } from 'antd'

export default class ModuleList extends Component {
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
      onModify,
      scroll,
      onAddNode,
      } = this.props
    const columns = [
      {
        title: '功能',
        dataIndex: 'name',
        key: 'name',
        render: function (text, record, index) {
          return (
            <span>{text}</span>
          )
        },
      },
      {
        title: '操作',
        width: 170,
        key: 'operation',
        render: function (text, record, index) {
          if (text.children && text.children.length) {
            return (
              <span className="a-jxy">
                <a onClick={()=>onAddNode(record.id)}>新增</a>
                <span className="ant-divider" />
                <a onClick={()=>onModify(record.id, record.parentid)}>修改</a>
              </span>
            ) }
          return (
            <span className="a-jxy">
              <a onClick={()=>onAddNode(record.id)}>新增</a>
              <span className="ant-divider" />
              <a onClick={()=>onModify(record.id, record.parentid)}>修改</a>
              <span className="ant-divider" />
              <Popconfirm title="删除?" onConfirm={()=>onDelete(record.id)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
      {
        title: '状态',
        width: 80,
      },
    ]

    return (
      <div className="detail-content tree-jxy">
        <Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
              <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                scroll={scroll}
                pagination={false}
                bordered
                rowKey="id"
              />
            </Col>
          }
        </Row>
      </div>
    )
  }
}
