/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableList from 'components/tableList/tableList'
import { fetchSysRegisterList } from 'actions/houseVisitPop'
import '../popInf.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    sysRegisterListSearchResult: state.sysRegisterListSearchResult,
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
    this.props.dispatch(fetchSysRegisterList({ fjId: this.state.roomId }))
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: '15%',
      },
      {
        title: '性别',
        dataIndex: 'xb',
        key: 'xb',
        width: '5%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>
              {text == 1 ? '男' : '女'}
            </span>
          )
        },
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
        dataIndex: 'ryzt',
        key: 'ryzt',
        width: '10%',
      },
      {
        title: '人员类别',
        dataIndex: 'rylb',
        key: 'rylb',
        width: '10%',
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
        title: '访查日期',
        dataIndex: 'fcrq',
        key: 'fcrq',
        width: '10%',
      },
    ]
  }

  render() {
    const {
      sysRegisterListSearchResult,
    } = this.props

    return (
      <div className="nav-third-nextContent">
        <div className="top_detail_ytt">
          <div className="table_detail_ytt">
            <div className="table-max-height">
              <p>常住人口登记系统登记人员：<i>{sysRegisterListSearchResult.czrk.length}</i></p>
              <TableList
                columns={this.columns()}
                dataSource={sysRegisterListSearchResult.czrk}
                loading={sysRegisterListSearchResult.loading}
                scroll={{ y: true }}
              />
            </div>
              {
                sysRegisterListSearchResult.zzrk.length > 0 ?
                (
                  <div className="table-max-height">
                    <p> 流动人口登记系统登记人员：<i>{sysRegisterListSearchResult.zzrk.lengt}</i></p>
                    <TableList
                      columns={this.columns()}
                      dataSource={sysRegisterListSearchResult.zzrk}
                      loading={sysRegisterListSearchResult.loading}
                      scroll={{ y: true }}
                    />
                  </div>
                )
                : null
              }
          </div>
        </div>
      </div>
    )
  }
}
