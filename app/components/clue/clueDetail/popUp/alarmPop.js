import React, { Component } from 'react'
import { Form, Input, Col, Table, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  fetchClueAlarm } from 'actions/people'

const FormItem = Form.Item

@Form.create({
  // onFieldsChange(props, items) {

  // },
  // mapPropsToFields(props) {

  // },
})

@connect(
  (state) => ({
    config: state.config,
    clueAlarmSearchResult: state.clueAlarmSearchResult,
  })
)
export default class alarmPop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: {
        type: '123',
        time: '456',
        content: '789',
        address: '111',
      },
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (this.props.isLook) {
      this.props.form.setFieldsValue(this.props.dataSource)
    }
  }

  // 查询
  handleSearch() {
    const value = this.props.form.getFieldValue('jjdbh') || ''
    this.props.form.setFieldsValue(this.state.result)
    this.props.dispatch(fetchClueAlarm({ jjdbh: value }, () => {
      const clueAlarmSearchResult = this.props.clueAlarmSearchResult
      clueAlarmSearchResult.bjsj = clueAlarmSearchResult.bjsj ?
        moment(clueAlarmSearchResult.bjsj).format('YYYY-MM-DD hh:mm:ss') : ''
      this.props.form.setFieldsValue(clueAlarmSearchResult)
    }))
  }

  // 保存
  handleSubmit(e) {
    const clueAlarmSearchResult = this.props.clueAlarmSearchResult
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (clueAlarmSearchResult.id) {
        this.props.handle(clueAlarmSearchResult, 'alarm')
        // console.log(values)
      }
    })
  }

  columns() {
    return [
      {
        title: '序号',
        name: '姓名',
        render: (text, record, index) => <span>{record.name}</span>,
      },
      {
        title: '姓名',
        render: (text, record, index) => (record.content),
      },
    ]
  }

  data() {
    const { getFieldDecorator } = this.props.form
    return [
      {
        name: '报警类别',
        content:
          <FormItem>
            {getFieldDecorator('bjlb')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '报警时间',
        content:
          <FormItem>
            {getFieldDecorator('bjsj')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '报警内容 ',
        content:
          <FormItem>
            {getFieldDecorator('bjnr')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '地址 ',
        content:
          <FormItem>
            {getFieldDecorator('afdz')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
    ]
  }

  render() {
    const {
      clueAlarmSearchResult,
    } = this.props

    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <Modal
        className="modal-header modal-body"
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.isLook ? this.props.onCancel : this.handleSubmit}
      >
        <div className="modal_lzr detail-content">
          <FormItem {...formItemLayout} label="接警单编号:" className="clue-search-input-lzr">
            <Col span={20}>
              {getFieldDecorator('jjdbh')(
                <Input placeholder="请输入接警单编号" maxLength="20" />
              )}
            </Col>
            <Col span={4} className="clue-search-button">
              <Button
                disabled={this.props.isLook ? true : null}
                type="primary"
                onClick={this.handleSearch}
                loading={clueAlarmSearchResult.loading}
              >查询
              </Button>
            </Col>
          </FormItem>

          <Table
            className="clue-table"
            pagination={false}
            showHeader={false}
            size="middle"
            columns={this.columns()}
            dataSource={this.data()}
            bordered
          />
        </div>
      </Modal>
    )
  }
}
