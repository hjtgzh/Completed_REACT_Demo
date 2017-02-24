/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-13 14:05
*/
import React, { Component } from 'react'
import { Modal, Input, Icon, message } from 'antd'

import 'style/floor.css'

export default class BuildRoomModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      RoomsFields: {
        unitNum: 1,
        floorNumPerUnit: 1,
        roomNumPerFloor: 1,
        floorNumPerShop: 0,
        roomNumPerShop: 0,
        floorNumPerbase: 0,
        roomNumPerBase: 0,
      },
    }
    this.buildRoomOK = this.buildRoomOK.bind(this)
    this.buildRoomCancel = this.buildRoomCancel.bind(this)
    this.changeRoomsFields = this.changeRoomsFields.bind(this)
    this.plusFieldNum = this.plusFieldNum.bind(this)
    this.minusFieldNum = this.minusFieldNum.bind(this)
    this.getBuildJsonObj = this.getBuildJsonObj.bind(this)
  }

  // 组件加载完毕
  componentDidMount() {

  }

  // props更新函数
  componentWillReceiveProps(nextProps) {
    if (this.props.visiable !== nextProps.visiable) {
      const roomsFields = {
        unitNum: 1,
        floorNumPerUnit: 1,
        roomNumPerFloor: 1,
        floorNumPerShop: 0,
        roomNumPerShop: 0,
        floorNumPerbase: 0,
        roomNumPerBase: 0,
      }
      this.setState({ RoomsFields: roomsFields })
    }
  }

  // 弹窗取消
  buildRoomCancel() {
    this.props.buildRoomCancle()
  }

  // 弹窗确认
  buildRoomOK() {
    const roomsObjList = this.getBuildJsonObj()
    this.props.buildRoomOk(roomsObjList)
  }

  // 根据建房参数封装数据对象
  getBuildJsonObj() {
    const unitNum = this.state.RoomsFields.unitNum // 单元数
    const floorNumPerUnit = this.state.RoomsFields.floorNumPerUnit // 每单元层数
    const roomNumPerFloor = this.state.RoomsFields.roomNumPerFloor // 每层户室数
    const floorNumPerShop = this.state.RoomsFields.floorNumPerShop // 商铺层数
    const roomNumPerShop = this.state.RoomsFields.roomNumPerShop // 每层商铺数
    const floorNumPerbase = this.state.RoomsFields.floorNumPerbase // 地下室层数
    const roomNumPerBase = this.state.RoomsFields.roomNumPerBase // 每层地下室户数
    const roomsObjList = []
    // 封装单元房间数据对象
    for (let i = 0; i < unitNum; i++) {
      for (let j = 0; j < floorNumPerUnit; j++) {
        for (let k = 0; k < roomNumPerFloor; k++) {
          const roomObj = {}
          roomObj.dy = i + 1
          roomObj.dyjc = `${i + 1}单元`
          roomObj.lcs = j + 1
          roomObj.lcjc = `${j + 1}层`
          roomObj.wz = k + 1
          if (k + 1 < 10) {
            roomObj.fjmc = `${j + 1}0${k + 1}室`
          } else {
            roomObj.fjmc = `${j + 1}${k + 1}室`
          }
          roomsObjList.push(roomObj)
        }
      }
    }
    // 地下商铺房间数据对象
    for (let j = 0; j < floorNumPerShop; j++) {
      for (let k = 0; k < roomNumPerShop; k++) {
        const roomObj = {}
        roomObj.dy = 0
        roomObj.dyjc = '商铺'
        roomObj.lcs = j + 1
        roomObj.lcjc = `${j + 1}层`
        roomObj.wz = k + 1
        if (k + 1 < 10) {
          roomObj.fjmc = `${j + 1}0${k + 1}室`
        } else {
          roomObj.fjmc = `${j + 1}${k + 1}室`
        }
        roomsObjList.push(roomObj)
      }
    }
    // 地下地下室房间数据对象
    for (let j = 0; j < floorNumPerbase; j++) {
      for (let k = 0; k < roomNumPerBase; k++) {
        const roomObj = {}
        roomObj.dy = -1
        roomObj.dyjc = '地下室'
        roomObj.lcs = -(j + 1)
        roomObj.lcjc = `${-(j + 1)}层`
        roomObj.wz = k + 1
        if (k + 1 < 10) {
          roomObj.fjmc = `${j + 1}0${k + 1}室`
        } else {
          roomObj.fjmc = `${j + 1}${k + 1}室`
        }
        roomsObjList.push(roomObj)
      }
    }
    return roomsObjList
  }

  // 建房参数change事件
  changeRoomsFields(e) {
    const minNum = e.target.min || 0
    const maxNum = e.target.max || 99
    const inputName = e.target.name
    const inputValue = parseInt(e.target.value, 10)
    let curValue = 0
    if (isNaN(inputValue)) {
      curValue = minNum
    } else if (minNum >= inputValue) {
      message.warning(`系统默认最小值${minNum}`)
      curValue = minNum
    } else if (inputValue >= maxNum) {
      message.warning(`系统默认最大值${maxNum}`)
      curValue = maxNum
    } else {
      curValue = inputValue
    }
    this.state.RoomsFields[inputName] = curValue
    this.setState(this.state.RoomsFields)
    e.stopPropagation()
    e.preventDefault()
  }

  // 参数字段“+1”事件
  plusFieldNum(e) {
    const inputNode = e.currentTarget.parentNode.querySelector('input')
    const maxNum = inputNode.max || 99
    const inputName = inputNode.name
    let inputValue = parseInt(inputNode.value, 10) || 0
    if (inputValue < maxNum) {
      inputValue++
    } else {
      message.warning(`系统默认最大值${maxNum}`)
    }
    this.state.RoomsFields[inputName] = inputValue
    this.setState(this.state.RoomsFields)
    e.stopPropagation()
    e.preventDefault()
  }

  // 参数字段“-1”事件
  minusFieldNum(e) {
    const inputNode = e.currentTarget.parentNode.querySelector('input')
    const minNum = inputNode.min || 0
    const inputName = inputNode.name
    let inputValue = parseInt(inputNode.value, 10) || 0
    if (inputValue > minNum) {
      inputValue--
    } else {
      message.warning(`系统默认最小值${minNum}`)
    }
    this.state.RoomsFields[inputName] = inputValue
    this.setState(this.state.RoomsFields)
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    return (
      <Modal
        className=" modal-header modal-body"
        title="快速建房"
        visible={this.props.visiable}
        confirmLoading={this.props.loading}
        onOk={this.buildRoomOK}
        onCancel={this.buildRoomCancel}
      >
        <table className="add-floor-info">
          <tbody>
            <tr>
              <td colSpan="2" className="floor-trbg">
                <span className="left">地面户室</span>
              </td>
            </tr>
            <tr>
              <td className="jfTitle">单元数</td>
              <td className="jfInfo">
                <button className="jfMinus" onClick={this.minusFieldNum}>
                  <Icon type="minus" />
                </button>
                <Input type="number"
                  className="number_iput"
                  min="1"
                  max="99"
                  name="unitNum"
                  onChange={this.changeRoomsFields}
                  value={this.state.RoomsFields.unitNum}
                />
                <button className="jfPlus" onClick={this.plusFieldNum}>
                  <Icon type="plus" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="jfTitle">每单元层数</td>
              <td className="jfInfo">
                <button className="jfMinus" onClick={this.minusFieldNum}>
                  <Icon type="minus" />
                </button>
                <Input type="number"
                  className="number_iput"
                  min="1"
                  max="99"
                  name="floorNumPerUnit"
                  onChange={this.changeRoomsFields}
                  value={this.state.RoomsFields.floorNumPerUnit}
                />
                <button className="jfPlus" onClick={this.plusFieldNum}>
                  <Icon type="plus" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="jfTitle">每层户室数</td>
              <td className="jfInfo">
                <button className="jfMinus" onClick={this.minusFieldNum}>
                  <Icon type="minus" />
                </button>
                <Input type="number"
                  className="number_iput"
                  min="1"
                  max="99"
                  name="roomNumPerFloor"
                  onChange={this.changeRoomsFields}
                  value={this.state.RoomsFields.roomNumPerFloor}
                />
                <button className="jfPlus" onClick={this.plusFieldNum}>
                  <Icon type="plus" />
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="floor-trbg">
                <span className="left">底部商铺</span>
              </td>
            </tr>
            <tr>
              <td className="jfTitle">层数</td>
              <td className="jfInfo">
                <button className="jfMinus" onClick={this.minusFieldNum}>
                  <Icon type="minus" />
                </button>
                <Input type="number"
                  className="number_iput"
                  min="0"
                  max="99"
                  name="floorNumPerShop"
                  onChange={this.changeRoomsFields}
                  value={this.state.RoomsFields.floorNumPerShop}
                />
                <button className="jfPlus" onClick={this.plusFieldNum}>
                  <Icon type="plus" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="jfTitle">每层商铺数</td>
              <td className="jfInfo">
                <button className="jfMinus" onClick={this.minusFieldNum}>
                  <Icon type="minus" />
                </button>
                <Input type="number"
                  className="number_iput"
                  min="0"
                  max="99"
                  name="roomNumPerShop"
                  onChange={this.changeRoomsFields}
                  value={this.state.RoomsFields.roomNumPerShop}
                />
                <button className="jfPlus" onClick={this.plusFieldNum}>
                  <Icon type="plus" />
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="floor-trbg">
                <span className="left">地下空间</span>
              </td>
            </tr>
            <tr>
              <td className="jfTitle">层数</td>
              <td className="jfInfo">
                <button className="jfMinus" onClick={this.minusFieldNum}>
                  <Icon type="minus" />
                </button>
                <Input type="number"
                  className="number_iput"
                  min="0"
                  max="99"
                  name="floorNumPerbase"
                  onChange={this.changeRoomsFields}
                  value={this.state.RoomsFields.floorNumPerbase}
                />
                <button className="jfPlus" onClick={this.plusFieldNum}>
                  <Icon type="plus" />
                </button>
              </td>
            </tr>
            <tr>
              <td className="jfTitle">每层房间数</td>
              <td className="jfInfo">
                <button className="jfMinus" onClick={this.minusFieldNum}>
                  <Icon type="minus" />
                </button>
                <Input type="number"
                  className="number_iput"
                  min="0"
                  max="99"
                  name="roomNumPerBase"
                  onChange={this.changeRoomsFields}
                  value={this.state.RoomsFields.roomNumPerBase}
                />
                <button className="jfPlus" onClick={this.plusFieldNum}>
                  <Icon type="plus" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    )
  }
}
