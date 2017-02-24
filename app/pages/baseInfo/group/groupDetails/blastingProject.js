/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Table, Button, Row, Col, Form, Select, Input, DatePicker, Spin, message, Modal } from 'antd'
import {
  getBlastingProjectList,
  saveBlastingProject,
  deleteBlastingProject,
  addBlastingProject,
  getBlastingProjectDetail,
} from 'actions/groupBlastingUnit'
import BlastingProjectModal from './blastingProjectModal'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const layout2 = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}
@connect(
  (state, props) => ({
    config: state.config,
    blastingProjectResult: state.blastingProjectResult,
  })
)
@Form.create({})

export default class blastingProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isList: true,
    }
    // this.handleClick=this.handleClick.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleModify = this.handleModify.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillMount() {
    this.getList()
  }

  // 获取列表
  getList() {
    this.props.dispatch(getBlastingProjectList({ dptId: this.props.departmentId || 32 }))
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

  // 填充网格模板的配置项
  options() {
    return [
      {
        label: '爆破项目名称',
        placeholder: '请输入爆破项目名称',
        key: 'bpxmname',
      },
      {
        label: '爆破作业地址',
        placeholder: '请输入爆破作业地址',
        key: 'dz',
      },
      {
        label: '爆破设计单位',
        placeholder: '请输入爆破设计单位',
        key: 'bpsjdw',
      },
      {
        label: '爆破作业单位',
        placeholder: '请输入爆破作业单位',
        key: 'bpzydw',
      },
      {
        label: '设计审核人员',
        placeholder: '请输入设计审核人员',
        key: 'sjshry',
      },
      {
        label: '爆破作业人员',
        placeholder: '请输入爆破作业人员',
        key: 'bpzyry',
      },
      {
        label: '安全评估单位',
        placeholder: '请输入安全评估单位',
        key: 'aqpgdw',
      },
      {
        label: '评估人员',
        placeholder: '请输入评估人员',
        key: 'pgry',
      },
      {
        label: '安全监理单位',
        placeholder: '请输入安全监理单位',
        key: 'aqjldw',
      },
      {
        label: '监理人员',
        placeholder: '请输入监理人员',
        key: 'jlry',
      },
      {
        label: '炸药用量估算',
        placeholder: '请输入炸药用量估算',
        key: 'zyylgs',
      },
      {
        label: '单次爆破最大药量',
        placeholder: '请输入单次爆破最大药量',
        key: 'dcbpzdyl',
      },
      {
        label: '索类用量',
        placeholder: '请输入索类用量',
        key: 'slyl',
      },
      {
        label: '爆破作业施工时限',
        placeholder: '请输入爆破作业施工时限',
        key: 'bpzysgsx',
      },
      {
        label: '计划爆破次数',
        key: 'jhbpcs',
        placeholder: '请输入计划爆破次数',
      },
      {
        label: '爆破器材储存地点',
        key: 'bpqcccdd',
        placeholder: '请输入爆破器材储存地点',
      },
      // {
      //   label:'爆破作业开始时间',
      //   key:'bpstarttime',
      //   render:()=><DatePicker placeholder='请选择爆破作业开始时间'/>
      // },
      // {
      //   label:'爆破作业结束时间',
      //   key:'bpendtime',
      //   render:()=><DatePicker placeholder='请选择爆破作业结束时间'/>
      // },
      {
        label: '所属辖区',
        key: 'ssxq',
        placeholder: '请输入所属辖区',
      },
      {
        label: '爆破项目类别',
        key: 'bplb',
        render: () => (
          <Select placeholder="请输入爆破项目类别" style={{ width: '100%' }}>
            <Option value="1">矿山</Option>
            <Option value="2">非矿山</Option>
          </Select>),
      },
    ]
  }

  // table列的配置项
  columns() {
    return [
      {
        title: '爆破项目名称',
        dataIndex: 'bpxmname',
        key: 'bpxmname',
      },
      {
        title: '爆破作业地址',
        dataIndex: 'dz',
        key: 'dz',
      },
      {
        title: '爆破设计单位',
        dataIndex: 'bpsjdw',
        key: 'bpsjdw',
      },
      {
        title: '爆破作业单位',
        dataIndex: 'bpzydw',
        key: 'bpzydw',
      },
      {
        title: '详细内容',
        render: (text, record, index) => <Button type="primary" onClick={() => this.goToDetail(record)}>详情</Button>,
      },
    ]
  }

  // 显示详情
  goToDetail(record) {
    this.setState({ isList: false })
    this.setState({ isLoadingDetail: true })
    this.setState({ dptId: record.dptId })
    this.setState({ id: record.id })
    this.props.dispatch(getBlastingProjectDetail({ id: record.id }, (response) => {
      this.setState({ isLoadingDetail: false })
      const bpstarttime = response.data.bpstarttime && moment(response.data.bpstarttime)
      const bpendtime = response.data.bpendtime && moment(response.data.bpendtime)
      response.data.bplb = response.data.bplb && String(response.data.bplb)
      response.data.bpzysj = [bpstarttime, bpendtime]
      // console.log('response:',response.data)
      this.props.form.setFieldsValue(response.data)
    }))
  }

  // 弹出添加的窗口
  handleAdd() {
    this.setState({ visible: true })
  }

  // 返回列表
  handleReturn() {
    this.getList()
    this.setState({ isList: true, dptId: undefined,id:undefined })
  }

  // 保存修改
  handleModify() {
    this.setState({ MbtnLoading: true })
    const request = { ...this.props.form.getFieldsValue(), id: this.state.id }
    request.bpstarttime = request.bpzysj[0] && moment(request.bpzysj[0]).format('YYYY-MM-DD')
    request.bpendtime = request.bpzysj[1] && moment(request.bpzysj[1]).format('YYYY-MM-DD')
    this.props.dispatch(saveBlastingProject(request, (response) => {
      this.setState({ MbtnLoading: false })
      if (response.status === 1) {
        message.success('修改成功', 4)
      }
    }))
  }

  // 删除记录
  handleDelete() {
    const self = this
    Modal.confirm({
      title: '',
      content: '是否删除此信息？',
      onOk() {
        self.setState({ DbtnLoading: true })
        self.props.dispatch(deleteBlastingProject({ id: self.state.id }, (response) => {
          self.setState({ DbtnLoading: false })
          if (response.status === 1) {
            message.success('删除成功')
            self.handleReturn()
          } else {
            message.error(response.msg)
          }
        }))
      },
      onCancel() {},
    })
  }

  // 添加新记录
  handleOk(value) {
    // console.log(value)
    value.dptId = this.props.departmentId || 32
    value.bpstarttime = value.bpstarttime && moment(value.bpstarttime).format('YYYY-MM-DD')
    value.bpendtime = value.bpendtime && moment(value.bpendtime).format('YYYY-MM-DD')
    this.setState({ AbtnLoading: true })
    this.props.dispatch(addBlastingProject(value, (response) => {
      this.setState({ AbtnLoading: false })
      if (response.status === 1) {
        message.success('新增成功')
        this.setState({ visible: false })
        this.getList()
      } else {
        message.error(response.msg)
      }
    }))
  }

  // 关闭添加信息的窗口
  handleCancel() {
    this.setState({ btnLoading: false })
    this.setState({ visible: false })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="detail-content">
        {
          this.state.isList ?
            <Table
              dataSource={this.props.blastingProjectResult.list}
              loading={this.props.blastingProjectResult.loading}
              columns={this.columns()}
              pagination={false}
              scroll={{ x: 1000, y: true }}
            /> :
            <Spin tip="" size="large" spinning={this.state.isLoadingDetail} style={{overflowX:'hidden'}}>
              <Row gutter={0}>
               {
                this.options().map((v, i) => this.gridsTemplate(v))
               }
              </Row>
              <Row>
                <FormItem
                  {...layout2}
                  label="爆破作业时间"
                >
                {
                  getFieldDecorator('bpzysj', {})(
                    <RangePicker placeholder={['请选择爆破作业开始时间', '请选择爆破作业结束时间']} />
                  )
                }
                </FormItem>
              </Row>
            </Spin>
        }
        {
          this.state.isList ?
            <div className="ability-button">
              <Button onClick={this.handleAdd}>新增</Button>
            </div> :
            <div className="ability-button">
              <Button onClick={this.handleReturn}>返回列表</Button>
              <Button onClick={this.handleModify} loading={this.state.MbtnLoading}>修改</Button>
              <Button onClick={this.handleDelete} loading={this.state.DbtnLoading}>删除</Button>
            </div>
        }
        {
          this.state.visible ?
            <BlastingProjectModal
              id={this.state.id}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              btnLoading={this.state.AbtnLoading}
              title="爆破项目基本信息"
            /> : null
        }
      </div>
    )
  }
}
