/**
 * Deleted by 叶婷婷
 * 无用，系统功能完整后，可删除
 */
//import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Form, Checkbox, Button,Input} from 'antd';
//import {fetchQrcodeBind } from 'actions/houseVisitPop'
//const createForm = Form.create
//const FormItem = Form.Item
//const CheckboxGroup = Checkbox.Group;
//
//@Form.create({
//  	/*onFieldsChange(props, items) {
//    console.log(props)
//    console.log(items)
//    // props.cacheSearch(items);
//  },*/
//})
////连接公用常量、后端返回的数据方法  并放置在props里面调用
//@connect(
//  (state, props) => ({
//    config: state.config,
//    qrcodeBindSearchResult: state.qrcodeBindSearchResult,
//  })
//)
//
//export default class household extends Component{
//  constructor(props){
//    super(props)
//    // debugger
//    this.state={
//      info:{
//        buildingcode:'',
//        roomcode:'',
//        xzdz:'123'
//      },
//      dataSource:[{code:'01',name:'e鄂尔多斯'},{code:'02',name:'鄂尔多斯'}],
//      buildingResult:[],
//      roomResult:[],
//      buildingName:'',
//      roomName:'',
//      isShowBuildingResult:false,
//      isShowRoomResult:false,
//    }
//    this.inputBuilding=this.inputBuilding.bind(this)
//    this.inputRoom=this.inputRoom.bind(this)
//    this._closeUnderList=this._closeUnderList.bind(this)
//  }
//  componentWillReceiveProps(nextProps){
//    if(nextProps.searchBuildingResult!=this.props.searchBuildingResult){
//      if(nextProps.searchBuildingResult.state==1){
//        this.setState({isShowBuildingResult:true})
//      }
//    }
//    if(nextProps.searchRoomResult!=this.props.searchRoomResult){
//      if(nextProps.searchRoomResult.state==1){
//        this.setState({isShowRoomResult:true})
//      }
//    }
//  }
//  // 组件已经加载到dom中
//  componentDidMount() {
//    this.props.dispatch(fetchQrcodeBind())
//  }
//
//    // 选择地址
//    clickBuildingItem(code,name){
//      /*this.setState({buildingName:name})
//      this.state.info.buildingcode=code
//      this.state.info.xzdz=name+this.state.roomName
//      this.setState({isShowBuildingResult:false})*/
//    }
//    // 选择户室
//    clickRoomItem(code,name){
//      /*this.setState({roomName:name})
//      this.state.info.roomcode=code
//      this.state.info.xzdz=this.state.buildingName+name
//      this.setState({isShowRoomResult:false})*/
//    }
//    // 输入并查询其匹配的地址
//    inputBuilding(e){
//      /*const _self=this
//      clearTimeout(bTimer)
//      const v=e.target.value
//      this.setState({buildingName:v})
//      if(!v){
//        return
//      }
//      bTimer=setTimeout(function(){
//        _self.props.dispatch(fetchBuildingResult({ name: v }),function(data){
//          if(data.state==1){
//            this.setState({isShowBuildingResult:true})
//          }
//        })
//      },500)*/
//    }
//    // 输入并查询其匹配的户室
//    inputRoom(e){
//      /*const _self=this
//      clearTimeout(rTimer)
//      const v=e.target.value
//      this.setState({roomName:v})
//      if(!v){
//        return
//      }
//      rTimer=setTimeout(function(){
//        _self.props.dispatch(fetchRoomResult({ name: v }),function(data){
//          if(data.state==1){
//            _self.setState({isShowRoomResult:true})
//          }
//        })
//      },500)*/
//    }
//    // 关闭模糊查询的下拉栏
//    _closeUnderList(){
//    /*console.log("close");
//    this.setState({isShowBuildingResult:false,isShowRoomResult:false})*/
//  }
//
//
//
//	render(){
//		const {
//        qrcodeBindSearchResult,
//        //hasSubmitBtn,
//        //hasResetBtn,
//    } = this.props
//
//    const formItemLayout={
//      labelCol: { span: 4 },
//      wrapperCol: { span: 18 },
//    }
//    // const { getFieldDecorator } = this.props.form
//    const { getFieldProps } = this.props.form
//    // 地址信息验证
//    const addressValidate=getFieldProps('address',{
//     /* rules:[
//        {required:true,message:'请使用下拉栏中搜索出来的地址',type:'string'}
//      ]*/
//    })
//    // 户室信息验证
//    const roomValidate=getFieldProps('room',{
//      /*rules:[
//        {required:true,message:'room Error'}
//      ]*/
//    })
//		return (
//      <section style={{height:'100%'}} onClick={this._closeUnderList}>
//      <Form horizontal>
//        <FormItem
//          {...formItemLayout}
//              label="地址信息"
//              hasFeedback
//              style={{position:'relative'}}
//        >
//              <Input {...addressValidate} type='text' placeholder="请输入地址" value={this.state.buildingName} onChange={this.inputBuilding}/>
//              {this.state.isShowBuildingResult?
//              <div className='underList'>
//                <ul>
//                  { this.props.searchBuildingResult.list.map((v,i)=><li key={v.code}  onClick={this.clickBuildingItem.bind(this,v.code,v.name)}>{v.name}</li>)}
//                </ul>
//              </div>:null
//            }
//        </FormItem>
//            <FormItem
//              {...formItemLayout}
//              label="户室信息"
//              hasFeedback
//              style={{position:'relative'}}
//            >
//              <Input type='text' placeholder="请输入户室信息" value={this.state.roomName} onChange={this.inputRoom}/>
//              {this.state.isShowRoomResult?
//                <div className='underList'>
//                  <ul>
//                    {this.props.searchRoomResult.list.map((v,i)=><li key={v.code}  onClick={this.clickRoomItem.bind(this,v.code,v.name)}>{v.name}</li>)}
//                  </ul>
//                </div>
//                :null
//          }
//            </FormItem>
//      </Form>
//      </section>
//    )
//	}
//}