/**
 * Created by 黄建停---实有房屋（地址）地图
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TypeMap from 'components/map/typeMap'
import { getBuildingMapPopContent } from 'components/map/mapUtils'
import { fetchMapBuildingCount } from 'actions/house'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchMapBuildingCountResult: state.houseCheckSearchQuery,
  })
)

// 声明组件  并对外输出
export default class houseAddrTypeList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {

    }
    // 地图处理
    this.buildDataForMap = this.buildDataForMap.bind(this)
    this.setWinContent = this.setWinContent.bind(this)
  }

  // 处理地图数据
  buildDataForMap(marktype, data) {
    const dataForHtml = []
    const dataForMap = []
    data.map((item, index) => {
      const id = item.id
      const lon = item.jd || ''
      const lat = item.wd || ''
      const num = index + 1
      // 处理地图点位信息,确保地图点位坐标存在
      if (lon && lat) {
        dataForMap.push({
          id: id,
          title: item.mhcxdz || '',
          lon: lon,
          lat: lat,
            /* img: "",*/  // [type:string]可以放绝对地址以“http:”形式存放，可缺省为默认值
          marktype: marktype,
          content: '',
          num: num,
          size: { x: 35, y: 35 },
          sizeHover: { x: 35, y: 35 },
        })
      }
      // 处理地图左侧列表数据
      dataForHtml.push({
        id: id,
        content: item.mhcxdz || '',
        lon: lon,
        lat: lat,
        num: num,
        linkTo: `/house$Detail/${id}`,
      })
    })
    return { dataForHtml: dataForHtml, dataForMap: dataForMap }
  }

  // 设置地图弹窗内容,obj：点位信息对象，setContent:设置点位窗口文本接口
  setWinContent(obj, setContent) {
    this.props.dispatch(fetchMapBuildingCount({ bldId: obj.id }, (result) => {
      const content = getBuildingMapPopContent(result.data)
      setContent(content)
    }))
  }

  render() {
    const {
      houseCheckSearchResult,
      loading,
      } = this.props
    // 模拟地图数据
    const marktype = 'building'
    const { dataForHtml, dataForMap } = this.buildDataForMap(marktype, houseCheckSearchResult.list)
    return (
      <TypeMap
        marktype={marktype}
        dataForHtml={dataForHtml}
        dataForMap={dataForMap}
        setWinContent={this.setWinContent}
        loading={loading}
      />
    )
  }
  }
