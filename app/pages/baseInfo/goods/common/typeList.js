/**
 * Deleted by 叶婷婷
 * 无用，系统功能完整后，可删除
 */
//import React, { Component } from 'react'
//import { Table, Row, Col } from 'antd'
//
//
//export default class TypeList extends Component {
//  constructor(props) {
//    super(props)
//    this.state = {
//      address: '鄂尔多斯东胜区纺织街道23号4幢'
//    }
//  }
//  componentDidMount() {
//  }
//
//
//  render() {
//    const _self = this
//    const {
//      columns,
//      dataSource,
//      currentPage,
//      totalCount,
//      pageSize,
//      loading,
//      changePage,
//      changePageSize,
//      scroll,
//    } = this.props
//    const pagination = {
//      current:currentPage,
//      total: totalCount || 1,
//      showSizeChanger: true,
//      pageSize: pageSize || 10,
//      showTotal(count) {
//        return `共 ${count} 条`
//      },
//      onChange:(current)=>{
//        this.props.changePage(current);
//      },
//      onShowSizeChange:(current,pageSize)=>{
//        this.props.changePageSize(current,pageSize);
//      }
//    }
//    return (
//      <div className="detail-content">
//        <Table
//          columns={columns}
//          bordered
//          dataSource={dataSource}
//          pagination={currentPage ? pagination : false}
//          //loading={loading}
//          scroll={scroll}
//        />
//      </div>
//    )
//  }
//}
