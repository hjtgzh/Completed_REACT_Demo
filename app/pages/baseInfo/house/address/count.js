/**
 * Created by 余金彪 on 2016/12/12.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { fetchAddressStatistics } from 'actions/houseAddress'

const { Column, ColumnGroup } = Table;
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    searchAddressStatisticsList: state.searchAddressStatisticsList,
  })
)

export default class Floor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchAddressStatistics({}, (result) => {
      this.setState({
        list: result.data,
      })
    }))
  }


  render() {
    return (
      <div className="nav-third-nextContent addr-count">
        <Table dataSource={this.state.list} bordered pagination={false}
               scroll={{ y: global.$GLOBALCONFIG.PAGEHEIGHT - 210 }}
        >
          <Column
            title="管辖区划"
            dataIndex="detailname"
            key="detailname"
            width="10%"
          />
          <ColumnGroup title="有坐标的规范地址" width="30%">
            <Column
              title="标准地址"
              dataIndex="bzdzhasloc"
              key="bzdzhasloc"
              width="10%"
            />
            <Column
              title="非标准地址"
              dataIndex="lsdzhasloc"
              key="lsdzhasloc"
              width="10%"
            />
            <Column
              title="历史地址"
              dataIndex="lishidzhasloc"
              key="lishidzhasloc"
              width="10%"
            />
          </ColumnGroup>
          <ColumnGroup title="无坐标的规范地址" width="30">
            <Column
              title="标准地址"
              dataIndex="bzdznoloc"
              key="bzdznoloc"
              width="10%"
            />
            <Column
              title="非标准地址"
              dataIndex="lsdznoloc"
              key="lsdznoloc"
              width="10%"
            />
            <Column
              title="历史地址"
              dataIndex="lishidznoloc"
              key="lishidznoloc"
              width="10%"
            />
          </ColumnGroup>
          <Column
            title="地址总量"
            dataIndex="total"
            key="total"
            width="10%"
          />
        </Table>
      </div>
    )
  }
}
