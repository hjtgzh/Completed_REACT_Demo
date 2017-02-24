/*
 *Create By 韩卿
 */

import React, { Component } from 'react'
import { Button, Modal, Input, Form } from 'antd'
import { connect } from 'react-redux'
import { fetchBuildingResult, fetchRoomResult } from 'actions/people'

const FormItem = Form.Item
let bTimer
let rTimer

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    searchBuildingResult: state.searchBuildingResult,
    searchRoomResult: state.searchRoomResult,
  })
)

class ContactAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {
        buildingcode: '',
        roomcode: '',
        xzdz: '',
      },
      dataSource: [{ code: '01', name: 'e鄂尔多斯' }, { code: '02', name: '鄂尔多斯' }],
      buildingResult: [],
      roomResult: [],
      buildingName: '',
      roomName: '',
      isShowBuildingResult: false,
      isShowRoomResult: false,
    }
    this.handleOk = this.handleOk.bind(this)
    this.inputBuilding = this.inputBuilding.bind(this)
    this.inputRoom = this.inputRoom.bind(this)
    this._closeUnderList = this._closeUnderList.bind(this)
  }
  componentWillReceiveProps(nextProps) {

  }
  // 此组件的确定按钮的回调函数
  handleOk() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        throw new Error('error')
        // return
      }
      // console.log('submit:', values)
      this.props.onOk(this.state.info)
    })
  }
    // 选择地址
  clickBuildingItem(code, name) {
    this.setState({ buildingName: name })
    this.state.info.buildingcode = code
    this.state.info.xzdz = name + this.state.roomName
    this.setState({ isShowBuildingResult: false })
  }
    // 选择户室
  clickRoomItem(code, name) {
    this.setState({ roomName: name })
    this.state.info.roomcode = code
    this.state.info.xzdz = this.state.buildingName + name
    this.setState({ isShowRoomResult: false })
  }
    // 输入并查询其匹配的地址
  inputBuilding(e) {
    const _self = this
    clearTimeout(bTimer)
    const v = e.target.value
    this.setState({ buildingName: v })
    if (!v) {
      return
    }
    bTimer = setTimeout(() => {
      _self.props.dispatch(fetchBuildingResult({ name: v }), (data) => {
        if (data.status === 1) {
          _self.setState({ isShowBuildingResult: true })
        }
      })
    }, 500)
  }
    // 输入并查询其匹配的户室
  inputRoom(e) {
    const _self = this
    clearTimeout(rTimer)
    const v = e.target.value
    this.setState({ roomName: v })
    if (!v) {
      return
    }
    rTimer = setTimeout(() => {
      _self.props.dispatch(fetchRoomResult({ name: v }), (data) => {
        if (data.status === 1) {
          _self.setState({ isShowRoomResult: true })
        }
      })
    }, 500)
  }
    // 关闭模糊查询的下拉栏
  _closeUnderList() {
    this.setState({ isShowBuildingResult: false, isShowRoomResult: false })
  }
  footer() {
    return (
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
        <Button size={'large'} type="primary" onClick={this.handleOk} loading={this.props.btnLoading}>确定</Button>
      </div>
    )
  }
  render() {
    const self = this
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    }
    const { getFieldDecorator } = this.props.form
    // 地址信息验证
    const addressValidate = {
      rules: [
        // {required:true,message:'请使用下拉栏中搜索出来的地址',type:'string'},
        {
          validator(rule, value, callback, source, options) {
            // var errors=[]
            const form = self.props.form
            if (self.state.buildingName !== form.getFieldValue('address') || !self.state.info.buildingcode) {
              callback('请选择下拉栏中搜索出来的地址')
              return
            }
            // callback(errors)
            callback()
          },
        },
      ],
      validateTrigger: 'onSubmit',
    }
    // 户室信息验证
    const roomValidate = {
      rules: [
        {
          validator(rule, value, callback, source, options) {
            const form = self.props.form
            if (
              self.state.info.buildingcode &&
              (self.state.roomName !== form.getFieldValue('room') || !self.state.info.roomcode)
            ) {
              callback('请选择下拉栏中搜索出来的户室信息')
              return
            }
            callback()
          },
        },
      ],
      validateTrigger: 'onSubmit',
    }
    return (
      <Modal
        className="modal-body"
        visible={this.props.visible}
        title={'标准地址'}
        footer={this.footer()}
        onCancel={this.props.onCancel}
      >
        <section style={{ height: '100%' }} onClick={this._closeUnderList}>
          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="地址信息"
              hasFeedback
              style={{ position: 'relative' }}
            >
              {getFieldDecorator('address', addressValidate)(
                <Input type="text" placeholder="请输入地址" onChange={this.inputBuilding} />
              )}
              {
                this.state.isShowBuildingResult ?
                  <div className="underList">
                    <ul>
                    {
                      this.props.searchBuildingResult.list.map((v, i) =>
                        <li key={v.code} onClick={() => this.clickBuildingItem(v.code, v.name)}>{v.name}</li>)
                    }
                    </ul>
                  </div>
                  : null
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="户室信息"
              hasFeedback
              style={{ position: 'relative' }}
            >
            {getFieldDecorator('room', roomValidate)(
              <Input type="text" placeholder="请输入户室信息" onChange={this.inputRoom} />
            )}
            {
              this.state.isShowRoomResult ?
                <div className="underList">
                  <ul>
                    {
                      this.props.searchRoomResult.list.map((v, i) =>
                        <li key={v.code} onClick={() => this.clickRoomItem(v.code, v.name)}>{v.name}</li>)
                    }
                  </ul>
                </div>
                : null
            }
            </FormItem>
          </Form>
        </section>
      </Modal>
    )
  }
}

export default Form.create()(ContactAddress)
