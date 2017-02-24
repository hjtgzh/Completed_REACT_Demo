/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-10 14:05
*/
import React, { Component } from 'react'
import { Button, Tabs, Modal, Icon, message, Spin, notification } from 'antd'
import { connect } from 'react-redux'
import { fetchFloorsTree,
         saveFloorsTree,
         deleteFloorsRoom,
         addFloorsRoom,
         updataFloorsRoom,
         updataFloorsUnite,
         delFloorsUnite } from 'actions/house'
import BuildRoomModal from './floor/buildRoomModal'
import EditRoomInfoModal from './floor/editRoomInfoModal'
import EditUniteNameModal from './floor/editUniteNameModal'
import AddUniteModal from './floor/addUniteModal'
import AddRoomModal from './floor/AddRoomModal'
import AddFloorModal from './floor/AddFloorModal'

import 'style/floor.css'

const TabPane = Tabs.TabPane
const confirm = Modal.confirm

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchFloorsResult: state.fetchFloorsResult, // 获取房屋
    saveFloorsResult: state.saveFloorsResult, // 保存房屋
    deleteFloorsRoomResult: state.deleteFloorsRoomResult, // 删除房间
    addFloorsRoomResult: state.addFloorsRoomResult, // 新增房间
    updataFloorsRoomResult: state.updataFloorsRoomResult, // 修改房间信息
    updataFloorsUniteResult: state.updataFloorsUniteResult, //修改单元信息
  })
)

export default class Floor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buildRoomModalVisiable: false, // 建房弹窗
      editRoomInfoModalVisiable: false, // 修改房间信息弹窗
      editUniteNameModalVisiable: false, // 修改单元信息弹窗
      addUniteModalVisiable: false, // 新增单元弹窗
      addRoomModalVisiable: false, // 新增房间
      addFloorModalVisiable: false, // 新增楼层
      buildRoomLoading: false, // 建房loading状态
      addRoomLoading: false, // 新增房间loading状态
      updataRoomLoading: false, // 修改房间loading状态
      editUniteLoading: false, // 修改单元信息loading状态
      activeKey: null,
      data: [],
      unite: {},
      floor: {},
      room: {},
    }
    this.getRoomsResult = this.getRoomsResult.bind(this)// 获取房间数据
    this.showBuildRoomModal = this.showBuildRoomModal.bind(this)
    this.buildRoomOk = this.buildRoomOk.bind(this)
    this.buildRoomCancle = this.buildRoomCancle.bind(this)
    this.onChangeTab = this.onChangeTab.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.remove = this.remove.bind(this)
    this.add = this.add.bind(this)
    this.tabDoubleClick = this.tabDoubleClick.bind(this)
    this.addRoom = this.addRoom.bind(this)
    this.delRoom = this.delRoom.bind(this)
    this.delFloor = this.delFloor.bind(this)
    this.addFloor = this.addFloor.bind(this)
    this.roomDoubleClick = this.roomDoubleClick.bind(this)
    this.onEditRoomOk = this.onEditRoomOk.bind(this)
    this.onEditRoomCancle = this.onEditRoomCancle.bind(this)
    this.onEditUniteNameOk = this.onEditUniteNameOk.bind(this)
    this.onEditUniteNameCancle = this.onEditUniteNameCancle.bind(this)
    this.onAddUniteOk = this.onAddUniteOk.bind(this)
    this.onAddUniteCancle = this.onAddUniteCancle.bind(this)
    this.onAddRoomOk = this.onAddRoomOk.bind(this)
    this.onAddRoomCancel = this.onAddRoomCancel.bind(this)
    this.onAddFloorOk = this.onAddFloorOk.bind(this)
    this.onAddFloorCancel = this.onAddFloorCancel.bind(this)
    this.setActiveKey = this.setActiveKey.bind(this)
  }

  // 组件加载完成回调函数
  componentDidMount() {
    this.getRoomsResult()
  }

  // props状态更新回调
  componentWillReceiveProps(nextProps) {
    if (this.props.saveFloorsResult !== nextProps.saveFloorsResult) {
      this.setState({ buildRoomLoading: false })
    } else if (this.props.addFloorsRoomResult !== nextProps.addFloorsRoomResult) {
      this.setState({ addRoomLoading: false })
    } else if (this.props.updataFloorsRoomResult !== nextProps.updataFloorsRoomResult) {
      this.setState({ updataRoomLoading: false })
    } else if (this.props.updataFloorsUniteResult !== nextProps.updataFloorsUniteResult) {
      this.setState({ editUniteLoading: false })
    }else if(this.props.houseId !== nextProps.houseId){
      this.getRoomsResult(nextProps.houseId)
    }
  }

  // 获取房屋数据
  getRoomsResult(bldid) {
    this.props.dispatch(fetchFloorsTree({ bldid: bldid || this.bldid }, (result) => {
      this.setActiveKey(result.data.list)
    }))
  }

  // 快速建房弹窗
  showBuildRoomModal() {
    const { fetchFloorsResult } = this.props
    if (fetchFloorsResult.state === 0) {
      notification.info({
        message: '提醒',
        description: '该房屋地址尚未标注,请进入“房屋地址-地图”页面进行地址标注操作！',
      })
      return
    }
    this.setState({ buildRoomModalVisiable: true })
  }

  // 建房确认回调
  buildRoomOk(roomObj) {
    this.setState({ buildRoomLoading: true })
    this.props.dispatch(saveFloorsTree({ rooms: JSON.stringify(roomObj), bldid: this.bldid, quick: '0' }, (result) => {
      message.success(result.msg, 3)
      this.setState({ buildRoomModalVisiable: false })
      this.getRoomsResult()
    }))
  }

  // 建房取消回调
  buildRoomCancle() {
    this.setState({ buildRoomModalVisiable: false })
  }

  // Tab面板切换回调
  onChangeTab(activeKey) {
    this.setState({ activeKey: String(activeKey) })
  }

  // 新增或删除页签的回调
  onEdit(targetKey, action) {
    this[action](targetKey)
  }

  // 页签删除回调
  remove(targetKey) {
    const _self = this
    confirm({
      title: '提醒',
      content: (
        <div>
          <p>该单元包含房间信息，确认删除？</p>
        </div>
      ),
      onOk() {
        const params = { bldid: _self.bldid, dy: targetKey }
        _self.props.dispatch(delFloorsUnite(params, (result) => {
          message.success(result.msg, 3)
          _self.getRoomsResult()
        }))
      },
      onCancle() {},
    })
  }

  // 新增页签回调
  add() {
    const { fetchFloorsResult } = this.props
    this.setState({ data: fetchFloorsResult.list, addUniteModalVisiable: true })
  }

  // 新增房间
  addRoom(uniteObj, floorObj) {
    const _self = this
    return function () {
      _self.setState({ addRoomModalVisiable: true, unite: uniteObj, floor: floorObj })
    }
  }

  // 新增房间确认回调
  onAddRoomOk(params) {
    params.bldid = this.bldid
    this.setState({ addRoomLoading: true })
    this.props.dispatch(addFloorsRoom(params, (result) => {
      message.success(result.msg, 3)
      this.setState({ addRoomModalVisiable: false })
      this.getRoomsResult()
    }))
  }

  // 新增房间取消回调
  onAddRoomCancel() {
    this.setState({ addRoomModalVisiable: false })
  }

  // 删除房间
  delRoom(roomObj) {
    const _self = this
    return function () {
      confirm({
        title: '确认删除该房间',
        content: '删除房间会删除该房间所关联的所有信息，如人员、单位等',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          _self.props.dispatch(deleteFloorsRoom({ ids: JSON.stringify([roomObj.fjid]) }, (result) => {
            message.success(result.msg, 3)
            _self.getRoomsResult()
          }))
        },
      })
    }
  }

  // 删除楼层
  delFloor(floorObj) {
    const _self = this
    return function () {
      confirm({
        title: '确认删除该楼层及所有房间',
        content: '删除楼层会删除该楼层所有房间及关联信息',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          const ids = floorObj.rooms.map((roomObj, index) => (
            roomObj.fjid
            )
          )
          _self.props.dispatch(deleteFloorsRoom({ ids: JSON.stringify(ids) }, (result) => {
            message.success('删除楼层成功', 3)
            _self.getRoomsResult()
          }))
        },
      })
    }
  }

  // 新增楼层
  addFloor(uniteObj) {
    const _self = this
    return function () {
      _self.setState({ addFloorModalVisiable: true, unite: uniteObj })
    }
  }

  // 新增楼层确认回调
  onAddFloorOk(params) {
    params.bldid = this.bldid
    this.setState({ addRoomLoading: true })
    this.props.dispatch(addFloorsRoom(params, (result) => {
      message.success(result.msg, 3)
      this.setState({ addFloorModalVisiable: false })
      this.getRoomsResult()
    }))
  }

  // 新增楼层取消回调
  onAddFloorCancel() {
    this.setState({ addFloorModalVisiable: false })
  }

  // 双击房间
  roomDoubleClick(uniteObj, roomObj) {
    const _self = this
    return function () {
      _self.setState({ room: roomObj, unite: uniteObj, editRoomInfoModalVisiable: true })
    }
  }

  // 房间修改确定回调
  onEditRoomOk(params) {
    this.setState({ updataRoomLoading: true })
    this.props.dispatch(updataFloorsRoom(params, (result) => {
      message.success(result.msg, 3)
      this.setState({ editRoomInfoModalVisiable: false })
      this.getRoomsResult()
    }))
  }

  // 房间修改取消回调
  onEditRoomCancle() {
    this.setState({ editRoomInfoModalVisiable: false })
  }

  // 双击页签事件
  tabDoubleClick(dataObj, uniteObj) {
    const _self = this
    return function () {
      if (String(uniteObj.dy) === '0' || String(uniteObj.dy) === '-1') {
        message.warning('商铺、地下室默认不可修改')
        return
      }
      _self.setState({ data: dataObj, unite: uniteObj, editUniteNameModalVisiable: true })
    }
  }

  // 单元名称修改确定回调
  onEditUniteNameOk(params) {
    params.bldid = this.bldid
    this.setState({ editUniteLoading: true })
    this.props.dispatch(updataFloorsUnite(params, (result) => {
      message.success(result.msg, 3)
      this.setState({ editUniteNameModalVisiable: false })
      this.getRoomsResult()
    }))
  }

  // 单元名称修改取消回调
  onEditUniteNameCancle() {
    this.setState({ editUniteNameModalVisiable: false })
  }

  // 新增单元确定回调
  onAddUniteOk(roomObj) {
    this.setState({ buildRoomLoading: true })
    this.props.dispatch(saveFloorsTree({ rooms: JSON.stringify(roomObj), bldid: this.bldid, quick: '1' }, (result) => {
      message.success(result.msg, 3)
      this.setState({ addUniteModalVisiable: false })
      this.getRoomsResult()
    }))
  }

  // 新增单元取消回调
  onAddUniteCancle() {
    this.setState({ addUniteModalVisiable: false })
  }

  // 设置activeKey
  setActiveKey(uniteList) {
    const dy = uniteList.map((unite, index) => (
        String(unite.dy)
      )
    )
    if (dy.indexOf(String(this.state.activeKey)) === -1) {
      this.setState({ activeKey: String(dy[0]) || null })
    }
  }

  render() {
    this.bldid = this.props.houseId || this.props.params.houseId || 1
    const _self = this
    const { fetchFloorsResult } = this.props
    const content = fetchFloorsResult.list.map(data => (
      <TabPane
        tab={<span onDoubleClick={_self.tabDoubleClick(fetchFloorsResult.list, data)} > {data.dyjc || '未命名'} </span>}
        key={String(data.dy)}>
        {
          data.floors.map((floor, fIndex, floorArr) => (
            (
            <ul className="roomList" key={fIndex}>
              <li className="floor" key={floor.floor} >
                {`${floor.floor}层`}
                <span className="delFloor" onClick={_self.delFloor(floor)} title="删除楼层">
                  <Icon type="close" />
                </span>
              </li>
                {
                  floor.rooms.map((rooms, rIndex) => (
                    <li
                      className="rooms"
                      key={rIndex}
                      onDoubleClick={_self.roomDoubleClick(data, rooms)}
                    >
                      {rooms.roomname}
                      <span className="delRoom" onClick={_self.delRoom(rooms)} title="删除房间">
                        <Icon type="close" />
                      </span>
                    </li>
                  ))
                }
              <li className="roomPlus" key={fIndex * 100} onClick={_self.addRoom(data, floor)} title="点击新增房间">
                <Icon type="plus" />
              </li>
            </ul>
            )
          ))
        }
        <ul className="roomList">
          <li className="floor" onClick={_self.addFloor(data)} title="点击新增楼层">
            <Icon type="plus" />
          </li>
        </ul>
      </TabPane>
    ))
    return (
      <div className="floorContent nav-second-nextContent" >
        <Spin tip="Loading..." spinning={fetchFloorsResult.loading}>
          <Tabs
            className="list-tabs"
            type="editable-card"
            onChange={this.onChangeTab}
            onEdit={this.onEdit}
            activeKey={this.state.activeKey}
            hideAdd={fetchFloorsResult.list.length === 0}
          >
            {content}
          </Tabs>

          <div className="ability-button floor-ability-button">
            <Button className="btn-left" type="button"
              style={{ display: fetchFloorsResult.list.length ? 'none' : 'inline-block' }}
              onClick={this.showBuildRoomModal}
            >快速建房
            </Button>
          </div>
        </Spin>

        <BuildRoomModal
          visiable={this.state.buildRoomModalVisiable}
          loading={this.state.buildRoomLoading}
          buildRoomOk={this.buildRoomOk}
          buildRoomCancle={this.buildRoomCancle}
        />

        <EditRoomInfoModal
          uniteObj={this.state.unite}
          roomObj={this.state.room}
          loading={this.state.updataRoomLoading}
          visiable={this.state.editRoomInfoModalVisiable}
          onEditRoomOk={this.onEditRoomOk}
          onEditRoomCancle={this.onEditRoomCancle}
        />

        <EditUniteNameModal
          data={this.state.data}
          uniteObj={this.state.unite}
          loading={this.state.editUniteLoading}
          visiable={this.state.editUniteNameModalVisiable}
          onEditUniteNameOk={this.onEditUniteNameOk}
          onEditUniteNameCancle={this.onEditUniteNameCancle}
        />

        <AddUniteModal
          data={this.state.data}
          loading={this.state.buildRoomLoading}
          visiable={this.state.addUniteModalVisiable}
          onAddUniteOk={this.onAddUniteOk}
          onAddUniteCancle={this.onAddUniteCancle}
        />

        <AddRoomModal
          uniteObj={this.state.unite}
          floorObj={this.state.floor}
          loading={this.state.addRoomLoading}
          visiable={this.state.addRoomModalVisiable}
          onAddRoomOk={this.onAddRoomOk}
          onAddRoomCancel={this.onAddRoomCancel}
        />

        <AddFloorModal
          uniteObj={this.state.unite}
          loading={this.state.addRoomLoading}
          visiable={this.state.addFloorModalVisiable}
          onAddFloorOk={this.onAddFloorOk}
          onAddFloorCancel={this.onAddFloorCancel}
        />
      </div>
    )
  }
}
