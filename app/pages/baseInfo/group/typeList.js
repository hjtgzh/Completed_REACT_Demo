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
    // debugger
  }


  render() {
    const _self = this
    const {
            columns,
            dataSource,
            currentPageSize,
            currentPage,
            totalCount,
            loading,
            scroll,
            className,
            pageSize,
            style
        } = this.props
    const pagination = {
      total: totalCount || 1,
      current: currentPage,
      showSizeChanger: true,
      showQuickJumper:true,
      pageSize: 20,
      showTotal(count) {
        return `共 ${count} 条`
      },
      // 页码改变时回调
      onChange(nextPage) {
        const { getNextPageList } = _self.props
        typeof(getNextPageList)==='function'?getNextPageList(nextPage):console.error(`getNextPageList not function`)
      },
      // pageSize改变时回调
      onShowSizeChange(...arg){
        const { getNextPageSizeList } = _self.props
        const currentPage=arg[0]
        const pageSize=arg[1]
        typeof(getNextPageSizeList)==='function'?getNextPageSizeList(pageSize):console.error(`getNextPageSizeList not function`)
      }
    }
    // console.log(this.props.dataSource)
    return (
      <div className="detail-content">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={currentPage ? pagination : false}
          loading={loading}
          scroll={{y:true}}
          bordered={true}
          className={className}
        />
      </div>
    )
  }
}
