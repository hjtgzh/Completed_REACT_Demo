import React, { Component } from 'react'
import { Table, Row, Col, Pagination } from 'antd'
import Map from 'components/map/amap'

export default class TypeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: '鄂尔多斯东胜区纺织街道23号4幢',
      list: [
        {address: '鄂尔多斯东胜区纺织街道23号1幢', id: 1},
        {address: '鄂尔多斯东胜区纺织街道23号2幢', id: 2},
        {address: '鄂尔多斯东胜区纺织街道23号3幢', id: 3},
        {address: '鄂尔多斯东胜区纺织街道23号4幢', id: 4},
        {address: '鄂尔多斯东胜区纺织街道23号5幢', id: 5},
        {address: '鄂尔多斯东胜区纺织街道23号6幢', id: 6}
      ]
    }
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.viewDetail = this.viewDetail.bind(this)
  }
  componentDidMount() {
    // debugger
  }

  onShowSizeChange(current, pageSize){
    console.log(current, pageSize)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.houseId.id) {
      if (nextProps.houseId.lng && nextProps.houseId.lat) {
        const map = this.mapRef._map
        // eslint-disable-next-line no-undef
        const marker = new AMap.Marker({ position: [nextProps.houseId.lng, nextProps.houseId.lat] })
        map.setCenter([nextProps.houseId.lng, nextProps.houseId.lat])
        marker.setMap(map)
      }
    }
  }

  viewDetail(data, event){
    console.log(data)
    console.log(event)
  }
  render() {
    const {
      dataSource,
      } = this.props
    let lis = this.state.list.map( (item) =>
      (
        <li key={item.id} className="addressItem">
          <span className="address ">{item.id}{item.address}</span>
          <a className="right" onClick={this.viewDetail.bind(event, item)}>详情</a>
        </li>
      )
    )

    return (
      <div className="detail-content-map">
        <div className="box">
          <Row>
            <Col span={6}>
              <div className="addressList">
                <h4 className="addressListTitle">建筑物地址</h4>
                <ul className="">{lis}</ul>
              </div>
            </Col>
            <Col span={18}>
              <Map
                id="mapContainer"
                ref={r => this.mapRef = r}
                screatKey="a5ebc730f80db3b1375a691afad00942"
                options={{
                    zoom: 14,
                  }}
                events={{
                    complete: this.handleMapComplete,
                  }}
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
