/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Tabs, message } from 'antd'
import { updateTabList } from 'actions/tabList'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import Pagination from 'components/pagination/pagination'
// 接入地图
import TypeMap from 'components/map/typeMap'
import { getPoliceMapPopContent } from 'components/map/mapUtils'
import {
  fetchPoliceSendMsg,
  fetchPoliceSendWX,
  fetchPoliceList,
} from 'actions/police'
import SendMsgModal from './modal/sendMessage'

const TabPane = Tabs.TabPane;
const gxdwid = sessionStorage.getItem('divisionid')

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    policeListSearchResult: state.policeListSearchResult,
  })
)

// 声明组件  并对外输出
export default class police extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      policeCount: '',
      sendMsgVisible: false,
      loading: true,
      activeSub: 'list',
    }
    this.params = {
      gxdwid: gxdwid,
      currentPage: 1,
      pageSize: 10,
      onLine: '',
      queryStr: '',
    }

    this.handleShowSendMsg = this.handleShowSendMsg.bind(this)
    this.handleCancelSendMsg = this.handleCancelSendMsg.bind(this)
    this.exportPoliceExcel = this.exportPoliceExcel.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)
    this.pageChange = this.pageChange.bind(this)

    // 地图处理
    this.buildDataForMap = this.buildDataForMap.bind(this)
    this.setWinContent = this.setWinContent.bind(this)

    // gForm搜索
    this.gFormSubmit = this.gFormSubmit.bind(this)
  }

  // 数据查询
  getPoliceData() {
    this.props.dispatch(fetchPoliceList(this.params, (reply) => {
      this.setState({ policeCount: reply.data.count, loading: false })
    }))
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.getPoliceData()
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '实时警力',
        key: '/police$',
      }))
    }
  }

  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/police']) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache['/police'].val })
    }
  }

  pageSizeChange(e, pageSize) { // 改变每页显示条数回调函数
    this.setState({ loading: true })
    this.params.pageSize = pageSize
    this.params.currentPage = 1
    this.getPoliceData()
  }

  pageChange(currentPage) { // 点击每页回调函数
    this.setState({ loading: true })
    this.params.currentPage = currentPage
    this.getPoliceData()
  }

  gFormConfig() {
    return [
      {
        sort: 'singleSelect',
        label: '定位状态',
        items: [
          { name: '在线', id: 1 },
          { name: '离线', id: 2 },
        ],
        key: 'dwzt',
        needNum: false,
      },
    ]
  }

// 判断对象是否为空
  isEmptyObj(obj) {
    const length = Object.keys(obj).length
    if (length === 0) {
      return true
    } else {
      return false
    }
  }

  // 点击搜索返回搜索条件
  gFormSubmit(query) {
    this.setState({ loading: true })
    if (!this.isEmptyObj(query.dwzt)) {
      if (query.dwzt.name === '在线') {
        this.params.onLine = 1
      } else if (query.dwzt.name === '离线') {
        this.params.onLine = 0
      }
    } else {
      this.params.onLine = ''
    }
    this.params.queryStr = query.keyword
    this.getPoliceData()
  }

  // 右边弹框一系列操作
  handleShowSendMsg() { // 显示弹框
    this.setState({
      sendMsgVisible: true,
    })
  }

  handleCancelSendMsg() { // 关闭弹框
    this.setState({
      sendMsgVisible: false,
    })
  }

  handleokSendMsg() { // 发送短信
    this.setState({
      sendMsgVisible: false,
    })
  }

  _typeChange = (key) => {
    this.setState({ activeSub: key })
    const tab = { key: '/police', val: key }
    $GLOBALCONFIG.tabCache['/police'] = tab
  }

  // 导出警力
  exportPoliceExcel() {
    const urlBase = this.props.config.$ctx// 当前IP
    if (this.state.policeCount > 5000) {
      message.info('导出数据不能超出5000条')
      return
    }
    const token = sessionStorage.getItem('token')
    const exportObj = { ...this.params }
    exportObj.currentPage = 1
    exportObj.pageSize = 5000
    const strArr = []
    Object.keys(exportObj).map((key, index) => {
      strArr.push(`${key} = ${exportObj[key]}`)
    })

    window.open(`${urlBase}/jcjw/gpsDeviceExpExcel.json?${strArr.join('&')}&token=${token}`)
  }

  // 列表表头配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: 60,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        key: 'holdUserName',
        dataIndex: 'holdUserName',
        width: 150,
        render: (text, record, index) => <p>
          <span className="left">{text}</span>
          <Link to={`/police$Detail/${record.objectId}`} className="right">详情</Link>
        </p>,
      },
      {
        title: '职务',
        key: 'post',
        dataIndex: 'post',
        width: 150,
      },
      {
        title: '管辖单位',
        key: 'dptName',
        dataIndex: 'dptName',
        width: 100,
        render: (text, record, index) => <span>{record.holdUsers[0].directDptName}</span>,
      },
      {
        title: '手机号',
        key: 'interPhoneNo',
        dataIndex: 'interPhoneNo',
        width: 100,
        render: (text, record, index) => <span>{record.holdUsers[0].mobile}</span>,
      },
      {
        title: '携带设备',
        key: 'typeName',
        dataIndex: 'typeName',
        width: 100,
      },
      {
        title: '定位状态',
        key: 'onLineMc',
        dataIndex: 'onLineMc',
        width: 80,
      },
    ]
  }

  // 处理地图数据
  buildDataForMap(marktype, data = []) {
    const dataForHtml = []
    const dataForMap = []
    data.map((item, index) => {
      const id = item.gpsId
      const lon = (item.loc || [])[0]
      const lat = (item.loc || [])[1]
      const num = index + 1
      // 处理地图点位信息,确保地图点位坐标存在
      if (lon && lat) {
        dataForMap.push({
          id: id, // [type:string]点位信息唯一标示，检索地图内容(content) 标示id，必要、唯一性
          title: item.holdUserName, // [type:string]地图弹窗titile内容,必要
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
        content: item.holdUserName, // 列表展示内容 必要
        lon: lon, // 经度，必要
        lat: lat, // 纬度，必要
        num: num, // 列表展示索引值,与地图num值对应 必要
        linkTo: `/police$Detail/${item.objectId}`, //路由地址 必要
      })
    })
    return { dataForHtml: dataForHtml, dataForMap: dataForMap }
  }

  // 设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj, setContent) {
    /* this.props.dispatch(fetchPoliceDetail({ objectId :  obj.id},(result)=>{
     const content = getPoliceMapPopContent( result.data )
     setContent(content)
     }))*/
  }

  render() {
    const {
      policeListSearchResult,
      } = this.props
    const { currentPage, pageSize } = this.params
    const marktype = 'police'
    const dataSource = policeListSearchResult.list
    const { dataForHtml, dataForMap } = this.buildDataForMap(marktype, dataSource)
    return (
      <Panel>
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          totalCount={policeListSearchResult.totalCount || 0}
          loading={false}
          cacheKey="police"
        />

        <div className="gform-next-div">
          <Tabs
            defaultActiveKey={this.state.activeSub}
            onChange={this._typeChange}
            tabPosition="top"
            className="list-map-tabs list-tabs"
          >
            <TabPane tab="列表" key="list">
              <TableList
                columns={this.columns()}
                dataSource={policeListSearchResult.list}
                loading={this.state.loading}
                scroll={{ x: 1000, y: true }}
              />
            </TabPane>
            <TabPane tab="地图" key="map">
              <TypeMap
                marktype={marktype}
                dataForHtml={dataForHtml}
                dataForMap={dataForMap}
                setWinContent={this.setWinContent}
                loading={this.state.loading}
              />
            </TabPane>
          </Tabs>

          <div className="ability-button">
            <Button type="button" onClick={this.exportPoliceExcel}>导出</Button>
            <Pagination
              totalCount={policeListSearchResult.totalCount}
              onShowSizeChange={this.pageSizeChange}
              onChange={this.pageChange}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>

          {
            this.state.sendMsgVisible ?
              <SendMsgModal
                visible
                onOk={this.handleokSendMsg}
                onCancel={this.handleCancelSendMsg}
              /> : null
          }
        </div>
      </Panel>
    )
  }
}
