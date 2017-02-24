/**
 * Created by 黄建停---实有房屋（房间）列表
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, Row, Col } from 'antd'
import TableList from 'components/tableList/tableList'
import {
  // fetchRoomCheckList,
} from 'actions/house'
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    roomCheckSearchResult: state.roomCheckSearchResult,
    amList: state.amList,
  })
)

// 声明组件  并对外输出
export default class houseRoomTypeList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,

    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchRoomCheckList({ currentPage: 1}))
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: 50,
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '建筑物地址',
        dataIndex: 'address',
        key: 'address',
        width: 350,
        render: function (text, record) {
          return (
            <div>
              <Row gutter={16}>
                <Col span={2} style={{ width: '20px' }}>
                  <Icon type="environment-o left" style={{ color:
                    record.fwxz === '未选择' ? '#0f0' : 'gray',
                    }} />
                </Col>
                <Col span={18} className="left addr-ellipsis">
                  <span>{text}</span>
                </Col>
                <Col span={4}>
                  <Link className="right" to={`/house$Detail/${record.id}`}>详情</Link>
                </Col>
              </Row>
            </div>
          )
        },
      },
      {
        title: '户室地址',
        dataIndex: 'hsdz',
        key: 'hsdz',
        width: 150,
        render: function (text, record) {
          return text ? (
            <div>
              <span className="left">{text}</span>
              <Link className="right" to={`/house$/room/${record.id}/${record.roomId}`}>详情</Link>
            </div>
          ) : null
        },
      },
      {
        title: '行政区划',
        dataIndex: 'xzqh',
        key: 'xzqh',
        width: 110,
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdw',
        key: 'gxdw',
        width: 100,
      },
      {
        title: '管辖警员',
        dataIndex: 'gxjy',
        key: 'gxjy',
        width: 80,
      },
      {
        title: '房屋性质',
        dataIndex: 'fwxz',
        key: 'fwxz',
        width: 100,
      },
    ]
  }
  render() {
    const {
      roomCheckSearchResult,
    } = this.props
    // console.log(roomCheckSearchResult)
    // console.log(roomCheckSearchResult.list)
    const roomResultList = []
    if(roomCheckSearchResult){
      if (roomCheckSearchResult.list.length > 0) {
        for (const item of Object.keys(roomCheckSearchResult.list)) {
          let addressType = ''
          if (roomCheckSearchResult.list[item].fjzt === 1) {
            addressType = '自住'
          } else if (roomCheckSearchResult.list[item].fjzt === 2) {
            addressType = '出租'
          } else if (roomCheckSearchResult.list[item].fjzt === 3) {
            addressType = '群组'
          } else if (roomCheckSearchResult.list[item].fjzt === 4) {
            addressType = '空置'
          } else if (roomCheckSearchResult.list[item].fjzt === 5) {
            addressType = '单位'
          } else if (roomCheckSearchResult.list[item].fjzt === 6) {
            addressType = '落户待查'
          } else if (roomCheckSearchResult.list[item].fjzt === 7) {
            addressType = '自住兼出租'
          } else if (roomCheckSearchResult.list[item].fjzt === 8) {
            addressType = '宿舍'
          }
          roomResultList.push({
            id: roomCheckSearchResult.list[item].bldid,
            roomId: roomCheckSearchResult.list[item].id,
            address: roomCheckSearchResult.list[item].bzdz,
            hsdz: `${roomCheckSearchResult.list[item].dyjc}${roomCheckSearchResult.list[item].fjmc}`,
            xzqh: roomCheckSearchResult.list[item].qxmc,
            gxdw: roomCheckSearchResult.list[item].pcsmc,
            gxjy: roomCheckSearchResult.list[item].cjr,
            fwxz: addressType,
          })
        }
      }
    } 
    return (
      <TableList
        columns={this.columns()}
        dataSource={roomResultList}
        loading={roomCheckSearchResult.loading}
        totalCount={roomCheckSearchResult.totalCount}
        scroll={{ x: 1000, y: true }}
        pagination={false}
      />
    )
  }
}
