/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { message, Popconfirm } from 'antd'
import TableList from 'components/tableList/tableList'
import { fetchRegisterOnceList, fetchRegisterOnceDeletePop } from 'actions/houseVisitPop'
import '../popInf.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    registerOnceListSearchResult: state.registerOnceListSearchResult,
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
    this.onDeleteHandle = this.onDeleteHandle.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchRegisterOnceList({ fjId: this.state.roomId }))
  }

  columns() {
    const _self = this
    return [
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: '10%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>
              <span className="left">
                {text}
              </span>
              <Link className="right" to={`/pop$/visitDetail/${record.id}`}>详情</Link>
            </span>
          )
        },
      },
      {
        title: '性别',
        dataIndex: 'xb',
        key: 'xb',
        width: '5%',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: '5%',
      },
      {
        title: '身份证号码（护照号码）',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width: '15%',
      },
      {
        title: '户籍（国籍）',
        dataIndex: 'gj',
        key: 'gj',
        width: '10%',
      },
      {
        title: '人员状态',
        dataIndex: 'czrklx',
        key: 'czrklx',
        width: '15%',
      },
      {
        title: '到期日期',
        dataIndex: 'dqrq',
        key: 'dqrq',
        width: '10%',
      },
      {
        title: '登记日期',
        dataIndex: 'djrq',
        key: 'djrq',
        width: '10%',
      },
      {
        title: '操作',
        dataIndex: 'fangcha',
        key: 'fangcha',
        width: '5%',
        render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" placement="left" onConfirm={()=>_self.onDeleteHandle(record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        },
      },
    ]
  }

  // 境外人员表格展示项的配置
  foreignColumns() {
    const self = this
    return [
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: '10%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>
              <span className="left">
                {text}
              </span>
              <Link className="right" to={`/pop$/visitDetail/${record.id}`}>详情</Link>
            </span>
          )
        },
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
        width: '15%',
      },
      {
        title: '户籍（国籍）',
        dataIndex: 'gj',
        key: 'gj',
        width: '10%',
      },
      {
        title: '人员类别',
        dataIndex: 'czrklx',
        key: 'czrklx',
        width: '15%',
      },
      {
        title: '登记日期',
        dataIndex: 'djrq',
        key: 'djrq',
        width: '10%',
      },
      {
        title: '离开日期',
        dataIndex: 'dqrq',
        key: 'dqrq',
        width: '10%',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '5%',
        render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" placement="left" onConfirm={()=>self.onDeleteHandle(record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        },
      },
    ]
  }

  // 删除人员
  onDeleteHandle(id) {
    this.props.dispatch(fetchRegisterOnceDeletePop({ scbz: 1, id: id }, () => {
      message.success('删除成功', 3)
      this.props.dispatch(fetchRegisterOnceList({ fjId: this.state.roomId }))
    }))
  }

  render() {
    const {
      registerOnceListSearchResult,
    } = this.props
    const changkouCount = registerOnceListSearchResult.changkou.length
    const zankouCount = registerOnceListSearchResult.zankou.length
    const jingwaiCount = registerOnceListSearchResult.jingwai.length
    const loading = registerOnceListSearchResult.loading ? true : registerOnceListSearchResult.loading;
    return (
      <div className="nav-third-nextContent">
        <div className="top_detail_ytt">
          <div className="list_detail_ytt">
            <p>常住人口：<i>{changkouCount}</i>人， 境外人员：<i>{zankouCount}</i>人， 暂住人口:<i>{jingwaiCount}</i>人</p>
          </div>
          <div className="table_detail_ytt">
            <div className="table-max-height">
              <p>常住人口：</p>
              <TableList
                columns={this.columns()}
                dataSource={registerOnceListSearchResult.changkou}
                loading={loading}
                scroll={{ y: true }}
              />
            </div>
            {
              registerOnceListSearchResult.zankou.length > 0 ?
              (
                <div className="table-max-height">
                  <p>暂住人口：</p>
                  <TableList
                    columns={this.columns()}
                    dataSource={registerOnceListSearchResult.zankou}
                    loading={loading}
                    scroll={{ y: true }}
                  />
                </div>
              )
              : null
            }
            {
              registerOnceListSearchResult.jingwai.length > 0 ?
              (
                <div className="foreign-tbale-zmy">
                  <p>境外人员：</p>
                  <TableList
                    columns={this.foreignColumns()}
                    dataSource={registerOnceListSearchResult.jingwai}
                    loading={loading}
                    scroll={{ y: true }}
                  />
                </div>
              )
              : null
            }
          </div>
        </div>
        <div className="ability-button"></div>
      </div>
    )
  }
}
