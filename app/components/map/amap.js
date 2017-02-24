/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 17:50
*/

import React, { Component } from 'react'
import { Button, message } from 'antd'

/**
 * 地图列表及地图展示
 * @param marktype     string    图层id,不可省缺  必要、唯一性
 * @param location     json { "lon"  : 120.6544, "lat" : 30.1544}     地址点位信息,如存在,地图打点并显示点位信息  必要
 * @param centerAt     json { "lon"  : 120.6544, "lat" : 30.1544}      地图中心点  如存在location,中心点显示location;若无centerAt,地图默认中心点  可缺省
 * @param setLocate    funcion   "保存坐标"接口             如需要 ： 必填
 * @param loading      boole     "保存坐标"动作loading标志  可缺省
 * @param getLocation  funcion   "获取地图打点坐标信息"     如需要 ： 必填
 **/

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        lon: null,
        lat: null,
      },
    }
    this.mapLoad = this.mapLoad.bind(this)
    this.getLocate = this.getLocate.bind(this)
    this.resetLocate = this.resetLocate.bind(this)
    this.save = this.save.bind(this)
  }

  // 获取坐标点
  getLocate(location) {
    const { getLocation } = this.props
    const lon = location.lon.toFixed(4)
    const lat = location.lat.toFixed(4)
    this.setState({ location: { lon: lon, lat: lat } })
    if (getLocation) {
      getLocation({ lon: lon, lat: lat })
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      const { marktype, location, centerAt } = nextProps
      const obj = { isDisplay: true, layerId: marktype }
      this.map.coordinatePick(marktype, this.getLocate)
      if (location && location.lon && location.lat) {
        const local = {
          lon: Number(location.lon).toFixed(4),
          lat: Number(location.lat).toFixed(4),
        }
        this.map.centerAt(location.lon, location.lat, obj, 14)
        this.setState({ location: local })
      }
    }
  }

  // 地图加载完成
  mapLoad() {
    const _self = this
    const $mapFrame = document.getElementById('mapFrame')
    const mapTime = setInterval(() => {
      if ($mapFrame && $mapFrame.contentWindow && $mapFrame.contentWindow.TMap) {
        clearInterval(mapTime)
        _self.map = $mapFrame.contentWindow.TMap
        const { marktype, location, centerAt } = _self.props
        const obj = { isDisplay: true, layerId: marktype }
        _self.map.coordinatePick(marktype, _self.getLocate)
        if (location && location.lon && location.lat) {
          const local = {
            lon: Number(location.lon).toFixed(4),
            lat: Number(location.lat).toFixed(4),
          }
          _self.map.centerAt(location.lon, location.lat, obj, 14)
          _self.setState({ location: local })
        } else if (centerAt && centerAt.lon && centerAt.lat) {
          _self.map.centerAt(centerAt.lon, centerAt.lat, { layerId: marktype }, 14);
        } else {
          return
        }
      }
    }, 100)
  }

  // 回到原位
  resetLocate() {
    const { marktype, location } = this.props
    const obj = { isDisplay: true, layerId: marktype }
    if (location && location.lon && location.lat) {
      this.map.centerAt(location.lon, location.lat, obj)
    }
  }

  // 保存坐标
  save() {
    const { setLocate } = this.props
    const location = this.state.location
    if (setLocate) {
      if (location.lon && location.lat) {
        this.props.setLocate(this.state.location)
      } else {
        message.error('坐标不存在,请在地图上标注点位！', 3)
      }
    }
  }

  render() {
    const { setLocate, loading } = this.props
    return (
      <div className="map-wrap">
        <div className="location-wrap">
          <span>{this.state.location.lon}</span>
          <span>{this.state.location.lat}</span>
        </div>
        <iframe
          id="mapFrame"
          className="mapFrame"
          style={{ width: '100%' }}
          onLoad={this.mapLoad}
          src={"components/map/map.html"}
        />
        { setLocate ?
          <div className="buttons">
            <Button type="primary" onClick={this.resetLocate}>回到原位</Button>
            <Button type="primary" onClick={this.save} loading={loading}>保存坐标</Button>
          </div> : null
        }
      </div>
    )
  }
}
