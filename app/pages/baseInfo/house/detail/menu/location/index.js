/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
* 该组件  大多页面值的操作都是通过改变this.state.result的值来实现
*/

import React, { Component } from 'react'
import { Button, Form, Input, Icon,
  Select, Spin, Row, Col, Popover,
  Popconfirm, message,InputNumber } from 'antd'
import { connect } from 'react-redux'
import { regExpConfig } from 'utils/config'
import {
  fetchHouseAddressDetail,
  fetchHouseUpdateAddress,
  fetchHouseUpdateHisState,
  fetchHouseDelAddress,
  fetchHouseCqrAdd,
  fetchHouseCqrDelete,
  fetchHouseRelatedbzAdd,
  fetchHouseRelatedbzDelete,
  fetchHouseDelBuildHh,
  fetchHouseDelBuildDah,
  fetchHouseDelbzdz,
  fetchHouseDelZrq,
  fetchHouseDelBarCode,
  fetchGetLoadOrVillageGroupListByDm,
  fetcHouseXqFsById,  // 查询小区附属
  fetchGetLoadListByDm,// 根据村居委会id查询街路巷列表(区域地址)
} from 'actions/houseAddressDetail'

import {
  // 管辖单位
  fetchUnitSubStationList,  // 分区
  fetchUnitPoliceStationList, // 派出所
  fetchUnitResponseAreaList,
  // 行政区划
  fetchCountyList, // 获取区县列表
  fetchStreetList, // 获取街道列表
  fetchVillageCommitteeList, // 获取社区列表
 } from 'actions/houseAddress'

import 'style/houseDetailStyle.css'

import ButtonLayout from './component/buttonLayout'
import DimenCode from './modal/dimenCode'
import Archives from './modal/archives'
import HouseNumber from './modal/houseNumber'
import Remark from './modal/remark'
import BundAddress from './modal/bundAddress'
import BundDuty from './modal/bundDuty'
import CombinedHouse from './modal/combinedHouse'
import PropertyOwner from './modal/propertyOwner'

const Option = Select.Option
const FormItem = Form.Item

@Form.create({
  onFieldsChange(props, items) {
  },
})

@connect(
  (state) => ({
    config: state.config,
    houseAddressDetailSearchResult: state.houseAddressDetailSearchResult,
    houseUpdateAddressResult: state.houseUpdateAddressResult,
    houseUpdateHisStateResult: state.houseUpdateHisStateResult,
    houseDelAddressResult: state.houseDelAddressResult,
    houseAddressCqrAddResult: state.houseAddressCqrAddResult,
    houseRelatedbzAddResult: state.houseRelatedbzAddResult,
    houseXqFsByIdResult: state.houseXqFsByIdResult,
    // 管辖单位
    unitSubStationListResult: state.unitSubStationListResult,  // 分局
    unitPoliceStationListResult: state.unitPoliceStationListResult,  // 派出所
    unitResponseAreaResult: state.unitResponseAreaResult,
    unitSubstationRelDivisionResult: state.unitSubstationRelDivisionResult,
    unitEditRelationOfDivisionResult: state.unitEditRelationOfDivisionResult,
    responseAreaResult: state.responseAreaResult,
    responsePoliceResult: state.responsePoliceResult,
    policeListResult: state.policeListResult,
    policeAddResult: state.policeAddResult,
    responsePoliceDeleteResult: state.responsePoliceDeleteResult,
    responseAddressResult: state.responseAddressResult,
    cognateAddressListResult: state.cognateAddressListResult,
    addAddressResult: state.addAddressResult,
    responseAddressDeleteResult: state.responseAddressDeleteResult,
    // 行政区划
    countyListSearchResult: state.countyListSearchResult,
    streetListSearchResult: state.streetListSearchResult,
    villageCommitteeListSearchResult: state.villageCommitteeListSearchResult,
    getDivisionRelUnitResult: state.getDivisionRelUnitResult,
    updateDivisionRelUnitResult: state.updateDivisionRelUnitResult,
    getLoadOrVillageGroupListByDmResult: state.getLoadOrVillageGroupListByDmResult,
    getLoadListByDmResult: state.getLoadListByDmResult,
  })
)


export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢',
      fenjudm: '321300', // 分局代码
      addressId: this.props.houseId,
      fullName: '',
      czmc: '',
      mph: '',
      mph_s: '',
      mph_e: '',
      lzNum: '',
      lzType: '号楼',
      hisState: 0,
      overVisible: {// 联动弹窗
        area: false,
        town: false,
        village: false,
        road: false,
        unit: false,
        plice: false,
        regional: false,
        regionalFs: false,
      },
      visible: {// 普通弹窗
        dimenCode: false,
        archives: false,
        houseNumber: false,
        remark: false,
        combinedHouse: false,
        bundDuty: false,
        bundAddress: false,
        propertyOwner: false,
        addressLabel: false,
      },
      isModal: {// 是否有弹窗
        propertyOwner: true,
        dimenCode: true,
        houseNumber: true,
        archives: true,
        bundDuty: true,
      },
      result: {
        fdzlist: [],
        bz: [],
        fdxx: {
          xm: '',
          sfzh: '',
          dhhm: '',
          dah: '',
        },
        hhxx: {
          hzxm: '',
          sfzh: '',
          hh: '',
          dhhm: '',
        },
        cqrxx: {
          xm: '',
          sfzh: '',
          dhhm: '',
        },
      },
    }
    this.updateState = this.updateState.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.initSearch = this.initSearch.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)

    this.handleClick = this.handleClick.bind(this)
    this.deleteBz = this.deleteBz.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hiddenModal = this.hiddenModal.bind(this)
    this.addModal = this.addModal.bind(this)
    this.setText = this.setText.bind(this)

    this.handleFullname = this.handleFullname.bind(this)
    this.deleteCqr = this.deleteCqr.bind(this)
    this.addCqr = this.addCqr.bind(this)
    this.addBz = this.addBz.bind(this)
    this.bindDah = this.bindDah.bind(this)
    this.deleteHh = this.deleteHh.bind(this)
    this.bindHh = this.bindHh.bind(this)
    this.bindDah = this.bindDah.bind(this)
    this.deleteDah = this.deleteDah.bind(this)
    this.bindBzdz = this.bindBzdz.bind(this)
    this.delBzdz = this.delBzdz.bind(this)
    this.searchZrq = this.searchZrq.bind(this)
    this.bindZrq = this.bindZrq.bind(this)
    this.deleteZrq = this.deleteZrq.bind(this)
    this.bindBarCode = this.bindBarCode.bind(this)
    this.deleteBarCode = this.deleteBarCode.bind(this)
    this.bindBuilding = this.bindBuilding.bind(this)
    this.updateHisState = this.updateHisState.bind(this)
    this.deleteAddress = this.deleteAddress.bind(this)
    this.removeText = this.removeText.bind(this)
  }

  componentDidMount() {
    this.initSearch()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.houseId === nextProps.houseId) {
      return
    }
    this.state.addressId = nextProps.houseId
    this.initSearch()
  }

  //初始化搜索
  initSearch() {
    this.props.dispatch(fetchHouseAddressDetail({ id: this.state.addressId }, (result) => {
      const build = this.props.houseAddressDetailSearchResult.build
      build.dzlx = build.dzlx.toString()
      this.state.result = this.props.houseAddressDetailSearchResult
      if (build.mph) {
        this.state.mph = build.mph
        const mph = build.mph.substring(0, build.mph.length - 1)
        const mphArr = mph.split('-')
        this.state.mph_s = mphArr[0]
        this.state.mph_e = mphArr[1]
        build.mph_s = mphArr[0]
        build.mph_e = mphArr[1]
      }
      if (build.lz) {
        this.state.lz = build.lz
        const lz = build.lz
        this.state.lzNum = lz.replace(/[^0-9]/ig, '')
        this.state.lzType = lz.substring(this.state.lzNum.length, lz.length)
        build.lzNum = this.state.lzNum
        build.lzType = this.state.lzType
      }
      if (build.czmc) {
        this.state.czmc = build.czmc
      }
      if(!build.qxmc){
        build.qxmc=''
      }
      if(!build.xzjdmc){
        build.xzjdmc=''
      }
      if(!build.cjwhmc){
        build.cjwhmc=''
      }
      if (!build.xqbzwbcdm) {
        build.xqbzwbcdm = build.xqbzwbcmc = ''
      }
      if (!build.xqbzwdm) {
        build.xqbzwdm = build.xqbzwmc = ''
      }
      if (!build.jlxmc) {
        build.jlxmc = build.jlxdm = ''
      }
      this.handleFullname()
      this.state.hisState = build.sfls
      // 判断是否有弹窗
      this.state.isModal.propertyOwner = !this.state.result.cqrxx.xm
      this.state.isModal.dimenCode = !build.ewmbm
      this.state.isModal.houseNumber = !this.state.result.hhxx.hzxm
      this.state.isModal.archives = !this.state.result.fdxx.dah
      this.state.isModal.bundDuty = !build.zrqmc

      // 获取第一次派出所的列表
      this.props.dispatch(fetchUnitPoliceStationList({ parentdm: build.fjdm }, () => {
      }))
      // 获取行政区划辖区
      this.props.dispatch(fetchCountyList({ parentdm: this.state.fenjudm, hasXzqh: 1 }))
      // 获取街道
      this.props.dispatch(fetchStreetList({ parentdm: build.qxdm }))
      // 获取村委会
      if (build.xzjddm) {
        this.props.dispatch(fetchVillageCommitteeList({ parentdm: build.xzjddm }))
      }
      // 获取道路地址
      if (build.cjwhdm) {
        this.props.dispatch(fetchGetLoadListByDm({ cjwhDm: build.cjwhdm ,sblx: 1 }))
      }
      // 获取区域地址
      if (build.cjwhdm) {
        this.props.dispatch(fetchGetLoadOrVillageGroupListByDm({ cjwhDm: build.cjwhdm, sblx: 2 }))
      }
      // 获取区域附属
      if (build.xqbzwdm) {
        this.props.dispatch(fetcHouseXqFsById({ xqId: build.xqbzwdm }))
      }

      this.props.form.setFieldsValue(build)
    }))

    // 获取分局列表
    this.props.dispatch(fetchUnitSubStationList({ parentdm: this.state.fenjudm, hasXzqh: 1 }))
  }

  //表单重置
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  //表单保存
  handleSubmit(e) {
    e.preventDefault();
    const self = this
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const build = this.state.result.build
      const value = {
        id: this.state.addressId,  //  地址id
        bzdz: this.state.fullName, // 标准地址
        czmc: this.state.czmc,  // 村组名称
        mph: this.state.mph,  // 门牌号
        lz: this.state.lz,  // 楼幢
        dzlx: parseInt(values.dzlx),  // 地址类型：1标准地址0临时地址2不规范地址3集体户地址
        fjdm: build.fjdm,  // 分局代码
        pcsdm: build.pcsdm,  // 派出所代码
        zrqdm: build.zrqdm,  // 责任区代码
        qxdm: build.qxdm,  // 区县代码
        xzjddm: build.xzjddm,  // 乡镇街道代码
        cjwhdm: build.cjwhdm,  // 村居委会代码
        xqbzwdm: build.xqbzwdm,  // 小区标志物代码
        xqbzwbcdm: build.xqbzwbcdm,  // 小区标志物补充代码
        jlxdm: build.jlxdm,  //街路巷代码
        // "jlxbc": build.jlxbc,  //街路巷补充
      }
      this.props.dispatch(fetchHouseUpdateAddress(value, () => {
        message.success('保存成功')
        self.props.updataHouseName(self.state.addressId)
      }))
    });
  }

  //楼幢下拉框change，改变地址全称
  handleSelectChange(value) {
    this.state.lzType = value
    this.handleFullname()
    this.setState({})
  }

  //改变地址全称的输入框change事件
  setText(name, e) {
    this.state[name] = e.target.value
    this.handleFullname()
    this.setState({})
  }

  // 清除文本框文字
  removeText(e, name1, name2,type) {
    e.stopPropagation()
    e.preventDefault()
    const build = this.state.result.build
    build[name1] = ''
    build[name2] = ''
    this.state.result.build = build
    this.state.overVisible[type]=true
    this.handleClick({ value: '', text: '' })
    this.props.form.setFieldsValue(build)
  }

  // 选择点击处理函数
  handleClick(obj) {
    const overVisible = this.state.overVisible
    const build = this.state.result.build
    let name = ''
    for (const n in overVisible) {
      if (overVisible[n]) { // 确定当前弹出的页面
        name = n
        break
      }
    }
    // console.log(name + ':' + obj.text + '+' + obj.value)
    switch (name) {
    case 'area':
      overVisible.area = false
      
      build.qxdm = obj.value
      build.qxmc = obj.text
      if(obj.value.length>0){
        overVisible.town = true
        this.props.dispatch(fetchStreetList({ parentdm: build.qxdm }))
      }
      build.xzjddm = '' // 街道
      build.xzjdmc = ''
      build.cjwhdm = '' // 村居委会
      build.cjwhmc = ''
      build.jlxdm = '' // 道路
      build.jlxmc = ''
      build.xqbzwdm = '' // 小区
      build.xqbzwmc = ''
      build.xqbzwbcdm = ''  // 小区附属
      build.xqbzwbcmc = ''
      this.handleFullname()
      break
    case 'town': // 街道
      overVisible.town = false
      // overVisible.village = true
      build.xzjddm = obj.value
      build.xzjdmc = obj.text
      if(obj.value.length>0){
        overVisible.village = true
        this.props.dispatch(fetchVillageCommitteeList({ parentdm: build.xzjddm }))
      }
      build.cjwhdm = '' // 村居委会
      build.cjwhmc = ''
      build.jlxdm = '' // 道路
      build.jlxmc = ''
      build.xqbzwdm = '' // 小区
      build.xqbzwmc = ''
      build.xqbzwbcdm = ''  // 小区附属
      build.xqbzwbcmc = ''
      this.handleFullname()
      break
    case 'village': // 村居委会
      overVisible.village = false
          // overVisible['road']=true
      build.cjwhdm = obj.value
      build.cjwhmc = obj.text
      if(obj.value.length>0){
        this.props.dispatch(fetchGetLoadListByDm({ cjwhDm: build.cjwhdm, sblx: 1  }))
        this.props.dispatch(fetchGetLoadOrVillageGroupListByDm({ cjwhDm: build.cjwhdm, sblx: 2 }))
      }
      build.jlxdm = '' // 道路
      build.jlxmc = ''
      build.xqbzwdm = '' // 小区
      build.xqbzwmc = ''
      build.xqbzwbcdm = ''  // 小区附属
      build.xqbzwbcmc = ''
      this.handleFullname()
      break
    case 'road':
      overVisible.road = false
      build.jlxdm = obj.value
      build.jlxmc = obj.text
      this.handleFullname()
      break
    case 'regional': // 小区
      overVisible.regional = false
      build.xqbzwdm = obj.value
      build.xqbzwmc = obj.text
      if(obj.value){
        overVisible.regionalFs = true
        this.props.dispatch(fetcHouseXqFsById({ xqId: build.xqbzwdm }))
      }
      build.xqbzwbcdm = ''
      build.xqbzwbcmc = ''
      this.handleFullname()
      break
    case 'regionalFs': // 小区附属
      overVisible.regionalFs = false
      build.xqbzwbcdm = obj.value
      build.xqbzwbcmc = obj.text
      this.handleFullname()
      break
    case 'unit':
      overVisible.unit = false
      build.fjdm = obj.value
      build.fjmc = obj.text
      if(obj.value){
        overVisible.plice = true
        this.props.dispatch(fetchUnitPoliceStationList({ parentdm: build.fjdm }))
      }
      build.pcsdm = ''
      build.pcsmc = ''
      break
    case 'plice':
      overVisible.plice = false
      build.pcsdm = obj.value
      build.pcsmc = obj.text
      break
    default:
      return
    }
    this.state.result.build = build
    this.props.form.setFieldsValue(build)
    // this.setState({overVisible:overVisible})
  }

  //气泡弹窗状态改变
  handleVisibleChange(name, visible) {
    const overVisible = this.state.overVisible
    overVisible[name] = visible
    this.setState({ overVisible: overVisible })
  }

  // 显示弹窗
  showModal(e, e1) {
    let name = ''
    if (e.target) {
      e.stopPropagation()
      e.preventDefault()
      name = e.target.name
    } else {
      name = e
    }
    this.state.visible[name] = true
    this.setState({})
  }

  //隐藏弹窗
  hiddenModal() {
    const visible = this.state.visible
    for (const n in visible) {
      visible[n] = false
    }
    this.setState({ visible })
  }

  // 处理地址全称
  handleFullname() {
    const build = this.state.result.build
    const czmc = this.state.czmc ? `${this.state.czmc}组` : ''
    const mphS = this.state.mph_s
    const mphE = this.state.mph_e
    const lzNum = this.state.lzNum
    let mph = ''
    if (mphS || mphE) {
      mph = mphS || ''
      if (mphE) {
        if (mphS) {
          mph += '-'
        }
        mph += mphE
      }
      mph += '号'
      this.state.mph = mph
    }
    const lz = lzNum ? lzNum + this.state.lzType : ''
    this.state.lz = lz
    try {
      const value = `宿迁市${build.qxmc}${build.xzjdmc}${build.cjwhmc}${czmc}` +
                        `${build.jlxmc}${mph}${build.xqbzwmc}${build.xqbzwbcmc}${lz}`
      this.state.fullName = value
    } catch (err) {
      return
    }
  }

  // 添加显示弹窗
  addModal(name) {
    const isModal = this.state.isModal
    if (Object.prototype.hasOwnProperty.call(isModal, name)) {
      isModal[name] = true
      this.setState({ isModal: isModal })
    }
  }

  // 删除备注
  deleteBz(id) {
    // console.log(id)
    this.props.dispatch(fetchHouseRelatedbzDelete({ id: id }, () => {
      message.success('删除成功')
      this.state.result.bz.map((sub, i) => {
        if (sub.id === id) {
          this.state.result.bz.splice(i, 1)
        }
      })
      this.setState({})
    }))
  }

  // 添加备注
  addBz(value) {
    this.props.dispatch(fetchHouseRelatedbzAdd({ bldid: this.state.addressId, bj: 3, fbzdz: value }, (result) => {
      const data = result.data
      this.state.result.bz.push({ id: data.id, fbzdz: data.fbzdz })
      this.hiddenModal()
      message.success('添加成功')
    }))
  }

  // 删除产权人
  deleteCqr(id) {
    this.props.dispatch(fetchHouseCqrDelete({ id: id }, () => {
      message.success('删除成功')
      this.state.result.cqrxx = {}
      this.addModal('propertyOwner')
    }))
  }

  // 添加产权人
  addCqr(sfzh) {
    this.props.dispatch(fetchHouseCqrAdd({ id: this.state.addressId, sfzh: sfzh }, (result) => {
      message.success('添加成功')
      const data = result.data
      this.state.result.cqrxx = { dhhm: data.dhhm, id: data.id, sfzh: data.sfzh, xb: data.xb, xm: data.xm }
      this.state.isModal.propertyOwner = false
      this.hiddenModal()
    }))
  }

  // 删除户号
  deleteHh() {
    this.props.dispatch(fetchHouseDelBuildHh({ id: this.state.addressId }, () => {
      message.success('删除成功')
      this.state.result.hhxx = {}
      this.addModal('houseNumber')
    }))
  }

  // 绑定户号
  bindHh(result) {
    this.state.result.hhxx = result
    this.state.isModal.houseNumber = false
    message.success('绑定成功')
    this.hiddenModal()
  }

  // 删除档案号
  deleteDah() {
    this.props.dispatch(fetchHouseDelBuildDah({ id: this.state.addressId }, () => {
      message.success('删除成功')
      this.state.result.fdxx = {}
      this.addModal('archives')
    }))
  }

  // 绑定档案号
  bindDah(result) {
    this.state.result.fdxx = result
    this.state.isModal.archives = false
    message.success('绑定成功')
    this.hiddenModal()
  }

  // 绑定标准地址
  bindBzdz(value) {
    const bindlist = this.state.result.bdbzdz.bindlist
    for (let i = 0; i < bindlist.length; i++) {
      if (bindlist[i].id === value.id) {
        message.error('已绑定该地址')
        return
      }
    }
    this.state.result.bdbzdz.bindlist.push(value)
    message.success('绑定成功')
    this.hiddenModal()
  }

  // 删除标准地址
  delBzdz(id) {
    this.props.dispatch(fetchHouseDelbzdz({ id: this.state.addressId }, () => {
      message.success('删除成功')
      this.state.result.dah = {}
      this.addModal('bundAddress')
    }))
  }

  // 查询责任区
  searchZrq() {
    this.props.dispatch(fetchUnitResponseAreaList({ parentdm: this.state.result.build.pcsdm }))
    this.showModal('bundDuty')
  }

  // 绑定责任区
  bindZrq(record) {
    this.state.result.build.zrqmc = record.gxdwqc
    this.state.isModal.bundDuty = false
    message.success('绑定成功')
    this.hiddenModal()
  }

  // 删除责任区
  deleteZrq() {
    this.props.dispatch(fetchHouseDelZrq({ id: this.state.addressId }))
    this.state.result.build.zrqmc = ''
    message.success('删除成功')
    this.addModal('bundDuty')
  }

  // 绑定地址二维码
  bindBarCode(value) {
    this.state.result.build.ewmbm = value
    this.state.isModal.dimenCode = false
    message.success('绑定成功')
    this.hiddenModal()
  }

  // 解绑地址二维码
  deleteBarCode() {
    this.props.dispatch(fetchHouseDelBarCode({ id: this.state.addressId }, () => {
      this.state.result.build.ewmbm = ''
      message.success('删除成功')
      this.addModal('dimenCode')
    }))
  }

  // 合并地址
  bindBuilding(value) {
    const fdzlist = this.state.result.fdzlist
    for (let i = 0; i < fdzlist.length; i++) {
      if (fdzlist[i].fbldid === value.fbldid) {
        message.error('已绑定该地址')
        return
      }
    }
    this.state.result.fdzlist.push(value)
    message.success('绑定成功')
    this.hiddenModal()
  }

  // 删除合并地址
  deleteBuilding(id) {
    this.props.dispatch(fetchHouseRelatedbzDelete({ id: id }, () => {
      message.success('删除成功')
      this.state.result.fdzlist.map((sub, i) => {
        if (sub.id === id) {
          this.state.result.fdzlist.splice(i, 1)
        }
      })
      this.setState({})
    }))
  }

  // 修改历史状态
  updateHisState() {
    const hisState = this.state.hisState === 1 ? 0 : 1
    this.props.dispatch(fetchHouseUpdateHisState({ id: this.state.addressId, sfls: hisState }, () => {
      this.state.hisState = hisState
      message.success('修改成功')
      this.setState({})
    }))
  }

  // 删除地址
  deleteAddress() {
    if (this.state.hisState === 0) {
      message.error('请将地址设为历史')
      return
    }
    this.props.dispatch(fetchHouseDelAddress({ id: this.state.addressId }, () => {
      this.props.deleteTab()
    }))
  }

  updateState() {
    this.setState({})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const result = this.state.result
    const build = this.state.result.build || {}
    const {
      houseAddressDetailSearchResult,
      unitSubStationListResult,
      unitPoliceStationListResult,
      countyListSearchResult,
      streetListSearchResult,
      villageCommitteeListSearchResult,
      getLoadListByDmResult,
      getLoadOrVillageGroupListByDmResult,
      houseXqFsByIdResult,
      houseUpdateHisStateResult,
      houseDelAddressResult,
      houseUpdateAddressResult,
    } = this.props

    // 判断是否需要清空数据
    villageCommitteeListSearchResult.list = build.xzjddm ? villageCommitteeListSearchResult.list : []
    getLoadListByDmResult.list = build.cjwhdm ? getLoadListByDmResult.list : []
    getLoadOrVillageGroupListByDmResult.list = build.cjwhdm ? getLoadOrVillageGroupListByDmResult.list : []
    houseXqFsByIdResult.list = build.xqbzwdm ? houseXqFsByIdResult.list : []

    const isModal = this.state.isModal
    // debugger

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    }
    const selectAfter = (
      <Select defaultValue="幢" value={this.state.lzType} style={{ width: 60 }} onChange={this.handleSelectChange}>
        <Option value="幢">幢</Option>
        <Option value="号">号</Option>
        <Option value="户">户</Option>
        <Option value="栋">栋</Option>
        <Option value="号楼">号楼</Option>
      </Select>
    )
    return (
      <Spin spinning={houseAddressDetailSearchResult.loading}>
        <div className="nav-third-nextContent houseAddressDetail">
          <Form horizontal style={{ overflowY: 'auto' }}>
            <FormItem {...formItemLayout} label="地址属性">
              {getFieldDecorator('dzlx')(
                <Select
                  id="select"
                  size="large"
                >
                  <Option value="1">标准地址</Option>
                  <Option value="2">非标准地址</Option>
                  <Option value="3">虚拟地址</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="管辖单位">
              <Row>
                <Col span="12">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={unitSubStationListResult.list}
                        selectCode={build.fjdm} // 已选按钮
                        onClick={this.handleClick}
                        grade="gxdwdm"
                        gradeName="gxdwqc"
                        loading={unitSubStationListResult.loading}
                      />}
                      visible={this.state.overVisible.unit}
                      onVisibleChange={(e) => this.handleVisibleChange('unit', e)}
                      trigger="click" placement="bottom"
                    >
                      {getFieldDecorator('fjmc')(
                        <Input readOnly />
                      )}
                    </Popover>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={unitPoliceStationListResult.list}
                        selectCode={build.pcsdm} // 已选按钮
                        grade="gxdwdm"
                        gradeName="gxdwqc"
                        onClick={this.handleClick}
                        loading={unitPoliceStationListResult.loading}
                      />}
                      visible={this.state.overVisible.plice}
                      onVisibleChange={(e) => this.handleVisibleChange('plice', e)}
                      trigger="click"
                      placement="bottom"
                    >
                      {getFieldDecorator('pcsmc')(
                        <Input readOnly placeholder="请选择派出所" />
                      )}
                    </Popover>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem {...formItemLayout} label="行政区划">
              <Row gutter={16}>
                <Col span="4">
                  <FormItem>
                    {getFieldDecorator('sf')(
                      <Input readOnly disabled />
                    )}
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    {getFieldDecorator('cs')(
                      <Input readOnly disabled />
                    )}
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={countyListSearchResult.list}
                        selectCode={build.qxdm}// 已选按钮
                        onClick={this.handleClick}
                        grade="xzqhdm"
                        gradeName="xzqhqc"
                        loading={countyListSearchResult.loading}
                      />}
                      visible={this.state.overVisible.area}
                      onVisibleChange={(e) => this.handleVisibleChange('area', e)}
                      trigger="click"
                      placement="bottom"
                    >
                      {getFieldDecorator('qxmc')(
                        <Input readOnly />
                      )}
                    </Popover>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={streetListSearchResult.list}
                        selectCode={build.xzjddm}// 已选按钮
                        onClick={this.handleClick}
                        grade="xzqhdm"
                        gradeName="xzqhqc"
                        loading={streetListSearchResult.loading}
                      />}
                      visible={this.state.overVisible.town}
                      onVisibleChange={(e) => this.handleVisibleChange('town', e)}
                      trigger="click"
                      placement="bottom"
                    >
                      <span className="popover-lzr">
                        {getFieldDecorator('xzjdmc')(
                          <Input readOnly placeholder="请选择街道" />
                        )}
                        <Icon
                          type="cross-circle"
                          className="close-popover-lzr ant-calendar-picker-clear"
                          onClick={(e) => this.removeText(e, 'xzjdmc', 'xzjddm','town')}
                        />
                      </span>
                    </Popover>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={villageCommitteeListSearchResult.list}
                        selectCode={build.cjwhdm}// 已选按钮
                        onClick={this.handleClick}
                        grade="xzqhdm"
                        gradeName="xzqhqc"
                        loading={villageCommitteeListSearchResult.loading}
                      />}
                      visible={this.state.overVisible.village}
                      onVisibleChange={(e) => this.handleVisibleChange('village', e)}
                      trigger="click"
                      placement="bottom"
                    >
                      <span className="popover-lzr">
                        {getFieldDecorator('cjwhmc')(
                          <Input readOnly placeholder="请选择村" />
                        )}
                        <Icon
                          type="cross-circle"
                          className="close-popover-lzr ant-calendar-picker-clear"
                          onClick={(e) => this.removeText(e, 'xzqhqc', 'xzqhdm','village')}
                        />
                      </span>
                    </Popover>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem {...formItemLayout} label="村组信息">
              <Input addonAfter="组"
                value={this.state.czmc}
                onChange={(e) => this.setText('czmc', e)}
                placeholder=""
              />
            </FormItem>

            <FormItem {...formItemLayout} label="道路地址"
              hasFeedback>
              <Row gutter={16}>
                <Col span="12">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={getLoadListByDmResult.list}
                        selectCode={build.jlxdm}// 已选按钮
                        onClick={this.handleClick}
                        grade="id" // 对应代码名称
                        gradeName="mc" // 对应值
                        loading={getLoadListByDmResult.loading}
                      />}
                      visible={this.state.overVisible.road}
                      onVisibleChange={(e) => this.handleVisibleChange('road', e)}
                      trigger="click"
                      placement="bottom"
                    >
                      <span className="popover-lzr">
                        {getFieldDecorator('jlxmc')(
                          <Input readOnly placeholder="地名办命名的道、路、街、巷" />
                        )}
                        <Icon
                          type="cross-circle"
                          className="close-popover-lzr ant-calendar-picker-clear"
                          onClick={(e) => this.removeText(e, 'jlxMc', 'jlxDm','road')}
                        />
                      </span>
                    </Popover>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    {getFieldDecorator('mph_s', {
                      rules: [
                          { message: '请输入数字' },
                          { min: 0, max: 4, pattern: regExpConfig.num, message: '请输入数字' },
                      ],
                    })(
                      <Input
                        addonAfter="号"
                        maxLength={4}
                        placeholder="请输入数字主号"
                        onChange={(e) => this.setText('mph_s', e)}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    {getFieldDecorator('mph_e', {
                      rules: [
                          { message: '请输入数字' },
                          { max: 4, pattern: regExpConfig.num, message: '请输入数字' },
                      ],
                    })(
                      <Input addonBefore="-"
                        addonAfter="号"
                        maxLength={4}
                        placeholder="请输入数字之号"
                        onChange={(e) => this.setText('mph_e', e)}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem {...formItemLayout} label="区域地址"
              hasFeedback>
              <Row gutter={16}>
                <Col span="8">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={getLoadOrVillageGroupListByDmResult.list}
                        selectCode={build.xqbzwdm} // 已选按钮
                        onClick={this.handleClick}
                        grade="id"
                        gradeName="mc"
                        loading={getLoadOrVillageGroupListByDmResult.loading}
                      />}
                      visible={this.state.overVisible.regional}
                      onVisibleChange={(e) => this.handleVisibleChange('regional', e)}
                      trigger="click" placement="bottom"
                    >
                      <span className="popover-lzr">
                        {getFieldDecorator('xqbzwmc')(
                          <Input readOnly placeholder="居民小区、自然村" />
                        )}
                        <Icon
                          type="cross-circle"
                          className="close-popover-lzr ant-calendar-picker-clear"
                          onClick={(e) => this.removeText(e, 'xqbzwmc', 'xqbzwdm','regional')}
                        />
                      </span>
                    </Popover>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem>
                    <Popover
                      content={<ButtonLayout
                        arrs={houseXqFsByIdResult.list}
                        selectCode={build.xqbzwbcdm} // 已选按钮
                        onClick={this.handleClick}
                        grade="id"
                        gradeName="mc"
                        loading={houseXqFsByIdResult.loading}
                      />}
                      visible={this.state.overVisible.regionalFs}
                      onVisibleChange={(e) => this.handleVisibleChange('regionalFs', e)}
                      trigger="click" 
                      placement="bottom">
                      <span className="popover-lzr">
                        {getFieldDecorator('xqbzwbcmc')(
                          <Input readOnly placeholder="居民小区、自然村" />
                        )}
                        <Icon
                          type="cross-circle"
                          className="close-popover-lzr ant-calendar-picker-clear"
                          onClick={(e) => this.removeText(e, 'xqbzwbcmc', 'xqbzwbcdm','regionalFs')}
                        />
                      </span>
                    </Popover>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem>
                    {getFieldDecorator('lzNum', {
                      rules: [
                          { message: '请输入数字' },
                          { max: 4, pattern: regExpConfig.num, message: '请输入数字' },
                      ],
                    })(
                      <Input maxLength={4} onChange={(e) => this.setText('lzNum', e)} addonAfter={selectAfter} />
                    )}

                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem {...formItemLayout} label="地址全称">
              <Input readOnly disabled value={this.state.fullName} />
            </FormItem>

            <FormItem {...formItemLayout} label="产权人">
              <Row gutter={16}>
                <Col span="6">
                  {/* <InputModal addonBefore="" isHandle={isModal} addHandle={this.addModal.bind(this,'propertyOwner')}
                   handle={this.showModal} name="propertyOwner"/>*/}
                  <Input
                    name="propertyOwner"
                    value={result.cqrxx.xm}
                    disabled={!isModal.propertyOwner}
                    readOnly
                  />
                </Col>
                <Col span="9">
                  <Input
                    addonBefore="电话:"
                    name="propertyOwner"
                    value={result.cqrxx.dhhm}
                    disabled={!isModal.propertyOwner}
                    readOnly
                  />
                </Col>
                <Col span="9">
                  <Input
                    addonBefore="身份证:"
                    name="propertyOwner"
                    value={result.cqrxx.sfzh}
                    disabled={!isModal.propertyOwner}
                    readOnly
                  />
                </Col>
              </Row>
              <span
                className={isModal.propertyOwner ? 'labelAdd-lzr' : 'labelAdd-hidden-lzr'}
                onClick={() => this.showModal('propertyOwner')}
              >
                <Icon type="plus" />
              </span>
              <Popconfirm title="是否删除" onConfirm={() => this.deleteCqr(result.cqrxx.id)}>
                <Icon className={!isModal.propertyOwner ? 'inputClose-jxy' : 'inputClose-hidden-jxy'}
                  type="close"
                />
              </Popconfirm>
              <PropertyOwner
                title="添加产权人"
                loading={this.props.houseAddressCqrAddResult.loading}
                visible={this.state.visible.propertyOwner}
                onCancel={this.hiddenModal}
                search={this.addCqr}
              />
            </FormItem>

            {/* <FormItem {...formItemLayout} label="地址编号"
              >
              <Input placeholder="随便写" id="textarea" name="textarea" />
            </FormItem>*/}

            <FormItem {...formItemLayout} label="楼幢二维码">
              <div className={isModal.dimenCode ? 'divInput-lzr' : 'divInput-disable-lzr'}
                onClick={isModal.dimenCode ? () => this.showModal('dimenCode') : null}
              >
              { build.ewmbm ?
                <span className="bz-label-lzr">
                  {build.ewmbm}
                </span> : null
              }
              </div>
              <Popconfirm title="是否删除" onConfirm={this.deleteBarCode}>
                <Icon className={!isModal.dimenCode ? 'inputClose-jxy' : 'inputClose-hidden-jxy'}
                  type="close"
                />
              </Popconfirm>
              <DimenCode
                title="新增二维码"
                visible={this.state.visible.dimenCode}
                bindBarCode={this.bindBarCode}
                addressId={this.state.addressId}
                onCancel={this.hiddenModal}
              />
            </FormItem>

            <FormItem {...formItemLayout} label="楼幢档案号">
              <Row gutter={16}>
                <Col span="6">
                  <Input
                    name="archives"
                    value={result.fdxx.dah}
                    disabled={!isModal.archives}
                    readOnly
                  />
                </Col>
                <Col span="6">
                  <Input
                    name="archives"
                    value={result.fdxx.fdxm}
                    addonBefore="房东姓名:"
                    disabled={!isModal.archives}
                    readOnly
                  />
                </Col>
                <Col span="6">
                  <Input
                    name="archives"
                    value={result.fdxx.fddh}
                    addonBefore="电话号码:"
                    disabled={!isModal.archives}
                    readOnly
                  />
                </Col>
                <Col span="6">
                  <Input
                    name="archives"
                    value={result.fdxx.fdsfzh}
                    addonBefore="房东身份证:"
                    disabled={!isModal.archives}
                    readOnly
                  />
                </Col>
              </Row>
              <span
                className={isModal.archives ? 'labelAdd-lzr' : 'labelAdd-hidden-lzr'}
                onClick={() => this.showModal('archives')}
              >
                <Icon type="plus" />
              </span>
              <Popconfirm title="是否删除" onConfirm={this.deleteDah}>
                <Icon className={!isModal.archives ? 'inputClose-jxy' : 'inputClose-hidden-jxy'}
                  type="close"
                />
              </Popconfirm>
                {/* <Icon className={!isModal['archives']?"inputClose-jxy":"inputClose-hidden-jxy"}
                  type='close' onClick={this.addModal.bind(this,'archives')}/>*/}
              <Archives
                title="添加楼幢档案号"
                visible={this.state.visible.archives}
                bindDah={this.bindDah}
                onCancel={this.hiddenModal}
                addressId={this.state.addressId}
              />
            </FormItem>

            <FormItem {...formItemLayout} label="户号">
              <Row gutter={16}>
                <Col span="6">
                  <Input
                    name="houseNumber"
                    value={result.hhxx.hh}
                    disabled={!isModal.houseNumber}
                    readOnly
                  />
                </Col>
                <Col span="6">
                  <Input value={result.hhxx.hzxm}
                    name="houseNumber"
                    addonBefore="户主姓名:"
                    disabled={!isModal.houseNumber}
                    readOnly
                  />
                </Col>
                <Col span="6">
                  <Input
                    name="houseNumber"
                    value={result.hhxx.dhhm}
                    addonBefore="户主号码:"
                    disabled={!isModal.houseNumber}
                    readOnly
                  />
                </Col>
                <Col span="6">
                  <Input
                    name="houseNumber"
                    value={result.hhxx.sfzh}
                    addonBefore="户主身份证:"
                    disabled={!isModal.houseNumber}
                    readOnly
                  />
                </Col>
              </Row>
              <span
                className={isModal.houseNumber ? 'labelAdd-lzr' : 'labelAdd-hidden-lzr'}
                onClick={() => this.showModal('houseNumber')}
              >
                <Icon type="plus" />
              </span>
              <Popconfirm title="是否删除" onConfirm={this.deleteHh}>
                <Icon className={!isModal.houseNumber ? 'inputClose-jxy' : 'inputClose-hidden-jxy'}
                  type="close"
                />
              </Popconfirm>
              {/* <Icon className={!isModal['houseNumber']?"inputClose-jxy":"inputClose-hidden-jxy"}
                type='close' onClick={this.addModal.bind(this,'houseNumber')}/>*/}
              <HouseNumber
                addressId={this.state.addressId}
                title="添加户号"
                visible={this.state.visible.houseNumber}
                bindHh={this.bindHh}
                onCancel={this.hiddenModal}
              />
            </FormItem>

            <FormItem {...formItemLayout} label="备注" >
              <div className="divInput-lzr">
                {result.bz ? result.bz.map(sub =>
                  <span key={sub.id} className="bz-label-lzr">
                    {sub.fbzdz}
                    <Popconfirm title="是否删除" onConfirm={() => this.deleteBz(sub.id)}>
                      <Icon type="close"
                        className="inputClose-jxy labelClose-lzr"
                      />
                    </Popconfirm>
                  </span>
                ) : null}
              </div>
              <span className="labelAdd-lzr" onClick={() => this.showModal('remark')}>
                <Icon type="plus" />
              </span>
              {this.state.visible.remark ?
                <Remark
                  title="添加备注"
                  loading={this.props.houseRelatedbzAddResult.loading}
                  onCancel={this.hiddenModal}
                  search={this.addBz}
                /> : null
              }
            </FormItem>

            <FormItem {...formItemLayout} label="合并">
              <div className="divInput-lzr">
                {result.fdzlist ? result.fdzlist.map(sub =>
                  <span key={sub.fbldid} className="bz-label-lzr">
                    {sub.fbzdz}
                    <Popconfirm title="是否删除" onConfirm={() => this.deleteBuilding(sub.fbldid)}>
                      <Icon type="close"
                        className="inputClose-jxy labelClose-lzr"
                      />
                    </Popconfirm>
                  </span>
                ) : null}
              </div>
              <span className="labelAdd-lzr" onClick={() => this.showModal('combinedHouse')}>
                <Icon type="plus" />
              </span>
              <CombinedHouse
                title="合并目标房屋"
                visible={this.state.visible.combinedHouse}
                mainAddress={build.bzdz}
                addressId={this.state.addressId}
                bindBuilding={this.bindBuilding}
                onCancel={this.hiddenModal}
              />
            </FormItem>

            <FormItem {...formItemLayout} label="责任区">
              <div className={isModal.bundDuty ? 'divInput-lzr' : 'divInput-disable-lzr'}>
              { build.zrqmc ?
                <span className="bz-label-lzr">
                  {build.zrqmc}
                </span> : null
              }
              </div>
              <span className={isModal.bundDuty ? 'labelAdd-lzr' : 'labelAdd-hidden-lzr'} onClick={this.searchZrq}>
                <Icon type="plus" />
              </span>
              <Popconfirm title="是否删除" onConfirm={this.deleteZrq}>
                <Icon type="close"
                  className={!isModal.bundDuty ? 'inputClose-jxy' : 'inputClose-hidden-jxy'}
                />
              </Popconfirm>
              {this.state.visible.bundDuty ?
                <BundDuty title="关联责任区"
                  list={this.props.unitResponseAreaResult.list}
                  pcsmc={build.pcsmc}
                  addressId={this.state.addressId}
                  bindResult={this.bindZrq}
                  visible
                  onCancel={this.hiddenModal}
                /> : null
              }

            </FormItem>

            <FormItem {...formItemLayout} label="绑定地址">
              <div className="divInput-lzr">
                {result.bdbzdz ? result.bdbzdz.mainlist.map(sub =>
                  <span key={sub.id} className="bz-label-lzr">
                    {`主地址：${sub.bldmc}`}
                    <Icon type="close"
                      className="inputClose-jxy labelClose-lzr"
                      onClick={() => this.delBzdz(sub.bldid)}
                    />
                  </span>
                ) : null}
                {result.bdbzdz ? result.bdbzdz.bindlist.map(sub =>
                  <span key={sub.id} className="bz-label-lzr">
                    {`辅地址：${sub.bindbldmc}`}
                    <Icon type="close"
                      className="inputClose-jxy labelClose-lzr"
                      onClick={() => this.delBzdz(sub.bindbldid)}
                    />
                  </span>
                ) : null}
              </div>
              <span className="labelAdd-lzr" onClick={() => this.showModal('bundAddress')}>
                <Icon type="plus" />
              </span>
              <BundAddress
                addressId={this.state.addressId}
                title="添加标准地址"
                visible={this.state.visible.bundAddress}
                onCancel={this.hiddenModal}
                search={this.bindBzdz}
              />
            </FormItem>

            {/* <FormItem
              {...formItemLayout}
              label="相关地址">
              {getFieldDecorator('xgdz',
                { initialValue: `` })(
                <Input placeholder="随便写"/>
              )}
            </FormItem>*/}
          </Form>
          <div className="ability-button">
            <Popconfirm title="是否删除" onConfirm={this.deleteAddress}>
              <Button
                disabled={this.state.hisState === 1 ? null : true}
                loading={houseDelAddressResult.loading}
              >删除地址
              </Button>
            </Popconfirm>
            <Button
              loading={houseUpdateHisStateResult.loading}
              onClick={this.updateHisState}
            >
              {this.state.hisState === 1 ? '撤销历史' : '设为历史'}
            </Button>
            <Button
              loading={houseUpdateAddressResult.loading}
              className="btn-right"
              onClick={this.handleSubmit}
            >
              保存
            </Button>
          </div>
        </div>
      </Spin>
    )
  }
}
