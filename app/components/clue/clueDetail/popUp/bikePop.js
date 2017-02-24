import React, { Component } from 'react'
import { Form, Input, Table, Col, Modal, Button } from 'antd'
import { connect } from 'react-redux'
import {
  fetchClueBike } from 'actions/people'

const FormItem = Form.Item

@Form.create({

})
@connect(
  (state) => ({
    config: state.config,
    clueBikeSearchResult: state.clueBikeSearchResult,
  })
)
export default class bikePop extends Component {
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
    const clueBikeSearchResult = this.props.clueBikeSearchResult
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (clueBikeSearchResult.id) {
        this.props.handle(clueBikeSearchResult, 'bike')
        // console.log(values)
      }
    })
  }
  handleSearch() {
    const value = this.props.form.getFieldValue('clph') || ''
    this.props.dispatch(fetchClueBike({ clph: value }, () => {
      const clueBikeSearchResult = this.props.clueBikeSearchResult
      if (clueBikeSearchResult.hplb === 1) {
        clueBikeSearchResult.hplb = '普通号牌'
      } else if (clueBikeSearchResult.hplb === 2) {
        clueBikeSearchResult.hplb = '防盗号牌'
      }

      this.props.form.setFieldsValue(clueBikeSearchResult)
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
        render: (text, record, index) => <span>{record.content}</span>,
      },
    ]
  }

  data() {
    const { getFieldDecorator } = this.props.form
    return [
      {
        name: '号牌类别',
        content:
          <FormItem>
            {getFieldDecorator('hplb')(
              <Input type="text" readOnly />
            )}
          </FormItem>,

      },
      {
        name: '电动机号',
        content:
          <FormItem>
            {getFieldDecorator('ddjh')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '车架号',
        content:
          <FormItem>
            {getFieldDecorator('address')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '品牌',
        content:
          <FormItem>
            {getFieldDecorator('pp')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '型号',
        content:
          <FormItem>
            {getFieldDecorator('xh')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '驾驶员姓名',
        content:
          <FormItem>
            {getFieldDecorator('jsyxm')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '驾驶员身份证号',
        content:
          <FormItem>
            {getFieldDecorator('jsysfzh')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '是否涉案',
        content:
          <FormItem>
            {getFieldDecorator('address')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
    ]
  }

  render() {
    const {
      clueBikeSearchResult,
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
          <FormItem {...formItemLayout} label="车辆牌号:" className="clue-search-input-lzr">
            <Col span={20}>
              {getFieldDecorator('clph')(
                <Input placeholder="请输入车辆牌号" maxLength="20" />
              )}
            </Col>
            <Col span={4} className="clue-search-button">
              <Button
                disabled={this.props.isLook ? true : null}
                type="primary"
                onClick={this.handleSearch}
                loading={clueBikeSearchResult.loading}
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
