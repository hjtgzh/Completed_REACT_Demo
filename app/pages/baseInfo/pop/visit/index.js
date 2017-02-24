/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, message } from 'antd'

import Pagination from 'components/pagination/pagination'
import ContactAddressModal from 'components/relateAddrModal/relateAddrModal'
import TypeMap from 'components/map/typeMap'
import { getPeopleMapPopContent } from 'components/map/mapUtils'
import Gform from 'components/gForm'

import {
  fetchPeopleCheckList,
  insertVisitablePeople,
  insertForeigner,
  insertAddressForOne,
  // changeRequestParam,
  getAllRetrievalNum,
} from 'actions/people'

import getConfigItems, { getItemByType } from 'utils/getGformConfigItems'

import 'style/visitList.css'

import VisitableModal from './visitListModal/visitableModal'
import ForeignModal from './visitListModal/foreignModal'
import VisitTypeList from './visitTypeList'

const TabPane = Tabs.TabPane;
const execlApi = `${$GLOBALCONFIG.$ctx}/jcjw/resident/residentExport.json`

/**
 * 连接公用常量、后端返回的数据方法  并放置在props里面调用
 * @param  {Object} state, props  stat  e为redux的state,props为当前组件的props
 * @return {*}
 */
@connect(
    (state, props) => ({
      config: state.config,
      peopleCheckSearchQuery: state.peopleCheckSearchQuery,
      peopleCheckSearchResult: state.peopleCheckSearchResult,
      peopleStatisticsResult: state.peopleStatisticsResult,
    })
)

// 声明一个组件  并作为默认值对外输出
export default class visitList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    // 主键内部的数据
    this.state = {
      activeTab: 'list',
      // activeSub: 'visitTypeList',
      // 新增访查人员显隐
      isRenderVM: false,
      isShowVM: false,
      // 新增境外人员显隐
      isRenderFM: false,
      isShowFM: false,
      // 关联地址显隐
      visibleForContactAddress: false,
      // 新增访查人员确定按钮的loading标志
      insertVisitPeopleLoading: false,
      // 新增境外人员确定按钮的loading标志
      insertForeignerLoading: false,
      // 关联地址确定按钮的loading标志
      ContactAddressLoading: false,
      currentPage: 1,
      pageSize: 10,
    }

    this.requsetBody = {
      pageNo: 1,
      pageSize: 10,
    }
    this.requsetHead = {}
    this.initReqNum = {
      xzqhid: '',
      gxdwid: sessionStorage.getItem('divisionid'),
    }
    // 使此函数中的this指向此组件
    this._typeChange = this._typeChange.bind(this)

    // 访查人员显隐函数
    this.showVisitableModal = this.showVisitableModal.bind(this)
    this.hideVisitableModal = this.hideVisitableModal.bind(this)
    this.confirmVisitableModal = this.confirmVisitableModal.bind(this)
    this.cancelVisitableModal = this.cancelVisitableModal.bind(this)

    // 境外人员显隐函数
    this.showForeignModal = this.showForeignModal.bind(this)
    this.hideForeignModal = this.hideForeignModal.bind(this)

    this.confirmForeignModal = this.confirmForeignModal.bind(this)
    this.cancelForeignModal = this.cancelForeignModal.bind(this)

    // 关联入户的隐藏，显示函数为showContactAddressModal
    this.hideContactAddressModal = this.hideContactAddressModal.bind(this)
    // 关联入户的确定
    this.confirmContactAddressModal = this.confirmContactAddressModal.bind(this)
    this.showContactAddressModal = this.showContactAddressModal.bind(this)

    this.getList = this.getList.bind(this)

    this.getNextPageList = this.getNextPageList.bind(this)
    this.getNextPageSizeList = this.getNextPageSizeList.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.outputExecl = this.outputExecl.bind(this)
    this.getStatisticsNum = this.getStatisticsNum.bind(this)
  }

  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/visit']) {
      this.state.activeTab = $GLOBALCONFIG.tabCache['/visit'].val
    }
  }
  // 组件已经加载到dom中
  componentDidMount() {
    getConfigItems(this, {
      XZQH: '',
      GXDW: sessionStorage.getItem('divisionid'),
      HJLB: '',
      LDQK: '',
      GKZDRY: '',
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log('update props')
  }

  // 列表与地图模式切换的回调函数
  typeChange(key) {
    this.setState({ activeSub: key })
  }

  // 访查人口的显隐
  showVisitableModal() {
    this.setState({
      isRenderVM: true,
      isShowVM: true,
    })
  }
  hideVisitableModal() {
    this.setState({
      isShowVM: false,
    })
  }

  // 境外人员的显隐
  showForeignModal() {
    this.setState({
      isRenderFM: true,
      isShowFM: true,
    })
  }
  hideForeignModal() {
    this.setState({
      isShowFM: false,
    })
  }

  // 关联地址弹窗的显隐
  showContactAddressModal(id) {
    // console.log(arguments)
    this.setState({
      visibleForContactAddress: true,
    })
    this.state.id = id
  }
  hideContactAddressModal() {
    this.setState({
      visibleForContactAddress: false,
    })
    this.state.id = ''
  }

  // 页码改变时的回调
  getNextPageList(page) {
    this.requsetBody.pageNo = page
    this.setState({ currentPage: page })
    this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
  }

  // pageSize改变时的回调
  getNextPageSizeList(page, pageSize) {
    this.requsetBody.pageNo = 1
    this.setState({ currentPage: 1 })
    this.requsetBody.pageSize = pageSize
    this.setState({ pageSize })
    this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
  }

  // 获取列表
  getList() {
    this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
  }

 // 改变此组件内部的state.activeTab值，使页面切换TanPanel（切换组件）
  _typeChange(key) {
    this.setState({ activeTab: key })
    const tab = { key: '/visit', val: key }
    $GLOBALCONFIG.tabCache['/visit'] = tab
  }

  // 关联地址弹框的确定函数
  confirmContactAddressModal(Info) {
    const addressInfo = { ...Info, dzbm: Info.buildingcode, fjbm: Info.roomcode, id: this.state.id }
    this.setState({ ContactAddressLoading: true })
    this.props.dispatch(insertAddressForOne(addressInfo, (data) => {
      if (data.status === 1) {
        this.setState({ ContactAddressLoading: false, visibleForContactAddress: false })
        message.success('关联地址成功')
        this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
      } else {
        message.error('关联地址失败')
      }
    }))
  }

  // 访查人员弹框的确定和取消函数
  confirmVisitableModal(obj) {
    // console.log('Clicked OK');
    // console.log(obj);
    const _self = this
    if (!obj.sfzh) {
      message.error('请先查询后再添加')
      return
    }
    obj.baseid = obj.id
    obj.dzbm = obj.buildingcode
    obj.fjbm = obj.roomcode
    obj.hjlx = obj.sjly
    obj.zzdz = obj.xzdz
    this.setState({ insertVisitPeopleLoading: true })
    this.props.dispatch(insertVisitablePeople(obj, (response) => {
      _self.setState({ insertVisitPeopleLoading: false })
      if (response.status === 1) {
        _self.cancelVisitableModal()
        message.success('添加访查人员成功')
        this.setState({ currentPage: 1 })
        this.props.dispatch(getAllRetrievalNum(this.requsetHead))
        this.props.dispatch(fetchPeopleCheckList({ ...this.requsetBody, pageNo: 1 }))
      } else {
        message.error('新增访查人员失败')
      }
    }))
  }

  // 不渲染新增访查人口的弹窗
  cancelVisitableModal(e) {
    this.setState({
      isRenderVM: false,
    });
  }

  // 境外人员弹框的确定和取消函数
  confirmForeignModal(saveInfo) {
    if (!saveInfo.id) {
      message.error('请先搜索')
      return
    }
    saveInfo.baseid = saveInfo.id
    saveInfo.dzbm = saveInfo.buildingcode
    saveInfo.fjbm = saveInfo.roomcode
    saveInfo.zzdz = saveInfo.xzdz
    saveInfo.hjlx = saveInfo.sjly
    this.setState({ insertForeignerLoading: true })
    this.props.dispatch(insertForeigner(saveInfo, (data) => {
      this.setState({ insertForeignerLoading: false })
      if (data.status === 1) {
        this.cancelForeignModal()
        message.success('添加境外人员成功')
        this.setState({ currentPage: 1 })
        this.props.dispatch(getAllRetrievalNum(this.requsetHead))
        this.props.dispatch(fetchPeopleCheckList({ ...this.requsetBody, pageNo: 1 }))
      } else {
        message.error('新增境外人员失败')
      }
    }))
  }

  // 不渲染添加境外人员的弹窗
  cancelForeignModal(e) {
    this.setState({
      isRenderFM: false,
    });
  }

  // 导出
  outputExecl() {
    if (this.props.peopleCheckSearchResult.totalCount > 5000) {
      message.error('导出数据不可大于5000条')
      return
    }
    const temp = {}
    const strArr = []
    temp.xzqhid = this.requsetBody.xzqhid
    temp.gxdwid = this.requsetBody.gxdwid
    temp.gzlb = this.requsetBody.gzlb
    temp.hjlx = this.requsetBody.hjlx
    temp.wld = this.requsetBody.wld
    temp.token = sessionStorage.getItem('token')
    temp.pageNo = 1
    temp.pageSize = 5000
    temp.keyword = this.requsetBody.keyword
    Object.keys(temp).map((key, index) => {
      strArr.push(`${key}=${temp[key]}`)
    })
    window.open(`${execlApi}?${strArr.join('&')}`)
  }

  // 筛选条件组件调用
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '行政区划',
        items: config.XZQH,
        key: 'xzqh',
        numResKey: 'privilege',
        numReqKey: 'xzqhid',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwid',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '关注类别',
        items: config.GKZDRY,
        key: 'gzlb',
        numResKey: 'rylb',
        numReqKey: 'gzlbids',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '户籍类别',
        items: config.HJLB,
        key: 'hjlb',
        numResKey: 'hjlb',
        numReqKey: 'hjlbids',
        needNum: true,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'singleSelect',
        label: '落地情况',
        key: 'ldqk',
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
        items: config.LDQK,
        numResKey: 'ldqk',
        numReqKey: 'ldqk',
        needNum: true,
      },
    ]
  }

  // gForm的提交函数
  gFormSubmit(query) {
    // console.log(query)
    this.setState({ currentPage: query.page, pageSize: query.pageSize })
    const temp = {}
    temp.wld = query.ldqk.id
    temp.keyword = query.keyword
    temp.xzqhid = getItemByType(query.xzqh)
    temp.gxdwid = getItemByType(query.gxdw) || sessionStorage.getItem('divisionid')
    temp.gzlb = getItemByType(query.gzlb)
    temp.hjlx = getItemByType(query.hjlb)
    temp.pageNo = query.page
    temp.pageSize = query.pageSize
    this.requsetBody = { ...this.requsetBody, ...temp }
    this.props.dispatch(fetchPeopleCheckList(this.requsetBody))
  }

  // 请求每一项的统计值
  getStatisticsNum(currentSelected) {
    this.requsetHead = { ...currentSelected }
    this.props.dispatch(getAllRetrievalNum(this.requsetHead))
  }

  // 处理地图数据
  buildDataForMap(marktype, data = []) {
    const dataForHtml = []
    const dataForMap = []
    data.map((item, index) => {
      const id = `${item.id}:${item.base.id}`
      const lon = item.build && item.build.jd
      const lat = item.build && item.build.wd
      const num = index + 1
      // 处理地图点位信息,确保地图点位坐标存在
      if (lon && lat) {
        dataForMap.push({
          id: id, // [type:string]点位信息唯一标示，检索地图内容(content) 标示id，必要、唯一性
          peopleObj: item,
          title: item.base.xm, // [type:string]地图弹窗titile内容,必要
          lon: lon, // [type:number]地图经度，必要
          lat: lat, // [type:number]地图纬度，必要
            /* img: "",*/  // [type:string]可以放绝对地址以“http:”形式存放，可缺省为默认值
          marktype: marktype,  // [type:string] 图层唯一标示,这个字段跟infowindow有关系，必要
          content: '',  // [type:string] 弹框的内容，必要
          num: num,  // [type:number] 点位的数字标注, 必要
          size: { x: 35, y: 35 }, // [type:json] 图标大小，必要
          sizeHover: { x: 35, y: 35 }, //[type:json]鼠标放置到点位上时，图标将要改变的大小，可缺省。
        })
      }
      // 处理地图左侧列表数据
      dataForHtml.push({
        id: id,  // 点位信息唯一标示，检索地图内容(content) 标示id，与地图id值对应 必要
        content: item.base.xm, // 列表展示内容 必要
        lon: lon, // 经度，必要
        lat: lat, // 纬度，必要
        num: num, // 列表展示索引值,与地图num值对应 必要
        linkTo: `/pop$/visitDetail/${id}`, //路由地址 必要
      })
    })
    return { dataForHtml: dataForHtml, dataForMap: dataForMap }
  }

  // 设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj, setContent) {
    // console.log('obj',obj)
    const content = getPeopleMapPopContent(obj.peopleObj)
    setContent(content)
    // this.props.dispatch(fetchMapBuildingDetail({ buildingcode:  obj.id},()=>{
    //   const { fetchMapBuildingDetail } = this.props
    //   const content = getDeptMapPopContent( fetchMapBuildingDetail.data )
    // }))
  }

  // 返回tab指向的内容
  returnContent(key) {
    const marktype = 'people'
    const dataSource = this.props.peopleCheckSearchResult.list
    const { dataForHtml, dataForMap } = this.buildDataForMap(marktype, dataSource)
    switch (key) {
    case 'list':
      return <VisitTypeList showContactAddressModal={this.showContactAddressModal} />
    case 'map':
      return (
        <TypeMap
          marktype={marktype}
          dataForHtml={dataForHtml}
          dataForMap={dataForMap}
          setWinContent={this.setWinContent}
          loading={this.props.peopleCheckSearchResult.loading}
        />
      )
    default:return null
    }
  }
  // 渲染
  render() {
    const {
      peopleCheckSearchResult,
      peopleStatisticsResult,
    } = this.props

    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={peopleStatisticsResult || {}}
          loading={peopleStatisticsResult.loading || this.state._requestLoading}
          getStatisticsNum={this.getStatisticsNum}
          cacheKey="people"
          totalCount={peopleCheckSearchResult.totalCount}
          initParam={this.initReqNum}
          page={this.state.currentPage}
          pageSize={this.state.pageSize}
        />
        <div className="gform-next-div">
          <Tabs
            className="list-map-tabs"
            activeKey={this.state.activeTab}
            tabPosition="top"
            onChange={this._typeChange}
          >
            <TabPane tab="列表" key="list" />
            <TabPane tab="地图" key="map" />
          </Tabs>
          <div className="tab-main">
            {this.returnContent(this.state.activeTab)}
            <div className="ability-button">
              <Button onClick={this.showVisitableModal}>新增访查人口</Button>
              <Button onClick={this.showForeignModal}>新增境外人口</Button>
              <Button onClick={this.outputExecl}>导出</Button>
              <Pagination
                totalCount={peopleCheckSearchResult.totalCount}
                onShowSizeChange={this.getNextPageSizeList}
                onChange={this.getNextPageList}
                currentPage={this.state.currentPage}
                pageSize={this.state.pageSize}
              />
            </div>
          </div>
        </div>

        {
          this.state.isRenderVM ?
            <VisitableModal
              title="新增访查人口"
              visible
              onOk={this.confirmVisitableModal}
              onCancel={this.cancelVisitableModal}
              handleFisrtLevelModalShow={this.showVisitableModal}
              handleFisrtLevelModalHide={this.hideVisitableModal}
              btnLoading={this.state.insertVisitPeopleLoading}
              needAddress
              className={this.state.isShowVM ? 'show-block' : 'hide'}
            /> : null
        }

        {
          this.state.isRenderFM ?
            <ForeignModal
              title="新增境外人员"
              visible
              onOk={this.confirmForeignModal}
              onCancel={this.cancelForeignModal}
              handleFisrtLevelModalShow={this.showForeignModal}
              handleFisrtLevelModalHide={this.hideForeignModal}
              btnLoading={this.state.insertForeignerLoading}
              needAddress
              className={this.state.isShowFM ? 'show-block' : 'hide'}
            /> : null
        }

        {
          this.state.visibleForContactAddress ?
            <ContactAddressModal
              visible
              onOk={this.confirmContactAddressModal}
              onCancel={this.hideContactAddressModal}
              btnLoading={this.state.ContactAddressLoading}
            /> : null
        }
      </div>
    )
  }
}
