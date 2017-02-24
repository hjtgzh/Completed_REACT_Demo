/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Modal, message, AutoComplete,Icon } from 'antd';
import {
  fetchBuildingResult,
  fetchRoomResult,
} from 'actions/people'
import './style.css'

const FormItem = Form.Item
let searchBuildData = []
let searchRoomeData = []
let bzdzArr = []
let roomeArr = []


@Form.create({})

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    searchBuildingResult: state.searchBuildingResult,
    searchRoomResult: state.searchRoomResult,

  })

)
export default class bindAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {
        buildingcode: '',
        roomcode: '',
        xzdz: '',
      },
      buildingResult: [],
      roomResult: [],
      buildingName: '',
      roomName: '',
      isShowBuildingResult: false,
      isShowRoomResult: false,
      buildingTimer: '',
      roomTimer: '',
      clickToChange: false,
      clickRoomToChange: false,
    }
    this.inputBuilding = this.inputBuilding.bind(this)
    this.inputRoom = this.inputRoom.bind(this)
    this.handelSubmit = this.handelSubmit.bind(this)
    this.clickBuildingItem = this.clickBuildingItem.bind(this)
    this.clickRoomItem = this.clickRoomItem.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchBuildingResult !== this.props.searchBuildingResult) {
      if (nextProps.searchBuildingResult.state === 1) {
        this.setState({ isShowBuildingResult: true })
      }
    }
    if (nextProps.searchRoomResult !== this.props.searchRoomResult) {
      if (nextProps.searchRoomResult.state === 1) {
        this.setState({ isShowRoomResult: true })
      }
    }
  }

  // 输入并查询其匹配的地址
  inputBuilding(value) {
    if (this.state.clickToChange) {
      this.setState({ clickToChange: false })
      return
    }
    bzdzArr = []
    this.setState({ buildingResult: bzdzArr })
    const _self = this
    this.setState({ buildingName: value })
    clearTimeout(this.state.buildingTimer)
    if (!value) {
      return
    }
    this.state.buildingTimer = setTimeout(() => {
      _self.props.dispatch(fetchBuildingResult({ keyword: value }, (data) => {
        searchBuildData = data.data
        if (searchBuildData.length) {
          for (const item of Object.keys(searchBuildData)) {
            bzdzArr.push(data.data[item].bzdz)
          }
          _self.setState({ buildingResult: bzdzArr })
        } else {
          message.warn('无数据')
          return
        }
      }))
    }, 500)
  }

  // 输入并查询其匹配的户室
  inputRoom(value) {
    console.log(this.state.clickRoomToChange)
    if (this.state.clickRoomToChange) {
      this.setState({ clickRoomToChange: false })
      return
    }
    roomeArr = []
    const _self = this
    const bldid = this.state.info.buildingcode
    if (bldid === '' || bldid === undefined) {
      message.error('请在地址栏输入有效关键字，在下拉框里选择地址')
      return;
    }
    this.setState({ roomName: value})
    clearTimeout(this.state.roomTimer)
    if (!value) {
      return
    }
    this.state.roomTimer = setTimeout(() => {
      this.props.dispatch(fetchRoomResult({ bldid: bldid, fjmc: value }, (data) => {
        searchRoomeData = data.data.list
        if (searchRoomeData.length) {
          searchRoomeData.map((itme, index) => {
            roomeArr.push(searchRoomeData[index].dzmc)
            console.log(itme)
          })
          _self.setState({ roomResult: roomeArr })

        } else {
          message.warn('该地址无户室信息')
          return;
        }
      }))
    }, 500)
  }

  // 选择地址
  clickBuildingItem(value) {
    // for (const item in searchBuildData) {}
    searchBuildData.map((item, index) => {
      if (item.bzdz === value) {
        this.state.info.buildingcode = item.id
        this.state.info.xzdz = item.bzdz + this.state.roomName
      }
    })
    this.state.clickToChange = true
  }

  // 选择户室
  clickRoomItem(value) {
    searchRoomeData.map((item, index) => {
      if (item.dzmc === value) {
        this.state.info.roomcode = item.id
        this.state.info.xzdz = this.state.buildingName + item.dzmc
      }
    })
    this.state.clickRoomToChange = true
  }

  // 关闭模糊查询的下拉栏
 /* _closeUnderList() {
    this.setState({ isShowBuildingResult: false, isShowRoomResult: false })
  }*/

  // 确定提交表单
  handelSubmit() {
    this.props.onOk(this.state.info)
  }
  footer() {
    return (
      <div>
        <Button type="primary" size={'large'} onClick={this.handelSubmit} loading={this.props.btnLoading}>确定</Button>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    }
    const {searchBuildingResult,searchRoomResult}=this.props
    return (
      <Modal
        className="modal-header"
        title={this.props.title || '关联地址'}
        visible={this.props.visible}
        footer={this.footer()}
        onCancel={this.props.onCancel}
      >
        <section style={{ height: '100%' }}>
          <Form horizontal className="relateAddr-form">
            <FormItem
              {...formItemLayout}
              label="地址信息"
              hasFeedback
              style={{ position: 'relative' }}
            >
              <AutoComplete
                dataSource={this.state.buildingResult}
                onSelect={this.clickBuildingItem}
                style={{ width:"100%"  }}
                onChange={this.inputBuilding}
                placeholder="请输入地址"
              />
              {
                searchBuildingResult.loading? <Icon type="loading" className="loadingSyle"/>:null
               }

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="户室信息"
              hasFeedback
              style={{ position: 'relative' }}
            >
              <AutoComplete
                dataSource={this.state.roomResult}
                onSelect={this.clickRoomItem}
                style={{ width: "100%" }}
                onChange={this.inputRoom}
                placeholder="请输户室信息"
              />
              {
                searchRoomResult.loading? <Icon type="loading" className="loadingSyle"/>:null
              }
            </FormItem>
          </Form>
        </section>
      </Modal>
    )
  }
}
