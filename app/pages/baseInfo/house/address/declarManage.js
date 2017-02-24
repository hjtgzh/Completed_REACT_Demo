import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table,Card, Row, Col ,Radio,Button,Tabs,Icon,Modal,notification,Spin,message,Popconfirm} from 'antd'
import {
  //获取区县列表
  fetchCountyList,
  //获取街道列表
  fetchStreetList,
  //获取社区列表
  fetchVillageCommitteeList,
  //获取道路列表
  fetchChildList,
  //删除单个数据
  fetchDeclarDelete,
  //通过数据
  fetchDeclarPass,
  //获取附属区苑小区列表
  fetchVillageList,
} from 'actions/houseAddress'
//import ResponseArea from './addressModal/responseArea'
import AddOrEditName from './addressModal/addRoad'
//import AddCommunity from './addressModal/AddCommunity'
//import AddVillage from './addressModal/addVillage'
//import AddAncillaryDistrict from './addressModal/addAncillaryDistrict'
import   './address.css'

//连接公用常量。后端返回数据。并放置在props里面调用
@connect(
  (state, props) =>({
    config: state.config,
    countyListSearchResult: state.countyListSearchResult,
    streetListSearchResult: state.streetListSearchResult,
    villageCommitteeListSearchResult: state.villageCommitteeListSearchResult,
    commonListSearchResult: state.commonListSearchResult,
    villageListSearchResult: state.villageListSearchResult,
  })
)

//申报管理
export default class declarManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //当前处于什么状态 道路1、小区2、村组3、附属区苑4
      sblx: '1',
      //存储街道数据
      streetListSearchResult: {list: []},
      //存储社区、村委会数据
      villageCommitteeListSearchResult: {list: []},
      //存储道路数据
      commonListSearchResult: {list: []},
      //存储附属区苑小区数据
      villageListSearchResult: {list: []},
      //切换显示隐藏对应的moder
      clickRoadProps: {display: 'block'},
      clickVillageProps: {display: 'none'},
      communityManage: {display: 'none'},
      ancillaryDistrict: {display: 'none'},
      declarManage: {display: 'block'},
      //是否展示新增新增修改道路窗口
      addRoadVisible: false,
      //是否展示新增新增修改小区窗口
      addCommunityVisible: false,
      //是否展示新增新增修改村组窗口
      addVillage: false,
      //是否展示新增新增修改附属区苑窗口
      addAncillaryDistrict: false,
      //被选中的区县id
      conttyStyleId: "",
      //被选中的街道id
      streetStyleId: "",
      //被选中的社区id
      communityStyleId: "",
      //被选中的小区园区id
      villageStyleId: "",
      //判断是新增add还是修改edit
      showSatae: "",
      //获取ID
      editId: "",
      //获取名称
      editName: "",
      loading:true,
    }
    this.cutNavMange = this.cutNavMange.bind(this)  //切换道路-小区-村组-附属区苑
    this.stationClick = this.stationClick.bind(this)  //点击区县列表获取街道列表
    this.policeStationClick = this.policeStationClick.bind(this)  //点击街道列表获取社区列表
    this.responseAreaClick = this.responseAreaClick.bind(this)  //点击社区显示其下的道路-小区-村组-附属区苑(公用)
    this.addData = this.addData.bind(this)//新增
    this.editData = this.editData.bind(this)  //修改道路-小区-村组-附属区苑(公用)
    this.OkaddData = this.OkaddData.bind(this)//新增确定
    this.canceladd = this.canceladd.bind(this)  //取消新增、修改窗口
    this.deleteData = this.deleteData.bind(this)  //删除道路-小区-村组-附属区苑(公用)
    this.passData = this.passData.bind(this)  //通过道路-小区-村组-附属区苑(公用)
    //this.commonSql = this.commonSql.bind(this)  //公共代码整合
  }

  componentDidMount() {
    //获取区县的列表
    this.props.dispatch(fetchCountyList({parentdm: 321300, hasGxdw: 1},()=>{
      this.setState({
        loading:false
      })
    }))

  }

  componentWillReceiveProps(nextProps) {
    ////街道
    //if (nextProps.streetListSearchResult != this.props.streetListSearchResult) {
    //  this.setState({streetListSearchResult: nextProps.streetListSearchResult})
    //}
    ////社区、村委会
    //if (nextProps.villageCommitteeListSearchResult != this.props.villageCommitteeListSearchResult) {
    //  this.setState({villageCommitteeListSearchResult: nextProps.villageCommitteeListSearchResult})
    //}
    ////道路-小区-村组-附属区苑(公用)
    //if (nextProps.commonListSearchResult != this.props.commonListSearchResult) {
    //  this.setState({commonListSearchResult: nextProps.commonListSearchResult})
    //}
    ////附属区苑小区
    //if (nextProps.villageListSearchResult != this.props.villageListSearchResult) {
    //  this.setState({villageListSearchResult: nextProps.villageListSearchResult})
    //}
  }

  //切换道路-小区-村组-附属区苑
  cutNavMange(sblx) {
    this.setState({
      sblx: sblx,
      conttyStyleId: "",
      streetStyleId: "",
      communityStyleId: "",
      villageStyleId: "",
      streetListSearchResult: {list: []},
      villageCommitteeListSearchResult: {list: []},
      commonListSearchResult: {list: []},
      villageListSearchResult: {list: []},
    })
    if (sblx == "1") {
      this.setState({
        declarManage: {display: 'block'},
        clickRoadProps: {display: 'block'},
        clickVillageProps: {display: 'none'},
        communityManage: {display: 'none'},
        ancillaryDistrict: {display: 'none'}
      })
    } else if (sblx == "2") {
      this.setState({
        declarManage: {display: 'block'},
        communityManage: {display: 'block'},
        clickRoadProps: {display: 'none'},
        clickVillageProps: {display: 'none'},
        ancillaryDistrict: {display: 'none'},
      })
    } else if (sblx == "3") {
      this.setState({
        sblx: sblx,
        declarManage: {display: 'block'},
        clickVillageProps: {display: 'block'},
        clickRoadProps: {display: 'none'},
        communityManage: {display: 'none'},
        ancillaryDistrict: {display: 'none'},
      })
    } else {
      this.setState({
        sblx: sblx,
        ancillaryDistrict: {display: 'block'},
        declarManage: {display: 'none'},
      })
    }
  }

  //点击区县列表获取街道列表(公用)
  stationClick(stationCode) {
    this.setState({
      streetStyleId: "",
      communityStyleId: "",
      villageStyleId: "",
      streetListSearchResult: {list: []},
      villageCommitteeListSearchResult: {list: []},
      commonListSearchResult: {list: []},
      villageListSearchResult: {list: []},
      conttyStyleId: stationCode,
    })
    this.props.dispatch(fetchStreetList({parentdm: stationCode, hasGxdw: 1}, ()=> {
      this.setState({
        streetListSearchResult: this.props.streetListSearchResult,
      })
    }))
  }

  //点击街道列表获取社区列表(公用)
  policeStationClick(stationCode) {
    this.setState({
      communityStyleId: "",
      villageStyleId: "",
      villageCommitteeListSearchResult: {list: []},
      commonListSearchResult: {list: []},
      villageListSearchResult: {list: []},
      streetStyleId: stationCode,
    })
    this.props.dispatch(fetchVillageCommitteeList({parentdm: stationCode, hasGxdw: 1}, ()=> {
      this.setState({
        villageCommitteeListSearchResult: this.props.villageCommitteeListSearchResult,
      })
    }))
  }

  //点击社区显示其下的道路-小区-村组-附属区苑(公用)
  responseAreaClick(id) {
    this.setState({
      villageStyleId: "",
      commonListSearchResult: {list: []},
      villageListSearchResult: {list: []},
      communityStyleId: id
    })
    if (this.state.sblx == "4") {
      this.props.dispatch(fetchVillageList({cjwhId: id, sblx: "2"}, ()=> {
        this.setState({
          villageListSearchResult: this.props.villageListSearchResult,
        })
      }))
    } else {
      this.props.dispatch(fetchChildList({relativeId: id, sblx: this.state.sblx}, ()=> {
        this.setState({
          commonListSearchResult: this.props.commonListSearchResult,
        })
      }))
    }
  }

  //点击附属区苑小区
  responseVillageClick(id) {
    this.setState({
      commonListSearchResult: {list: []},
      villageStyleId: id
    })
    this.props.dispatch(fetchChildList({relativeId: id, sblx: this.state.sblx}, ()=> {
      this.setState({
        commonListSearchResult: this.props.commonListSearchResult,
      })
    }))
  }

  //新增，必须先选中一条社区，村委会
  addData() {
    if (this.state.communityStyleId) {
      this.setState({
        showSatae: "add"
      })
      if (this.state.sblx == "1") {
        this.setState({
          addRoadVisible: true
        })
      } else if (this.state.sblx == "2") {
        this.setState({
          addCommunityVisible: true,
        })
      } else if (this.state.sblx == "3") {
        this.setState({
          addVillage: true
        })
      } else {
        if (this.state.villageStyleId) {
          this.setState({
            addAncillaryDistrict: true
          })
        } else {
          message.info('请选择小区园区')
        }
      }
    } else {
      if (this.state.sblx != "4") {
        message.info('请选择社区、村（居）委会')
      } else {
        message.info('请选择小区园区')
      }
    }
  }

  //修改道路
  editData(id, name) {
    this.setState({
      showSatae: "edit",
      editId: id,
      editName: name
    })
    if (this.state.sblx == "1") {
      this.setState({
        addRoadVisible: true
      })
    } else if (this.state.sblx == "2") {
      this.setState({
        addCommunityVisible: true,
      })
    } else if (this.state.sblx == "3") {
      this.setState({
        addVillage: true
      })
    } else {
      this.setState({
        addAncillaryDistrict: true
      })
    }
  }

  //新增确定
  OkaddData() {
    if (this.state.sblx == "1") {
      this.setState({
        addRoadVisible: false
      })
    } else if (this.state.sblx == "2") {
      this.setState({
        addCommunityVisible: false,
      })
    } else if (this.state.sblx == "3") {
      this.setState({
        addVillage: false
      })
    } else {
      this.setState({
        addAncillaryDistrict: false
      })
    }
    this.commonSql();
  }

  //取消新增、修改窗口
  canceladd() {
    if (this.state.sblx == "1") {
      this.setState({
        addRoadVisible: false
      })
    } else if (this.state.sblx == "2") {
      this.setState({
        addCommunityVisible: false
      })
    } else if (this.state.sblx == "3") {
      this.setState({
        addVillage: false
      })
    } else {
      this.setState({
        addAncillaryDistrict: false
      })
    }
  }

  //删除道路-小区-村组-附属区苑(公用)
  deleteData(id) {
    this.props.dispatch(fetchDeclarDelete({id: id}, () => {
      this.commonSql()
    }))
  }

  //通过道路-小区-村组-附属区苑(公用)
  passData(id) {
    this.props.dispatch(fetchDeclarPass({id: id}, () => {
      this.commonSql()
    }))
  }

  commonSql() {
    if (this.state.sblx != "4") {
      this.props.dispatch(fetchChildList({relativeId: this.state.communityStyleId, sblx: this.state.sblx}, ()=> {
        this.setState({
          commonListSearchResult: this.props.commonListSearchResult
        })
      }))
    } else {
      this.props.dispatch(fetchChildList({relativeId: this.state.villageStyleId, sblx: this.state.sblx}, ()=> {
        this.setState({
          commonListSearchResult: this.props.commonListSearchResult
        })
      }))
    }
  }

  render() {
    const {
      countyListSearchResult,
      streetListSearchResult,
      villageCommitteeListSearchResult,
      commonListSearchResult,
      villageListSearchResult
      } = this.props
    return (
      <div className="nav-third-nextContent">
        <Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
              <div className="box">
                <div className='cpp-address'>
                  <Button onClick={this.cutNavMange.bind(this,'1')} className={this.state.sblx ==1?"button-focus":""}>道路管理</Button>
                  <Button onClick={this.cutNavMange.bind(this,'2') } className={this.state.sblx == 2?"button-focus":""}>小区管理</Button>
                  <Button onClick={this.cutNavMange.bind(this,'3')} className={this.state.sblx == 3?"button-focus":""}>村组管理</Button>
                  <Button onClick={this.cutNavMange.bind(this,'4')} className={this.state.sblx==4?"button-focus":""}>附属区苑</Button>
                </div>
                <div className="cpp-card" style={{display:this.state.declarManage.display}}>
                  <Row>
                    <Col span="6">
                      <Card title="区县">
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                            {!countyListSearchResult.loading?
                              countyListSearchResult.list.map((item, index)=>
                              <li className={this.state.conttyStyleId==item.xzqhdm?'button-checked':''} key={index}
                                  onClick={this.stationClick.bind(this,item.xzqhdm)}>
                                <span>{item.xzqhqc}</span>
                                <p>
                                  {
                                    !(item.gxdws == undefined) ?
                                    item.gxdws.map((childItem, childIndex)=> {
                                    if (childIndex < item.gxdws.length - 1) {
                                      return (<span key={childIndex}>{childItem.gxdwqc}、</span>)
                                    } else {
                                      return (<span key={childIndex}>{childItem.gxdwqc}</span>)
                                    }
                                  }):null}
                                </p>
                              </li>
                            ):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="6">
                      <Card title="街、道（镇）">
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                            {!streetListSearchResult.loading?
                            this.state.streetListSearchResult.list.map((item, index)=>
                              <li className={this.state.streetStyleId==item.xzqhdm?'button-checked':''} key={index}
                                  onClick={this.policeStationClick.bind(this,item.xzqhdm)}>
                                <span>{item.xzqhqc}</span>
                                <p>
                                  {
                                    !(item.gxdws == undefined) ?
                                    item.gxdws.map((childItem, childIndex)=> {
                                    if (childIndex < item.gxdws.length - 1) {
                                      return (<span key={childIndex}>{childItem.gxdwqc}、</span>)
                                    } else {
                                      return (<span key={childIndex}>{childItem.gxdwqc}</span>)
                                    }
                                  }):null}
                                </p>
                              </li>
                           ):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="6">
                      <Card title="社区，村委会">
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!villageCommitteeListSearchResult.loading?
                            this.state.villageCommitteeListSearchResult.list.map((item, index)=>
                              <li className={this.state.communityStyleId==item.id?'button-checked':''} key={index}
                                  onClick={this.responseAreaClick.bind(this,item.id)}>
                                <span>{item.xzqhqc}</span>
                              </li>
                              ):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="6" style={{display:this.state.clickRoadProps.display}}>
                      <Card title="道路"
                            extra={<span className='cpp-card-add' onClick={this.addData}><Icon type="plus" /></span>}>
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!commonListSearchResult.loading?
                            this.state.commonListSearchResult.list.map((item, index)=> {
                              if (item.sbzt == "0") {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>
                                      <a onClick={this.editData.bind(this,item.id,item.name)}>修改</a>
                                      <Popconfirm title="删除该道路?" onConfirm={this.deleteData.bind(this,item.id)}>
                                        <a>删除</a>
                                      </Popconfirm>
                                      <Popconfirm title="通过道路名称审核?" onConfirm={this.passData.bind(this,item.id)}>
                                        <a>通过</a>
                                      </Popconfirm>
                                    </p>
                                  </li>
                                )
                              } else {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>已通过</p>
                                  </li>
                                )
                              }
                            }):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="6" style={{display:this.state.communityManage.display}}>
                      <Card title="小区"
                            extra={<span className='cpp-card-add' onClick={this.addData}><Icon type="plus" /></span>}>
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!commonListSearchResult.loading?
                            this.state.commonListSearchResult.list.map((item, index)=> {
                              if (item.sbzt == "0") {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>
                                      <a onClick={this.editData.bind(this,item.id,item.name)}>修改</a>
                                      <Popconfirm title="删除该小区?" onConfirm={this.deleteData.bind(this,item.id)}>
                                        <a>删除</a>
                                      </Popconfirm>
                                      <Popconfirm title="通过小区名称审核?" onConfirm={this.passData.bind(this,item.id)}>
                                        <a>通过</a>
                                      </Popconfirm>
                                    </p>
                                  </li>
                                )
                              } else {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>已通过</p>
                                  </li>
                                )
                              }
                            }):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="6" style={{display:this.state.clickVillageProps.display}}>
                      <Card title="村组"
                            extra={<span className='cpp-card-add' onClick={this.addData}><Icon type="plus" /></span>}>
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!commonListSearchResult.loading?
                            this.state.commonListSearchResult.list.map((item, index)=> {
                              if (item.sbzt == "0") {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>
                                      <a onClick={this.editData.bind(this,item.id,item.name)}>修改</a>
                                      <Popconfirm title="删除该村组?" onConfirm={this.deleteData.bind(this,item.id)}>
                                        <a>删除</a>
                                      </Popconfirm>
                                      <Popconfirm title="通过村组名称审核?" onConfirm={this.passData.bind(this,item.id)}>
                                        <a>通过</a>
                                      </Popconfirm>
                                    </p>
                                  </li>
                                )
                              } else {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>已通过</p>
                                  </li>
                                )
                              }
                            }):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div className="cpp-card" style={{display:this.state.ancillaryDistrict.display}}>
                  <Row>
                    <Col span="5">
                      <Card title="区县">
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!countyListSearchResult.loading?
                            countyListSearchResult.list.map((item, index)=>
                              <li className={this.state.conttyStyleId==item.xzqhdm?'button-checked':''} key={index}
                                  onClick={this.stationClick.bind(this,item.xzqhdm)}>
                                <span>{item.xzqhqc}</span>
                                <p>
                                  {!(item.gxdws == undefined) ?
                                    item.gxdws.map((childItem, childIndex)=> {
                                      if (childIndex < item.gxdws.length - 1) {
                                        return (<span key={childIndex}>{childItem.gxdwqc}、</span>)
                                      } else {
                                        return (<span key={childIndex}>{childItem.gxdwqc}</span>)
                                      }
                                  }):null
                                  }
                                </p>
                              </li>
                             ):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="5">
                      <Card title="街、道（镇）">
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!streetListSearchResult.loading?
                            this.state.streetListSearchResult.list.map((item, index)=>
                              <li className={this.state.streetStyleId==item.xzqhdm?'button-checked':''} key={index}
                                  onClick={this.policeStationClick.bind(this,item.xzqhdm)}>
                                <span>{item.xzqhqc}</span>
                                <p>
                                  {
                                    !(item.gxdws == undefined) ?
                                    item.gxdws.map((childItem, childIndex)=> {
                                    if (childIndex < item.gxdws.length - 1) {
                                      return (<span key={childIndex}>{childItem.gxdwqc}、</span>)
                                    } else {
                                      return (<span key={childIndex}>{childItem.gxdwqc}</span>)
                                    }
                                  }):null}
                                </p>
                              </li>
                            ):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="5">
                      <Card title="社区，村委会">
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!villageCommitteeListSearchResult.loading?
                            this.state.villageCommitteeListSearchResult.list.map((item, index)=>
                              <li className={this.state.communityStyleId==item.id?'button-checked':''} key={index}
                                  onClick={this.responseAreaClick.bind(this,item.id)}>
                                <span>{item.xzqhqc}</span>
                              </li>
                             ):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="5">
                      <Card title="小区园区">
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!villageListSearchResult.loading?
                            this.state.villageListSearchResult.list.map((item, index)=>
                              <li className={this.state.villageStyleId==item.id?'button-checked':''} key={index}
                                  onClick={this.responseVillageClick.bind(this,item.id)}>
                                <span id={item.id}>{item.mc}</span>
                              </li>
                          ):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                    <Col span="4">
                      <Card title="附属区苑"
                            extra={<span className='cpp-card-add'  onClick={this.addData}><Icon type="plus"/></span>}>
                        <div className='cpp-card-content' style={{height:global.$GLOBALCONFIG.PAGEHEIGHT-190 }}>
                          <ul>
                           {!commonListSearchResult.loading?
                            this.state.commonListSearchResult.list.map((item, index)=> {
                              if (item.sbzt == "0") {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>
                                      <a onClick={this.editData.bind(this,item.id,item.name)}>修改</a>
                                      <Popconfirm title="附属区苑?" onConfirm={this.deleteData.bind(this,item.id)}>
                                        <a>删除</a>
                                      </Popconfirm>
                                      <Popconfirm title="通过附属区苑名称审核?" onConfirm={this.passData.bind(this,item.id)}>
                                        <a>通过</a>
                                      </Popconfirm>
                                    </p>
                                  </li>
                                )
                              } else {
                                return (
                                  <li key={index}>
                                    <span>{item.name}</span>
                                    <p>已通过</p>
                                  </li>
                                )
                              }
                             }):<Spin />}
                          </ul>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          }
        </Row>
        {
          this.state.addRoadVisible ?
            <AddOrEditName
              visible={this.state.addRoadVisible}
              title={this.state.showSatae == 'edit' ?"修改道路":"新增道路"}
              handleOk={this.OkaddData}
              handleCancel={this.canceladd}
              value={this.state.showSatae == 'edit' ? {name:this.state.editName}:{name:""}}
              type={this.state.showSatae}
              roadId={this.state.editId}
              relativeId={this.state.communityStyleId}
              sblx={this.state.sblx}
            />
            : null
        }
        {
          this.state.addCommunityVisible ?
            <AddOrEditName
              visible={this.state.addCommunityVisible}
              title={this.state.showSatae == 'edit' ?"修改小区":"新增小区"}
              handleOk={this.OkaddData}
              handleCancel={this.canceladd}
              value={this.state.showSatae == 'edit' ? {name:this.state.editName}:{name:""}}
              type={this.state.showSatae}
              roadId={this.state.editId}
              relativeId={this.state.communityStyleId}
              sblx={this.state.sblx}
            />
            : null
        }
        {
          this.state.addVillage ?
            <AddOrEditName
              visible={this.state.addVillage}
              title={this.state.showSatae == 'edit' ?"修改村组":"新增村组"}
              handleOk={this.OkaddData}
              handleCancel={this.canceladd}
              value={this.state.showSatae == 'edit' ? {name:this.state.editName}:{name:""}}
              type={this.state.showSatae}
              roadId={this.state.editId}
              relativeId={this.state.communityStyleId}
              sblx={this.state.sblx}
            />
            : null
        }
        {
          this.state.addAncillaryDistrict ?
            <AddOrEditName
              visible={this.state.addAncillaryDistrict}
              title={this.state.showSatae == 'edit' ?"修改附属区苑":"新增附属区苑"}
              handleOk={this.OkaddData}
              handleCancel={this.canceladd}
              value={this.state.showSatae == 'edit' ? {name:this.state.editName}:{name:""}}
              type={this.state.showSatae}
              roadId={this.state.editId}
              relativeId={this.state.villageStyleId}
              sblx={this.state.sblx}
            />
            : null
        }
      </div>
    )
  }
}
