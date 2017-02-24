/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, message } from 'antd'
import Panel from 'components/panel'
import GForm from 'components/gForm'
import getConfigItems, { getItemByType } from 'utils/getGformConfigItems'
import returnIconBy from 'utils/transformToIcon'

// 引入地图
import TypeMap from 'components/map/typeMap'
import { getDeptMapPopContent } from 'components/map/mapUtils'

import {
  getDepartmentList,
  addDepartment,
  contactAddress,
  getAllRetrievalNum,
} from 'actions/department'
import Pagination from 'components/pagination/pagination'

import { updateTabList } from 'actions/tabList'

// import TypeList from './typeList'
import ContactAddressModal from 'components/relateAddrModal/relateAddrModal'
import AddDepartmentModal from './groupModal/addDepartmentModal'
import TransferFileModal from './groupModal/transferFileModal'

import 'style/group.css'

const TabPane = Tabs.TabPane

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      departmentListResult: state.departmentListResult,
      allRetrievalState: state.allRetrievalState,
      statisticsResult: state.statisticsResult,
      addDepartmentResult: state.addDepartmentResult,
    })
)

// 声明组件  并对外输出
export default class group extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      visibleForContactAddress: false,
      isRenderAddDepartment: false,
      isShowAddDepartment: false,
      visibleForTransferFile: false,
      addLoading: false,
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

    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.getStatisticsNum = this.getStatisticsNum.bind(this)

    this._typeChange = this._typeChange.bind(this)

    this.confirmContactAddressModal = this.confirmContactAddressModal.bind(this)
    this.addDepartment = this.addDepartment.bind(this)


    this.hideContactAddressModal = this.hideContactAddressModal.bind(this)

    this.showAddDepartmentModal = this.showAddDepartmentModal.bind(this)
    this.hideAddDepartmentModal = this.hideAddDepartmentModal.bind(this)
    this.cancelAddDepartmentModal = this.cancelAddDepartmentModal.bind(this)

    this.showTransferFileModal = this.showTransferFileModal.bind(this)
    this.hideTransferFileModal = this.hideTransferFileModal.bind(this)

    this.pageChange = this.pageChange.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)

    this.outputExcel = this.outputExcel.bind(this)
  }

  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/group']) {
      this.state.activeTab=$GLOBALCONFIG.tabCache['/group'].val
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // console.log('group componentDidMount')
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '实有单位',
        key: '/group$',
      }))
    }
    getConfigItems(this, {
      XZQH: '',
      GXDW: sessionStorage.getItem('divisionid'),
      DWSX: '',
      DWTX: '',
      LDQK: '',
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log('group componentWillReceiveProps')
  }

  // 获取统计值
  getStatisticsNum(currentSelected) {
    this.requsetHead = { ...currentSelected }
    this.props.dispatch(getAllRetrievalNum(this.requsetHead))
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
        sort: 'singleSelect',
        label: '单位属性',
        key: 'dwlb',
        items: config.DWSX,
        numResKey: 'dwsx',
        numReqKey: 'dwsx',
        needArrowIcon: true,
      },
      {
        sort: 'singleSelect',
        label: '单位特性',
        key: 'dwtx',
        items: config.DWTX,
        numResKey: 'jgtx',
        numReqKey: 'dwtx',
        needArrowIcon: true,
        needNum: true,
      },
      {
        sort: 'singleSelect',
        label: '落地情况',
        key: 'ldqk',
        items: config.LDQK,
        numResKey: 'ldqk',
        numReqKey: 'ldqk',
        needNum: true,
      },
      // {
      //   sort:'rangePicker',
      //   label:'时间',
      //   key:['starttime','endtime'],
      //   numReqKey:['starttime','endtime'],
      //   format:''
      // },
      // {
      //   sort:'singleSelect',
      //   label:'落地情况',
      //   key:'ldqk',
      //   items:config.Ldqk,
      // }
    ]
  }

  // gForm的提交函数
  gFormSubmit(query) {
    console.log(query)
    this.setState({ currentPage: query.page, pageSize: query.pageSize })
    const temp = {}
    temp.dwlb = query.dwlb.id
    temp.dwtx = query.dwtx.id
    temp.ldqk = query.ldqk.id
    temp.xzqhid = getItemByType(query.xzqh)
    temp.gxdwid = getItemByType(query.gxdw) || sessionStorage.getItem('divisionid')
    temp.keyword = query.keyword
    temp.pageNo = query.page
    temp.pageSize = query.pageSize
    // temp.starttime=query.starttime.dateString
    // temp.endtime=query.endtime.dateString
    this.requsetBody = { ...this.requsetBody, ...temp }
    this.props.dispatch(getDepartmentList(this.requsetBody))
  }

  // 缓存二级tab
  _typeChange(key) {
    this.setState({ activeTab: key })
    const tab = { key: '/group', val: key }
    $GLOBALCONFIG.tabCache['/group'] = tab
  }

  // table列的配置项
  columns() {
    const self = this
    return [
      {
        title: '序号',
        key: 'No',
        width: 50,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '机构名称',
        key: 'name',
        dataIndex: 'dwmc',
        width: 250,
        render: (text, record, index) => (
          <p>
            <span className="left">{text}</span>
            <Link to={`/group$/departmentDetail/${record.id}`} className="right">详情</Link>
          </p>
        ),
      },
      {
        title: '实际地址',
        key: 'address',
        dataIndex: 'bzdz',
        width: 350,
        render: (text, record, index) => (
          text ?
            <p>
              <span className="left" title={text}>{text}</span>
              <Link to={`/house$Detail/${record.bldid}`} className="right">详情</Link>
            </p> : null
        ),
      },
      {
        title: '房间名',
        key: 'room',
        dataIndex: 'fjmc',
        width: 120,
        render: (text, record, index) => (
          text ?
            <p>
              <span className="left">{text}</span>
              <Link to={`/house$/room/${record.bldid}/${record.fjid}`} className="right">详情</Link>
            </p> : null
        ),
      },
      {
        title: '法人代表',
        key: 'legalRepresentative',
        dataIndex: 'frdb',
        width: 80,
      },
      {
        title: '机构类别',
        key: 'type',
        dataIndex: 'jglb',
        width: 350,
        render: (text, record, index) => <p>{returnIconBy('department', text)}</p>,
      },
      {
        title: '管辖单位',
        key: 'jurisdictionalAgency',
        dataIndex: 'gxdw',
        width: 150,
      },
      {
        title: '操作',
        key: 'operate',
        width: 60,
        render: (text, record, index) => (<a onClick={() => self.showContactAddressModal(record.id)}>入户</a>),
      },
    ]
  }

  // 关联地址弹框的确定函数
  confirmContactAddressModal(addressInfo) {
    addressInfo.bldid = addressInfo.bldid || addressInfo.buildingcode
    addressInfo.fjid = addressInfo.fjid || addressInfo.roomcode
    addressInfo.id = this.state.id
    this.setState({ ContactAddressLoading: true })
    this.props.dispatch(contactAddress(addressInfo, (response) => {
      this.setState({ ContactAddressLoading: false, visibleForContactAddress: false })
      this.props.dispatch(getDepartmentList(this.requsetBody))
    }))
  }
  
  // 添加单位的确定按钮
  addDepartment(info) {
    this.props.dispatch(addDepartment(info, (response) => {
      message.success(response.msg, 10)
      this.cancelAddDepartmentModal()
      this.props.dispatch(getAllRetrievalNum(this.requsetHead))
      this.props.dispatch(getDepartmentList(this.requsetBody))
    }))
  }


  // 关联地址弹窗的显隐
  showContactAddressModal(id) {
    // console.log(arguments)
    this.setState({
      visibleForContactAddress: true,
    })
    this.state.id = id
  }

  // 隐藏关联入户弹窗
  hideContactAddressModal() {
    this.setState({
      visibleForContactAddress: false,
    })
    this.state.id = ''
  }

  // 新增组织机构的弹窗
  showAddDepartmentModal() {
    this.setState({
      isShowAddDepartment: true,
      isRenderAddDepartment: true,
    })
  }
  cancelAddDepartmentModal() {
    this.setState({
      isRenderAddDepartment: false,
    })
  }
  hideAddDepartmentModal() {
    this.setState({
      isShowAddDepartment: false,
    })
  }

  // 调档弹窗的显隐
  showTransferFileModal() {
    this.setState({
      visibleForTransferFile: true,
    })
  }

  // 隐藏调档弹窗
  hideTransferFileModal() {
    this.setState({
      visibleForTransferFile: false,
    })
  }

  // pageSize改变时的回调
  pageSizeChange(current, size) {
    this.setState({ pageSize: size, currentPage: 1 })
    this.requsetBody = { ...this.requsetBody, pageNo: 1, pageSize: size }
    this.getList(this.requsetBody)
  }

  //页码改变时的回调 
  pageChange(nextpage) {
    this.setState({ currentPage: nextpage })
    this.requsetBody = { ...this.requsetBody, pageNo: nextpage }
    this.getList(this.requsetBody)
  }

  // 获取列表
  getList(req) {
    this.props.dispatch(getDepartmentList(req))
  }

  // 导出功能
  outputExcel() {
    if (this.props.departmentListResult.totalCount > 5000) {
      message.error('导出数据不可大于5000条')
      return
    }
    const url = $GLOBALCONFIG.$ctx
    const strArr = []
    const copyObj = { ...this.requsetBody }
    copyObj.pageNo = 1
    copyObj.pageSize = 5000
    copyObj.token = sessionStorage.getItem('token')
    Object.keys(copyObj).map((key, index) => {
      // debugger
      if (!copyObj[key] && (copyObj[key] !== 0)) {
        strArr.push(`${key}=`)
      } else {
        strArr.push(`${key}=${copyObj[key]}`)
      }
    })
    window.open(`${url}/jcjw/department/outputExcel.json?${strArr.join('&')}`)
  }

  // 处理地图数据
  buildDataForMap(marktype, data = []) {
    const dataForHtml = []
    const dataForMap = []
    data.map((item, index) => {
      const id = item.id
      const lon = item.build && item.build.jd
      const lat = item.build && item.build.wd
      const num = index + 1
      // 处理地图点位信息,确保地图点位坐标存在
      if (lon && lat) {
        dataForMap.push({
          id: id, // [type:string]点位信息唯一标示，检索地图内容(content) 标示id，必要、唯一性
          departmentObj: item,
          title: item.dwmc, // [type:string]地图弹窗titile内容,必要
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
        content: item.dwmc, // 列表展示内容 必要
        lon: lon, // 经度，必要
        lat: lat, // 纬度，必要
        num: num, // 列表展示索引值,与地图num值对应 必要
        linkTo: `/group$/departmentDetail/${id}`, //路由地址 必要
      })
    })
    return { dataForHtml: dataForHtml, dataForMap: dataForMap }
  }

  // 设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj, setContent) {
    // console.log('obj',obj)
    const content = getDeptMapPopContent(obj.departmentObj)
    setContent(content)
    // this.props.dispatch(fetchMapBuildingDetail({ buildingcode:  obj.id},()=>{
    //   const { fetchMapBuildingDetail } = this.props
    //   const content = getDeptMapPopContent( fetchMapBuildingDetail.data )
    // }))
  }

  // tab页所指向的内容
  returnContent(key) {
    const { departmentListResult } = this.props
    const pagination = (<Pagination
      totalCount={departmentListResult.totalCount}
      onShowSizeChange={this.pageSizeChange}
      onChange={this.pageChange}
      currentPage={this.state.currentPage}
      pageSize={this.state.pageSize}
    />)
    const marktype = 'group'
    const dataSource = departmentListResult.list
    const { dataForHtml, dataForMap } = this.buildDataForMap(marktype, dataSource)
    switch (key) {
    case 'list':
      return (
        <div className="detail-content">
          <Table
            columns={this.columns()}
            dataSource={departmentListResult.list}
            scroll={{ x: 1000, y: true }}
            pagination={false}
            loading={departmentListResult.loading}
          />
          <div className="ability-button">
            <Button onClick={() => this.showAddDepartmentModal()}>新增单位</Button>
            {/* <Button onClick={()=>this.showTransferFileModal()}>调档</Button>*/}
            <Button onClick={this.outputExcel}>导出</Button>
            {pagination}
          </div>
        </div>
      )
    case 'map':
      return (
        <div className="detail-content">
          <TypeMap
            marktype={marktype}
            dataForHtml={dataForHtml}
            dataForMap={dataForMap}
            setWinContent={this.setWinContent}
            loading={departmentListResult.loading}
          />
          <div className="ability-button">
            {pagination}
          </div>
        </div>
      )
    default:return null
    }
  }
  
  render() {
    // console.log('render group')
    return (
      <Panel>
        <GForm
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={this.props.statisticsResult}
          loading={this.props.statisticsResult.loading || this.state._requestLoading}
          getStatisticsNum={this.getStatisticsNum}
          cacheKey="group"
          totalCount={this.props.departmentListResult.totalCount}
          initParam={this.initReqNum}
          page={this.state.currentPage}
          pageSize={this.state.pageSize}
        />
        <div className="gform-next-div">
          <Tabs
            tabPosition="top"
            onChange={this._typeChange}
            className="list-map-tabs"
            activeKey={this.state.activeTab}
          >
            <TabPane tab="列表" key="list" />
            <TabPane tab="地图" key="map" />
          </Tabs>
          {this.returnContent(this.state.activeTab)}
        </div>
        {
          this.state.isRenderAddDepartment ?
            <AddDepartmentModal
              visible={this.state.isShowAddDepartment || false}
              title={'新增单位'}
              onOk={this.addDepartment}
              onCancel={this.cancelAddDepartmentModal}
              handleFisrtLevelModalShow={this.showAddDepartmentModal}
              handleFisrtLevelModalHide={this.hideAddDepartmentModal}
              btnLoading={this.props.addDepartmentResult.loading || false}
              // className={this.state.isShowAddDepartment?'show-block':'hide'}
            /> : null
        }
        {
          this.state.visibleForTransferFile ?
            <TransferFileModal
              visible
              // onOk={this.confirmContactAddressModal}
              onCancel={this.hideTransferFileModal}
              // btnLoading={this.state.ContactAddressLoading}
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
      </Panel>
    )
  }
}
