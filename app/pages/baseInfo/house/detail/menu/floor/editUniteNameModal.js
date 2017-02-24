/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 14:25
*/

import React, { Component } from 'react'
import { Modal, Input, Form } from 'antd'

const FormItem = Form.Item;

@Form.create({
  onFieldsChange(props, items) {

  },
})

export default class EditUniteNameModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.editUniteNameOk = this.editUniteNameOk.bind(this)
    this.editUniteNameCancle = this.editUniteNameCancle.bind(this)
    this.checkUniteName = this.checkUniteName.bind(this)
  }

  // 组件加载完毕
  componentDidMount() {
  }

  // props更新函数
  componentWillReceiveProps(nextProps) {
  }

  // 校验单元名称
  checkUniteName(rule, value, callback) {
    if (value) {
      const { data, uniteObj } = this.props
      if (value.trim() === '') {
        callback('请输入单元名称。')
        return
      }
      if (value === uniteObj.dyjc) {
        callback('请更改单元名称')
        return
      }
      data.forEach(unite => {
        if (value === unite.dyjc) {
          callback('该单元名称已存在,请重新输入')
          return
        }
      })
    }
    callback()
  }

  // 弹窗取消
  editUniteNameCancle() {
    this.props.onEditUniteNameCancle()
  }

  // 弹窗确认
  editUniteNameOk() {
    const _self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { uniteObj } = this.props
        const dy = uniteObj.dy
        const dyjc = values.uniteName
        const params = { dy: dy, dyjc: dyjc }
        _self.props.onEditUniteNameOk(params)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { uniteObj } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <div>
        {this.props.visiable ?
          <Modal
            className="editRoomInfoModal"
            title="修改单元信息"
            visible
            confirmLoading={this.props.loading}
            onOk={this.editUniteNameOk}
            onCancel={this.editUniteNameCancle}>
            <Form horizontal>
              <FormItem
                {...formItemLayout}
                label="单元名称"
                hasFeedback
              >
              {getFieldDecorator('uniteName', {
                rules: [
                  { required: true, message: '请输入单元名称' },
                  { validator: this.checkUniteName },
                ],
                initialValue: uniteObj.dyjc,
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
