import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs } from 'antd'

import {
  fetchPeopleCheckList,
  // changeRequestParam,
  getAllRetrievalNum
} from 'actions/people'

import getConfigItems, {getItemByType}from 'utils/getGformConfigItems'
import Panel from 'components/panel'
import TableList from 'components/tableList/tableList'
import Gform from 'components/gForm'
import './style.css'
import Pagination from 'components/pagination/pagination'
import TypeMap from 'components/map/typeMap'
import returnIconBy from 'utils/transformToIcon'
import { getPeopleMapPopContent } from 'components/map/mapUtils'

const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // oldListSearchQuery: state.oldListSearchQuery,
    peopleStatisticsResult:state.peopleStatisticsResult,
    peopleCheckSearchResult:state.peopleCheckSearchResult
  })
)

// 声明组件  并对外输出
export default class Index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      currentPage:1,
      pageSize:10
    }
    this.requsetBody={
      pageNo:1,
      pageSize:10,
      lsbz:1
    }
    this.requsetHead={
      lsbz:1
    }
    this.initReqNum={
      xzqhid:'',
      gxdwid:sessionStorage.getItem('divisionid'),
    }
    this.gFormSubmit=this.gFormSubmit.bind(this)
    this.getStatisticsNum=this.getStatisticsNum.bind(this)
    this._typeChange=this._typeChange.bind(this)
    //this.getNextPageList=this.getNextPageList.bind(this)
    //this.getNextPageSizeList=this.getNextPageSizeList.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    getConfigItems(this,{
      XZQH:'',
      GXDW:sessionStorage.getItem('divisionid'),
      HJLB:'',
      LDQK:'',
      GKZDRY:''
    })
    if($GLOBALCONFIG.tabCache[`/old`]){
      this.setState({activeTab: $GLOBALCONFIG.tabCache[`/old`].val})
    }
  }

// 表格展示项的配置
  columns() {
    const _self = this
    return [
      {
        title: '序号',
        key: 'index',
        width: 50,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'base',
        key: 'xm',
        width: 120,
        render: (text, record, index)=>
          text?(<p><span className="left">{text.xm}</span><Link className="right" to={`/pop$/visitDetail/${record.id}:${text.id}`}>详情</Link></p>):null
      },
      {
        title: '性别',
        dataIndex: 'xbstr',
        key: 'xb',
        width: 50
      },
      {
        title: '年龄',
        dataIndex: 'nl',
        key: 'age',
        width: 50,
      },
      {
        title: '身份证（证件）号码',
        dataIndex: 'base',
        key: 'sfzh',
        width:150,
        render:(text)=>text.sfzh
      },
      {
        title: '户籍类别',
        dataIndex: 'hjlb',
        key: 'hjlxLabel',
        width: 100,
      },
      {
        title: '现住地址',
        dataIndex: 'dzmc',
        key: 'zzdz',
        width:350,
        render:(text, record, index)=>
          text?(<p><span className="left">{text}</span><Link className="right" to={`/house$Detail/${record.dzbm}`}>详情</Link></p>):null
      },
      {
        title: '房间名',
        dataIndex: 'fjmc',
        key: 'fjm',
        width:120,
        render:(text, record, index)=>
          text?(<p><span className="left">{text}</span><Link className="right" to={`/house$/room/${record.dzbm}/${record.fjbm}`}>详情</Link></p>):null
      },
      // {
      //   title: '登记地址',
      //   dataIndex: 'buildingName',
      //   key: 'buildingName',
      //   width: '14%',
      //   render: function (text, record, index) {
      //     // console.log(record);
      //     return (text)
      //   },
      // },
      {
        title: '管辖单位',
        dataIndex: 'gxdwName',
        key: 'gxdwmc',
        width:100,
        render: function (text, record, index) {
          // console.log(record);
          return (text)
        },
      },
      { 
        title: '关注类别',
        dataIndex: 'base',
        key: 'qgzdry',
        width:150,
        render: (text, record, index)=>returnIconBy('people',text.gkzdry)
      }
    ]
  }

  // 列表与地图模式切换的回调函数
  _typeChange(key){
    this.setState({ activeTab: key })
    const tab = {key: `/old`, val: key}
    $GLOBALCONFIG.tabCache[`/old`] = tab
  }

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
        needMulti:true,
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
        needMulti:true,
        needArrowIcon:true,
      },
      {
        sort: 'superSelect',
        label: '关注类别',
        items: config.GKZDRY,
        key:'gzlb',
        numResKey:'gzlb',
        numReqKey:'gzlbids',
        needNum:true,
        needMulti:true,
        needArrowIcon:true,
      },
      {
        sort: 'superSelect',
        label: '户籍类别',
        items: config.HJLB,
        key:'hjlb',
        numResKey:'hjlb',
        numReqKey:'hjlbids',
        needNum:true,
        needMulti:true,
        needArrowIcon:true,
      },
      {
        sort:'singleSelect',
        label:'落地情况',
        key:'ldqk',
        // items:[
        //   {
        //     id:'1',
        //     name:'已落地',
        //   },
        //   {
        //     id:'0',
        //     name:'未落地',
        //   }
        // ],
        items:config.LDQK,
        numResKey:'ldqk',
        numReqKey:'ldqk',
      },
    ]
  }

  gFormSubmit(query){
    console.log(query)
    this.setState({currentPage:query.page,pageSize:query.pageSize})
    const temp={}
    temp.wld=query.ldqk.id
    temp.keyword=query.keyword
    temp.xzqhid=getItemByType(query.xzqh)
    temp.gxdwid=getItemByType(query.gxdw)||sessionStorage.getItem('divisionid')
    temp.gzlb=getItemByType(query.gzlb)
    temp.hjlx=getItemByType(query.hjlb)
    this.requsetBody={...this.requsetBody,...temp}
    this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
  }

  getStatisticsNum(currentSelected){
    this.requsetHead={...this.requsetHead,...currentSelected}
    this.props.dispatch(getAllRetrievalNum(this.requsetHead))
  }

  getNextPageList(page){
    this.requsetBody.pageNo=page
    this.setState({currentPage:page})
    this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
  }
  getNextPageSizeList(page,pageSize){
    this.requsetBody.pageNo=1
    this.setState({currentPage:1})
    this.requsetBody.pageSize=pageSize
    this.setState({pageSize})
    this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
  }

  //处理地图数据
  buildDataForMap(marktype, data = [] ){
    const dataForHtml = []
    const dataForMap = []
    data.map((item,index) =>{
      let id = item.base.id
      let lon = item.build&&item.build.jd
      let lat = item.build&&item.build.wd
      let num = index + 1
      //处理地图点位信息,确保地图点位坐标存在
      if(lon && lat){
        dataForMap.push({
            id: id, //[type:string]点位信息唯一标示，检索地图内容(content) 标示id，必要、唯一性
            peopleObj:item,
            title: item.base.xm,//[type:string]地图弹窗titile内容,必要
            lon: lon, //[type:number]地图经度，必要
            lat: lat, //[type:number]地图纬度，必要
            /*img: "",*/  //[type:string]可以放绝对地址以“http:”形式存放，可缺省为默认值
            marktype: marktype,  //[type:string] 图层唯一标示,这个字段跟infowindow有关系，必要
            content : "",  //[type:string] 弹框的内容，必要
            num: num,  //[type:number] 点位的数字标注, 必要
            size: {x: 35, y: 35}, // [type:json] 图标大小，必要
            sizeHover: {x: 35,y: 35}, //[type:json]鼠标放置到点位上时，图标将要改变的大小，可缺省。
        })
      }
      //处理地图左侧列表数据
      dataForHtml.push({
        id: id,  //点位信息唯一标示，检索地图内容(content) 标示id，与地图id值对应 必要
        content: item.base.xm,//列表展示内容 必要
        lon: lon, //经度，必要
        lat: lat, //纬度，必要
        num : num,//列表展示索引值,与地图num值对应 必要
        linkTo : `/pop$/visitDetail/${id}`,//路由地址 必要
      })
    })
    return {dataForHtml :dataForHtml, dataForMap: dataForMap}
  }

  //设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj,setContent){
    const content = getPeopleMapPopContent(obj.peopleObj)
    setContent(content)
  }

  returnContent(key){
    const {
      peopleCheckSearchResult
    } = this.props
    const marktype = "oldPeople"
    const dataSource = peopleCheckSearchResult.list
    const { dataForHtml,dataForMap } = this.buildDataForMap(marktype,dataSource) 
    switch(key){
      case 'list':
        return (
          <TableList
            columns={this.columns()}
            dataSource={peopleCheckSearchResult.list}
            loading={peopleCheckSearchResult.loading}
            totalCount={peopleCheckSearchResult.totalCount}
            scroll={{x:1000,y:true}}
          />
        )
      case 'map':
        return (
          <TypeMap
            marktype = { marktype }
            dataForHtml = { dataForHtml }
            dataForMap = { dataForMap }
            setWinContent = { this.setWinContent }
            loading={ this.props.peopleCheckSearchResult.loading }
          />
        )
    }
  }
  render() {
    //const oldId = this.props.oldId || this.props.params.oldId || 1
    const {
      peopleCheckSearchResult,
      peopleStatisticsResult,
      hasSubmitBtn,
      hasResetBtn,
    } = this.props

    const pagination=(
      <Pagination
        totalCount={peopleCheckSearchResult.totalCount}
        onShowSizeChange={this.getNextPageSizeList}
        onChange={this.getNextPageList}
        currentPage={this.state.currentPage}
        pageSize={this.state.pageSize}
      />
    )

    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={peopleStatisticsResult||{}}
          loading={peopleStatisticsResult.loading||this.state._requestLoading}
          getStatisticsNum={this.getStatisticsNum}
          cacheKey='oldPeople'
          totalCount={peopleCheckSearchResult.totalCount}
          initParam={this.initReqNum}
          page={this.state.currentPage}
          pageSize={this.state.pageSize}
        />
        <Tabs tabPosition="top" className="list-map-tabs" onChange={this._typeChange} activeKey={this.state.activeTab}>
          <TabPane tab="列表" key="list">
          </TabPane>
          <TabPane tab="地图" key="map">
          </TabPane>
        </Tabs>
        <div className='detail-content'>{this.returnContent(this.state.activeTab)}</div>
        <div className='ability-button'>{pagination}</div>
      </div>
    )
  }
}
