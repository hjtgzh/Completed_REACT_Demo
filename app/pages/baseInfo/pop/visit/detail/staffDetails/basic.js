/**
 * Created by 余金彪 on 2016/12/12.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Row, Col, Button, message, Form, Input, Select, Popconfirm, DatePicker
} from 'antd'
import {PEOPLE_SUB_MENUS} from 'utils/config'
import {
  fetchPeopleDetail,
  fetchResidentUpdate,
  fetchResidentHistory
} from 'actions/people'
import BasicModal from './basicButtonModal'

const FormItem = Form.Item
const Option = Select.Option;

@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
    peopleDetailResult: state.peopleDetailResult,
    updateBasicPeopleDetail: state.updateBasicPeopleDetail,
    amList: state.amList,
  })
)
export default class Basic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      basicForm: {
        "otherName": '',
        "serviceAdd": "",
        "relgion": "",
        "telphone": "",
        "birthTime": "",
        "familyNmae": "",
        "weChat": "",
        "health": "",
      },
      lsbz: '',
      gkzdryArr:[],
      stateModal: false,
      isShowPeople:true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.basicSubmit = this.basicSubmit.bind(this)
    this.showBasicModal = this.showBasicModal.bind(this)
    this.hideBasicModal = this.hideBasicModal.bind(this)
    this.toHistory = this.toHistory.bind(this)
  }

  componentDidMount() {
    this.searchBasicDetail()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.visitId!==nextProps.visitId){
      this.searchBasicDetail(nextProps.visitId)
    }
  }

  //查询人员详情
  searchBasicDetail(id) {
    const visitId = id||this.props.visitId
    this.props.dispatch(fetchPeopleDetail({id: visitId},
      (result)=> {
        this.setState({
          lsbz: result.data.link.lsbz,
          isShowPeople:true,
          gkzdryArr:result.data.base.gkzdry?result.data.base.gkzdry.split(";"):[]
        })
        if(result.data.link.lsbz==1){
          this.setState({
            isShowPeople:false
          })
        }else{
          this.setState({
            isShowPeople:true
          })
        }
        for (let i in result.data.base) {
          result.data.base[i] = result.data.base[i].toString()
        }
        /*if (result.data.base.csrq!=undefined) {
         result.data.base.csrq = moment(result.data.base.csrq)
         }
         if (result.data.base.whcd!=undefined) {
         result.data.base.whcd = result.data.base.whcd.toString()
         }
         if (result.data.base.hyzk!=undefined) {
         result.data.base.hyzk = result.data.base.hyzk.toString()
         }
         if (result.data.base.sfny == 0 || 1) {
         result.data.base.sfny = result.data.base.sfny.toString()
         }*/

        this.props.form.setFieldsValue(result.data.base)
      }))
  }

  showBasicModal() {
    this.setState({
      stateModal: true
    })
  }

  hideBasicModal() {
    this.setState({
      stateModal: false
    })
    this.props.searchDetails(this.props.visitId)
    this.searchBasicDetail()
  }

  //保存人员详情
  basicSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = {
        ...fieldsValue,
        csrq: fieldsValue.csrq ? fieldsValue.csrq.format('YYYY-MM-DD HH:mm:ss') : '',
        id: this.props.baseid
      }

      this.props.dispatch(fetchResidentUpdate({...values}, (result) => {
        message.success(result.msg)
        this.searchBasicDetail()
      }))
    });
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.state.basicForm[name] = value
    this.setState(
      this.state.basicForm
    )
  }

  //转为历史
  toHistory() {
    this.props.dispatch(fetchResidentHistory({id: this.props.visitId, lsbz: 1}, (result)=> {
      message.success(result.msg)
      this.setState({
        isShowPeople:false
      })
      this.searchBasicDetail()
      // document.querySelector(".ant-tabs-tab-active .anticon-close").click()
    }))
  }

  //弹出标签页
  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    const {getFieldDecorator}=this.props.form
    return (
      <div className="nav-second-nextContent">
        <div className="detail-content trf-scroll ">
          <Form style={{marginTop: 20}}>
            <Row gutter={16}>
              <Col span="12">
                <FormItem {...formItemLayout} label="别名绰号">
                  {
                    getFieldDecorator('bm', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="服务处所">
                  {
                    getFieldDecorator('fwcs', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="宗教信仰	">
                  {
                    getFieldDecorator('zjxy', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="电话号码	">
                  {
                    getFieldDecorator('dhhm', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="出生日期">
                  {
                    getFieldDecorator('csrq', {})(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="名族">
                  {
                    getFieldDecorator('mz', {})(
                      <Input placeholder="" disabled />
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="微信/QQ号	">
                  {
                    getFieldDecorator('wxqq', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="健康状况	">
                  {
                    getFieldDecorator('jkzk', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="文化程度	">
                  {
                    getFieldDecorator('whcd', {})(
                      <Select>
                        <Option value="00">博士</Option>
                        <Option value="10">研究生</Option>
                        <Option value="20">大学本科</Option>
                        <Option value="30">大专</Option>
                        <Option value="40">中专中技</Option>
                        <Option value="50">技工学校</Option>
                        <Option value="60">高中</Option>
                        <Option value="70">初中</Option>
                        <Option value="80">小学</Option>
                        <Option value="90">文盲半文盲</Option>
                      </Select>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="婚姻状况	">
                  {
                    getFieldDecorator('hyzk', {})(
                      <Select>
                        <Option value="10">未婚</Option>
                        <Option value="20">已婚</Option>
                        <Option value="30">离婚</Option>
                        <Option value="40">丧偶</Option>
                        <Option value="90">未说明</Option>
                      </Select>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="专长	">
                  {
                    getFieldDecorator('zc', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="脸型	">
                  {
                    getFieldDecorator('lxx', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="体型	">
                  {
                    getFieldDecorator('tx', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="身高	">
                  {
                    getFieldDecorator('sg', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="鞋号	">
                  {
                    getFieldDecorator('xh', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="口音	">
                  {
                    getFieldDecorator('ky', {})(
                      <Input placeholder=""/>
                    )
                  }
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem {...formItemLayout} label="是否捺印	">
                  {getFieldDecorator('sfny')(
                    <Select placeholder="">
                      <Option value="0">不是</Option>
                      <Option value="1">是</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>

          {
            this.state.stateModal?
              <BasicModal
                visible={this.state.stateModal}
                showBasicModal={this.showBasicModal}
                onCancel={this.hideBasicModal}
                baseid={this.props.baseid}
                gkzdry={this.state.gkzdryArr}
              />:null
          }
        </div>
        {
          this.state.isShowPeople?<div className="ability-button">
            <Button type="button" onClick={this.showBasicModal}>标签</Button>
            <Button type="button" onClick={this.basicSubmit}>保存</Button>
            &nbsp;&nbsp;&nbsp;
            <Popconfirm title="是否转为历史？" onConfirm={()=>this.toHistory()}>
              <Button>转为历史</Button>
            </Popconfirm>
          </div>:null
        }

      </div>
    )
  }
}
