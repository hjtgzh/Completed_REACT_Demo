import React, { Component } from 'react'
import { Table, Button, Tabs, Modal, Input } from 'antd'
import { connect } from 'react-redux'
import {fetchBuildingResult,fetchRoomResult} from 'actions/people'
// import './style.css'

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
       searchBuildingResult: state.searchBuildingResult,
       searchRoomResult: state.searchRoomResult,
    })
)

export default class GlAddress extends Component{
  constructor(props){
    super(props)
    this.state={
      info:{
        buildingcode:'',
        roomcode:'',
        xzdz:'123'
      },
      searchBuildingResult:[
        {code:'01',name:'宿迁上城区近江时代大厦A座'},
        {code:'02',name:'宿迁下城区'},
        {code:'03',name:'宿迁江干区'},
        {code:'04',name:'宿迁下城区1'}
      ],
      searchRoomResult:[
        {code:'01',name:'1001'},
        {code:'02',name:'102'},
        {code:'03',name:'103'},
        {code:'04',name:'104'},
        {code:'05',name:'105'}
      ],
      buildingResult:[],
      roomResult:[],
      buildingName:'',
      roomName:'',
      isShowBuildingResult:false,
      isShowRoomResult:false,
    }
    this.handleOk=this.handleOk.bind(this)
    //地址信息的搜索
    this.inputBuilding=this.inputBuilding.bind(this)
    //户室信息的搜索
    this.inputRoom=this.inputRoom.bind(this)
  }
  handleOk(){
    this.props.onOk(this.state.info)
  }
  //地址下拉信息的选中
  clickBuildingItem(code,name){
    this.setState({buildingName:name})
    this.state.info.buildingcode=code
    this.state.info.xzdz=name+this.state.roomName
    this.setState({isShowBuildingResult:false})
  }
  //房间下拉信息的选中
  clickRoomItem(code,name){
    this.setState({roomName:name})
    this.state.info.roomcode=code
    this.state.info.xzdz=this.state.buildingName+name
    this.setState({isShowRoomResult:false})
  }
  //
  inputBuilding(e){
    const v=e.target.value
    this.setState({buildingName:v})
    const buildingResult=[]
    //debugger
    this.props.dispatch(fetchBuildingResult({ name: v }))
    if(!v){
      this.setState({isShowBuildingResult:false})
    }else{
      this.setState({isShowBuildingResult:true})
    }
    State({buildingResult:buildingResult})
  }

  inputRoom(e){
    const v=e.target.value
    this.setState({roomName:v})
    this.props.dispatch(fetchRoomResult({ name: v }))
    if(!v){
      this.setState({isShowRoomResult:false})
    }else{
      this.setState({isShowRoomResult:true})
    }
  }
  //初始化加载
  componentDidMount() {
      // this.props.dispatch(fetchBuildingResult({ name: v }))
      // this.props.dispatch(fetchRoomResult({ name: v }))
    }
  render(){
    /* const { searchBuildingResult,
      searchRoomResult
    } = this.props*/
    return (
    <Modal className='sideModal' visible={this.props.visible} title={'标准地址'} onOk={this.handleOk} onCancel={this.props.onCancel}>
      <section style={{position:'relative'}}>
        <span style={{fontSize:'16px',paddingLeft:'14px'}}>地址信息</span><Input style={{width:'61%',margin:'10px 0px 10px 10px'}} value={this.state.buildingName} placeholder='请输入地址' onChange={this.inputBuilding}/>
          {this.state.isShowBuildingResult?
          <div className='cpp-underList'>
            <ul>
              {this.state.searchBuildingResult.map((v,i)=><li key={v.code}  onClick={this.clickBuildingItem.bind(this,v.code,v.name)}>{v.name}</li>)}
            </ul>
          </div>:null
          }   
      </section>
      <section style={{position:'relative'}}>
        <span style={{fontSize:'16px',paddingLeft:'14px'}}>户室信息</span><Input style={{width:'61%',margin:'10px 0px 10px 10px'}} placeholder='请输入户室' value={this.state.roomName}  onChange={this.inputRoom}/>
          {this.state.isShowRoomResult?
          <div className='cpp-underList'>
            <ul>
               { this.state.searchRoomResult.map((v,i)=><li key={v.code}  onClick={this.clickRoomItem.bind(this,v.code,v.name)}>{v.name}</li>)}
            </ul>
          </div>:null
          }
      </section>
    </Modal>
      )
  }
}
