/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-10 14:05
*/

import React, { Component } from 'react'
import { message, Spin } from 'antd'
import { Link } from 'react-router'
import './style.css'
/**
 * 地图列表及地图展示
 * @param marktype     string 图层id,不可省缺 默认为building  必要、唯一性
 * @param dataForHtml  arrayObject  地图左侧列表数据，不可省缺
 *                     eg:[{
 *                          id: "4154654121",  [type:num or string] 点位信息唯一标示，检索地图内容(content) 标示id，与地图id值对应 必要、唯一性
 *                          content: "长沙市望城区东城镇金钩寺村东屋组144号姚菊兵私宅" , [type:string]  列表展示内容 必要
 *                          lon: "120.15457", [type:num] 经度，必要
 *                          lat: "30.15455", [type:num] 纬度，必要
 *                          num : num, [type:num] 列表展示索引值,与地图num值对应 必要
 *                          linkTo : `/house$Detail/${item.buildingcode}`,[type:string]  [type:string] 详情路由地址 必要
 *                         }]
 *
 * @param dataForMap  arrayObject  地图点位数据，不可省缺
 *                    eg:[{
 *                          id: "4154654121",  [type:num or string] 点位信息唯一标示，检索地图内容(content) 标示id，与地图id值对应 必要、唯一性
 *                          title: "金钩寺村东屋组144号姚菊兵私宅" , [type:string] 地图弹窗titile内容,必要
 *                          lon: "120.15457", [type:num] 经度，必要
 *                          lat: "30.15455", [type:num] 纬度，必要
 *                          img: "/images/building/yjf.png",  [type:string]可以放绝对地址以“http:”形式存放，可缺省为默认值
 *                          marktype: "building",  [type:string] 图层唯一标示,这个字段跟infowindow有关系，必要
 *                          content : "<div>hello world</div>",  [type:string] 初始化弹框的内容，后续用 map.setMarkInfoWindowContent(content)修改弹窗内容！！！
 *                          num: num,  [type:num] 点位的数字标注, 必要
 *                          size: {x: 35, y: 35},  [type:json] 图标大小，可缺省为默认值
 *                          sizeHover: {x: 35,y: 35}, //[type:json]鼠标放置到点位上时，图标将要改变的大小，可缺省为默认值。
 *                         }]
 *
 * @param setWinContent function  设置弹窗问题内容，不可省缺
 *                      @param obj 地图点位信息对象
 *                      @param setContent 回调函数，设置点位视图文本接口
 *                       eg:  setWinContent(obj,setContent){
 *                            this.props.dispatch(fetchMapBuildingDetail({ buildingcode:  obj.id},()=>{
 *                               const { fetchMapBuildingDetail } = this.props
 *                               const content = getBuildingMapPopContent( fetchMapBuildingDetail.data )//生成视图文本
 *                               setContent(content)
 *                            }))
 *                             //测试代码
 *                             const content = getBuildingMapPopContent( this.state.detail )
 *                             setContent(content) //调用地图
 *                           }
 *
 *@param loading      boole  "地图列表数据更新loading状态"     选填
 *
 */

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.buildLeftMapHtml = this.buildLeftMapHtml.bind(this)
    this.mapLoad = this.mapLoad.bind(this)
    this.markerLayerClickCallback = this.markerLayerClickCallback.bind(this)
    this.viewBuildingDetail = this.viewBuildingDetail.bind(this)
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataForMap !== nextProps.dataForMap) {
      const map = this._map
      if (map) {
        const { marktype, dataForMap } = nextProps
        map.removeMarkers(marktype)
        if (dataForMap.length > 0) {
          map.addMarkers(marktype, dataForMap, false, this.markerLayerClickCallback)
          map.centerAt(dataForMap[0].lon, dataForMap[0].lat,{isDisplay : false,layerId : "defaultLayer"},12);
        }
      }
    }
  }

  // 地图异步加载完成时调用
  mapLoad() {
    const _self = this
    const $mapFrame = document.getElementById('mapFrame')
    const mapTime = setInterval(() => {
      if ($mapFrame && $mapFrame.contentWindow && $mapFrame.contentWindow.TMap) {
        clearInterval(mapTime)
        _self._map = $mapFrame.contentWindow.TMap
        const { marktype, dataForMap } = _self.props
        if (dataForMap.length > 0) {
          _self._map.addMarkers(marktype, dataForMap, false, _self.markerLayerClickCallback)
          _self._map.centerAt(dataForMap[0].lon, dataForMap[0].lat,{isDisplay : false,layerId : "defaultLayer"},12);
        }
      }
    }, 100)
  }

  // 点击左侧列表，marktype通用方法
  viewBuildingDetail(id, lon, lat) {
    const _self = this
    return () => {
      const { marktype } = _self.props
      const map = _self._map
      if (!lon || !lat) {
        message.warning('该地址未标注！', 3)
        return
      }
      // markerLayerClickCallback 左侧列表地图回调，把内容插入窗口
      map.queryMarker(id, marktype, _self.markerLayerClickCallback)
    }
  }

  // 地图回调,marker弹框内容的填充回调 marktype通用方法
  markerLayerClickCallback(obj) {
    const _map = this._map
    const setContent = _map.setMarkInfoWindowContent
    this.props.setWinContent(obj, setContent)
  }

  // 地图左侧html
  buildLeftMapHtml(data) {
    const leftMapHtml = data.map((item, index) => (
      <li key={index} className="addressItem">
        <span 
          className="address"
          title={item.content || ''}
          onClick={this.viewBuildingDetail(item.id, item.lon, item.lat)}
        >{item.num},{item.content || ''}
        </span>
        <span className="detail" >
          <Link to={item.linkTo}>详情</Link>
        </span>
      </li>
      )
    )
    return leftMapHtml
  }

  render() {
    const { dataForHtml, loading = false } = this.props
    const leftMapHtml = this.buildLeftMapHtml(dataForHtml)

    return (
      <Spin tip="Loading..." spinning={loading}>
        <div className="detail-content-map">
          <div className="box-left ">
            <h4 className="addressListTitle">列表信息</h4>
            <ul className="">{leftMapHtml}</ul>
          </div>
          <div className="box-right">
            <iframe id="mapFrame" className="mapFrame"
              style={{ width: '100%' }}
              onLoad={this.mapLoad}
              src={"components/map/map.html?v="}
            />
          </div>
        </div>
      </Spin>
    )
  }
}
