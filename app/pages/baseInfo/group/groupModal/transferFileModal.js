/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { Table, Button, Modal, Input, Form, message } from 'antd'
import { connect } from 'react-redux'
import {
  searchDepartmentName,
  searchBusinessCode,
  searchLegalPerson,
  exeTransferFile,
} from 'actions/department'

const FormItem = Form.Item

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      resultForDepartmentName: state.searchResultByDepartmentName,
      resultForBusinessCode: state.searchResultByBusinessCode,
      resultForLegalPerson: state.searchResultByLegalPerson,
      exeTransferFileResult: state.exeTransferFileResult,
    })
)

class TransferFileModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchDepartmentNameLoading: false,
      searchBusinessCodeLoading: false,
      searchLegalPersonLoading: false,
    }
    this.searchName = this.searchName.bind(this)
    this.searchCode = this.searchCode.bind(this)
    this.searchLegalPerson = this.searchLegalPerson.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resultForDepartmentName !== this.props.resultForDepartmentName) {
      this.setState({ searchDepartmentNameLoading: false, data: nextProps.resultForDepartmentName.list })
    }
    if (nextProps.resultForBusinessCode !== this.props.resultForBusinessCode) {
      this.setState({ searchBusinessCodeLoading: false, data: nextProps.resultForBusinessCode.list })
    }
    if (nextProps.resultForLegalPerson !== this.props.resultForLegalPerson) {
      this.setState({ searchLegalPersonLoading: false, data: nextProps.resultForLegalPerson.list })
    }
    if (nextProps.exeTransferFileResult !== this.props.exeTransferFileResult) {
      this.setState({ [`btnLoading${nextProps.exeTransferFileResult.index}`]: false })
    }
  }

  // 根据单位名称搜索调档信息
  searchName() {
    const value = this.props.form.getFieldValue('name')
    if (!value) { return }
    this.props.dispatch(searchDepartmentName({ dwmc: value }))
    this.setState({ searchDepartmentNameLoading: true })
  }
  // 根据工商执照代码搜索调档信息
  searchCode() {
    const value = this.props.form.getFieldValue('code')
    if (!value) { return }
    this.props.dispatch(searchBusinessCode({ gszzhm: value }))
    this.setState({ searchBusinessCodeLoading: true })
  }
  // 根据法人身份证搜索调档信息
  searchLegalPerson() {
    const value = this.props.form.getFieldValue('legalPerson')
    if (!value) { return }
    this.props.dispatch(searchLegalPerson({ frdb: value }))
    this.setState({ searchLegalPersonLoading: true })
  }

  // table的配置项
  columns() {
    const self = this
    return [
      {
        title: '机构名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
      },
      {
        title: '工商执照',
        dataIndex: 'gszzhm',
        key: 'gszzhm',
      },
      {
        title: '注册地址',
        dataIndex: 'zcdz',
        key: 'zcdz',
      },
      {
        title: '营业（开设日期）',
        dataIndex: 'yyksrq',
        key: 'yyksrq',
      },
      {
        title: '法人代表',
        dataIndex: 'frdb',
        key: 'frdb',
      },
      {
        title: '法人联系电话',
        dataIndex: 'frlxdh',
        key: 'frlxdh',
      },
      {
        title: '数据来源',
        dataIndex: 'SJLY',
        key: 'SJLY',
      },
      {
        title: '调档',
        key: 'operate',
        width: '100px',
        render: (text, record, index) => (<Button
          type="primary"
          loading={self.state[`btnLoading${index}`]}
          onClick={() => self.operate(record, index)}
        >调档</Button>),
      },
    ]
  }

  // 点击调档
  operate(record, index) {
    this.setState({ [`btnLoading${index}`]: true })
    this.props.dispatch(exeTransferFile({ dwbm: record.dwbm, sjly: record.SJLY, $$index: index }, (response) => {
      // this.setState({[`btnLoading${index}`]:false})
      message.success('调档成功', 5)
    }))
  }

  render() {
    const { visible, title = '机构名称查询', onCancel } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      // hasFeedback:true,
      style: { position: 'relative' },
    }
    const {
      searchDepartmentNameLoading,
      searchBusinessCodeLoading,
      searchLegalPersonLoading,
    } = this.state
    // var height=document.body.clientHeight-51
    let footer = ''
    return (
      <Modal
        className="modal-header modal-body modal-large"
        title={title}
        footer={footer}
        visible={visible}
        onCancel={onCancel}
      >
        <section>
          <FormItem
            label="单位名称"
            {...formItemLayout}
          >
            {
              getFieldDecorator('name', {})(
                <Input placeholder="请输入单位名称" />
              )
            }
            <Button
              type="primary"
              style={{ position: 'absolute', right: '-81px' }}
              onClick={this.searchName}
              loading={searchDepartmentNameLoading}
            >查询</Button>
          </FormItem>
          <FormItem
            label="工商执照代码"
            {...formItemLayout}
          >
            {
              getFieldDecorator('code', {})(
                <Input placeholder="请输入工商执照代码" />
              )
            }
            <Button
              type="primary"
              style={{ position: 'absolute', right: '-81px' }}
              onClick={this.searchCode}
              loading={searchBusinessCodeLoading}
            >查询</Button>
          </FormItem>
          <FormItem
            label="法人代表"
            {...formItemLayout}
          >
            {
              getFieldDecorator('legalPerson', {})(
                <Input placeholder="请输入法人代表" />
              )
            }
            <Button
              type="primary"
              style={{ position: 'absolute', right: '-81px' }}
              onClick={this.searchLegalPerson}
              loading={searchLegalPersonLoading}
            >查询</Button>
          </FormItem>
        </section>
        <section>
          <Table
            dataSource={this.state.data}
            columns={this.columns()}
            pagination={false}
            className="organizationTable"
            scroll={{ x: 800, y: 263 }}
            loading={searchDepartmentNameLoading || searchBusinessCodeLoading || searchLegalPersonLoading}
          />
        </section>
      </Modal>
    )
  }
}

export default Form.create({})(TransferFileModal)
