/**
 * Created by 黄建停---实有房屋(新增地址)
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Tabs, Form, Button, message } from 'antd'
import Panel from 'components/panel'
// 引入地图
import AmapComponent from 'components/map/amap'
// 发送数据请求
import {
  fetchAddressSubmitResult,
} from 'actions/house'
import { updateTabList } from 'actions/tabList'
import AddressDetail from './addressDetail/index'


const TabPane = Tabs.TabPane;
let isSubmit = true
@connect(
  (state, props) => ({
    config: state.config,
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(props)
    // console.log(items)
    // props.cacheSearch(items);
  },
})
export default class newAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ifSubmit: false,
      passwordDirty: false,
      activeTab: 'list',
      longitude: '',
      latitude: '',
      submitData: {},
    }
    this._typeChange = this._typeChange.bind(this)
    this.getFormData = this.getFormData.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    this.cancleSubmit = this.cancleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '新增地址',
        key: '/house$/newAddress',
      }))
    }
  }

  _typeChange(key) {
    // this.setState({ activeTab: key })
  }

  // 地图经纬度获取
  getLocation(evt) {
    // console.log(evt)
    this.setState({
      longitude: evt.lon,
      latitude: evt.lat,
    })
  }

  // 获取表单数据
  getFormData(formData) {
    if (formData !== 'errors') {
      formData.jd = this.state.longitude
      formData.wd = this.state.latitude
      // console.log(formData)
      // 提交表单数据，发送请求
      this.props.dispatch(fetchAddressSubmitResult(formData, (res) => {
        // console.log(res)
        // console.log(res.status)
        if (res.status === 1) {
          message.success('新增数据成功！')
          document.querySelector('.ant-tabs-tab-active .anticon-close').click()
          hashHistory.push('/house$')
        }
      }))
    }
    // 重新设置state然后可以继续添加新的地址
    this.setState({ ifSubmit: false })
    isSubmit = false
  }

  // 表单提交确认按钮
  formSubmit() {
    this.setState({ ifSubmit: true })
    isSubmit = true
  }

  // 取消新增
  cancleSubmit() {
    document.querySelector('.ant-tabs-tab-active .anticon-close').click()
    hashHistory.push('/house$')
  }

  render() {
    return (
      <Panel>
        <Tabs tabPosition="top" onChange={this._typeChange} className="list-tabs">
          <TabPane tab="列表" key="list">
            <AddressDetail getFormData={this.getFormData} isSubmit={isSubmit} ifSubmit={this.state.ifSubmit} />
          </TabPane>
          <TabPane tab="地图" key="map">
            <div className="nav-second-nextContent hjt-addressMap">
              <AmapComponent getLocation={this.getLocation} />
            </div>
          </TabPane>
        </Tabs>
        <div className="ability-button">
          <Button type="" onClick={this.formSubmit}>保存</Button>
          <Button type="" onClick={this.cancleSubmit}>取消</Button>
        </div>
      </Panel>
    )
  }
}
