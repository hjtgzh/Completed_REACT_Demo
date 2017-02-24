/*物流托运业*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col ,Modal,Popconfirm} from 'antd' 
import {
        fetchLogisticsRoad,
        fetchLogisticsRoadAdd,
        fetchLogisticsRoadDelete,
        fetchCarMessage,
        fetchCarMessageAdd,
        fetchCarMessageDelete,
        fetchLogisticsMsg,
        fetchLogisticsMsgAdd,
        fetchLogisticsMsgDelete
      } from 'actions/groupLogisticsIndustry'
import AddCarMessage from '../groupModal/addCarMessage'
import AddLogisticsRoad from '../groupModal/addLogisticsRoad'
import AddLogisticsMessage from '../groupModal/addLogisticsMessage'

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    logisticsRoadResult:state.logisticsRoadResult,
    carMessageResult:state.carMessageResult,
    logisticsMsgResult:state.logisticsMsgResult
  })
)
export default class groupInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '宿迁上城区近江时代大厦A座',
      addLogisticsRoad:false,
      addCarMessage:false,
      addLogisticsMessage:false,
      //departmentId:''

    }
    // this.addLogisticsRoad=this.addLogisticsRoad.bind(this)
    this.addLogisticsRoad=this.addLogisticsRoad.bind(this)
    this.canceLogisticsRoad=this.canceLogisticsRoad.bind(this)
    this.addCarMessage=this.addCarMessage.bind(this)
    this.OkCarMessage=this.OkCarMessage.bind(this)
    this.canceCarMessage=this.canceCarMessage.bind(this)
    this.logisticsRoadDelete=this.logisticsRoadDelete.bind(this)
    this.carMessageDelete=this.carMessageDelete.bind(this)
    this.OkLogisticsRoad=this.OkLogisticsRoad.bind(this)
    this.addLogisticsMsg=this.addLogisticsMsg.bind(this)
    //在这里无效
    // this.OkLogisticsMsg==this.OkLogisticsMsg.bind(this)
    this.cancelLogisticsMsg=this.cancelLogisticsMsg.bind(this)
    this.logisticsMsgDelete=this.logisticsMsgDelete.bind(this)

  }
  //页面加载完成
  componentDidMount() {
    //物流线路信息的查询
    this.searchDetailDepartment()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.searchDetailDepartment(nextProps.departmentId)
    }
  }
  searchDetailDepartment(id){
    const departmentId=id||this.props.departmentId
     //const departmentId = id || this.props.departmentId || this.props.params.departmentId || 1
      this.props.dispatch(fetchLogisticsRoad({dptId:departmentId}))
    //车辆信息的查询
     this.props.dispatch(fetchCarMessage({dptId:departmentId}))
     //物流线路信息的查询
     this.props.dispatch(fetchLogisticsMsg({dptId:departmentId}))
    /* this.setState({
      departmentId:this.props.departmentId
     })*/
  }
  //新增物流线路
  addLogisticsRoad(){
    this.setState({
      addLogisticsRoad:true
    })
  }
  //新增物流线路弹框的确定
  OkLogisticsRoad(){
    this.setState({
      addLogisticsRoad:false
    })
    this.props.dispatch(fetchLogisticsRoad({dptId:this.props.departmentId}))
  }
  //新增物流线路弹框的取消
  canceLogisticsRoad(){
    this.setState({
      addLogisticsRoad:false
    })
  }
  //删除物流线路
  logisticsRoadDelete(id){
    this.props.dispatch(fetchLogisticsRoadDelete({id:id},(result) =>{
    this.props.dispatch(fetchLogisticsRoad({dptId:this.props.departmentId}))
    }))
  }
  //新增收发货信息的弹框
  addLogisticsMsg(){
    this.setState({
      addLogisticsMessage:true
    })
  }
  //物流信息的新增
  OkLogisticsMsg(){
    this.setState({
      addLogisticsMessage:false
    })
    this.props.dispatch(fetchLogisticsMsg({dptId:this.props.departmentId}))
  }
  //新增收发货信息弹框的取消按钮
  cancelLogisticsMsg(){
    this.setState({
      addLogisticsMessage:false
    })
    //this.props.dispatch(fetchLogisticsMsgAdd({dptId:this.props.departmentId}))
  }
  //物流信息的删除
  logisticsMsgDelete(id){
     this.props.dispatch(fetchLogisticsMsgDelete({id:id},(result) =>{
    this.props.dispatch(fetchLogisticsMsg({dptId:this.props.departmentId}))
    }))
  }
  //新增车辆信息的弹框
  addCarMessage(){
    this.setState({
      addCarMessage:true
    })
  }
  //新增车辆信息的确定
  OkCarMessage(){
    this.setState({
      addCarMessage:false
    })
    this.props.dispatch(fetchCarMessage({dptId:this.props.departmentId}))
  }
  //新增车辆信息的取消
  canceCarMessage(){
    this.setState({
      addCarMessage:false
    })
  }
  //车辆信息的删除
  carMessageDelete(id){
    this.props.dispatch(fetchCarMessageDelete({id:id},(result) =>{
    this.props.dispatch(fetchCarMessage({dptId:this.props.departmentId}))
    }))
  }
  // 表格展示项的配置
  columns() {
    const _self=this
    return [
      {
        title: '物业新路名称',
        dataIndex: 'wlxl',
        key: 'wlxl',
        width:'50%'
      },
      {
        title: '操作',
        key: 'operate',
        width:'50%',
        render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" onConfirm={_self.logisticsRoadDelete.bind(this, record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        }
      }, 
    ]
  }
  //车辆信息的表头
  carColumns() {
    const _self=this
    return [
      {
        title: '车牌号',
        dataIndex: 'cph',
        key: 'cph',
        width:'50%'
      },
      {
        title: '操作',
        key: 'operate',
        width:'50%',
         render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" onConfirm={_self.carMessageDelete.bind(this, record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        }
      }, 
    ]
  }
   sendGoodsColumns() {
    const _self=this
    return [
      {
        title: '货物信息',
        dataIndex: 'wlxx',
        key: 'wlxx',
        width:'10%'
      },
       {
        title: '收件人',
        dataIndex: 'sjrxm',
        key: 'sjrxm',
        width:'10%'
      },
       {
        title: '收件人地址',
        dataIndex: 'sjrdz',
        key: 'sjrdz',
         width:'15%'
      },
      {
        title: '收件人联系方式',
        dataIndex: 'sjrlxfs',
        key: 'sjrlxfs',
        width:'15%'
      }, 
      {
        title: '寄件人',
        dataIndex: 'jjrxm',
        key: 'jjrxm',
         width:'10%'
      },
       {
        title: '寄件人地址',
        dataIndex: 'jjrdz',
        key: 'jjrdz',
        width:'15%'
      },
      {
        title: '寄件人联系方式',
        dataIndex: 'jjrlxfs',
        key: 'jjrlxfs',
        width:'15%'
      },
     {
        title: '操作',
        key: 'operate',
        width:'10%',
        render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" onConfirm={_self.logisticsMsgDelete.bind(this, record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        }
      }
    ]
  }
  render() {
    const {logisticsRoadResult,carMessageResult,logisticsMsgResult } =this.props
    return (
      <div className="nav-second-nextContent">
        <Row gutter={16} className="detail-content ">
          {
            <Col sm={24} md={24} lg={24}>
              <div className="content-cpp">
                <Table 
                  columns={this.columns()}  
                  dataSource={logisticsRoadResult.list}
                  pagination={false}
                  scroll={{y:150}}
                  loading={logisticsRoadResult.loading}
                />

              </div>
                <div className="rent-table-cpp" >
                <Table 
                  columns={this.carColumns()}  
                  dataSource={carMessageResult.list}
                  pagination={false}
                  scroll={{y:150}}
                  loading={carMessageResult.loading}
                />
              </div>
              <div className="rent-table-cpp" >
               <Table 
                  columns={this.sendGoodsColumns()}  
                  dataSource={logisticsMsgResult.list}
                  pagination={false}
                  scroll={{y:150}}
                  loading={logisticsMsgResult.loading}
                />
              </div>
               {
                this.state.addLogisticsRoad?
                <AddLogisticsRoad
                  visible={true}
                  onOk={this.OkLogisticsRoad}
                  onCancel={this.canceLogisticsRoad}
                  departmentId={this.props.departmentId}
                />:null
              }
              {
                this.state.addCarMessage?
                <AddCarMessage
                  visible={true}
                  onOk={this.OkCarMessage}
                  onCancel={this.canceCarMessage}
                  departmentId={this.props.departmentId}
                />:null
              }
               {
                this.state.addLogisticsMessage?
                <AddLogisticsMessage
                  visible={true}
                  onOk={this.OkLogisticsMsg.bind(this)}
                  onCancel={this.cancelLogisticsMsg}
                  departmentId={this.props.departmentId}
                />:null
              }
            </Col>
          }
        </Row>
        <div  className="ability-button" >
           <Button  onClick={this.addLogisticsRoad}>新增物流线路</Button>
           <Button  onClick={this.addCarMessage}>新增车辆信息</Button>
           <Button  onClick={this.addLogisticsMsg.bind(this)}>新增车辆信息发货信息</Button>
        </div>
      </div>
    )
  }
}

