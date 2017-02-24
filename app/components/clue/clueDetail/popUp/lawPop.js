import React, { Component } from 'react'
import { Form, Input, Table, Col, Modal, Button } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  fetchClueLaw } from 'actions/people'

const FormItem = Form.Item

@Form.create({

})

@connect(
  (state) => ({
    config: state.config,
    clueLawSearchResult: state.clueLawSearchResult,
  })
)

export default class lawPop extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (this.props.isLook) {
      this.props.form.setFieldsValue(this.props.dataSource)
    }
  }

  handleSubmit(e) {
    const clueLawSearchResult = this.props.clueLawSearchResult
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (clueLawSearchResult.id) {
        this.props.handle(clueLawSearchResult, 'law')
        // console.log(values)
      }
    })
  }

  // 查询
  handleSearch() {
    const value = this.props.form.getFieldValue('ajbh') || ''
    this.props.dispatch(fetchClueLaw({ ajbh: value }, () => {
      const clueLawSearchResult = this.props.clueLawSearchResult
      clueLawSearchResult.fssj = clueLawSearchResult.fssj ?
        moment(clueLawSearchResult.fssj).format('YYYY-MM-DD HH:mm:ss') : ''
      this.props.form.setFieldsValue(clueLawSearchResult)
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
        render: (text, record, index) => record.content,
      },
    ]
  }

  data() {
    const { getFieldDecorator } = this.props.form
    return [
      {
        name: '案件类别',
        content:
          <FormItem>
            {getFieldDecorator('ajlb1')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '案发时间',
        content:
          <FormItem>
            {getFieldDecorator('fssj')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '简要案情',
        content:
          <FormItem>
            {getFieldDecorator('jyaq')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '发生地点详址',
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
      clueLawSearchResult,
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
          <FormItem {...formItemLayout} label="关联案件:" className="clue-search-input-lzr">
            <Col span={20}>
              {getFieldDecorator('ajbh')(
                <Input placeholder="请输入案件编号" maxLength="30" />
              )}
            </Col>
            <Col span={4} className="clue-search-button">
              <Button
                disabled={this.props.isLook ? true : null}
                type="primary"
                onClick={this.handleSearch}
                loading={clueLawSearchResult.loading}
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
