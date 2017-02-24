/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Radio, Button, Modal } from 'antd';
import { fetchUserSetRole } from 'actions/manage'

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@connect(
  (state, props) => ({
    config: state.config,
  })
)

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      checkedValues: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ checkedValues: e.target.value })
  }

  handleSubmit() {
    this.setState({ loading: true })
    this.props.dispatch(fetchUserSetRole({
      roleid: this.state.checkedValues,
      id: this.props.currPeopleId,
    }, (result) => {
      this.setState({ loading: false })
      this.props.handleOkRole()
    }))
  }

  footer() {
    return (
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
        <Button type="primary" size={'large'} onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
      </div>
    )
  }

  render() {
    const { select, values, visible, onCancel } = this.props
    const loop = data => data.map((item, index) => {
      return <RadioButton value={item.id} key={index}>{item.name} </RadioButton>
    })
    const selectNodes = loop(select)
    return (
      <Modal
        visible={visible}
        title="修改角色类别"
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="RadioGroup-jxy">
          <RadioGroup onChange={this.onChange} defaultValue={values.roleid}>
            {selectNodes}
          </RadioGroup>
        </div>
      </Modal>
    )
  }
}
