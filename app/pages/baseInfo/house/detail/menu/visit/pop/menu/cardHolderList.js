/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableList from 'components/tableList/tableList'
import { fetchCardHolderList } from 'actions/houseVisitPop'
import '../popInf.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      cardHolderListSearchResult: state.cardHolderListSearchResult,
    })
)

// 声明组件  并对外输出
export default class registerOnceList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      list: [],
      roomId: this.props.roomId || this.props.param.roomId || 1,
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchCardHolderList({ fjId: this.state.roomId }))
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: '8%',
      },
      {
        title: '性别',
        dataIndex: 'xb',
        key: 'xb',
        width: '5%',
      },
      {
        title: '出生日期',
        dataIndex: 'csrq',
        key: 'csrq',
        width: '10%',
      },
      {
        title: '证件号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width: '10%',
      },
      {
        title: '户籍地址',
        dataIndex: 'hjdz',
        key: 'hjdz',
        width: '10%',
      },
      {
        title: '证件类型',
        dataIndex: 'zjlx',
        key: 'zjlx',
        width: '7%',
      },
      {
        title: '联系电话',
        dataIndex: 'lxdh',
        key: 'lxdh',
        width: '8%',
      },
      {
        title: '人员类型',
        dataIndex: 'rylx',
        key: 'rylx',
        width: '7%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>
              {text == 1 ? '常住人口' : (text == 2 ? '暂住人口' : '境外人口')}
            </span>
          )
        },
      },
      {
        title: '起租时间',
        dataIndex: 'qzsj',
        key: 'qzsj',
        width: '8%',
      },
      {
        title: '到期时间',
        dataIndex: 'dqsj',
        key: 'dqsj',
        width: '7%',
      },
      {
        title: '登记人姓名',
        dataIndex: 'djrxm',
        key: 'djrxm',
        width: '8%',
      },
      {
        title: '上报时间',
        dataIndex: 'sbjssj',
        key: 'sbjssj',
        width: '7%',
      },
      {
        title: '操作',
        dataIndex: 'opration',
        key: 'opration',
        width: '5%',
      },
    ]
  }

  render() {
    const {
      cardHolderListSearchResult,
    } = this.props

    return (
      <div className="nav-third-nextContent">
        <TableList
          columns={this.columns()}
          dataSource={cardHolderListSearchResult.list}
          loading={cardHolderListSearchResult.loading}
          scroll={{ y: true }}
        />
      </div>
    )
  }
}
