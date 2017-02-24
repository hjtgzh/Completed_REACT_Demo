import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import   './address.css'
import { Card, Row, Col ,Radio,Button,Icon,Modal,notification ,message,Spin} from 'antd'
import {
  //管辖单位
  fetchUnitSubStationList,
  fetchUnitPoliceStationList,
  fetchUnitResponseAreaList,
  fetchUnitSubstationRelDivision,
  fetchUnitEditRelationOfDivision,
  fetchResponseAreaAdd,
  fetchResponseAreaUpdate,
  //行政区划
  fetchCountyList,//获取区县列表
  fetchStreetList,//获取街道列表
  fetchVillageCommitteeList,//获取社区列表
  fetchDivisionRelUnit,//获取行政区划关联的管辖单位
  fetchUpdateDivisionRelUnit,//修改行政区划关联的管辖单位
  fetchGetLoadOrVillageGroupList,//根据村居委会id和类型查询1：道路；3：村组；
  fetchGetAreaAddressList,//根据村居委会id查询街路巷列表(区域地址)
 } from 'actions/houseAddress'
import DivisionSelect from './addressModal/policeSelect'
import FindPolice from './addressModal/findPolice'
import AddressContact from './addressModal/addressContact'
import ResponseArea from './addressModal/responseArea'
import AddPolice from './addressModal/addPolice'
import AddContactAddress from './addressModal/addContactAddress'

//区划管理
const RadioButton=Radio.Button
const RadioGroup=Radio.RadioGroup;
//连接公用常量。后端返回数据。并放置在props里面调用
@connect(
  (state,props) =>({
      config:state.config,
      //管辖单位
      unitSubStationListResult:state.unitSubStationListResult,
      unitPoliceStationListResult:state.unitPoliceStationListResult,
      unitResponseAreaResult:state.unitResponseAreaResult,
      unitSubstationRelDivisionResult:state.unitSubstationRelDivisionResult,
      unitEditRelationOfDivisionResult:state.unitEditRelationOfDivisionResult,
      responseAreaResult:state.responseAreaResult,
      responsePoliceResult:state.responsePoliceResult,
      policeListResult:state.policeListResult,
      policeAddResult:state.policeAddResult,
      responsePoliceDeleteResult:state.responsePoliceDeleteResult,
      responseAddressResult:state.responseAddressResult,
      cognateAddressListResult:state.cognateAddressListResult,
      addAddressResult:state.addAddressResult,
      responseAddressDeleteResult:state.responseAddressDeleteResult,
      //行政区划
      countyListSearchResult: state.countyListSearchResult,
      streetListSearchResult: state.streetListSearchResult,
      villageCommitteeListSearchResult: state.villageCommitteeListSearchResult,
      getDivisionRelUnitResult: state.getDivisionRelUnitResult,
      updateDivisionRelUnitResult: state.updateDivisionRelUnitResult,
      getLoadOrVillageGroupListResult: state.getLoadOrVillageGroupListResult,
      getAreaAddressListResult: state.getAreaAddressListResult,
    })
  )
//行政区划
export default class districtDivision extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢',
      tabStateValue:1,
      jurisdictionUnitVisible:{
          display:'block'
      },
      districtDivisionVisible:{
          display:'none'
      },
      //管辖单位
      addressContactVisible:false,
      addContactAddress:false,
      findPoliceVisible: false,
      addPoliceVisible:false,
      responseAreaVisible:false,
      RoleVisible: false,
      selectedSubstationGxdwdm:"",//当前选中分局管辖单位代码
      selectedPolicestationGxdwdm:"",//当前选中派出所管辖单位代码
      curPolicestationId:'',//当前选中派出所Id
      divisionParentId:'',
      divisionSelectTitle:'',
      subStationList:[],//分局
      policeStationList:[],//派出所
      responseAreaList:[],//责任区
      selectedDivisionIds: [],
      defaultDivisions: [],
      editDivisionType:"",// 标识当前是分局还是派出所在编辑行政区划
      curResAreaId:"",//当前责任区id
      curResAreaName:"",//当前责任区name
      curPcsdm:"",//当前派出所代码
      curResAreadm:"",//当前责任区代码
      //行政区划
      countryList:[],//区县
      selctedCountryXzqhdm:"",//当前选中区县区县代码
      streetList:[],//街道
      selectedStreetXzqhdm:"",//当前选中街道区县代码
      selectedVillageXzqhdm:"",//当前选中村区县代码
      villageList:[],//村
      loadList:[],//道路
      areaAddressList:[],//区域地址
      villageGroupList:[],//村组
      loading:true
    }
    this.handleOkEditRaleteDivision = this.handleOkEditRaleteDivision.bind(this)
    this.editDivisionClick=this.editDivisionClick.bind(this)
    this.subStationClick=this.subStationClick.bind(this)
    this.handleCancelEditRaleteDivision = this.handleCancelEditRaleteDivision.bind(this)
    this.cancelResponseArea=this.cancelResponseArea.bind(this)
    this.okResponseArea=this.okResponseArea.bind(this)
    this.policeStationClick=this.policeStationClick.bind(this)
    this.addResponseArea=this.addResponseArea.bind(this)
    this.resAreaEdit=this.resAreaEdit.bind(this)
    this.findPolice=this.findPolice.bind(this)
    this.cancelFindPolice=this.cancelFindPolice.bind(this)
    this.cancelAddressContact=this.cancelAddressContact.bind(this)
    this.addPolice=this.addPolice.bind(this)
    this.cancelAddPolice=this.cancelAddPolice.bind(this)
    this.addContactAddress=this.addContactAddress.bind(this)
    this.cancelAddContactAddress=this.cancelAddContactAddress.bind(this)
    this.districtDivision=this.districtDivision.bind(this)
    this.jurisdictionUnit=this.jurisdictionUnit.bind(this)

    this.countryClick=this.countryClick.bind(this)
    this.streetClick=this.streetClick.bind(this)
    this.villageClick=this.villageClick.bind(this)
    this.editXzqhDivisionClick=this.editXzqhDivisionClick.bind(this)
  }

  onChange(e) {
   console.log(`radio checked:${e.target.value}`)
  }
  componentDidMount() {
    //获取分局的列表
    this.props.dispatch(fetchUnitSubStationList({parentdm:'321300', hasXzqh:1},()=>{
      this.setState({
        subStationList:this.props.unitSubStationListResult.list
      })
    }))
    // 获取区县的列表
    this.props.dispatch(fetchCountyList({parentdm: '321300', hasGxdw: 1},()=>{
      this.setState({
        countryList:this.props.countyListSearchResult.list,
        loading:false
      })
    }))
  }
  //管辖单位
  jurisdictionUnit(){
    this.setState({
      tabStateValue:1,
      districtDivisionVisible:{display:'none'},
      jurisdictionUnitVisible:{display:'block'}
    })
  }
  //行政区划
  districtDivision(){
    this.setState({
      tabStateValue:2,
      jurisdictionUnitVisible:{display:'none'},
      districtDivisionVisible:{display:'block'}
    })
  }

  //编辑行政区划
  editDivisionClick(stationCode,type,event){
    //获取分局/派出所对应的行政区划
    this.props.dispatch(fetchUnitSubstationRelDivision({id :stationCode},()=>{
      let checkedArr=[];
      let checkedNameArr=[];
      let defaultArr=[];
      this.props.unitSubstationRelDivisionResult.list.map(item=>{
        let obj={
          label:item.xzqhqc,
          value:item.id
        }
        defaultArr.push(obj)
        if(item.sfxz==1){
          checkedArr.push(item.id);
          checkedNameArr.push((item.xzqhqc));
        }
      })
      let title=(type=="substation"?"分局：":"派出所：")+checkedNameArr.join(",");
      this.setState({
        divisionSelectTitle:title,
        selectedDivisionIds: checkedArr,
        defaultDivisions: defaultArr,
        RoleVisible: true,
        divisionParentId:stationCode,
        editDivisionType:type
      })
    }))
    event.stopPropagation();
  }
  handleOkEditRaleteDivision(query) {
    if(this.state.editDivisionType=="substation"||this.state.editDivisionType=="policestation") {
      this.props.dispatch(fetchUnitEditRelationOfDivision({gxdwId: this.state.divisionParentId, xzqhIds: query}, () => {
        if (this.state.editDivisionType == "substation") {
          this.props.dispatch(fetchUnitSubStationList({parentdm: '321300', hasXzqh: 1}, () => {
            this.setState({
              subStationList: this.props.unitSubStationListResult.list,
              RoleVisible: false,
              selectedSubstationGxdwdm:"",
              policeStationList:[],
              responseAreaList:[],
              selectedPolicestationGxdwdm:"",
              curPolicestationId:""
            })
          }))
        } else if (this.state.editDivisionType == "policestation") {
          this.props.dispatch(fetchUnitPoliceStationList({parentdm: this.state.selectedSubstationGxdwdm, hasXzqh: 1}, () => {
            this.setState({
              RoleVisible: false,
              policeStationList: this.props.unitPoliceStationListResult.list,
              responseAreaList: [],
              selectedPolicestationGxdwdm:"",
              curPolicestationId:""
            })
          }))
        }
        message.success('操作成功')
      }))
    }else{
      this.props.dispatch(fetchUpdateDivisionRelUnit({xzqhId: this.state.divisionParentId, gxdwIds: query}, () => {
        if (this.state.editDivisionType == "country") {
          this.setState({
            RoleVisible: false,
            selctedCountryXzqhdm:"",
            streetList:[],
            selectedStreetXzqhdm:"",
            villageList:[],
            selectedVillageXzqhdm:"",
            loadList:[],
            areaAddressList:[],
            villageGroupList:[],
          })
          this.props.dispatch(fetchCountyList({parentdm: '321300', hasGxdw: 1}, () => {
            this.setState({
               countryList: this.props.countyListSearchResult.list,
            })
          }))
        }else if(this.state.editDivisionType == "street"){
          this.setState({
            RoleVisible: false,
            villageList:[],
            selectedVillageXzqhdm:"",
            selectedStreetXzqhdm:"",
            loadList:[],
            areaAddressList:[],
            villageGroupList:[],
          })
          this.props.dispatch(fetchStreetList({parentdm:this.state.selctedCountryXzqhdm, hasGxdw:1},()=>{
            this.setState({
              streetList:this.props.streetListSearchResult.list
            })
          }))
        }
        message.success('操作成功')
      }))
    }
  }
  //取消修改关联行政区划
  handleCancelEditRaleteDivision() {
    this.setState({RoleVisible: false})
  }
  //点击当前分局查询派出所
  subStationClick(stationCode){
    this.setState({
      selectedSubstationGxdwdm: stationCode,
      policeStationList:[],
      responseAreaList:[],
      selectedPolicestationGxdwdm:"",
      curPolicestationId:""
    })
    this.props.dispatch(fetchUnitPoliceStationList({parentdm:stationCode, hasXzqh:1},()=>{
      this.setState({
        policeStationList:this.props.unitPoliceStationListResult.list
      })
    }))
  }
  //点击当前派出所下的责任区
  policeStationClick(policeStation){
    this.setState({
      selectedPolicestationGxdwdm: policeStation.gxdwdm,
      curPolicestationId:policeStation.id,
      responseAreaList:[],
    })
    this.props.dispatch(fetchUnitResponseAreaList({parentdm:policeStation.gxdwdm, hasXzqh:1},()=>{
      this.setState({
        responseAreaList:this.props.unitResponseAreaResult.list
      })
    }))
  }
  //点击责任区的添加，判断所属派出所的policeStationId是否存在。存在弹框出现
  addResponseArea(){
    if (this.state.curPolicestationId) {
      this.setState({
        responseAreaVisible:true,
        curResAreaId:"",
        curResAreaName:''
      })
    }else {
      message.info('请先选择派出所')
    }
  }
  //责任区修改
  resAreaEdit(resArea){
    this.setState({
      responseAreaVisible:true,
      curResAreaId:resArea.id,
      curResAreaName:resArea.gxdwqc,
    })
  }
  //责任区弹框的取消
  cancelResponseArea(){
    this.setState({
      responseAreaVisible:false,
      curResAreaId:"",
      curResAreaName:''
    })
  }
  //责任区弹框的确认
  okResponseArea(values){
    if(this.state.curResAreaId==""){
      this.props.dispatch(fetchResponseAreaAdd({gxdwId:this.state.curPolicestationId, name:values.resAreaName},()=>{
        this.setState({
          responseAreaVisible: false,
          curResAreaId:"",
          curResAreaName:""
        })
        this.props.dispatch(fetchUnitResponseAreaList({parentdm:this.state.selectedPolicestationGxdwdm, hasXzqh:1},()=>{
          this.setState({
            responseAreaList:this.props.unitResponseAreaResult.list
          })
        }))
        message.success('操作成功')
      }))
    }else{
      this.props.dispatch(fetchResponseAreaUpdate({id:this.state.curResAreaId, name:values.resAreaName},()=>{
        this.setState({
          responseAreaVisible: false,
          curResAreaId:"",
          curResAreaName:""
        })
        this.props.dispatch(fetchUnitResponseAreaList({parentdm:this.state.selectedPolicestationGxdwdm, hasXzqh:1},()=>{
          this.setState({
            responseAreaList:this.props.unitResponseAreaResult.list
          })
        }))
        message.success('操作成功')
      }))
    }
  }
  //查看民警
  findPolice(resArea){
    console.log(resArea)
      this.setState({
      findPoliceVisible:true,
      curResAreaId:resArea.id,
      curPcsdm:resArea.pcsdm,
    })
  }
  //取消查看民警
  cancelFindPolice(){
    this.setState({
      findPoliceVisible:false,
      curResAreaId:"",
      curPcsdm:"",
    })
  }
  //新增民警弹框
  addPolice(){
    this.setState({
    findPoliceVisible:false,
    addPoliceVisible:true})
  }
  //新增民警的返回
  cancelAddPolice(){
    this.setState({
      addPoliceVisible:false,
      findPoliceVisible:true
    })
  }
  //关联地址
  addressContact(resArea){
    this.setState({
      addressContactVisible:true,
      curResAreadm:resArea.gxdwdm,
      curPcsdm:resArea.pcsdm,
    })
  }
  //关联地址弹框的取消
  cancelAddressContact(){
    this.setState({
      addressContactVisible:false,
      curResAreadm:"",
      curPcsdm:"",
    })
  }
  //关联地址的新增
  addContactAddress(){
    this.setState({
      addressContactVisible:false,
      addContactAddress:true,
    })
  }
  //新增关联地址的取消
  cancelAddContactAddress(){
    this.setState({
      addContactAddress:false,
      addressContactVisible:true
    })
  }
  //----行政区划------
  //编辑行政区划下的管辖单位
  editXzqhDivisionClick(stationCode,type,event){
    //获取区县/街道对应的行政区划
    this.props.dispatch(fetchDivisionRelUnit({id :stationCode},()=>{
      let checkedArr=[];
      let checkedNameArr=[];
      let defaultArr=[];
      this.props.getDivisionRelUnitResult.list.map(item=>{
        let obj={
          label:item.gxdwqc,
          value:item.id
        }
        defaultArr.push(obj)
        if(item.sfxz==1){
          checkedArr.push(item.id);
          checkedNameArr.push((item.gxdwqc));
        }
      })
      let title=(type=="country"?"区、县（市）：":"街、道（镇）：")+checkedNameArr.join(",");
      this.setState({
        divisionSelectTitle:title,
        selectedDivisionIds: checkedArr,
        defaultDivisions: defaultArr,
        RoleVisible: true,
        divisionParentId:stationCode,
        editDivisionType:type
      })
    }))
    event.stopPropagation();
  }

  //点击区县
  countryClick(code){
    this.setState({
      selctedCountryXzqhdm: code,
      villageList:[],
      selectedVillageXzqhdm:"",
      selectedStreetXzqhdm:"",
      loadList:[],
      areaAddressList:[],
      villageGroupList:[],
    })
    this.props.dispatch(fetchStreetList({parentdm:code, hasGxdw:1},()=>{
      this.setState({
        streetList:this.props.streetListSearchResult.list
      })
    }))
  }
  //点击街道
  streetClick(code){
    this.setState({
      selectedStreetXzqhdm:code,
      selectedVillageXzqhdm:"",
      loadList:[],
      areaAddressList:[],
      villageGroupList:[],
    })
    this.props.dispatch(fetchVillageCommitteeList({parentdm:code, hasGxdw:1},()=>{
      this.setState({
        villageList:this.props.villageCommitteeListSearchResult.list
      })
    }))
  }
  //点击社区、村
  villageClick(item){
    this.setState({
      selectedVillageXzqhdm:item.xzqhdm,
    })
    this.props.dispatch(fetchGetLoadOrVillageGroupList({cjwhId:item.id, sblx:1},()=>{
      this.setState({
        loadList:this.props.getLoadOrVillageGroupListResult.list
      })
    }))
    this.props.dispatch(fetchGetAreaAddressList({cjwhDm:item.xzqhdm},()=>{
      this.setState({
        areaAddressList:this.props.getAreaAddressListResult.list
      })
    }))
    this.props.dispatch(fetchGetLoadOrVillageGroupList({cjwhId:item.id, sblx:3},()=>{
      this.setState({
        villageGroupList:this.props.getLoadOrVillageGroupListResult.list
      })
    }))
  }
  render() {
    const {
    unitSubStationListResult,//分局
    unitPoliceStationListResult,//派出所
    getLoadOrVillageGroupListResult,//村组
    getAreaAddressListResult,//区域地址
    streetListSearchResult,//街道
    villageCommitteeListSearchResult,//社区
    countyListSearchResult,//区县
    unitResponseAreaResult,//责任区
    }=this.props
    //分局
     const unitSubStationLoop = (data=[]) => data.map((item, index) => {
      let divisionsArr=[];
      item.xzqhs.map(item=>{
          divisionsArr.push(item.xzqhqc);
      })
      return (
        <li key={index} className={this.state.selectedSubstationGxdwdm==item.gxdwdm ? "selectedLiStyle":""} onClick={this.subStationClick.bind(this,item.gxdwdm)} >
          <a className='cpp-station-edit'>
            <Icon type="edit" onClick={this.editDivisionClick.bind(this,item.id,"substation")}/>
          </a>
          <span>{item.gxdwqc}</span>
          <p>{divisionsArr.length==0?"":divisionsArr.join(",")}</p>
        </li>
      )
    })
    const unitSubstationLis = unitSubStationLoop(this.state.subStationList)
    //派出所
    const unitPoliceStationLoop = (data=[]) =>  data.map((item, index) => {
      let divisionsArr=[];
      item.xzqhs.map(item=>{
        divisionsArr.push(item.xzqhqc);
      })
      return (
        <li key={index} className ={this.state.selectedPolicestationGxdwdm==item.gxdwdm ? "selectedLiStyle":""} onClick={this.policeStationClick.bind(this,item)}>
          <a className='cpp-station-edit'>
            <Icon type="edit"  onClick={this.editDivisionClick.bind(this,item.id,"policestation")} />
          </a>
          <span>{item.gxdwqc}</span>
          <p>{divisionsArr.length==0?"":divisionsArr.join(",")}</p>
        </li>
      )
    })
    const unitPoliceStationLis = unitPoliceStationLoop(this.state.policeStationList)
    //责任区
    const unitResponseAreaLoop = (data=[]) => data.map((item, index) => {
      return (
        <li key={index} >
          <span>{item.gxdwqc}</span>
          <p>
            <a onClick={this.findPolice.bind(this, item)}>查看民警</a>
            <a onClick={this.addressContact.bind(this, item)}>关联地址</a>
            <a onClick={this.resAreaEdit.bind(this, item)}>修改</a>
          </p>
        </li>
      )
    })
    const unitResponseAreaLis = unitResponseAreaLoop(this.state.responseAreaList)
    //区县
    const countryLoop = (data=[]) => data.map((item, index) => {
      let divisionsArr=[];
      item.gxdws.map(item=>{
        divisionsArr.push(item.gxdwqc);
      })
      return (
       <li key={index} className ={this.state.selctedCountryXzqhdm==item.xzqhdm ? "selectedLiStyle":""}  onClick={this.countryClick.bind(this,item.xzqhdm)}>
          <a className='cpp-station-edit'>
            <Icon type="edit" onClick={this.editXzqhDivisionClick.bind(this,item.id,"country")}/>
          </a>
          <span>{item.xzqhqc}</span>
          <p>{divisionsArr.length==0?"":divisionsArr.join(",")}</p>
        </li>
      )
    })
    const countryLis = countryLoop(this.state.countryList)
    //街道
    const streetLoop = (data=[]) => data.map((item, index) => {
      let divisionsArr=[];
      item.gxdws.map(item=>{
          divisionsArr.push(item.gxdwqc);
      })
      return (
        <li key={index} className ={this.state.selectedStreetXzqhdm==item.xzqhdm ? "selectedLiStyle":""} onClick={this.streetClick.bind(this,item.xzqhdm)}>
          <a className='cpp-station-edit'>
            <Icon type="edit"  onClick={this.editXzqhDivisionClick.bind(this,item.id,"street")} />
          </a>
          <span>{item.xzqhqc}</span>
          <p>{divisionsArr.length==0?"":divisionsArr.join(",")}</p>
        </li>
      )
    })
    const streetLis = streetLoop(this.state.streetList)
    //社区、村
    const villageLoop = (data=[]) => data.map((item, index) => {
      let divisionsArr=[];
      item.gxdws.map(item=>{
        divisionsArr.push(item.gxdwqc);
      })
      return (
        <li key={index} className ={this.state.selectedVillageXzqhdm==item.xzqhdm ? "selectedLiStyle":""} onClick={this.villageClick.bind(this,item)}>
          <span>{item.xzqhqc}</span>
        </li>
      )
    })
    const villageLis = villageLoop(this.state.villageList)
    return (
      <div className="main">
        <Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
              <div className="box">
                <div className='cpp-address'>
                  <Button onClick={this.jurisdictionUnit} className={this.state.tabStateValue==1?"button-focus":""}>管辖单位</Button>
                  <Button onClick={this.districtDivision} className={this.state.tabStateValue==2?"button-focus":""}>行政区划</Button>
                </div>
                <div style={{display:this.state.jurisdictionUnitVisible.display}} className="cpp-card" >
                 <Row>
                    <Col span="8">
                      <Card title="分局" bordered={true}>
                        <Spin spinning={unitSubStationListResult.loading}>
                          <div className='cpp-card-content'>
                            <ul>
                              {unitSubstationLis}
                            </ul>
                          </div>
                        </Spin>
                     
                      </Card>
                    </Col>
                    <Col span="8">
                      <Card title="派出所" bordered={true}>
                        <Spin spinning={unitPoliceStationListResult.loading||false}>
                          <div className='cpp-card-content'>
                              <ul>
                                {unitPoliceStationLis}
                              </ul>
                          </div>
                        </Spin>
                      </Card>
                    </Col>
                    <Col span="8">
                      <Card title="责任区" bordered={true} extra={ <span className='cpp-card-add'><Icon type="plus" onClick={this.addResponseArea} /></span>} >
                        <Spin spinning={unitResponseAreaResult.loading||false}>
                          <div className='cpp-card-content'>
                            <ul>
                             {unitResponseAreaLis}
                            </ul>
                           </div>
                        </Spin>
                      </Card>
                    </Col>
                 </Row>
                </div>
                <div style={{display:this.state.districtDivisionVisible.display}} className="cpp-card">
                 <Row>
                    <Col span="4">
                      <Card title="区、县（市）">
                        <Spin spinning={countyListSearchResult.loading||false}>
                          <div className='cpp-card-content'>
                            <ul>
                              {countryLis}
                            </ul>
                          </div>
                        </Spin>
                      </Card>
                    </Col>
                    <Col span="4">
                      <Card title="街、道（镇）" >
                        <Spin spinning={streetListSearchResult.loading||false}>
                           <div className='cpp-card-content'>
                            <ul>
                              {streetLis}
                            </ul>
                          </div>
                        </Spin>
                      </Card>
                    </Col>
                    <Col span="4">
                      <Card title="社区、村（居）委会" >
                        <Spin spinning={villageCommitteeListSearchResult.loading||false}>
                          <div className='cpp-card-content'>
                            <ul>
                              {villageLis}
                            </ul>
                          </div>
                        </Spin>
                      </Card>
                    </Col>
                    <Col span="4"  >
                      <Card title="道路">
                       <Spin spinning={getLoadOrVillageGroupListResult.loading||false}>
                          <div className='cpp-card-content'>
                            <ul>
                              {this.state.loadList.map((item,index)=>{
                                return (<li key={index}><span>{item.mc}</span></li>)
                                })}
                            </ul>
                          </div>
                        </Spin>
                      </Card>
                    </Col>
                    <Col span="4">
                      <Card title="区域地址" >
                        <Spin spinning={getAreaAddressListResult.loading||false}>
                          <div className='cpp-card-content'>
                            <ul>
                              {this.state.areaAddressList.map((item,index)=>{
                                  return (<li key={index}><span>{item.jlxMc}</span></li>)
                                })}
                            </ul>
                          </div>
                        </Spin>
                      </Card>
                    </Col>
                    <Col span="4" >
                      <Card title="村组">
                        <Spin spinning={getLoadOrVillageGroupListResult.loading||false}>
                          <div className='cpp-card-content'>
                            <ul>
                              {this.state.villageGroupList.map((item,index)=>{
                                  return ( <li key={index}><span>{item.mc}</span></li>)
                                })}
                            </ul>
                          </div>
                        </Spin>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          }
        </Row>
        {//关联行政区划选择MODAL
          this.state.RoleVisible?
            <DivisionSelect
              visible={this.state.RoleVisible}
              onCancel={this.handleCancelEditRaleteDivision}
              defaultDivisions={this.state.defaultDivisions}
              selectedDivisionIds={this.state.selectedDivisionIds}
              divisionSelectTitle={this.state.divisionSelectTitle}
              handleOkEditRaleteDivision={this.handleOkEditRaleteDivision}>
            </DivisionSelect>
          :null
        }
        {//新增/修改责任区
          this.state.responseAreaVisible?
            <ResponseArea
              visible={this.state.responseAreaVisible}
              curResAreaId={this.state.curResAreaId}
              resAreaName={this.state.curResAreaName}
              onCancel={this.cancelResponseArea}
              handleSubmit={this.okResponseArea}>
            </ResponseArea>
          :null
        }
        {this.state.findPoliceVisible?
          <FindPolice
            curResAreaId={this.state.curResAreaId}
            visible={this.state.findPoliceVisible}
            onCancel={this.cancelFindPolice}
            addPolice={this.addPolice}
          >
          </FindPolice>
          :null
        }
        {//新增民警
          this.state.addPoliceVisible?
          <AddPolice
            onCancel={this.cancelAddPolice}
            visible={this.state.addPoliceVisible}
            curResAreaId={this.state.curResAreaId}
            curPcsdm={this.state.curPcsdm}
          >
          </AddPolice>
          :null
        }
        {this.state.addressContactVisible?
          <AddressContact
            curResAreadm={this.state.curResAreadm}
            visible={this.state.addressContactVisible}
            onCancel={this.cancelAddressContact}
            addContactAddress={this.addContactAddress}
          >
          </AddressContact>
          :null
        }
        {this.state.addContactAddress?
        <AddContactAddress
          visible={this.state.addContactAddress}
          curResAreadm={this.state.curResAreadm}
          onCancel={this.cancelAddContactAddress}
          curPcsdm={this.state.curPcsdm}
        >
        </AddContactAddress>
        :null
        }
      </div>
    )
    }
}
