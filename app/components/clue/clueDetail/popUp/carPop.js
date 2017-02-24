import React, { Component } from 'react'
import { Form, Input, Table, Col, Modal, Button } from 'antd'
import { connect } from 'react-redux'
import {
  fetchClueCar } from 'actions/people'

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
    clueCarSearchResult: state.clueCarSearchResult,
  })
)
export default class carPop extends Component {
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

  // 保存
  handleSubmit(e) {
    const clueCarSearchResult = this.props.clueCarSearchResult
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (clueCarSearchResult.id) {
        this.props.handle(clueCarSearchResult, 'car')
        // console.log(values)
      }
    });
  }

  // 查询
  handleSearch() {
    const value = this.props.form.getFieldValue('clph') || ''
    this.props.dispatch(fetchClueCar({ clph: value }, () => {
      const clueCarSearchResult = this.props.clueCarSearchResult
      if (clueCarSearchResult.cllb === 1) {
        clueCarSearchResult.cllb = '普通号牌'
      } else if (clueCarSearchResult.cllb === 2) {
        clueCarSearchResult.cllb = '防盗号牌'
      }
      if (clueCarSearchResult.sfsa === 1) {
        clueCarSearchResult.sfsa = '是'
      } else if (clueCarSearchResult.sfsa === 0) {
        clueCarSearchResult.sfsa = '否'
      }
      this.props.form.setFieldsValue(clueCarSearchResult)
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
        name: '车辆类别',
        content:
          <FormItem>
            {getFieldDecorator('cllb')(
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
        name: '车身颜色',
        content:
          <FormItem>
            {getFieldDecorator('csys')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '是否涉案',
        content:
          <FormItem>
            {getFieldDecorator('sfsa')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '违法情况',
        content:
          <FormItem>
            {getFieldDecorator('wfqk')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
    ]
  }
  render() {
    const {
      clueCarSearchResult,
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
                loading={clueCarSearchResult.loading}
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
