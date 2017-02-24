/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Button, Row, Col, Input, message, Form, Spin } from 'antd'
import { updateTabList } from 'actions/tabList'
import Panel from 'components/panel'

import {
  fetchClueSave,  // 保存
  fetchUpadteAllRecord, // 修改
  fetchDeleteLinkJdc, // 删除线索关联机动车
  fetchDeleteLinkDdc, // 删除线索关联电动车
  fetchDeleteLinkDw, // 删除线索关联单位
  fetchDeleteLinkRy, // 删除线索关联人员
  fetchDeleteLinkAj, // 删除线索关联案件
  fetchDeleteLinkJq, // 删除线索关联警情
  fetchClueDetail, // 线索记录详情
} from 'actions/people'
import {
 fetchBasicInfo } from 'actions/popRely'
import RelationCard from './relationCard'
import ImgView from './imgView'
import StateBtn from './stateButton'

import AlarmPop from './popUp/alarmPop'
import BikePop from './popUp/bikePop'
import CarPop from './popUp/carPop'
import LawPop from './popUp/lawPop'
import PeoplePop from './popUp/peoplePop'
import UnitPop from './popUp/unitPop'

const FormItem = Form.Item

@connect(
    (state) => ({
      config: state.config,
      clueSaveHandleResult: state.clueSaveHandleResult,
      clueUpadteAllResult: state.clueUpadteAllResult,
      clueDeleteLinkJdcResult: state.clueDeleteLinkJdcResult, // 删除线索关联机动车
      clueDeleteLinkDdcResult: state.clueDeleteLinkDdcResult, // 删除线索关联电动车
      clueDeleteLinkDwResult: state.clueDeleteLinkDwResult, // 删除线索关联单位
      clueDeleteLinkRyResult: state.clueDeleteLinkRyResult, // 删除线索关联人员
      clueDeleteLinkAjResult: state.clueDeleteLinkAjResult, // 删除线索关联案件
      clueDeleteLinkJqResult: state.clueDeleteLinkJqResult, // 删除线索关联警情
      clueDetailResult: state.clueDetailResult,
    })
)
@Form.create({
})
export default class newClue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: {
        people: true,
        car: false,
        bike: false,
        unit: false,
        law: false,
        alarm: false,
      },
      visible: {
        people: false,
        car: false,
        bike: false,
        unit: false,
        law: false,
        alarm: false,
      },
      result: {
        ddcarr: [],
        jdcarr: [],
        dwarr: [],
        ryarr: [],
        ajarr: [],
        jqarr: [],
        tparr: [],
      },
      tplist: [], // 线索详情保存的图片
      showLabel: {}, // 标签展示项
      clueShowType: 'newClue',
      dataSource: {}, // 关联信息数据源
      isLook: {}, // 是否查看
      houseId: '', // 保存地址id
      roomId: '', // 保存房间id
      bindMes: {
        type: '',
        id: '',
      }, // 绑定的类型跟对应id
      notice: false,
      address: '翁沛洋 330106200308152112',
    }
    this.changeState = this.changeState.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.showNotice = this.showNotice.bind(this)
    this.setBtnArr = this.setBtnArr.bind(this)
    this.saveClue = this.saveClue.bind(this)
    this.updateClue = this.updateClue.bind(this)
    this.saveRelation = this.saveRelation.bind(this)
    this.closeHandle = this.closeHandle.bind(this)
    this.showHandle = this.showHandle.bind(this)
    this.closeDetailHandle = this.closeDetailHandle.bind(this)
    this.saveImages = this.saveImages.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.clueId === nextProps.params.clueId) {
      return
    }
    const clueId = nextProps.clueId || nextProps.params.clueId || 1
    let name = ''

    if (clueId.substr(0, 7) !== 'newClue') {
      name = '线索详情'
      this.state.clueShowType = 'detail'
      this.props.dispatch(fetchClueDetail({ id: clueId }, () => {
        const clueDetailResult = this.props.clueDetailResult
        const result = this.state.result

        const mark = clueDetailResult.clue.mark || '' // 显示的标签
        const markArr = mark.split(',')
        this.state.showLabel = {}
        for (let i = 0; i < markArr.length; i++) {
          if (markArr[i] !== '') {
            this.state.showLabel[markArr[i]] = true
          }
        }

        result.ddcarr = clueDetailResult.ddclist || []
        result.jdcarr = clueDetailResult.jdclist || []
        result.ryarr = clueDetailResult.rylist || []
        result.dwarr = clueDetailResult.dwlist || []
        result.ajarr = clueDetailResult.ajlist || []
        result.jqlist = clueDetailResult.jqlist || []
        const tplist = clueDetailResult.tplist || []
        const length = tplist.length
        let arr = ''
        this.state.tplist = []
        for (let i = 0; i < length; i++) {
          this.state.tplist[i] = {
            uid: i,
            name: tplist[i].tpm,
            realName: tplist[i].tpm,
            status: 'done',
            url: tplist[i].tp,
          }
          arr += `${tplist[i].tpm}:${tplist[i].tpm},`
        }
        if (arr.length > 0) {
          arr = arr.substr(0, arr.length - 1)
        }
        this.state.result = result
        this.state.result.tparr = arr
        this.props.form.setFieldsValue({ contentText: clueDetailResult.clue.text })
      }))
    } else {
      name = '新增线索'
      this.state.tplist = []
      this.state.showLabel = {}
      this.state.result = {
        ddcarr: [],
        jdcarr: [],
        dwarr: [],
        ryarr: [],
        ajarr: [],
        jqarr: [],
        tparr: [],
      }
      this.props.form.setFieldsValue({ contentText: '' })
      const type = clueId.substr(7, clueId.length - 1)
      if (type.length > 0) {
        const arr = type.split(':')
        this.state.bindMes.type = arr[0]
        this.state.bindMes.id = arr[1]
        // console.log(this.state.bindMes)
        switch (this.state.bindMes.type) {
        case 'alarm':
          break
        case 'bike':
          break
        case 'car':
          break
        case 'law':
          break
        case 'people':
          this.props.dispatch(fetchBasicInfo({ id: arr[1] }, (result) => {
              // console.log(result)
          }))
          break
        case 'unit':
          break
        default:
          break
        }
        if (arr[0] === 'address') {
          this.state.houseId = arr[1]
        }
        if (arr[0] === 'room') {
          this.state.roomId = arr[1]
        }   //判断什么类型的线索
      }
    }
    if (this.props.params) {
      // 若非嵌套，则执行
      const location = nextProps.location.pathname
      this.props.dispatch(updateTabList({
        title: `${name}`,
        key: `${location}`,
      }))
    }
    this.setState({})
  }

  componentWillMount() {
    const clueId = this.props.clueId || this.props.params.clueId || 1
    let name = ''

    if (clueId.substr(0, 7) !== 'newClue') {
      name = '线索详情'
      this.state.clueShowType = 'detail'
      this.props.dispatch(fetchClueDetail({ id: clueId }, () => {
        const clueDetailResult = this.props.clueDetailResult
        const result = this.state.result

        const mark = clueDetailResult.clue.mark || '' // 显示的标签
        const markArr = mark.split(',')
        for (let i = 0; i < markArr.length; i++) {
          if (markArr[i] !== '') {
            this.state.showLabel[markArr[i]] = true
          }
        }

        result.ddcarr = clueDetailResult.ddclist || []
        result.jdcarr = clueDetailResult.jdclist || []
        result.ryarr = clueDetailResult.rylist || []
        result.dwarr = clueDetailResult.dwlist || []
        result.ajarr = clueDetailResult.ajlist || []
        result.jqlist = clueDetailResult.jqlist || []
        const tplist = clueDetailResult.tplist || []
        const length = tplist.length
        let arr = ''
        for (let i = 0; i < length; i++) {
          this.state.tplist[i] = {
            uid: i,
            name: tplist[i].tpm,
            realName: tplist[i].tpm,
            status: 'done',
            url: tplist[i].tp,
          }
          arr += `${tplist[i].tpm}:${tplist[i].tpm},` // 本地图片名：服务器图片名   服务器获取之后实际值是一样的
        }
        if (arr.length > 0) {
          arr = arr.substr(0, arr.length - 1)
        }
        this.state.result = result
        this.state.result.tparr = arr
        this.props.form.setFieldsValue({ contentText: clueDetailResult.clue.text })
      }))
    } else {
      name = '新增线索'
      const type = clueId.substr(7, clueId.length - 1)
      if (type.length > 0) {
        const arr = type.split(':')
        this.state.bindMes.type = arr[0]
        this.state.bindMes.id = arr[1]
        // console.log(this.state.bindMes)
        switch (this.state.bindMes.type) {
        case 'alarm':
          break
        case 'bike':
          break
        case 'car':
          break
        case 'law':
          break
        case 'people':
          this.props.dispatch(fetchBasicInfo({ id: arr[1] }, (result) => {
          }))
          break
        case 'unit':
          break
        default:
          break
        }
        if (arr[0] === 'address') {
          this.state.houseId = arr[1]
        }
        if (arr[0] === 'room') {
          this.state.roomId = arr[1]
        }
      }
    }
    if (this.props.params) {
      // 若非嵌套，则执行
      const location = this.props.location.pathname
      this.props.dispatch(updateTabList({
        title: `${name}`,
        key: `${location}`,
      }))
    }
    this.setState({})
  }

  setBtnArr(btn) {
    this.state.showLabel[btn.code] = btn.show
    this.setState({})
  }

  changeState(name, e) {
    e.preventDefault()
    e.stopPropagation()
    // const name = e.target.name
    // console.log(name)
    const show = this.state.show
    const visible = this.state.visible
    for (const n in show) {
      if (n === name) {
        show[n] = true
        visible[n] = true
      } else show[n] = false
    }
    this.setState({ show: show, visible: visible })
  }

  showNotice() {
    this.setState({ notice: true })
  }

  // 关闭弹窗操作
  handleCancel() {
    const visible = this.state.visible
    const isLook = this.state.isLook
    for (const n in visible) {
      visible[n] = false
      isLook[n] = false
    }
    this.setState({ visible: visible, notice: false })
  }

  // 保存图片id
  saveImages(list) {
    this.state.result.tparr = list
  }

  // 保存线索记录
  saveClue() {
    const result = this.state.result
    let text = this.props.form.getFieldValue('contentText')
    text = text.replace(/^[\s ]+|[\s ]+$/g, '')
    text = text.replace(/\n[\s| | ]*\r/g, '\n')
    if (!text || text.length < 1) {
      message.error('内容不能为空')
      return
    }
    const bindId = this.state.bindMes.id
    const showLabel = this.state.showLabel
    let mark = ''
    for (const i in this.state.showLabel) {
      if (showLabel[i]) {
        mark += `${i},`
      }
    }
    if (mark.length > 0) {
      mark = mark.substr(0, mark.length - 1)    // 去除逗号
    }
    const ddcarr = [result.ddcarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const jdcarr = [result.jdcarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const dwarr = [result.dwarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const ryarr = [result.ryarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const ajarr = [result.ajarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const jqarr = [result.jqarr.map((a) =>
      `${a.id}`
    ).join(',')]
    switch (this.state.bindMes.type) {
    case 'alarm':
      jqarr[0].length > 0 ? jqarr[0] += `,${bindId}` : jqarr[0] = `${bindId}`
      break
    case 'bike':
      ddcarr[0].length > 0 ? ddcarr[0] += `,${bindId}` : ddcarr[0] = `${bindId}`
      break
    case 'car':
      jdcarr[0].length > 0 ? jdcarr[0] += `,${bindId}` : jdcarr[0] = `${bindId}`
      break
    case 'law':
      ajarr[0].length > 0 ? ajarr[0] += `,${bindId}` : ajarr[0] = `${bindId}`
      break
    case 'people':
      ryarr[0].length > 0 ? ryarr[0] += `,${bindId}` : ryarr[0] = `${bindId}`
      break
    case 'unit':
      dwarr[0].length > 0 ? dwarr[0] += `,${bindId}` : dwarr[0] = `${bindId}`
      break
    default:
      break
    }
    const value = {
      text: text || '',
      bldid: this.state.houseId || '', // 地址id
      fjid: this.state.roomId || '', // 房间id
      dzmc: '', // 地址名称
      mark: mark, // 标签
      ddcarr: ddcarr, // 关联电动车
      jdcarr: jdcarr, // 关联机动车
      dwarr: dwarr, // 关联单位
      ryarr: ryarr, // 关联人员
      ajarr: ajarr, // 关联案件
      jqarr: jqarr, // 关联警情
      tparr: [result.tparr], //图片
    }
    this.props.dispatch(fetchClueSave(value, () => {
      message.success('新增成功')
      hashHistory.goBack()
      document.querySelector('.ant-tabs-tab-active .anticon-close').click()
    }))
  }

  // 修改线索记录
  updateClue() {
    const result = this.state.result
    const clueDetailResult = this.props.clueDetailResult
    const clue = clueDetailResult.clue
    let text = this.props.form.getFieldValue('contentText')
    text = text.replace(/^[\s ]+|[\s ]+$/g, '')
    text = text.replace(/\n[\s| | ]*\r/g, '\n')
    if (!text || text.length < 1) {
      message.error('内容不能为空')
      return
    }
    let mark = ''
    for (const i in this.state.showLabel) {
      if (this.state.showLabel[i]) {
        mark += `${i},`
      }
    }
    if (mark.length > 0) {
      mark = mark.substr(0, mark.length - 1)   // 去除逗号
    }
    const ddcarr = [result.ddcarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const jdcarr = [result.jdcarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const dwarr = [result.dwarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const ryarr = [result.ryarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const ajarr = [result.ajarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const jqarr = [result.jqarr.map((a) =>
      `${a.id}`
    ).join(',')]
    const value = {
      id: clue.id || '', // 线索表id
      text: text || '', // 内容
      bldid: clue.bldid || '', // 地址id
      fjid: clue.fjid || '', // 房间id
      dzmc: clue.dzmc || '', // 地址名称
      mark: mark, // 标签
      ddcarr: ddcarr, // 关联电动车
      jdcarr: jdcarr, // 关联机动车
      dwarr: dwarr, // 关联单位
      ryarr: ryarr, // 关联人员
      ajarr: ajarr, // 关联案件
      jqarr: jqarr, // 关联警情
      tparr: [result.tparr], //图片
    }
    this.props.dispatch(fetchUpadteAllRecord(value, () => {
      message.success('修改成功')
      document.querySelector('.ant-tabs-tab-active .anticon-close').click()
    }))
  }

  // 保存关联信息
  saveRelation(value, name) {
    const result = this.state.result
    const id = value.id
    const bindId = this.state.bindMes.id
    let length = 0
    if (bindId === id) {
      message.error('已存在')
      return
    }
    switch (name) {
    case 'alarm':
      length = result.jqarr.length
      for (let i = 0; i < length; i++) {
        if (result.jqarr[i].id === id) {
          message.error('已存在')
          return
        }
      }
      result.jqarr.push(value)
      break
    case 'bike':
      length = result.ddcarr.length
      for (let i = 0; i < length; i++) {
        if (result.ddcarr[i].id === id) {
          message.error('已存在')
          return
        }
      }
      result.ddcarr.push(value)
      break
    case 'car':
      length = result.jdcarr.length
      for (let i = 0; i < length; i++) {
        if (result.jdcarr[i].id === id) {
          message.error('已存在')
          return
        }
      }
      result.jdcarr.push(value)
      break
    case 'law':
      length = result.ajarr.length
      for (let i = 0; i < length; i++) {
        if (result.ajarr[i].id === id) {
          message.error('已存在')
          return
        }
      }
      result.ajarr.push(value)
      break
    case 'people':
      length = result.ryarr.length
      for (let i = 0; i < length; i++) {
        if (result.ryarr[i].id === id) {
          message.error('已存在')
          return
        }
      }
      result.ryarr.push(value)
      break
    case 'unit':
      length = result.dwarr.length
      for (let i = 0; i < length; i++) {
        if (result.dwarr[i].id === id) {
          message.error('已存在')
          return
        }
      }
      result.dwarr.push(value)
      break
    default:
      return
    }
    this.handleCancel()
  }

  // 删除关联信息
  closeHandle(type, id) {
    const result = this.state.result
    if (this.state.clueShowType === 'newClue') {
      const length = result[type].length
      for (let i = 0; i < length; i++) {
        if (result[type][i].id === id) {
          result[type].splice(i, 1)
          break
        }
      }
      this.setState({ result: result })
    } else if (this.state.clueShowType === 'detail') {
      this.closeDetailHandle(type, id, () => {
        const length = result[type].length
        for (let i = 0; i < length; i++) {
          if (result[type][i].id === id) {
            result[type].splice(i, 1)
            message.success('删除成功')
            break
          }
        }
        this.setState({ result: result })
      })
    }
  }

  // 删除关联信息（交互）
  closeDetailHandle(type, id, handle) {
    const clueid = this.props.clueId || this.props.params.clueId || 5
    switch (type) {
    case 'alarm':
      this.props.dispatch(fetchDeleteLinkJq({ clueid: clueid, jqid: id }, handle))
      return
    case 'ddcarr':
      this.props.dispatch(fetchDeleteLinkDdc({ clueid: clueid, ddcid: id }, handle))
      return
    case 'jdcarr':
      this.props.dispatch(fetchDeleteLinkJdc({ clueid: clueid, jdcid: id }, handle))
      return
    case 'ajarr':
      this.props.dispatch(fetchDeleteLinkAJ({ clueid: clueid, caseid: id }, handle))
      return
    case 'ryarr':
      this.props.dispatch(fetchDeleteLinkRy({ clueid: clueid, baseid: id }, handle))
      return
    case 'dwarr':
      this.props.dispatch(fetchDeleteLinkDw({ clueid: clueid, dptid: id }, handle))
      return
    default:
      return
    }
  }

  // 查看关联信息
  showHandle(name, value) {
    this.state.visible[name] = true
    this.state.isLook[name] = true
    this.setState({ dataSource: value })
  }

  updateState() {
    this.setState({})
  }

  render() {
    const {
      clueSaveHandleResult,
      clueUpadteAllResult,
      clueDetailResult,
    } = this.props
    const { getFieldDecorator } = this.props.form
    const result = this.state.result
    const dataSource = this.state.dataSource
    const isLook = this.state.isLook  // 是否属于查看类型
    const clueShowType = this.state.clueShowType  // 显示类型
    const clue = clueDetailResult.clue || {}

    const bindMes = this.state.bindMes
    return (
      <Panel>
        <div className="newClue-lzr">
          <div className="title-btn">
            <div>
              <div>
                <Button
                  // disabled = {this.state.clueShowType=='detail'? true:null}
                  type={this.state.show.people ? 'primary' : 'ghost'}
                  onClick={(e) => this.changeState('people',e)}
                >
                  关联人员
                </Button>
                <Button
                  type={this.state.show.car ? 'primary' : 'ghost'}
                  onClick={(e) => this.changeState('car',e)}
                >
                  关联机动车
                </Button>
                <Button
                  type={this.state.show.bike ? 'primary' : 'ghost'}
                  onClick={(e) => this.changeState('bike',e)}
                >
                  关联电动车
                </Button>
                <Button
                  type={this.state.show.unit ? 'primary' : 'ghost'}
                  onClick={(e) => this.changeState('unit',e)}
                >
                  关联单位
                </Button>
                <Button
                  type={this.state.show.law ? 'primary' : 'ghost'}
                  onClick={(e) => this.changeState('law',e)}
                >
                  关联案件
                </Button>
                <Button
                  type={this.state.show.alarm ? 'primary' : 'ghost'}
                  onClick={(e) => this.changeState('alarm',e)}
                >
                  关联警情
                </Button>
              </div>
              {this.state.visible.alarm ?
                <AlarmPop
                  visible
                  dataSource={dataSource}
                  isLook={isLook.alarm}
                  title="关联警情"
                  onCancel={this.handleCancel}
                  handle={this.saveRelation}
                /> : null}
              {this.state.visible.bike ?
                <BikePop
                  visible
                  dataSource={dataSource}
                  isLook={isLook.bike}
                  title="关联电动车"
                  onCancel={this.handleCancel}
                  handle={this.saveRelation}
                /> : null}
              {this.state.visible.car ?
                <CarPop
                  visible
                  dataSource={dataSource}
                  isLook={isLook.car}
                  title="关联机动车"
                  onCancel={this.handleCancel}
                  handle={this.saveRelation}
                /> : null}
              {this.state.visible.law ?
                <LawPop
                  visible
                  dataSource={dataSource}
                  isLook={isLook.law}
                  title="关联案件"
                  onCancel={this.handleCancel}
                  handle={this.saveRelation}
                /> : null}
              {this.state.visible.people ?
                <PeoplePop
                  visible
                  dataSource={dataSource}
                  isLook={isLook.people}
                  title="关联人员"
                  onCancel={this.handleCancel}
                  handle={this.saveRelation}
                /> : null}
              {this.state.visible.unit ?
                <UnitPop
                  visible
                  dataSource={dataSource}
                  isLook={isLook.unit}
                  title="关联单位"
                  onCancel={this.handleCancel}
                  handle={this.saveRelation}
                /> : null}
            </div>
          </div>
          <Spin spinning={clueShowType === 'detail' ? clueDetailResult.loading : false}>
            <div className="addContent" >
              <ul>
                <li>
                  <span>内容</span>
                  <div>
                    <FormItem hasFeedback>
                      {getFieldDecorator('contentText')(
                        <Input type="textarea" />
                      )}
                    </FormItem>
                  </div>
                </li>
                <li>
                  <span>照片</span>
                  <div>
                    <ImgView
                      saveImages={this.saveImages}
                      source={[...this.state.tplist]}
                    />
                  </div>
                </li>
                <li>
                  <span>关联</span>
                  <div>
                    <Row gutter={16}>
                      {clue.bldid && !clue.fjid ?  // 关联地址
                        <Col span="12">
                          <RelationCard
                            type="address"
                            isbind
                            dataSource={{ dzmc: clue.dzmc }}
                          />
                        </Col> : null
                      }
                      {clue.fjid ?       // 关联房间
                        <Col span="12">
                          <RelationCard
                            type="room"
                            isbind
                            dataSource={{ dzmc: clue.dzmc }}
                          />
                        </Col> : null
                      }
                      {bindMes.type ?
                        <Col span="12">
                          <RelationCard
                            type={bindMes.type}
                            isbind
                            dataSource={{ content: bindMes.id }}
                          />
                        </Col> : null
                      }
                      { result.jqarr.map(arr =>
                        <Col span="12" key={arr.id}>
                          <RelationCard
                            type="alarm"
                            closeHandle={this.closeHandle}
                            showHandle={this.showHandle}
                            dataSource={arr}
                          />
                        </Col>)
                      }
                      { result.ddcarr.map(arr =>
                        <Col span="12" key={arr.id}>
                          <RelationCard
                            type="bike"
                            closeHandle={this.closeHandle}
                            showHandle={this.showHandle}
                            dataSource={arr}
                          />
                        </Col>)
                      }
                      { result.jdcarr.map(arr =>
                        <Col span="12" key={arr.id}>
                          <RelationCard
                            type="car"
                            closeHandle={this.closeHandle}
                            showHandle={this.showHandle}
                            dataSource={arr}
                          />
                        </Col>)
                      }
                      { result.ajarr.map(arr =>
                        <Col span="12" key={arr.id}>
                          <RelationCard
                            type="law"
                            closeHandle={this.closeHandle}
                            showHandle={this.showHandle}
                            dataSource={arr}
                          />
                        </Col>)
                      }
                      { result.ryarr.map(arr =>
                        <Col span="12" key={arr.id}>
                          <RelationCard
                            type="people"
                            closeHandle={this.closeHandle}
                            showHandle={this.showHandle}
                            dataSource={arr}
                          />
                        </Col>)
                      }
                      { result.dwarr.map(arr =>
                        <Col span="12" key={arr.id}>
                          <RelationCard
                            type="unit"
                            closeHandle={this.closeHandle}
                            showHandle={this.showHandle}
                            dataSource={arr}
                          />
                        </Col>)
                      }
                    </Row>
                  </div>
                </li>
                <li>
                  <span>标签</span>
                  <div>
                    <StateBtn name="1" show={this.state.showLabel['1']} setBtnArr={this.setBtnArr}>纠纷</StateBtn>
                    <StateBtn name="2" show={this.state.showLabel['2']} setBtnArr={this.setBtnArr}>涉恐</StateBtn>
                    <StateBtn name="3" show={this.state.showLabel['3']} setBtnArr={this.setBtnArr}>涉疆</StateBtn>
                    <StateBtn name="4" show={this.state.showLabel['4']} setBtnArr={this.setBtnArr}>涉日</StateBtn>
                    <StateBtn name="5" show={this.state.showLabel['5']} setBtnArr={this.setBtnArr}>涉外</StateBtn>
                    <StateBtn name="6" show={this.state.showLabel['6']} setBtnArr={this.setBtnArr}>低慢小</StateBtn>
                  </div>
                </li>
              </ul>
            </div>
          </Spin>
          <div className="ability-button">
            <Button
              loading={clueSaveHandleResult.loading || clueUpadteAllResult.loading}
              onClick={clueShowType === 'detail' ? this.updateClue : this.saveClue}
            >保存
            </Button>
          </div>
        </div>
      </Panel>
    )
  }
 }
