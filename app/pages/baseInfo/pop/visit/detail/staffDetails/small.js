/**
 * Created by 余金彪 on 2016/11/23.
 *  editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {
  Row, Col, Button, message, Table, Form, Input, Select, Popconfirm,
} from 'antd'
import {
  fetchDetail,
  fetchSave,
  fetchGetBindArticle,
  fetchUnBind,
  fetchGetOperator,
} from 'actions/people'
import GroupSlowlySmallAddPeo from './addPeopleModal'
import GroupSlowlySmallAddModal from './addStateMoadl'
import GroupSlowlySmallRelated from './relationModal'

const Option = Select.Option
const FormItem = Form.Item
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
    peopleDetailResult: state.peopleDetailResult,
    amList: state.amList,
  })
)
export default class Small extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      addModal: false,
      related: false,
      openPeoModal: false,
      openRelated: false,
      list: [],
      data: [],
      wpId: '',
    }
    this.showModal = this.showModal.bind(this)
    this.relatedArticles = this.relatedArticles.bind(this)
    this.onAddCancel = this.onAddCancel.bind(this)
    this.openModal = this.openModal.bind(this)
    this.showAddPeoModal = this.showAddPeoModal.bind(this)
    this.hideAddPeoModal = this.hideAddPeoModal.bind(this)
    this.clearPeople = this.clearPeople.bind(this)
    this.showRelatedModal = this.showRelatedModal.bind(this)
    this.hideRelatedModal = this.hideRelatedModal.bind(this)
    this.saveDetail = this.saveDetail.bind(this)
    this.showPeople = this.showPeople.bind(this)
  }

  componentDidMount() {
    this.searchSmall()
    this.searchAddWP()
  }

  //查询低慢小
  searchSmall() {
    this.props.dispatch(fetchDetail({ baseId: this.props.baseid }, (result) => {
      for (const i in result.data) {
        result.data[i] = result.data[i].toString()
      }
      this.props.form.setFieldsValue(result.data)
    }))
  }

  //查询低慢小操作人
  searchAddWP() {
    this.props.dispatch(fetchGetBindArticle({ bdrId: this.props.baseid }, (result) => {
      this.setState({
        list: result.data,
      })
    }))
  }

  showModal() {
    this.setState({
      addModal: true,
    })
  }

  openModal(id) {
    const self = this
    return function () {
      self.setState({
        wpId: id,
        openPeoModal: true,
      })
    }
  }

  showPeople(id) { // 显示操作人
    const self = this
    return function () {
      self.props.dispatch(fetchGetOperator({ wpId: id }, (result) => {
        self.setState({
          data: result.data,
        })
      }))
    }
  }

  //删除低慢小操作人
  clearPeople(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchUnBind({ id: id }, (result) => {
        message.success(result.msg)
        self.searchAddWP()
      }))
    }
  }

  onAddCancel() {
    this.setState({
      addModal: false,
    })
    this.searchAddWP()
  }

  relatedArticles() {
    this.setState({
      related: true,
    })
  }

  showRelatedModal() {
    this.setState({
      openRelated: true,
    })
  }

  hideRelatedModal() {
    this.setState({
      openRelated: false,
    })
    this.searchAddWP()
  }

  showAddPeoModal() {
    this.setState({
      openPeoModal: true,
    })
  }

  hideAddPeoModal() {
    this.props.form.resetFields()
    this.setState({
      openPeoModal: false,
    })
  }

  //保存低慢小
  saveDetail(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, fieldsValue) => {
      if (errors) {
        return;
      }
      const values = {
        ...fieldsValue,
        baseId: this.props.baseid,
      };
      this.props.dispatch(fetchSave({ ...values }, (result) => {
        message.success(result.msg)
        this.searchSmall()
      }))
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const self = this
    const columns = [
      {
        title: '低慢小序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '低慢小名称',
        dataIndex: 'wpmc',
        key: 'wpmc',
      },
      {
        title: '持有人',
        dataIndex: 'wpcyr',
        key: 'wpcyr',
      },
      {
        title: '持有人身份证',
        dataIndex: 'cyrsfz',
        key: 'cyrsfz',
      },
      {
        title: '操作',
        dataIndex: 'dmxcz',
        key: 'dmxcz',
        render: function (text, record, index) {
          return (
            <span>
              <Popconfirm title="是否解绑?" onConfirm={self.clearPeople(record.wpId)}>
                <a className="left">解绑</a>
              </Popconfirm>
              <a className="right" onClick={self.openModal(record.wpId)}>增加操作人</a>
            </span>
          );
        },
      },
      {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail',
        render: function (text, record, index) {
          return (
            <span>
              <a className="yu-a" onClick={self.showPeople(record.wpId)}>操作人</a>
              <Link className="right" to={`/goods$Tabs/${record.wpId}`}>详情</Link>
            </span>
          );
        },
      },

    ];
    const articles = [
      {
        title: '操作人序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'czrxm',
        key: 'czrxm',
      },
      {
        title: '身份证',
        dataIndex: 'czrsfz',
        key: 'czrsfz',
      },
      {
        title: '电话',
        dataIndex: 'czrlxdh',
        key: 'czrlxdh',
      },
      {
        title: '工作单位',
        dataIndex: 'czrgzdw',
        key: 'czrgzdw',
      },
      {
        title: '操作时间',
        dataIndex: 'czsj',
        key: 'czsj',
      },
      {
        title: '有无航空器驾驶执照',
        dataIndex: 'ywzz',
        key: 'ywzz',
      },
      {
        title: '执照号',
        dataIndex: 'zzhm',
        key: 'zzhm',
      },

    ];
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    return (
      // 低慢小持有人
      <div className="nav-second-nextContent">
        <div className="detail-content trf-scroll ">
          <Form >
            <Row gutter={16}>
              <Col span="12">
                <FormItem {...formItemLayout} label="物品排查日期">
                  {
                    getFieldDecorator('tjsjLabel')(
                      <Input type="text" readOnly disabled />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="物品管控民警">
                  {
                    getFieldDecorator('gkmj')(
                      <Input type="text" readOnly disabled />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="物品管控单位">
                  {
                    getFieldDecorator('gkdw')(
                      <Input type="text" readOnly disabled />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="管控级别">
                  {getFieldDecorator('gkjb')(
                    <Select placeholder="">
                      <Option value="1">一级</Option>
                      <Option value="2">二级</Option>
                      <Option value="3">三级</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="责任书签订">
                  {getFieldDecorator('sfqdzrs')(
                    <Select placeholder="">
                      <Option value="0">否</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span="24">
                <Table
                  columns={columns}
                  bordered
                  dataSource={this.state.list}
                  pagination={false}
                />
              </Col>
              <Col span="24">
                <Table
                  columns={articles}
                  bordered
                  dataSource={this.state.data}
                  pagination={false}
                />
              </Col>
            </Row>
          </Form>
          {
            <GroupSlowlySmallAddPeo
              visible={this.state.openPeoModal}
              showAddPeoModal={this.showAddPeoModal}
              onCancel={this.hideAddPeoModal}
              baseId={this.props.baseid}
              wpId={this.state.wpId}
            />
          }
          {
            <GroupSlowlySmallAddModal
              visible={this.state.addModal}
              showModal={this.showModal}
              onCancel={this.onAddCancel}
              baseId={this.props.baseid}
            />
          }
          {
            <GroupSlowlySmallRelated
              visible={this.state.openRelated}
              showAddPeoModal={this.showRelatedModal}
              onCancel={this.hideRelatedModal}
              baseId={this.props.baseid}
            />
          }
        </div>
        <div className="ability-button">
          <Button onClick={this.showModal}>新增物品</Button>
          <Button onClick={this.showRelatedModal}>关联物品</Button>
          <Button onClick={this.saveDetail}>保存</Button>
        </div>
      </div>

    )
  }
}
