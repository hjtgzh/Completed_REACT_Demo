import React, { Component } from 'react'
import { Table, Row, Col } from 'antd'


export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢'
    }
  }
  componentDidMount() {
  }


  render() {
    const _self = this
    const {
      columns,
      dataSource,
      currentPage,
      totalCount,
      loading,
      scroll,
    } = this.props
    const pagination = {
      current:currentPage,
      total: totalCount || 1,
      showSizeChanger: true,
      pageSize: 10,
      showTotal(count) {
        return `共 ${count} 条`
      },
    }
    return (
      <div className="detail-content">
        <Table
          columns={columns}
          bordered
          dataSource={dataSource}
          pagination={currentPage ? pagination : false}
          //loading={loading}
          scroll={scroll}
        />
      </div>
    )
  }
}
