/*建筑工地*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchBuildingMessage,fetchSaveBuilding} from 'actions/groupBuildingSites'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col ,Form,Input,DatePicker,message} from 'antd'
import moment from 'moment';
const createForm = Form.create
const FormItem = Form.Item
@Form.create({
  onFieldsChange(props, items) {
  },
})
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    buildingResult:state.buildingResult,
  })
)
export default class groupInfo extends Component {
  constructor(props) {
    super(props)
     this.state = {
       kssj:"",//开始时间
       jssj:""//结束时间
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.onChangeBeginDate=this.onChangeBeginDate.bind(this)
    this.onChangeEndDate=this.onChangeEndDate.bind(this)
  }
  //组件加载完成时
  componentDidMount() {
    this.searchSites()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.searchSites(nextProps.departmentId)
    }
  }
  searchSites(id){
    //查询建筑工地的信息
    this.props.dispatch(fetchBuildingMessage({dptId:id||this.props.departmentId},(result)=>{
      const data = this.props.buildingResult;
      this.props.form.setFieldsValue({
        gdmc: data.gdmc ? data.gdmc : '', 
        gdszsq: data.gdszsq ? data.gdszsq : '', 
        gdszxz: data.gdszxz ? data.gdszxz : '', 
        jsdw: data.jsdw ? data.jsdw : '', 
        jsdwfzr: data.jsdwfzr ? data.jsdwfzr : '',
        fzrsfz: data.fzrsfz ? data.fzrsfz : '', 
        lxdh: data.lxdh ? data.lxdh : '', 
        bz: data.bz ? data.bz : '', // 备注
        kssjStr: (data.kssjStr ? moment(data.kssjStr) : null), // 开始时间
        jssjStr: (data.jssjStr ? moment(data.jssjStr) : null), // 结束时间
      });
      
      //this.props.form.setFieldsValue(result.data)
    }))
  }
  //开始时间
  onChangeBeginDate(date, dateString) {
    this.setState({
      kssj:dateString
    })
  }
  //结束时间
  onChangeEndDate(date,dateString){
    this.setState({
      jssj:dateString
    })
  }
  // 保存按钮
  handleSubmit(e) {
   e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      values.kssj=this.state.kssj
      values.jssj=this.state.jssj
      if(this.state.kssj >= this.state.jssj){
        message.error("施工结束时间应该大于施工开始时间")
      }else{
         this.props.dispatch(fetchSaveBuilding({...values,dptId:this.props.departmentId},() =>{
        this.props.dispatch(fetchBuildingMessage({dptId:this.props.departmentId}))
      }))
      }
    });
  }
  checkChange(rule, value, callback) {
    if(isNaN(value)){
       callback("只能输入数字")
    }
    callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const {buildingResult}=this.props
    return (
      <div className="nav-second-nextContent">
        <Row gutter={16} className="detail-content">
          {
            <Col sm={24} md={24} lg={24}>
              <div className="hotal-table-cpp content-cpp">
               <table >
                  <thead>
                    <tr><th colSpan="10">建筑工地</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="1">工地名称</td>
                      <td colSpan="4">
                        {getFieldDecorator('gdmc')(
                          <Input maxLength='20'/>
                        )}
                        </td>
                      <td colSpan="1">工地所在社区</td>
                      <td colSpan="4"> 
                        {getFieldDecorator('gdszsq')(
                          <Input maxLength='30'/>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">工地所在地详址</td>
                      <td colSpan="9">{getFieldDecorator('gdszxz')(<Input maxLength='30' />)}</td>
                    </tr>
                    <tr>
                      <td colSpan="1">施工开始日期</td>
                      <td colSpan="4">
                         {getFieldDecorator('kssjStr')(
                            <DatePicker  showTime format="YYYY-MM-DD" onChange={this.onChangeBeginDate} />
                           /*<DatePicker value={(buildingResult.kssjStr ? moment(buildingResult.kssjStr) : null)} onChange={this.onChangeBeginDate}/>*/
                        )}
                      </td>
                      <td colSpan="1">施工结束日期</td>
                      <td colSpan="4">
                        {getFieldDecorator('jssjStr')(
                            <DatePicker  showTime format="YYYY-MM-DD" onChange={this.onChangeEndDate} />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">建设单位</td>
                      <td colSpan="4">
                        {getFieldDecorator('jsdw')(<Input maxLength='20'/>)}
                      </td>
                      <td colSpan="1">建设单位负责人</td>
                      <td colSpan="4">
                        {getFieldDecorator('jsdwfzr')(<Input maxLength='20'/>)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">负责人身份证</td>
                      <td colSpan="4">
                        {getFieldDecorator('fzrsfz')(<Input maxLength='30' disabled/>)}
                      </td>
                      <td colSpan="1">负责人联系电话</td>
                      <td colSpan="4">
                        {getFieldDecorator('lxdh',{
                          //rules: [{validator:this.checkChange}],
                        })(<Input maxLength='11'/>)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">备注</td>
                      <td colSpan="9">{getFieldDecorator('bz')(<Input maxLength='100'/>)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          }
        </Row>
        <div className="ability-button">
          <Button  onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
