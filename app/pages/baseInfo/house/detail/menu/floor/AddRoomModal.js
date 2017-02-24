/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 10:05
*/

import React, { Component } from 'react'
import { Modal, Input, Form } from 'antd'

const FormItem = Form.Item;

@Form.create({
  onFieldsChange(props, items) {

  },
})
export default class AddRoomModal extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.addRoomOK = this.addRoomOK.bind(this)
    this.addRoomCancel = this.addRoomCancel.bind(this)
    this.checkRoomName = this.checkRoomName.bind(this)
  }
  // 组件加载完毕
  componentDidMount() {

  }
  // props更新函数
  componentWillReceiveProps(nextProps) {

  }
  //校验房间名称
  checkRoomName(rule, value, callback) {
    if (value) {
      if (value.trim() === '') {
        callback('请输入房间名称。')
        return
      }
      const { uniteObj } = this.props
      uniteObj.floors.forEach(floorObj => {
        floorObj.rooms.forEach(roomObj => {
          if (value === roomObj.roomname) {
            callback('该单元内已存在该房间名称,请修改。')
            return
          }
        })
      })
    }
    callback()
  }
  // 弹窗取消
  addRoomCancel() {
    this.props.onAddRoomCancel()
  }
  // 弹窗确认
  addRoomOK() {
    const _self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { uniteObj, floorObj } = this.props
        const fjmc = values.roomname
        const wz = ((floorObj.rooms.pop() || {}).location || 0) + 1
        const lcs = floorObj.floor
        const lcjc = `${lcs}层`
        const { dy, dyjc } = uniteObj
        const params = { wz: wz, lcs: lcs, lcjc: lcjc, dy: dy, fjmc: fjmc, dyjc: dyjc }
        _self.props.onAddRoomOk(params)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <div>
        {this.props.visiable ?
          <Modal
            className="editRoomInfoModal"
            title="新增房间"
            visible
            confirmLoading={this.props.loading}
            onOk={this.addRoomOK}
            onCancel={this.addRoomCancel}>
            <Form horizontal>
              <FormItem
                {...formItemLayout}
                label="房间名称"
                hasFeedback
              >
              {getFieldDecorator('roomname', {
                rules: [
                  { required: true, message: '请输入房间名称' },
                  { validator: this.checkRoomName },
                ],
              })(
                <Input type="text" />
              )}
              </FormItem>
            </Form>
          </Modal> : null
        }
      </div>
    )
  }
}
