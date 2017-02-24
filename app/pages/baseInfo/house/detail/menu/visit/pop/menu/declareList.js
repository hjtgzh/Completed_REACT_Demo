/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import TableList from 'components/tableList/tableList'
import { fetchDeclareList, fetchHouseRelatedHome } from 'actions/houseVisitPop'
import '../popInf.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      declareListSearchResult: state.declareListSearchResult,
    })
)

// 声明组件  并对外输出
export default class registerOnceList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      idList: [],
      roomId: this.props.roomId || this.props.param.roomId || 1,
    }
    this.handleRelated = this.handleRelated.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchDeclareList({ fjId: this.state.roomId }, (reply) => {
      const idList = []
      reply.data.sbdj.map((item) => {
        idList.push(item.id)
      })
      this.setState({
        idList: idList,
      })
    }))
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '申报姓名',
        dataIndex: 'czrxm',
        key: 'czrxm',
        width: '10%',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: '5%',
      },
      {
        title: '身份证号码（护照号码）',
        dataIndex: 'czrsfz',
        key: 'czrsfz',
        width: '15%',
      },
      {
        title: '申报电话',
        dataIndex: 'czrsj',
        key: 'czrsj',
        width: '10%',
      },
      {
        title: '申报日期',
        dataIndex: 'sbsjLabel',
        key: 'sbsjLabel',
        width: '10%',
      },
      {
        title: '申报状态',
        dataIndex: 'sbzt',
        key: 'sbzt',
        width: '7%',
      },
      {
        title: '当前状态',
        dataIndex: 'zt',
        key: 'zt',
        width: '8%',
      },
      {
        title: '房东姓名',
        dataIndex: 'landlordname',
        key: 'landlordname',
        width: '10%',
      },
      {
        title: '房东手机号',
        dataIndex: 'landlordphone',
        key: 'landlordphone',
        width: '10%',
      },
      {
        title: '在逃人员',
        dataIndex: 'ztry',
        key: 'ztry',
        width: '10%',
      },
      {
        title: '操作',
        dataIndex: 'opration',
        key: 'opration',
        width: '5%',
      },
    ]
  }

  // 批量关联入户
  handleRelated() {
    if (this.state.idList.length == 0) {
      message.warning('暂不存在人员信息')
      return
    }
    this.props.dispatch(fetchHouseRelatedHome({ idList: this.state.idList.join(','), fjbm: this.state.roomId }))
  }

  render() {
    const {
      declareListSearchResult,
    } = this.props
    const sbdjLen = declareListSearchResult.sbdj.length;
    const sbzxLen = declareListSearchResult.sbzx.length;
    return (
      <div className="nav-third-nextContent">
        <div className="top_detail_ytt">
          <div className="list_detail_ytt">
            <p>申报在此： <i>{sbdjLen + sbzxLen}</i>人，申报登记<i>{sbdjLen}</i>人，申报注销<i>{sbzxLen}</i>人。</p>
          </div>
          <div className="table_detail_ytt">
            <div className="table-max-height">
              <p>申报登记：</p>
              <TableList
                columns={this.columns()}
                dataSource={declareListSearchResult.sbdj}
                loading={declareListSearchResult.loading}
                scroll={{ y: true }}
              />
            </div>
            {
              declareListSearchResult.sbzx.length > 0 ?
              (
                <div className="table-max-height">
                  <p>申报注销：</p>
                  <TableList
                    columns={this.columns()}
                    dataSource={declareListSearchResult.sbzx}
                    loading={declareListSearchResult.loading}
                    scroll={{ y: true }}
                  />
                </div>
              )
              : null
            }
          </div>
        </div>
        <div className="ability-button">
          <div className="foot-right-button">
            <Button onClick={this.handleRelated}>批量关联入户</Button>
          </div>
        </div>
      </div>
    )
  }
}
