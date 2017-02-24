import React, { Component } from 'react'
import { Form, Input, Row, Table, Col, Modal, Button } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'

import {
  fetchCluePeople,
  getVisitPic,
} from 'actions/people'

const FormItem = Form.Item

@Form.create({

})
@connect(
  (state) => ({
    config: state.config,
    cluePeopleSearchResult: state.cluePeopleSearchResult,
  })
)

export default class peoplePop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: '',
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const dataSource = this.props.dataSource
    if (!dataSource.sfzh) return
    if (dataSource.xb === 1) dataSource.xb = '男'
    if (dataSource.xb === 2) dataSource.xb = '女'
    this.props.dispatch(getVisitPic({ sfzh: dataSource.sfzh, baseid: dataSource.id }, (response) => {
      this.setState({ pic: response.data.photopath })
    }))
    if (this.props.isLook) {
      this.props.form.setFieldsValue(this.props.dataSource)
    }
  }
  handleSubmit(e) {
    const cluePeopleSearchResult = this.props.cluePeopleSearchResult
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (cluePeopleSearchResult.id) {
        cluePeopleSearchResult.pic = this.state.pic
        this.props.handle(cluePeopleSearchResult, 'people')
      }
    });
  }
  handleSearch() {
    const value = this.props.form.getFieldValue('sfzh') || ''
    this.props.dispatch(fetchCluePeople({ sfzh: value }, () => {
      const cluePeopleSearchResult = this.props.cluePeopleSearchResult
      cluePeopleSearchResult.csrq = cluePeopleSearchResult.csrq ?
        moment(cluePeopleSearchResult.csrq).format('YYYY-MM-DD') : ''
      if (cluePeopleSearchResult.xb === 1) cluePeopleSearchResult.xb = '男'
      if (cluePeopleSearchResult.xb === 2) cluePeopleSearchResult.xb = '女'
      this.props.form.setFieldsValue(cluePeopleSearchResult)
      this.props.dispatch(getVisitPic({ sfzh: value, baseid: cluePeopleSearchResult.id }, (response) => {
        this.setState({ pic: response.data.photopath })
      }))
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
        name: '姓名',
        content:
          <FormItem>
            {getFieldDecorator('xm')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '姓别',
        content:
          <FormItem>
            {getFieldDecorator('xb')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '出生日期 ',
        content:
          <FormItem>
            {getFieldDecorator('csrq')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        name: '户籍区划 ',
        content:
          <FormItem>
            {getFieldDecorator('type')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        key: '5',
        name: '户籍详址 ',
        content:
          <FormItem>
            {getFieldDecorator('hjxz')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        key: '6',
        name: '现住区划 ',
        content:
          <FormItem>
            {getFieldDecorator('type')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        key: '7',
        name: '现住详址 ',
        content:
          <FormItem>
            {getFieldDecorator('type')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        key: '8',
        name: '人员类别 ',
        content:
          <FormItem>
            {getFieldDecorator('gkzdry')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        key: '9',
        name: '前科情况 ',
        content:
          <FormItem>
            {getFieldDecorator('type')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
      {
        key: '10',
        name: '电话号码',
        content:
          <FormItem>
            {getFieldDecorator('dhhm')(
              <Input type="text" readOnly />
            )}
          </FormItem>,
      },
    ]
  }

  render() {
    const {
      cluePeopleSearchResult,
    } = this.props

    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <Modal className=" modal-header modal-body"
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.isLook ? this.props.onCancel : this.handleSubmit}
      >
        <div className="modal_lzr detail-content">
          <FormItem {...formItemLayout} label="身份证号:" className="clue-search-input-lzr">
            <Col span={20}>
              {getFieldDecorator('sfzh')(
                <Input placeholder="请输入身份证号" maxLength="18" />
              )}
            </Col>
            <Col span={4} className="clue-search-button">
              <Button
                disabled={this.props.isLook ? true : null}
                type="primary"
                onClick={this.handleSearch}
                loading={cluePeopleSearchResult.loading}
              >查询
              </Button>
            </Col>
          </FormItem>

          <Row gutter={2}>
            <Col span={6}>
              <div className="clue_photo">
                <div className="photo">
                  <img src={this.state.pic} />
                </div>
              </div>
            </Col>
            <Col span={18}>
              <Table
                className="clue-table"
                pagination={false}
                showHeader={false}
                size="middle"
                columns={this.columns()}
                dataSource={this.data()}
                bordered
              />
            </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}
