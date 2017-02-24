import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col ,Form,Input,DatePicker} from 'antd'
import {fetchFireMessage,fetchFireUpdate}from 'actions/groupFireworksUnit'
import moment from 'moment';
const createForm = Form.create
// 烟花爆竹从业单位
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fireResult:state.fireResult,
  })
)
@Form.create({
  onFieldsChange(props, items) {
  },
})
export default class fireInfo extends Component {
  constructor(props) {
    super(props)
    this.state={
        xksj:''//许可时间
    }
    this.saveFire=this.saveFire.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.dateSelect = this.dateSelect.bind(this)
  }
  //时间的选择
   onChangeDate(date, dateString) {
    this.setState({
      xksj:dateString
    })
  } 
 /*  function disabledDate(current){
     return current && current.valueOf()<Date.now()
    }
  function range(start,end){
    const result=[]
    for(let i=start;i<end;i++){
      result.push(i)
    }
    return result;
  }
  function disableDateTime(){
    return{
      disabledHours: () =>range(0,24).splice(4,20),
      disabledMinures: () =>range(30,60),
      disabledSeconds:()=>[55,56]
    }
  }*/
  //查找烟花爆竹单位的信息
  componentDidMount() {
   // {dptId:}
    this.searchFireWorks()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.searchFireWorks(nextProps.departmentId)
    }
  }
  searchFireWorks(id){
    this.props.dispatch(fetchFireMessage({dptId:id||this.props.departmentId},(result)=>{
      if(result.data==undefined){
        result.data={
          xksj:"",
          dwlb:"",
          snxkdw:"",
          swxkdw:"",
          zgdw:"",
          dwxkqk:"",
          zzdj:"",
          qtzz:"",
        }
      }
      this.props.form.setFieldsValue(result.data)
    }))
  }
  //保存烟花爆竹从业单位
  saveFire(e) {
   e.preventDefault();
   debugger
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      values.xksj=this.state.xksj
      this.props.dispatch(fetchFireUpdate({...values,dptid:this.props.departmentId},() =>{
        this.props.dispatch(fetchFireMessage({dptId:this.props.departmentId}))
      }))
    });
  }
  dateSelect(){
    console.log(arguments)
    debugger
  }
  render() {
   const { getFieldDecorator } = this.props.form;
   const{fireResult}=this.props
    return (
      <div className="nav-second-nextContent">
        <Row gutter={16} className="detail-content ">
          {
            <Col sm={24} md={24} lg={24}>
              <div className="hotal-table-cpp content-cpp">
                <table >
                  <tbody>
                    <tr>
                      <td>许可时间</td>
                      <td>
                      {getFieldDecorator('xksj')(<Input maxLength='20' disabled/>)}
                       
                      </td>
                      <td>单位类别</td>
                      <td>{getFieldDecorator('dwlb')(<Input maxLength='20' />)}</td>
                    </tr>
                    <tr>
                      <td>室内许可单位</td>
                      <td>
                         {getFieldDecorator('snxkdw')(<Input  maxLength='30'/>)}
                      </td>
                      <td>室外许可单位</td>
                      <td >
                       {getFieldDecorator('swxkdw')(<Input  maxLength='30'/>)}
                      </td>
                    </tr>
                    <tr>
                      <td>主管单位</td>
                      <td>
                        {getFieldDecorator('zgdw')(<Input  maxLength='30'/>)}
                      </td>
                      <td>单位许可情况</td>
                      <td>
                        {getFieldDecorator('dwxkqk')(<Input  maxLength='100'/>)}
                      </td>
                    </tr>
                    <tr>
                      <td>资质等级</td>
                      <td>
                       {getFieldDecorator('zzdj')(<Input  maxLength='20'/>)}
                      </td>
                      <td>其他资质</td>
                      <td>
                        {getFieldDecorator('qtzz')(<Input  maxLength='20'/>)}
                      </td>
                    </tr>
                  </tbody>
                </table>
               
              </div>
            </Col>
          }
        </Row>
        <div className="ability-button">
          <Button  onClick={this.saveFire}>保存</Button>
        </div>
      </div>
    )
  }
}
