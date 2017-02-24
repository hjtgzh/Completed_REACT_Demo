import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col ,Modal,Popconfirm} from 'antd' 
import {fetchAreaAddress,
        fetchAreaAddressAdd,
        fetchAreaAddressDelete,
        fetchRentMessage,
        fetchRentMessageAdd,
        fetchRentMessageDelete} from 'actions/groupCarRentalBusiness'
import AddAreaAddress from '../groupModal/addAreaAddress'
import AddRentMessager from '../groupModal/addRentMessage'
/*汽车租赁业*/
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    areaAddressResult:state.areaAddressResult,
    rentMessageResult:state.rentMessageResult,
  })
)
export default class groupInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '宿迁上城区近江时代大厦A座',
      addAreaAddressVisible:false,
      addRentMessageVisible:false,
    }
    this.addAreaAddress=this.addAreaAddress.bind(this)
    this.OkAreaAddress=this.OkAreaAddress.bind(this)
    this.canceAreaAddress=this.canceAreaAddress.bind(this)
    this.addRentMessage=this.addRentMessage.bind(this)
    this.OkRentMessage=this.OkRentMessage.bind(this)
    this.canceRentMessage=this.canceRentMessage.bind(this)
    this.fetchAreaAddressDelete=this.fetchAreaAddressDelete.bind(this)
    this.fetchRentMessageDelete=this.fetchRentMessageDelete.bind(this)

  }
  //页面加载完成时
  componentDidMount() {
    //获取区域地址信息
     this.props.dispatch(fetchAreaAddress({dptId:this.props.departmentId}))
     //获取租赁信息
     this.props.dispatch(fetchRentMessage({dptId:this.props.departmentId}))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.props.dispatch(fetchAreaAddress({dptId:nextProps.departmentId}))
      this.props.dispatch(fetchRentMessage({dptId:nextProps.departmentId}))
    }
  }
  //新增区域地址弹框
  addAreaAddress(){
    this.setState({
     addAreaAddressVisible:true
    })
  }
  //新增区域地址弹框的确定
  OkAreaAddress(){
    this.setState({
      addAreaAddressVisible:false,
    })
     this.props.dispatch(fetchAreaAddress({dptId:this.props.departmentId}))
  }
  //新增区域地址弹框的取消
  canceAreaAddress(){
    this.setState({
      addAreaAddressVisible:false
    })
  }
  //删除汽车租赁区域地址
  fetchAreaAddressDelete(id){
    this.props.dispatch(fetchAreaAddressDelete({id:id},(result)=>{
       this.props.dispatch(fetchAreaAddress({dptId:this.props.departmentId}))
    }))
  }
  //新增租赁信息的弹框
  addRentMessage(){
    this.setState({
      addRentMessageVisible:true
    })
  }
  //新增租赁信息的确定
  OkRentMessage(){
    this.setState({
      addRentMessageVisible:false
    })
    this.props.dispatch(fetchRentMessage({dptId:this.props.departmentId}))
  }
  //新增租赁信息的取消
  canceRentMessage(){
    this.setState({
      addRentMessageVisible:false
    })
  }
  //租赁信息的删除
  fetchRentMessageDelete(id) {
    this.props.dispatch(fetchRentMessageDelete({id:id},(result) =>{
      this.props.dispatch(fetchRentMessage({dptId:this.props.departmentId}))
    }))
  }
  // 表格展示项的配置
  columns() {
    const _self=this
    return [
      {
        title: '物业新路名称',
        dataIndex: 'jyqy',
        key: 'jyqy',
        width:'50%'
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        width:'50%',
        render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" onConfirm={_self.fetchAreaAddressDelete.bind(this, record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        },      
      },
    ]
  }
   rentColumns() {
    const _self=this
    return [
      {
        title: '租赁人姓名',
        dataIndex: 'zlrxm',
        key: 'zlrxm',
        width:'10%'
      },
       {
        title: '地址',
        dataIndex: 'dz',
        key: 'dz',
        width:'20%'
      },
      {
        title: '联系方式',
        dataIndex: 'lxfs',
        key: 'lxfs',
        width:'20%'
      }, 
       {
        title: '车牌',
        dataIndex: 'cp',
        key: 'cp',
        width:'20%'
      },
      {
        title: '租赁路线',
        dataIndex: 'zlxlgps',
        key: 'zlxlgps',
        width:'20%'
      },
     {
      title: '操作',
      key: 'operate',
      width:'10%',
      render: function (text, record, index) {
        return (
          <Popconfirm title="删除?" onConfirm={_self.fetchRentMessageDelete.bind(this, record.id)}>
             <a>删除</a>
          </Popconfirm>
        )
      }
      }
    ]
  }
  render() {
    const {areaAddressResult,rentMessageResult}=this.props
    return (
      <div className="nav-second-nextContent">
        <Row gutter={16} className="detail-content">
          {
            <Col sm={24} md={24} lg={24}>
              <div className="content-cpp">
                <Table 
                  columns={this.columns()}
                  dataSource={areaAddressResult.list}  
                  pagination={ false}
                  scroll={{y:200}}
                  loading={areaAddressResult.loading}
                />
              </div>
              <div className="rent-table-cpp " >
                <Table 
                  columns={this.rentColumns()}  
                  dataSource={rentMessageResult.list} 
                  pagination={ false}
                  scroll={{y:200}}
                  loading={rentMessageResult.loading}
                />
              </div>
              {
              this.state.addAreaAddressVisible?
              <AddAreaAddress
                visible={true}
                onOk={this.OkAreaAddress}
                onCancel={this.canceAreaAddress}
                departmentId={this.props.departmentId}
              />:null
              }
              {
              this.state.addRentMessageVisible?
              <AddRentMessager
                visible={true}
                onOk={this.OkRentMessage}
                onCancel={this.canceRentMessage}
               departmentId={this.props.departmentId}
              />:null
              }
            </Col>
          }
        </Row>
        <div className=" ability-button">
           <Button  onClick={this.addAreaAddress}>新增区域地址</Button>
           <Button  onClick={this.addRentMessage}>新增租赁信息</Button>
        </div >
    </div>
    )
  }
}

