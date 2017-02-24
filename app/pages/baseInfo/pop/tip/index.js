import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs } from 'antd'
import { fetchTipList,
         intoHouse,
         updateTipListeQuery, 
         resetTipListeQuery} from 'actions/popTip'
import { getAllRetrievalNum} from 'actions/people'
import  {getItemByType}from 'utils/getGformConfigItems'
import Panel from 'components/panel'
import RelateAddrModal from 'components/relateAddrModal/relateAddrModal'
import TypeList from './peopleType/typeList'
import './cpp.css'
import Popup from './popup'
import TableList from 'components/tableList/tableList'
import Gform from 'components/gForm'

const TabPane = Tabs.TabPane
let requsetBody={
  pageNo:1,
  pageSize:20
}
let requsetHead={}
let initReqNum={
  xzqhid:330100,
  gxdwid:330100,
}

//连接公用常量、后端返回的数据方法  并放置在props里面调用S
@connect(
  (state, props) => ({
    config: state.config,
    tipListSearchQuery:state.tipListSearchQuery,
    tipListSearchResult: state.tipListSearchResult,
    intoHouseState:state.intoHouseState
    })   
)
// 声明组件  并对外输出
export default class tipList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
      this.state = { 
      key:"",
      id:'',//入户的id
      householdVisible:false,
      currentPage:1,
      pageSize:10,
      baseid:'',
      counts:''
    }    
    this._handleSubmit = this._handleSubmit.bind(this)
    //人员类型的切换
    this._typeChange = this._typeChange.bind(this)
    this.handleOkHosehold=this.handleOkHosehold.bind(this)
    this.handleCancelHosehold=this.handleCancelHosehold.bind(this)
    this.handleShowHosehold=this.handleShowHosehold.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.exportExcel=this.exportExcel.bind(this)
    this.getStatisticsNum = this.getStatisticsNum.bind(this)
  }
  // 缓存更新
  cacheSearch(item) {
    this.props.dispatch(updateTipListQuery(item))
  }
// 组件已经加载到dom中,进入状态后调用
  componentDidMount() {
    const data = { currentPage: 1,rylb: 1}
    this.props.dispatch(fetchTipList(data),(reply)=>{
      this.setState({loading:false,counts:reply.data.totalCount})

    })
  }
 // 点击搜索按钮的回调事件
 _handleSubmit(query, currentPage) {
    this.props.dispatch(fetchTipList({ ...query, currentPage: currentPage }))
  } 
  //导出按钮
  exportExcel(key){
    const keys=this.state.key||1
    // if(!keys){
    //   message.error('sadas')
    //   return
    // }
    // const data = {rylb: keys}
    const token =sessionStorage.getItem('token')  
    if(this.state.counts<=2000){
      window.open(`http://10.118.164.206:8080/jcjw/resident/visit/expExcel.json?rylb=${keys}&&token=${token}`)
    }else if(this.state.counts>2000){
      message.warn("导出数据不能大于2000条，请先精确筛选条件",3)
      return
    }else{
      message.warn("没有查询到数据，无法导出",3)
    }
  }
   //点击弹框的一系列操作
  handleShowHosehold(id,baseid){
    this.state.id=id
    this.state.baseid=baseid
    //console.log(this.state.id)
    this.setState({householdVisible:true}) 
  }
 //点击确定回调函数
  handleOkHosehold(param){
    const id=this.state.id
    const postParam={
      id:id,
      bldId:param.buildingcode,
      roomId:param.roomcode
    }
    this.setState({householdVisible:false})
    this.props.dispatch(intoHouse(postParam,(reply)=>{
     message.success('入户成功')
     const keys =this.state.key;
    this.props.dispatch(fetchTipList({ currentPage: 1 ,rylb: keys}))
    }))
  }
 //点击取消或遮罩层回调函数
  handleCancelHosehold(){
    this.setState({householdVisible:false})
  }
  // 自定义按钮的回调事件
  handleDistributeSubmit(query) {
    this.setState({
      isDistribute: true,
    }, () => {
      this._handleSubmit(query)
    })
  }
 //重点人员登记变化的表格展示项的配置
  focalColumns() {
     const _self=this
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
         width:50,
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
         width:60,
      },
      {
        title: '性别',
        dataIndex: 'xbLable',
        key: 'xbLable',
        width:60,
      },
      {
        title: '身份证号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width:'100'
      },
      {
        title: '户籍类别',
        dataIndex: 'rylb',
        key: 'rylb',
        width:60,
        render:(text,record,index)=>{
          if(record.rylb==1){
            return record.rylb =='重点人员'
          }else if(record.rylb==2){
            return record.rylb =='流动人员'
           }else{
            return record.rylb =='常住人口'
           }
        }
      },
      {
        title: '登记地址',
        dataIndex: 'djdz',
        key: 'djdz',
        width:150,
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwName',
        key: 'gxdwName',
         width:100,
      },
      {
        title: '管控时间',
        dataIndex: 'gksj',
        key: 'gksj',
         width:60,
      },
      {
        title: '关注类别',
        dataIndex: 'lb',
        key: 'lb',
        width:60,
        render:(text,record,index)=>{
          return record.lb ==1 ?'常口':'暂口'
        }
      },
       {
        title: '操作',
        key: 'operate',
        width:70,
       /* render: function (text, record, index) {
          return (<a onClick={_self.handleShowHosehold.bind(_self,record.id)}>入户</a>)
        }*/
     },
    ]
  }
  //流口登记变化的表格展示项的配置
  floatColumns() {
    const _self=this
    return [
      {
        title: '序号',
        key: 'index',
        width:50,
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width:'60',
      },
      {
        title: '性别',
        xbLable: 'xbLable',
        key: 'sex',
        width:'60',
      },
      {
        title: '年龄',
        dataIndex: 'nl',
        key: 'nl',
        width:'60'
      },
      {
        title: '身份证号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width:'100',
      },
       {
        title: '户籍类别',
        dataIndex: 'rylb',
        key: 'rylb',
        width:'60',
        render:(text,record,index)=>{
          if(record.rylb==1){
            return record.rylb =='重点人员'
          }else if(record.rylb==2){
            return record.rylb =='流动人员'
           }else{
            return record.rylb =='常住人口'
           }
        }
      },
      {
        title: '登记地址',
        dataIndex: 'djdz',
        key: 'djdz',
        width:'100'
      },
      {
        title: '上次访查时间',
        dataIndex: 'scfcsj',
        key: 'scfcsj',
        width:'60',
      },
      {
        title: '系统登录修改时间',
        dataIndex: 'djxtxgsj',
        key: 'djxtxgsj',
        width:'60'
      },
       {
        title: '登记时间',
        dataIndex: 'djsj',
        key: 'djsj',
         width:'60'
      },
      {
        title: '到期时间',
        dataIndex: 'dqsj',
        key: 'dqsj',
         width:'60',
      },
      {
        title: '管辖单位',
        dataIndex: 'institutions',
        key: 'institutions1',
        width:'100',
      },
       {
        title: '操作',
        key: 'operate',
        width:70,
      /*  render: function (text, record, index) {
          return (<a onClick={_self.handleShowHosehold.bind(_self,record.id,record.baseid)}>入户</a>)
        }*/
      },     
    ]
  }
  //常口登记变化的表格展示项的配置
  residentColumns() {
     const _self=this
    return [
      {
        title: '序号',
        key: 'index',
        width:50,
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
       width:'60',
      },
      {
        title: '性别',
        dataIndex: 'xbLable',
        key: 'xbLable',
       width:'60',
      },
      {
        title: '年龄',
        dataIndex: 'nl',
        key: 'nl',
        width:'60',
      },
      {
        title: '身份证号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width:'100',
      },
      {
        title: '登记地址',
        dataIndex: 'djdz',
        key: 'djdz',
        width:'100',
      },
      {
        title: '上次访查时间',
        dataIndex: 'scfcsj',
        key: 'scfcsj',
        width:'60',
      },
      {
        title: '系统登录修改时间',
        dataIndex: 'djxtxgsj',
        key: 'djxtxgsj',
        width:'60',
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwName',
        key: 'gxdwName',
        width:'100',
      },
       {
        title: '操作',
        key: 'operate',
        width:'70',
       /* render: function (text, record, index) {
          return (<a onClick={_self.handleShowHosehold.bind(_self,record.id)}>入户</a>)
        }*/
      },     
    ]
  }
  // 重点人员，流口登记变化，常口登记变化的列表切换的回调函数
  _typeChange(key){
    this.setState({key:key})
    const data = { currentPage: 1,rylb: key}
    this.props.dispatch(fetchTipList(data))
  }
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visibleForVisitablePopulation: false,
    });
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      visibleForVisitablePopulation: false,
     
    });
  }
  //点击每页返回函数
   pageChange(newPage) {
    this.setState({
      currentPage: newPage
    })
    // this只想改变需要bind一下
    this.props.dispatch(fetchTipList({currentPage: newPage, pageSize: this.state.pageSize,rylb: key}))
  }
  //改变每页显示条数回调函数
   pageSizeChange(currentPage,pageSize) {
    console.log(pageSize)
    this.setState({
      pageSize: pageSize,
      currentPage:1,
    })
    this.props.dispatch(fetchTipList({currentPage: 1, pageSize: pageSize,rylb: key}))
  }
  // 筛选条件组件调用
  gFormConfig(){
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '行政区划',
        items: config.XZQH,
        key:'xzqh',
        numResKey:'xzqh',
        numReqKey:'xzqhid',
        needNum:true,
        needMulti:false,
        needArrowIcon:true,
      },
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key:'gxdw',
        numResKey:'gxdw',
        numReqKey:'gxdwid',
        needNum:true,
        needMulti:false,
        needArrowIcon:true,
      },
      /*{
        sort: 'superSelect',
        label: '关注类别',
        items: config.GKZDRY,
        key:'gzlb',
        numResKey:'gzlb',
        numReqKey:'gzlbids',
        needNum:true,
        needMulti:true,
        needArrowIcon:true,
      },*/
     
    ]
  }
  gFormSubmit(query){
    console.log(query)
    this.setState({currentPage:query.page,pageSize:query.pageSize})
    const temp={}
    temp.name=query.keyword
    temp.privilegeid=getItemByType(query.xzqh)||330100
    temp.gxdwid=getItemByType(query.gxdw)||330100
    const keys=this.state.key||1
    temp.rylb=keys
    requsetBody={...requsetBody,...temp}
    console.log(requsetBody)
    this.props.dispatch(fetchTipList(requsetBody))
  }

  getStatisticsNum(currentSelected){
    requsetHead={...currentSelected}
    this.props.dispatch(getAllRetrievalNum(requsetHead))
  }
  render() {
    const { tipListSearchQuery,
      tipListSearchResult ,
      intoHouseState,
      hasSubmitBtn,
      hasResetBtn,
    } = this.props
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={tipListSearchResult||{}}
          loading={false}
          getStatisticsNum={this.getStatisticsNum}
          cacheKey='people'
          totalCount={tipListSearchResult.totalCount}
          initParam={initReqNum}
          page={this.state.currentPage}
          pageSize={this.state.pageSize}
        />
        <div  className="nav-third-nextContent">
          <Tabs tabPosition="top" onChange={this._typeChange} className="list-tabs">
            <TabPane tab="重点人员" key="1" >
              <TableList className="div-flex-scroll"
                columns={this.focalColumns()}
                dataSource={tipListSearchResult.list}
                currentPage={this.state.currentPage}
                pageSize={this.state.pageSize}
                loading={tipListSearchResult.loading}
                scroll={{x:1000,y: true}}
                onChange={this.pageChange.bind(this)}
                onShowSizeChange={this.pageSizeChange.bind(this)}
                totalCount={tipListSearchResult.totalCount}
              /> 
            </TabPane>
            <TabPane tab="流口登记变化" key="2">
              <TableList className="div-flex-scroll"
                columns={this.floatColumns()}
                dataSource={tipListSearchResult.list}
                currentPage={this.state.currentPage}
                pageSize={this.state.pageSize}
                loading={tipListSearchResult.loading}
                scroll={{x:1000,y: true}}
                onChange={this.pageChange.bind(this)}
                onShowSizeChange={this.pageSizeChange.bind(this)}
                totalCount={tipListSearchResult.totalCount}
              /> 
            </TabPane>
             <TabPane tab="常口登记变化" key="3">
               <TableList className="div-flex-scroll"
                  columns={this.residentColumns()}
                  dataSource={tipListSearchResult.list}
                  currentPage={this.state.currentPage}
                  pageSize={this.state.pageSize}
                  loading={tipListSearchResult.loading}
                  scroll={{x:1000,y: true}}
                  onChange={this.pageChange.bind(this)}
                  onShowSizeChange={this.pageSizeChange.bind(this)}
                  totalCount={tipListSearchResult.totalCount}
                /> 
            </TabPane>
          </Tabs>
        </div>
         <div className="ability-button">
          <Button  onClick={this.exportExcel} className="popupBt" >导出</Button>
        </div>
        {
        this.state.householdVisible?
          <RelateAddrModal
            onCancel={this.handleCancelHosehold}
            onOk={this.handleOkHosehold}
            visible={true}
            title="关联入户"
          />:null
       }
       </div>

    )
  }
}
