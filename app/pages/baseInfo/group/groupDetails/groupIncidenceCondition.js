/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Row, Col, message, DatePicker, Select, Form, Spin, Input, Modal } from 'antd'
import moment from 'moment'
import {
  getIncidenceConditionList,
  getIncidenceConditionDetail,
  addIncidenceCondition,
  modifyIncidenceCondition,
  deleteIncidenceCondition,
} from 'actions/incidenceCondition'
import IncidenceConditionModal from './incidenceConditionModal'

const FormItem = Form.Item
const Option = Select.Option
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    incidenceConditionList: state.incidenceConditionList,
    incidenceConditionDetail: state.incidenceConditionDetail,
  })
)
@Form.create({})
export default class groupInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      isList: true,
      addBtnLoading: false,
      modifyBtnLoading: false,
      deleteBtnLoading: false,
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleModify = this.handleModify.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.getList = this.getList.bind(this)
  }

  componentDidMount() {
    this.getList()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.getList(nextProps.departmentId)
    }
  }
  // 获取列表
  getList(id) {
    this.props.dispatch(getIncidenceConditionList({ dptId: id||this.props.departmentId }))
  }

  // table的配置项
  columns() {
    const self = this
    return [
      {
        title: '案发编号',
        dataIndex: 'ajbh',
        key: 'ajbh',
      },
      {
        title: '案发时间',
        dataIndex: 'tjsj',
        key: 'tjsj',
        render: (text, record, index) => moment(text).format('YYYY-MM-DD'),
      },
      {
        title: '案发性质',
        dataIndex: 'ajxz',
        key: 'ajxz',
        render: (text, record, index) => {
          const arr = this.selectOptons()
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].code === text) {
              return arr[i].name
            }
          }
          return ''
        },
      },
      {
        title: '案发类别',
        dataIndex: 'ajlb',
        key: 'ajlb',
      },
      {
        title: '详细内容',
        key: 'operate',
        render: (text, record, index) => <a onClick={() => self.showDetail(record)}>详情</a>,
      },
    ]
  }

  // select的配置项
  selectOptons() {
    return [
      { code: '10', name: '刑事案件' },
      { code: '11', name: '刑事(涉毒)案件' },
      { code: '12', name: '刑事(经侦)案件' },
      { code: '20', name: '行政案件' },
      { code: '21', name: '行政(治安)案件' },
      { code: '31', name: '事件' },
      { code: '001', name: '刑事' },
      { code: '002', name: '治安' },
      { code: '003', name: '一般行政' },
    ]
  }

  // 填充网格的配置项
  options() {
    return [
      {
        label: '案件编号',
        placeholder: '请输入案件编号',
        key: 'ajbh',
        maxlength: 30,
      },
      {
        label: '发案时间',
        key: 'tjsj',
        render: () => <DatePicker placeholder="请选择发案时间" format="YYYY-MM-DD HH:mm:ss" />,
      },
      {
        label: '案件性质',
        key: 'ajxz',
        render: () =>
          <Select placeholder="请选择案件性质" style={{ width: '100%' }}>
            {
              this.selectOptons().map((v, i) => <Option value={v.code} key={i}>{v.name}</Option>)
            }
          </Select>,
      },
      {
        label: '案件类别',
        key: 'ajlb',
        placeholder: '请输入案件类别',
        maxlength: 20,
      },
    ]
  }

  // 网格模板
  gridsTemplate(o) {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={12} key={o.key} style={{/* border:'1px solid #010',margin:'-1px 0 0 -1px'*/}}>
        <FormItem
          {...layout}
          label={o.label}
        >
        {
          getFieldDecorator(o.key, {})(
            o.render ? o.render() : <Input placeholder={o.placeholder} maxLength={o.maxlength || 10} />
          )
        }
        </FormItem>
      </Col>
    )
  }
/*
  cTableOption() {
    const {getFieldDecorator}=this.props.form
    return [
    // tr
      [
      // two td
        {
          label:'案件编号',
          render:()=>{
            getFieldDecorator('ajbh', {
              rules: [{required: true, message: '请输入案发编号'}]
            })(
              <Input placeholder='请输入案发编号'/>
            )
          }
        },{
          label:'案发时间',
          render:()=>{
            getFieldDecorator('tjsj', {
              rules: [{required: true, message: '请输入案发时间'}]
            })(
              <DatePicker placeholder='请输入案发时间'/>
            )
          }
        }
      ]
    ]
  }*/

  // 查看详情
  showDetail(record) {
    this.props.dispatch(getIncidenceConditionDetail({ id: record.id }, (response) => {
      this.state.id = record.id
      response.data.tjsj = response.data.tjsj && moment(response.data.tjsj)
      this.props.form.setFieldsValue(response.data)
    }))
    this.setState({ isList: false })
  }

  // 显示新增弹窗
  showModal() {
    this.setState({ visible: true })
  }

  // 新增弹窗的确定回调
  handleOk(values) {
    // console.log('values', values)
    // console.log("新增案发情况")
    values.fasj = values.fasj && moment(values.fasj).format('YYYY-MM-DD')
    this.setState({ btnLoading: true })
    this.props.dispatch(addIncidenceCondition({ ...values, dptId: this.props.departmentId }, (response) => {
      if (response.status === 1) {
        this.setState({ addBtnLoading: false, visible: false })
        message.success('成功新增案发情况', 4)
        this.props.dispatch(getIncidenceConditionList({ dptId: this.props.departmentId }))
      }
    }))
  }

  // 新增弹窗的取消回调
  handleCancel() {
    this.setState({ visible: false })
  }

  // 保存修改
  handleModify() {
    if (!this.state.id) {
      return
    }
    const values = this.props.form.getFieldsValue()
    values.id = this.state.id
    values.dptId = this.props.departmentId
    values.tjsj = values.tjsj && moment(values.tjsj).format('YYYY-MM-DD HH:mm:ss')
    this.setState({ modifyBtnLoading: true })
    this.props.dispatch(modifyIncidenceCondition({ ...values }, (response) => {
      this.setState({ modifyBtnLoading: false })
      message.success('修改保存成功', 4)
    }))
  }

  // 删除记录
  handleDelete() {
    if (!this.state.id) {
      return
    }
    Modal.confirm({
      content: '是否删除此信息？',
      onOk: () => {
        this.setState({ deleteBtnLoading: true })
        this.props.dispatch(deleteIncidenceCondition({ id: this.state.id }, (response) => {
          this.setState({ deleteBtnLoading: false })
          this.handleReturn()
          message.success('删除成功', 4)
        }))
      },
    })
  }

  // 返回列表
  handleReturn() {
    this.state.id = undefined
    this.setState({ isList: true })
    this.getList()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isList } = this.state

    return (
      <div className="nav-second-nextContent maTop-jxy ">
        <div className="detail-content">
          {
            isList ?
              <Table
                columns={this.columns()}
                dataSource={this.props.incidenceConditionList.list}
                pagination={false}
                loading={this.props.incidenceConditionList.loading}
              /> :
              <Spin tip="" size="large" spinning={this.props.incidenceConditionDetail.loading}>
                <Row gutter={0}>
                {
                  this.options().map((v, i) => this.gridsTemplate(v))
                }
                </Row>
                <Row gutter={0}>
                  <FormItem
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                    label={'备注'}
                  >
                  {
                    getFieldDecorator('bz', {})(
                      <Input type="textarea" placeholder="请输入备注" maxLength="250" />
                    )
                  }
                  </FormItem>
                </Row>
              </Spin>

          }
          <div className="ability-button">
            {
              isList ?
                <Button type="ghost" onClick={this.showModal} className="ability-button-right">新增案发情况</Button> :
                <div>
                  <Button
                    type="ghost"
                    onClick={this.handleDelete}
                    className="ability-button-right"
                    loading={this.state.deleteBtnLoading}
                  >删除发案情况</Button>
                  <Button
                    type="ghost"
                    onClick={this.handleModify}
                    className="ability-button-right"
                    loading={this.state.modifyBtnLoading}
                  >保存发案情况</Button>
                  <Button
                    type="ghost"
                    onClick={this.handleReturn}
                    className="ability-button-right"
                  >返回列表</Button>
                </div>
            }
          </div>
          {
            this.state.visible ?
              <IncidenceConditionModal
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                title={'发案情况'}
                btnLoading={this.state.addBtnLoading}
                // preData={this.props.incidenceConditionDetail}
              /> : null
          }
        </div>
      </div>
    )
  }
}

