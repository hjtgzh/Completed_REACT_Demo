/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 14:05
*/

import React, { Component } from 'react'
import { Modal, Input, Form } from 'antd'

const FormItem = Form.Item;

@Form.create({
  onFieldsChange(props, items) {

  },
})
export default class EditRoomInfoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.editRoomInfoOK = this.editRoomInfoOK.bind(this)
    this.editRoomInfoCancel = this.editRoomInfoCancel.bind(this)
    this.checkRoomName = this.checkRoomName.bind(this)
  }

  // 组件加载完毕
  componentDidMount() {

  }

  // props更新函数
  componentWillReceiveProps(nextProps) {
  }

  // 校验房间名称
  checkRoomName(rule, value, callback) {
    if (value) {
      const { roomObj, uniteObj } = this.props
      if (value.trim() === '') {
        callback('请输入房间名称。')
        return
      }
      if (roomObj.roomname === value) {
        callback('请更改房间名称。')
        return
      }
      uniteObj.floors.forEach(floor => {
        floor.rooms.forEach(room => {
          if (value === room.roomname) {
            callback('该单元内已存在该房间名称,请修改。')
            return
          }
        })
      })
    }
    callback()
  }

  // 弹窗取消
  editRoomInfoCancel() {
    this.props.onEditRoomCancle()
  }
  // 弹窗确认
  editRoomInfoOK() {
    const _self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { roomObj } = this.props
        const fjmc = values.roomname
        const params = { id: roomObj.fjid, fjmc: fjmc }
        _self.props.onEditRoomOk(params)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { roomObj } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <div>
        {this.props.visiable ?
          <Modal
            className="editRoomInfoModal"
            title="修改房间信息"
            visible
            confirmLoading={this.props.loading}
            onOk={this.editRoomInfoOK}
            onCancel={this.editRoomInfoCancel}>
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
                initialValue: roomObj.roomname,
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
