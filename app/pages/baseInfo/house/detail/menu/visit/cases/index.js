import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs ,Modal,Row,Col,Input,Popconfirm,message} from 'antd'
import Panel from 'components/panel'
import WindowSize from 'components/windowSize'
import AddCaseMessage from './Modal/lawModal'
import {
        fetchCaseMsg,
        fetchCaseMsgAdd,
        fetchCaseMsgDetail,
        fetchCaseMsgUpdate,
        fetchCaseMsgDelete
        } from 'actions/houseAddressDetail'
import TableList from 'components/tableList/tableList'
import './style.css'

const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      caseMsgSearchResult:state.caseMsgSearchResult
    })
)

// 声明组件  并对外输出
export default class cases extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      activeTab: 'pop' ,
      addCaseMessage:false,
    }
    this.showModal=this.showModal.bind(this)
    this.OkCaseMessage = this.OkCaseMessage.bind(this)
    this.canceCaseMessage = this.canceCaseMessage.bind(this)
    this.updateState = this.updateState.bind(this)
    this.handleShowCaseMsg=this.handleShowCaseMsg.bind(this)
    this.deleteData=this.deleteData.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchCaseMsg({bldid:this.props.houseId,fjid:this.props.roomId },(result)=>{
      console.log(result)
    }))
  }

  componentWillReceiveProps(nextProps){
    if(this.props.roomId!==nextProps.roomId){
      this.props.dispatch(fetchCaseMsg({bldid:nextProps.houseId,fjid:nextProps.roomId },(result)=>{
        console.log(result)
      }))
    }
  }

  //删除案件
  deleteData(id) {
    this.props.dispatch(fetchCaseMsgDelete({id: id}, () => {
       this.props.dispatch(fetchCaseMsg({bldid:this.props.houseId,fjid:this.props.roomId }))
    }))
  }
  columns() {
    const _self=this
    return [
        {
          title:'发案时期',
          dataIndex: 'fssjStr',
          key:'fssjStr',
        },
        {
          title:'案件编号',
          dataIndex: 'ajbh',
          key:'ajbh'
        },
        {
          title:'案件类别',
          dataIndex: 'ajlb',
          key:'ajlb'
        },
        {
          title:'案件名称',
          dataIndex: 'ajmc',
          key:'ajmc'
        },
        {
          title:'操作',
          dataIndex: 'handle',
          key:'handle',
          render: function (text, record, index) {
          return (
            <p>
             {/*<a onClick={_self.handleShowCaseMsg.bind(_self,record.id)}>详情</a>*/}
              <Popconfirm title="删除该案件?" onConfirm={_self.deleteData.bind(_self,record.id)}>
                <a>删除</a>
              </Popconfirm>
            </p>
            )
        }
        },
      ]
  }
  //点击弹框的一系列操作
  handleShowCaseMsg(id){
    //this.state.id=id
    //console.log(this.state.id)
    this.setState({addCaseMessage:true}) 
  }
  //表单的确定
  OkCaseMessage(params){
    params.bldid=this.props.houseId;
    params.fjid=this.props.roomId;
    console.log(params)
    this.props.dispatch(fetchCaseMsgAdd(params,()=>{
     message.success("关联案件成功")
    this.props.dispatch(fetchCaseMsg({bldid:this.props.houseId,fjid:this.props.roomId}))
     this.setState({addCaseMessage:false})
    
    }))
    this.props.dispatch(fetchCaseMsg({bldid:this.props.houseId,fjid:this.props.roomId }))
  }
  canceCaseMessage(){
    this.setState({addCaseMessage:false})
  }
  //关联档案的弹框
  showModal(){
    this.setState({
      addCaseMessage:true
    })
  }
  updateState() {
    this.setState({})
  }

  render() {
    const {caseMsgSearchResult}=this.props
    return (
      <div className="detail-content">
        <p className="address_detail_ytt">{this.props.fullName}</p>
        <span className="cases-title">共有：{caseMsgSearchResult.totalCase}个案件， 可防性案件回访 即将到期： {caseMsgSearchResult.kyCase} 个</span>
        <div style={{ height: $GLOBALCONFIG.PAGEHEIGHT - 150 + 'px', overflowY: 'auto', overflowX: 'hidden' }}>
          <WindowSize updateState={this.updateState} />
            <TableList
             loading={false}
            dataSource={caseMsgSearchResult.list} 
            columns={this.columns()}
          />
         
        </div>
        <div className="ability-button">
          <Button onClick={this.showModal}>关联案件</Button>
        </div>
        {
          this.state.addCaseMessage?
          <AddCaseMessage
            visible={true}
            onOk={this.OkCaseMessage}
            onCancel={this.canceCaseMessage}
            bldid={this.props.houseId}
            fjid={this.props.roomId}
          />:null
        }
      </div>
    )
  }
}
