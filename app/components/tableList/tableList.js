/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { Table, Pagination } from 'antd'

export default class TableList extends Component {
  /* constructor(props) {
   super(props)
   }*/
  componentDidMount() {}
  render() {
    const {
      columns,
      dataSource,
      loading,
      scroll,
      currentPage,
      pageSize,
      totalCount,
      onShowSizeChange,
      onChange,
      } = this.props
    return (
      <div className="detail-content">
        <Table
          columns={columns}
          bordered
          dataSource={dataSource}
          pagination={false}
          loading={loading}
          scroll={scroll}
        />
        { currentPage ?
          <Pagination
            total={totalCount}
            showSizeChanger // 是否可以改变pageSize
            showQuickJumper={false}// 是否可以快速跳转某一页
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            showTotal={(totalCount) => `共 ${totalCount} 条`}
            current={currentPage || 1}
            pageSize={pageSize || 10}
          /> : null
        }
      </div>
    )
  }
}
