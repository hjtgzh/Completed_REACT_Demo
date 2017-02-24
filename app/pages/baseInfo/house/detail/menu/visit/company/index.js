/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Tabs } from 'antd'
import {
  fetchcompanyNowList,
  fetchcompanyOnceList,
  fetchcompanyAddList,
  fetchcompanyOnceDelete,
  fetchcompanyTransInsert,
} from 'actions/houseVisitCompany'
import NowList from './listType/nowList'
import OnceModule from './listType/onceList'
import AddCompany from './modal/companyAdd'
import TransferCompany from './modal/transfer'
import './jxy.css'

const TabPane = Tabs.TabPane

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    companyNowListResult: state.companyNowListResult,
    companyOnceListResult: state.companyOnceListResult,
    transSearchListResult: state.transSearchListResult,
  })
)

// 声明组件  并对外输出
export default class company extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'now',
      list: [
        {
          id: 1,
          company: '协同福音堂',
          people: '裴荣根',
          phone: '86684652',
          visitdata: '2016-12-02 11:55:40',
        },
      ],
      Visible: false,
      TransVisible: false,
    }

    this.addCompany = this.addCompany.bind(this)
    this.transferFile = this.transferFile.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOkTrans = this.handleOkTrans.bind(this)
    this.handleCancelTrans = this.handleCancelTrans.bind(this)
    this._typeChange = this._typeChange.bind(this)
  }
  _typeChange(key) {
    this.setState({ activeTab: key })
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchcompanyNowList({ bldid: this.props.houseId, fjid: this.props.roomId, sfls: 0 }))
    this.props.dispatch(fetchcompanyOnceList({ bldid: this.props.houseId, fjid: this.props.roomId, sfls: 1 }))
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.roomId!==this.props.roomId){
      this.props.dispatch(fetchcompanyNowList({ bldid: nextProps.houseId, fjid: nextProps.roomId, sfls: 0 }))
      this.props.dispatch(fetchcompanyOnceList({ bldid: nextProps.houseId, fjid: nextProps.roomId, sfls: 1 }))
    }
  }

  addCompany() {
    this.setState({ Visible: true })
  }

  handleDelete(id) {
    this.props.dispatch(fetchcompanyOnceDelete({ id: id }, () => {
      this.props.dispatch(fetchcompanyOnceList({ bldid: this.props.houseId, fjid: this.props.roomId, sfls: 1 }))
    }))
  }

  // form 表单保存后调用
  handleOk(params) {
    params.bldid = this.props.houseId;
    params.fjid = this.props.roomId;
    this.props.dispatch(fetchcompanyAddList(params, () => {
      this.props.dispatch(fetchcompanyNowList({ bldid: this.props.houseId, fjid: this.props.roomId, sfls: 0 }))
      this.setState({ Visible: false })
    }))
  }

  handleCancel() {
    this.setState({ Visible: false })
  }

  transferFile() {
    this.setState({ TransVisible: true })
  }

  // 调档成功
  handleOkTrans(onerecord) {
    this.props.dispatch(fetchcompanyTransInsert({
      bldid: this.props.houseId,
      fjid: this.props.roomId,
      dwbm: onerecord.dwbm,
      sjly: onerecord.SJLY,
    }, () => {
      this.props.dispatch(fetchcompanyNowList({
        bldid: this.props.houseId,
        fjid: this.props.roomId,
        sfls: 0,
      }, () => {
        this.setState({ TransVisible: false })
      }))
    }))
  }

  // 取消调档
  handleCancelTrans() {
    this.setState({ TransVisible: false })
  }

  returnContent(key) {
    const {
      companyNowListResult,
      companyOnceListResult,
    } = this.props
    switch (key) {
    case 'now':
      return (
        <div className="flex-column">
          <div className="ul-list-jxy">
            <ul>
              <li>
                <span>共有：</span><b className="color-red">{companyNowListResult.dptNum || 0}</b>个单位，
                <span>逾期未访查：</span><b className="color-red">{companyNowListResult.overNum || 0}</b>个，
              </li>
            </ul>
          </div>
          <NowList
            dataSource={companyNowListResult.dptList}
            loading={companyNowListResult.loading}
          />
          <div className="ability-button">
            <Button type="" onClick={this.addCompany}>新增单位</Button>
          </div>
        </div>
      )
    case 'once':
      return (
        <div>
          <div className="ul-list-jxy">
            <ul>
              <li>
                <span>共有：</span><b className="color-red">{companyOnceListResult.dptNum}</b>个单位，
              </li>
            </ul>
          </div>
          <OnceModule
            dataSource={companyOnceListResult.dptList}
            loading={companyOnceListResult.loading}
            onDelete={this.handleDelete}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="nav-second-nextContent">
        <p className="address_detail_ytt">{this.props.fullName}</p>
        <Tabs tabPosition="top" onChange={this._typeChange} className="list-map-tabs">
          <TabPane tab="现住" key="now" />
          <TabPane tab="曾经" key="once" className="maTop-jxy" />
        </Tabs>
        <div className="tab-main">
          {this.returnContent(this.state.activeTab)}
        </div>
        {
          this.state.Visible ?
            <AddCompany
              visible={this.state.Visible}
              handleOk={this.handleOk}
              onCancel={this.handleCancel}
            />
          : null
        }
        {
          this.state.TransVisible ?
            <TransferCompany
              visible={this.state.TransVisible}
              onCancel={this.handleCancelTrans}
              handleOkTrans={this.handleOkTrans}
            />
          : null
        }
      </div>
    )
  }
}
