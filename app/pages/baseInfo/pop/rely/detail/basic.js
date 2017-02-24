/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin, Select, Button,
 message, Modal, Row } from 'antd'
 import moment from 'moment'
import {
 fetchBasicInfo, updateBasicForm, updateType } from 'actions/popRely'
import { getVisitPic } from 'actions/people'
import 'style/relyDetailStyle.css'

import NameInfo from './nameInfo'
import Volunteer from './modal/volunteer'
import Guard from './modal/guard'
import FamousPeople from './modal/famousPeople'
import Security from './modal/security'
import Prevention from './modal/prevention'
import FormLabel from './modal/formLabel'

const TabPane = Tabs.TabPane
const Option = Select.Option


@connect(
  (state) => ({
    config: state.config,
    relyBasicResult: state.relyBasicResult,
    updateRelyBasicResult: state.updateRelyBasicResult,
    deleteRelyPeopleReuslt: state.deleteRelyPeopleReuslt,
  })
)

// 声明组件  并对外输出
export default class basic extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      nameId: this.props.nameId,
      pic: '', // 图片路劲
      // nameId: -10,
      // 标签弹窗
      visible: false,
      // 删除弹窗
      visibleDel: false,
      leaveReasonForm: false,
      // 删除成功弹窗
      deleteSuccess: false,
      confirmLoading: false,
      deleteReason: '自愿离职',
      activeKey: '',
      // 是否从props加载数据
      fistload: false,
      panes: [], // 保存选中标签
      btnArr: {
        1: '', 2: '', 3: '', 4: '', 5: '',
      },
    }
    // 保存当前标签
    this.saveBtn = {
      1: '', 2: '', 3: '', 4: '', 5: '',
    }
    this.type = ''
     // this.setState({activeKey : this.state.panes[0].key})
    this.setBtnArr = this.setBtnArr.bind(this)   // 绑定作用域
    this.onChange = this.onChange.bind(this)
    this.setLabel = this.setLabel.bind(this)
    this.showNotice = this.showNotice.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.searchBasicform = this.searchBasicform.bind(this)
    this.upadteForm = this.upadteForm.bind(this)
    this.deleteModal = this.deleteModal.bind(this)
    this.hasDelete = this.hasDelete.bind(this)
    this.deleteSuccessOk = this.deleteSuccessOk.bind(this)
    this.deleteOk = this.deleteOk.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
    this.reasonChange = this.reasonChange.bind(this)
  }

  componentDidMount() {
    this.searchBasicform(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const relyBasicResult = nextProps.relyBasicResult
    if (relyBasicResult.type !== this.type) {
      this.setState({ fistload: true })
    }
    if (this.props.nameId !== nextProps.nameId) {
      this.searchBasicform(nextProps)
    }
  }

  // 设置展示标签
  setLabel(arr) {
    this.setState({ confirmLoading: true })
    const panes = [];
    const btnArr = {};
    let activeKey = ''
    let type = ''
    arr.map((obj) => {
      activeKey = obj.value
      panes.push({ title: obj.text, key: activeKey })
      btnArr[activeKey] = obj
      type += `${obj.value};`
    })
    // this.setState({ panes, activeKey,btnArr })
    // console.log(type)
    this.props.dispatch(updateType({ type: type, id: this.state.nameId }, (result) => {
      this.setState({ panes: panes, activeKey: activeKey, visible: false, confirmLoading: false })
      for (const i in this.state.btnArr) {
        this.saveBtn[i] = this.state.btnArr[i]
      }
      // this.searchBasicform()
    }))
  }

  // 设置显示标签按钮状态
  setBtnArr(btn) {
    this.state.btnArr[btn.value] = btn
    this.setState({})
  }

  // 标签改变操作
  onChange(activeKey) {
    this.setState({ activeKey: activeKey })
  }

  // 展示标签弹窗
  showNotice() {
    // this.refs.form.setBtn(this.state.btnArr)
    this.setState({ visible: true })
  }

  // 隐藏标签弹窗
  handleCancel() {
    // this.state.btnArr = this.saveBtn
    for (const value in this.saveBtn) {
      this.state.btnArr[value] = this.saveBtn[value]
    }
    this.setState({ visible: false })
  }

  // 查询列表
  searchBasicform(props) {
    this.state.nameId = props.nameId
    this.props.dispatch(fetchBasicInfo({ id: this.state.nameId }, (result) => {
      this.props.dispatch(getVisitPic({ sfzh: result.data.sfzh, baseid: result.data.residentBaseId }, (response) => {
        this.setState({ pic: response.data.photopath })
      }))
    }))
  }

  // 更新列表
  upadteForm(obj) {
    this.props.dispatch(updateBasicForm(obj, () => this.searchBasicform(this.props)))
  }

  // 批量删除的调用
  deleteModal() {
    this.setState({
      visibleDel: true,
    });
  }

  // 取消删除
  cancelDelete() {
    // console.log(e);
    this.setState({
      visibleDel: false,
      leaveReasonForm: false,
    });
  }

  // 是否选中将要删除的条目
  deleteOk() {
    // console.log('Clicked OK');
    // console.log(this.state.deleteArr);
    this.setState({
      visibleDel: false,
      pleaseChooseOne: false,
      leaveReasonForm: true,
    });
  }

  // 离职原因改变
  reasonChange(e) {
    this.setState({
      deleteReason: e,
    });
  }

  // 确认删除后的调用
  hasDelete() {
    this.setState({
      leaveReasonForm: false,
      deleteSuccess: true,
      defaultChecked: false,
      selectedRowKeys: [],
      deleteArr: '',
    });
    // console.dir(this.state.deleteReason)
    this.props.deleteTab()
    // 删除
    // this.props.dispatch(deleteRelyPeople({id: this.state.deleteArr,lzyy: 1}))
  }

  // 离职原因弹窗标题
  deleteTitle() {
    return (
      <p className="leaveFormTitle">
        <span>离职原因</span>
        <Button onClick={this.hasDelete} type="primary" className="leaveFormBt">删除</Button>
      </p>
    )
  }

  // 成功删除并刷新页面
  deleteSuccessOk() {
    this.setState({
      deleteSuccess: false,
      rowSelection: true,
    });
    // this.relyListReload()
    // this.props.dispatch(fetchRelyList({ currentPage: 1 ,pageSize: 10}))
  }

  // 删除成功footer
  deleteSuccessFooter() {
    return (<Button type="primary" onClick={this.deleteSuccessOk}>确定</Button>)
  }

  render() {
    const relyBasicResult = this.props.relyBasicResult

    relyBasicResult.zzmm = relyBasicResult.zzmm ? relyBasicResult.zzmm.toString() : ''
    relyBasicResult.hyzk = relyBasicResult.hyzk ? relyBasicResult.hyzk.toString() : ''
    relyBasicResult.zjxy = relyBasicResult.zjxy ? relyBasicResult.zjxy.toString() : ''
    relyBasicResult.whcd = relyBasicResult.whcd ? relyBasicResult.whcd.toString() : ''
    relyBasicResult.zkzk = relyBasicResult.zkzk ? relyBasicResult.zkzk.toString() : ''
    relyBasicResult.fwgw = relyBasicResult.fwgw ? relyBasicResult.fwgw.toString() : ''
    relyBasicResult.sflx = relyBasicResult.sflx ? relyBasicResult.sflx.toString() : ''
    relyBasicResult.zw = relyBasicResult.zw ? relyBasicResult.zw.toString() : ''
    relyBasicResult.sybw = relyBasicResult.sybw ? relyBasicResult.sybw.toString() : ''
    relyBasicResult.cxsj = relyBasicResult.cxsj ? moment(relyBasicResult.cxsj) : null
    relyBasicResult.xxylb = typeof relyBasicResult.xxylb === 'string' ?
      relyBasicResult.xxylb.split(',') : relyBasicResult.xxylb

    const deleteRelyPeopleReuslt = this.props.deleteRelyPeopleReuslt
    const labels = {
      1: {
        title: '志愿者',
        content:
          <Volunteer relyBasicResult={relyBasicResult} deleteModal={this.deleteModal}
            upadteForm={this.upadteForm} showNotice={this.showNotice}
          />,
        key: '1',
      },
      2: { title: '群防群治',
        content:
          <Prevention relyBasicResult={relyBasicResult} deleteModal={this.deleteModal}
            upadteForm={this.upadteForm} showNotice={this.showNotice}
          />,
        key: '2' },
      3: { title: '治安信息员',
        content:
          <Security relyBasicResult={relyBasicResult} deleteModal={this.deleteModal}
            upadteForm={this.upadteForm} showNotice={this.showNotice}
          />,
        key: '3' },
      4: { title: '社区(村)干部',
        content:
          <Guard relyBasicResult={relyBasicResult} deleteModal={this.deleteModal}
            upadteForm={this.upadteForm} showNotice={this.showNotice}
          />,
        key: '4' },
      5: { title: '社会知名人士',
        content:
          <FamousPeople relyBasicResult={relyBasicResult} deleteModal={this.deleteModal}
            upadteForm={this.upadteForm} showNotice={this.showNotice}
          />,
        key: '5' },
    }
    if (relyBasicResult.type && this.state.fistload) {   // 初始化的时候进入
      this.type = relyBasicResult.type
      const typeArr = relyBasicResult.type.substring(0, relyBasicResult.type.length - 1).split(';')
      const panesArr = []
      const activeKey = labels[typeArr[0]].key    // 激活面板
      for (let i = 0; i < typeArr.length; i++) {  // 赋值
        const type = labels[typeArr[i]]
        type.content = labels[typeArr[i]].content
        panesArr.push(type)
        this.state.btnArr[type.key] = { show: true, text: labels[type.key].title }
        this.saveBtn = { show: true, text: labels[type.key].title }
      }
      this.state.panes = panesArr
      this.state.activeKey = activeKey
      this.state.fistload = false
      this.state.saveBtn = panesArr
    }

    return (
      <Spin spinning={relyBasicResult.loading}>
        <div className="basic">
          <div className="menu_tab">
            <b className="menu_tab_name">{relyBasicResult.xm}</b>
            <span className="idnumber">{relyBasicResult.sfzh}</span>
          </div>
          <div className="de_top">
            <Row gutter={16}>
              <div className="imgs">
                <img src={this.state.pic} />
              </div>
              <NameInfo relyBasicResult={relyBasicResult} />
            </Row>
          </div>
          <div>
            <Tabs
              className=""
              tabPosition="top"
              onChange={this.onChange}
              defaultActiveKey={this.state.activeKey}
              activeKey={this.state.activeKey}
            >
              {this.state.panes.map(pane =>
                <TabPane tab={pane.title} key={pane.key}>
                  {labels[pane.key].content}
                </TabPane>)
              }
            </Tabs>
            {/* labels[this.state.activeKey] ? labels[this.state.activeKey]['content'] : null*/}
          </div>
          <FormLabel
            visible={this.state.visible}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            btnArr={this.state.btnArr}
            setBtnArr={this.setBtnArr}
            setLabel={this.setLabel}
          />
        </div>
         {/* 删除-弹窗*/}
        <Modal visible={this.state.visibleDel} title="提示"
          onOk={this.deleteOk} onCancel={this.cancelDelete}
          className="hjt-ifSure"
        >
          <p className="isDelete">是否删除</p>
        </Modal>
        {/* 批量删除内部表单-弹窗*/}
        <Modal visible={this.state.leaveReasonForm} footer=""
          onCancel={this.cancelDelete} title={this.deleteTitle()}
          className="hjt-isSure" width={330} confirmLoading={deleteRelyPeopleReuslt.loading}
        >
          <Select
            size="large"
            defaultValue={this.state.deleteReason}
            onChange={this.reasonChange}
            className="reasonSelect"
          >
            <Option value="自愿离职">自愿离职</Option>
            <Option value="清退">清退</Option>
            <Option value="其他">其他</Option>
          </Select>
        </Modal>
        {/* 删除成功-弹窗*/}
        <Modal visible={this.state.deleteSuccess} title="消息"
          onOk={this.deleteSuccessOk} footer={this.deleteSuccessFooter()}
          className="hjt-ifSure"
        >
          <p className="isDelete">删除成功</p>
        </Modal>
      </Spin>
    )
  }
}
