import React, { Component } from 'react'
import { Form, Input, Table, Col, Modal, Button } from 'antd'
import { connect } from 'react-redux'
import {
  fetchClueUnit } from 'actions/people'

const FormItem = Form.Item

@Form.create({

})
@connect(
  (state) => ({
    config: state.config,
    clueUnitSearchResult: state.clueUnitSearchResult,
  })
)

export default class unitPop extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (this.props.isLook) {
      this.props.form.setFieldsValue(this.props.dataSource)
    }
  }

  handleSubmit(e) {
    const clueUnitSearchResult = this.props.clueUnitSearchResult
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (clueUnitSearchResult.id) {
        this.props.handle(clueUnitSearchResult, 'unit')
        // console.log(values)
      }
    });
  }

  handleSearch() {
    const value = this.props.form.getFieldValue('name') || ''
    this.props.dispatch(fetchClueUnit({ gszzhm: value }, () => {
      const clueUnitSearchResult = this.props.clueUnitSearchResult
      this.props.form.setFieldsValue(clueUnitSearchResult)
    }))
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
        name: '机构名称',
        content:
          <FormItem>
            {getFieldDecorator('dwmc')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '机构代码',
        content:
          <FormItem>
            {getFieldDecorator('type')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '工商执照代码',
        content:
          <FormItem>
            {getFieldDecorator('gszzhm')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '开设地址',
        content:
          <FormItem>
            {getFieldDecorator('zcdz')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '法人代表',
        content:
          <FormItem>
            {getFieldDecorator('frdb')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
    ]
  }
  render() {
    const {
      clueUnitSearchResult,
    } = this.props

    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <Modal className="modal-header modal-body"
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.isLook ? this.props.onCancel : this.handleSubmit}
      >
        <div className="modal_lzr detail-content">
          <FormItem {...formItemLayout} label="搜索条件:" className="clue-search-input-lzr">
            <Col span={20}>
              {getFieldDecorator('name')(
                <Input placeholder="请输入机构代码" maxLength="20" />
              )}
            </Col>
            <Col span={4} className="clue-search-button">
              <Button
                disabled={this.props.isLook ? true : null}
                type="primary"
                onClick={this.handleSearch}
                loading={clueUnitSearchResult.loading}
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
