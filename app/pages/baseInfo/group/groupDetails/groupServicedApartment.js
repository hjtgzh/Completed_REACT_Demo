/*酒店式公寓*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col ,Modal,Form,Popconfirm} from 'antd' 
import {
        fetchOwnerMessage,
        fetchOwnerMessageAdd,
        fetchOwnerMessageDelete,
        fetchRenterMessage,
        fetchRenterMessageAdd,
        fetchRenterMessageDelete
      } from 'actions/groupServicedApartment'
import AddOwner from '../groupModal/addOwner'
import AddRenter from '../groupModal/addRenter'
const createForm = Form.create
const FormItem = Form.Item

@Form.create({})
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    ownerMessageResult:state.ownerMessageResult,
    renterMessageResult:state.renterMessageResult,
  })
)
export default class groupInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '宿迁上城区近江时代大厦A座',
      addOwnerVisible:false,
      addRenterVisible:false,
    }
    this.addOwner=this.addOwner.bind(this)
    this.OkaddOwner=this.OkaddOwner.bind(this)
    this.canceAddOwner=this.canceAddOwner.bind(this)
    this.addRenter=this.addRenter.bind(this)
    this.OkaddRenter=this.OkaddRenter.bind(this)
    this.canceAddRenter=this.canceAddRenter.bind(this)
    this.handleOwnerDelete = this.handleOwnerDelete.bind(this)
    this.handleRenterDelete = this.handleRenterDelete.bind(this)
  }
  //页面加载完成时
  componentDidMount() {
    //业主信息的查询
    const departmentId=this.props.departmentId
     this.props.dispatch(fetchOwnerMessage({dptId:departmentId}))
    //租赁信息的查询
     this.props.dispatch(fetchRenterMessage({dptId:departmentId}))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.props.dispatch(fetchOwnerMessage({dptId:nextProps.departmentId}))
      //租赁信息的查询
      this.props.dispatch(fetchRenterMessage({dptId:nextProps.departmentId}))
    }
  }
  //新增业主的弹框
  addOwner(){
    this.setState({
      addOwnerVisible:true
    })
  }
  //新增业主弹框的确定
  OkaddOwner(){
    this.setState({
      addOwnerVisible:false,
    })
    this.props.dispatch(fetchOwnerMessage({dptId:this.props.departmentId}))
  }
  //新增业主弹框的取消
  canceAddOwner(){
    this.setState({
      addOwnerVisible:false
    })
  }
  //业主信息的删除
  handleOwnerDelete(id) {
    this.props.dispatch(fetchOwnerMessageDelete({id:id},(result) =>{
      this.props.dispatch(fetchOwnerMessage({dptId:this.props.departmentId}))
    }))
  }
  //新增租客的弹框
  addRenter(){
    this.setState({
      addRenterVisible:true
    })
  }
  //新增租客的确定
  OkaddRenter(){
    this.setState({
      addRenterVisible:false
    })
    this.props.dispatch(fetchRenterMessage({dptId:this.props.departmentId}))
  }
  //新增租客的取消
  canceAddRenter(){
    this.setState({
      addRenterVisible:false
    })
  }
  //租客信息的删除
  handleRenterDelete(id){
    this.props.dispatch(fetchRenterMessageDelete({id:id},(result) =>{
    this.props.dispatch(fetchRenterMessage({dptId:this.props.departmentId}))
    }))
  }
  // 表格展示项的配置
  columns() {
    const _self=this
    return [
      {
        title: '物业公司负责人',
        dataIndex: 'wygsfzr',
        key: 'wygsfzr',
         width:'10%'
      },
      {
        title: '联系方式',
        dataIndex: 'lxdh',
        key: 'lxdh',
        width:'10%'
      },
      {
        title: '业主姓名',
        dataIndex: 'yzxm',
        key: 'yzxm',
         width:'10%'
      },
      {
        title: '业主户籍地址',
        dataIndex: 'yzhjdz',
        key: 'yzhjdz',
        width:'20%'
      },
      {
        title: '业主实际居住地址',
        dataIndex: 'yzsjjzdz',
        key: 'yzsjjzdz',
        width:'20%'
      },
      {
        title: '业主联系方式',
        dataIndex: 'yzlxfs',
        key: 'yzlxfs',
        width:'20%'
      },
      {
        title: '操作',
         key: 'operate',
         width:'10%',
         render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" onConfirm={_self.handleOwnerDelete.bind(this, record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        }
      }, 
    ]
  }
   rentColumns() {
    const _self=this
    return [
      {
        title: '物业公司负责人',
        dataIndex: 'xm',
        key: 'xm',
        width:'10%'
      },
       {
        title: '户籍地址',
        dataIndex: 'hjdz',
        key: 'hjdz',
        width:'20%'
      },
       {
        title: '租客情况',
        dataIndex: 'sjjzryqk',
        key: 'sjjzryqk',
        width:'20%'
      },
      {
        title: '联系方式',
        dataIndex: 'lxfs',
        key: 'lxfs',
        width:'20%'
      }, 
      {
        title: '门禁卡信息',
        dataIndex: 'mjkxx',
        key: 'mjkxx',
        width:'20%'
      },
     {
        title: '操作',
        key: 'operate',
        width:'10%',
        render: function (text, record, index) {
          return (
            <Popconfirm title="删除?" onConfirm={_self.handleRenterDelete.bind(this, record.id)}>
              <a>删除</a>
            </Popconfirm>
          )
        }
      }
    ]
  }
  render() {
    const{ 
      ownerMessageResult,
      renterMessageResult
    }=this.props
    return (
      <div className="nav-second-nextContent">
        <Row gutter={16} className="detail-content ">
          {
            <Col sm={24} md={24} lg={24}>
              <div className=" content-cpp">
                <Table 
                  columns={this.columns()}
                  dataSource={ownerMessageResult.list}
                  pagination={ false}
                  scroll={{y:200}}
                  loading={ownerMessageResult.loading}
                />
              </div>
              <div className="rent-table-cpp" >
                <Table 
                  columns={this.rentColumns()} 
                  dataSource={renterMessageResult.list} 
                  pagination={ false}
                  scroll={{y:200}}
                  loading={renterMessageResult.loading}
                />
              </div>
              {
                this.state.addOwnerVisible?
                <AddOwner
                  visible={true}
                  onOk={this.OkaddOwner}
                  onCancel={this.canceAddOwner}
                  departmentId={this.props.departmentId}
                />:null
              }
              {
                this.state.addRenterVisible?
                <AddRenter
                  visible={true}
                  onOk={this.OkaddRenter}
                  onCancel={this.canceAddRenter}
                  departmentId={this.props.departmentId}
                />:null
              }
            </Col>
          }
        </Row>
        <div className="ability-button">
           <Button  onClick={this.addOwner}>新增业主</Button>
           <Button  onClick={this.addRenter}>新增租客</Button>
        </div>
      </div>
    )
  }
}

