/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Input, message } from 'antd'
import ContactAddressModal from 'components/relateAddrModal/relateAddrModal'

import { fetchVisitPeopleResult, getVisitPic } from 'actions/people'
import { hasResponseError } from 'utils'

import MyTable from './twoColumnTable'
import SearchInput from './searchInput'


@connect(
    (state, props) => ({
      config: state.config,
      visitPeopleResult: state.visitPeopleResult,
    })
)

export default class visitableModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: '',
      xzdz: '',
      buildingcode: '',
      roomcode: '',
      visible: false,
      visitPeopleResult: {},
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.searchVisitablePeople = this.searchVisitablePeople.bind(this)
    this.onOk = this.onOk.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    // 考虑第一次成功，第二次失败的情况
    if (nextProps.visitPeopleResult !== this.props.visitPeopleResult) {
      this.state.visitPeopleResult = nextProps.visitPeopleResult
    }
  }
  // 显示关联地址的组件并隐藏当前的组件
  handleShow() {
    this.setState({ visible: true })
    this.props.handleFisrtLevelModalHide();
  }
  // 关联地址组件的确定按钮的回调函数
  // 关闭关联地址组件，并显示当前组件
  // 将关联地址组件内部的信息合并到当前组件的state中
  handleOk(obj) {
    this.setState({ visible: false })
    this.setState(obj)
    this.props.handleFisrtLevelModalShow()
  }
  // 关联地址组件的取消按钮的回调函数
  handleCancel() {
    this.setState({ visible: false })
    this.props.handleFisrtLevelModalShow()
  }
  // 当前组件的确定回调函数，新增访查人员
  onOk() {
    const obj = {}
    obj.buildingcode = this.state.buildingcode
    obj.roomcode = this.state.roomcode
    obj.xzdz = this.state.xzdz
    this.props.onOk({ ...obj, ...this.props.visitPeopleResult })
  }
  // 根据idnumber获取对应人员的信息
  searchVisitablePeople(value) {
    if (!value) {
      message.error('请输入身份证号')
      return
    }
    this.props.dispatch(fetchVisitPeopleResult({ sfzh: value }, (response) => {
      if (response.msg !== '') {
        message.error('查无此人')
      } else {
        this.props.dispatch(getVisitPic({
          sfzh: value,
          baseid: response.data.id,
        }, (_response) => {
          if (hasResponseError(_response)) {
            message.error(_response.msg)
          } else {
            this.setState({ pic: _response.data.photopath })
          }
        }))
      }
    }))
  }
  // MyTabel组件的配置信息
  rows() {
    const _self = this
    const arr = [
      {
        title: '姓名',
        dataIndex: 'xm',
        render: (currentValue, targetObj) => (<Input value={currentValue} readOnly disabled />),
      },
      {
        title: '性别',
        dataIndex: 'xb',
        render: (currentValue, targetObj) => {
          let sex;
          switch (String(currentValue)) {
          case '1':
            sex = '男'
            break
          case '2':
            sex = '女'
            break
          default:
            sex = currentValue || ''
          }
          return <Input value={sex} readOnly disabled />
        },
      },
      {
        title: '身份证号',
        dataIndex: 'sfzh',
        render: (currentValue, targetObj) => (<Input value={currentValue} readOnly disabled />),
      },
      {
        title: '户籍地址',
        dataIndex: 'hjxz',
        render: (currentValue, targetObj) => (<Input value={currentValue} readOnly disabled />),
      },
      {
        title: '人口类别',
        dataIndex: 'rygzlb',
        render: (currentValue, targetObj) => (<Input value={currentValue} readOnly disabled />),
      },
      /* {
        title:'登记地址',
        dataIndex:'djdz',
        render:(currentValue,targetObj)=>
          (<Input value={currentValue} readOnly disabled/>)
      },*/
      {
        title: '现住地址',
        dataIndex: 'xzdz',
        render: (currentValue, targetObj) =>
          (<Input value={_self.state.xzdz} readOnly onClick={_self.handleShow} placeholder="请点击选择标准地址" />),
      },

      {
        title: () => <span style={{ color: 'red' }}>重点人员</span>,
        dataIndex: 'gkzdry',
        render: (currentValue, targetObj) => (<Input value={currentValue} readOnly disabled />),
      },
      {
        title: () => <span style={{ color: 'red' }}>是否在逃</span>,
        dataIndex: 'sfztry',
        render: (currentValue, targetObj) => (<Input value={currentValue ? '是' : '否'} readOnly disabled />),
      },
      {
        title: () => <span style={{ color: 'red' }}>在逃查询</span>,
        dataIndex: 'ztcxsj',
        render: (currentValue, targetObj) => (<Input value={currentValue} readOnly disabled />),
      },
    ]
    if (!this.props.needAddress) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].dataIndex === 'xzdz') {
          arr.splice(i, 1)
          break
        }
      }
    }
    return arr
  }
  footer() {
    return (
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
        <Button size={'large'} type="primary" onClick={this.onOk} loading={this.props.btnLoading}>确定</Button>
      </div>
    )
  }
  render() {
    const { title, visible, className } = this.props
    /* const {
      xm = '',
      xb = '',
      sfzh = '',
      hjxz = '',
      gkzdry = '',
      djdz = '',
      loading = false
    }= this.props.visitPeopleResult*/
    return (
      <Modal
        className={`modal-body modal-header visitModal ${className}`}
        title={title}
        visible={visible}
        footer={this.footer()}
        onCancel={this.props.onCancel}
      >
        <SearchInput
          placeholder="请输入身份证号"
          onSearch={this.searchVisitablePeople}
          loading={this.props.visitPeopleResult.loading}
          size={'large'}
        />
        <section style={{ marginTop: '20px' }}>
          <div className="pic-div"><img src={this.state.pic} alt="图片" /></div>
          <MyTable
            rows={this.rows()}
            dataSource={this.state.visitPeopleResult}
            style={{ overflow: 'hidden', width: '312px' }}
          />
        </section>
        {
          <ContactAddressModal
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            title="标准地址"
            visible={this.state.visible}
          />
        }
      </Modal>
    )
  }
}
