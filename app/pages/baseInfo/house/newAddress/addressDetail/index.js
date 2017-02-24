/**
 * Created by 黄建停---实有房屋(新增地址)
 */
import React, { Component } from 'react'
import { Form, Input, Select, Row, Col, Popover, message, AutoComplete } from 'antd'
import { regExpConfig } from 'utils/config.js'
import { connect } from 'react-redux'
// 发送数据请求
import {
  fetchAddressResult,
  fetchPublicResult,
  fetchPoliceResult,
  fetchAreaResult,
  fetchCountryResult,
  fetchStreetResult,
  fetchRoadResult,
  fetchHouseMarkResult,
  fetchHouseMarkNameResult,
} from 'actions/house'
import 'style/newAddress.less'
import ButtonLayout from './component/buttonLayout'

const Option = Select.Option
const FormItem = Form.Item

let searchData = {}
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      searchAddressResult: state.searchAddressResult,
      publicStationResult: state.publicStationResult,
      policeStationResult: state.policeStationResult,
      AreaResult: state.AreaResult,
      countryResult: state.countryResult,
      streetResult: state.streetResult,
      roadResult: state.roadResult,
      houseMarkResult: state.houseMarkResult,
      houseMarkNameResult: state.houseMarkNameResult,
      addressSubmitResult: state.addressSubmitResult,
    })
)

@Form.create({
  onFieldsChange(props, items) {
    // console.log(props)
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listComplete: true,
      addressClass: '1',
      addressName: '',
      poblicStation: '',
      publicStationGrade: '',
      policeStation: '',
      areaStation: '',
      areaStationGrade: '',
      countryStation: '',
      countryStationGrade: '',
      villageStation: '',
      villageStationGrade: '',
      roadStation: '',
      houseMarkStation: '',
      houseMarkStationGrade: '',
      houseMarkNameStation: '',
      addressFullName: '宿迁市',
      group: '',
      roadNumberB: '',
      roadNumberE: '',
      houseNumber: '',
      houseClass: '幢',
      isShowAddressResult: false,
      showSupplement: false,
      overVisible: {// 联动弹窗
        unit: false,
        police: false,
        division: false,
        country: false,
        village: false,
        road: false,
        houseMark: false,
        houseMarkName: false,
      },
    }
    this.group = ''
    this.roadNumberB = ''
    this.roadNumberE = ''
    this.houseNumber = ''
    this.inputVal = ''
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.poblicClick = this.poblicClick.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // 父级点击确定按钮后的回调
    if (nextProps.isSubmit && this.props.ifSubmit !== nextProps.ifSubmit) {
      this.handleSubmit()
    }
  }

  // 控制单个信息弹窗的显隐
  handleVisibleChange(name, visible) {
    const overVisible = this.state.overVisible
    switch (name) {
    case 'unit': {
      this.props.dispatch(fetchPublicResult({ parentdm: '' }))
      overVisible.unit = visible
      break
    }
    case 'police': {
      if (this.state.publicStationGrade === '') {
        message.warning('请选择分局')
        overVisible.police = false
      } else {
        overVisible.police = visible
      }
      break
    }
    case 'division': {
      this.props.dispatch(fetchAreaResult({ parentdm: '' }))
      overVisible.division = visible
      break
    }

    case 'country': {
      if (this.state.areaStationGrade === '') {
        message.warning('请选择行政区划')
        overVisible.country = false
      } else {
        this.props.dispatch(fetchCountryResult({ parentdm: this.state.areaStationGrade }))
        overVisible.country = visible
      }
      break
    }

    case 'village': {
      if (this.state.countryStationGrade === '') {
        message.warning('请选择街道、镇')
        overVisible.village = false
      } else {
        this.props.dispatch(fetchStreetResult({ parentdm: this.state.countryStationGrade }))
        overVisible.village = visible
      }
      break
    }

    case 'road': {
      if (this.state.villageStationGrade === '') {
        message.warning('请选择社区、居委会')
        overVisible.road = false
      } else {
        const streetArr = this.props.streetResult
        for (const item of Object.keys(streetArr)) {
          if (streetArr[item].xzqhqc === this.state.villageStation) {
            const _self = this
            this.props.dispatch(fetchRoadResult({ cjwhId: streetArr[item].id, sblx: 1 }, (res) => {
              if (res) {
                if (res.data.list.length === 0) {
                  message.warning('不存在道路')
                  overVisible.road = false
                } else if (_self.state.villageStationGrade === '') {
                  message.warning('请选择社区、居委会')
                  overVisible.road = false
                } else {
                  overVisible.road = visible
                }
                _self.setState({ overVisible: overVisible })
              }
            }))
          }
        }
        overVisible.road = visible
      }
      break
    }
    case 'houseMark': {
      if (this.state.villageStationGrade === '') {
        message.warning('请选择社区、居委会')
        overVisible.houseMark = false
      } else {
        const commonStreetArr = this.props.streetResult
        for (const item of Object.keys(commonStreetArr)) {
          if (commonStreetArr[item].xzqhqc === this.state.villageStation) {
            const self = this
            this.props.dispatch(fetchHouseMarkResult({ cjwhId: commonStreetArr[item].id, sblx: 2 }, (res) => {
              if (res) {
                if (res.data.list.length === 0) {
                  message.warning('不存在小区、自然村')
                  overVisible.houseMark = false
                } else if (self.state.villageStationGrade === '') {
                  message.warning('请选择社区、居委会')
                  overVisible.houseMark = false
                } else {
                  overVisible.houseMark = visible
                }
                self.setState({ overVisible: overVisible })
              }
            }))
          }
        }
        overVisible.houseMark = visible
      }
      break
    }
    case 'houseMarkName': {
      if (this.state.houseMarkStationGrade === '' || this.state.houseMarkStation === '') {
        message.warning('请选择小区、自然村')
        overVisible.houseMarkName = false
      } else {
        const houseMarkArr = this.props.houseMarkResult
        for (const item of Object.keys(houseMarkArr.list)) {
          if (houseMarkArr.list[item].mc === this.state.houseMarkStation) {
            const that = this
            this.props.dispatch(fetchHouseMarkNameResult({ xqId: houseMarkArr.list[item].id }, (res) => {
              if (res) {
                if (res.data.list.length === 0) {
                  message.warning('不存在补充小区、自然村')
                  overVisible.houseMarkName = false
                } else if (that.state.houseMarkStationGrade === '') {
                  message.warning('请选择小区、自然村')
                  overVisible.houseMarkName = false
                } else {
                  overVisible.houseMarkName = visible
                }
                that.setState({ overVisible: overVisible })
              }
            }))
          }
        }
        overVisible.houseMarkName = visible
      }
      break
    }
    default: {
      return
    }
    }
    this.setState({ overVisible: overVisible })
  }

  // 提交表单数据
  handleSubmit(e) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        message.error('表单提交错误,请重新填写!')
        this.props.getFormData('errors')
        return
      }
      // console.log(values);
      let mph = ''
      if (this.state.roadNumberE) {
        mph = `${this.state.roadNumberB}-${this.state.roadNumberE}号`
      } else {
        mph = `${this.state.roadNumberB}号`
      }
      const submitData = {
        fjdm: this.state.publicStationGrade || '',
        pcsdm: this.state.policeStationGrade || '',
        qxdm: this.state.areaStationGrade || '',
        xzjddm: this.state.countryStationGrade || '',
        cjwhdm: this.state.villageStationGrade || '',
        jlxdm: this.state.roadStationGrade || '',
        xqbzwdm: this.state.houseMarkStationGrade || '',
        xqbzwbcdm: this.state.houseMarkNameStationGrade || '',
        czmc: this.state.group || '',
        mph: mph,
        sf: '江苏省',
        cs: '宿迁市',
        lz: this.state.houseNumber || '',
        bzdz: this.state.addressFullName || '',
        jd: '',
        wd: '',
        bcdz: this.state.additionAddress || '',
        dzlx: this.state.addressClass || '',
      }
      this.props.getFormData(submitData)
    });
  }

  // 选择不同的select
  handleSelectChange(value) {
    if (value === '2') {
      this.setState({
        showSupplement: true,
        addressClass: '0',
      })
    } else if (value === '1') {
      this.setState({
        showSupplement: false,
        addressClass: '1',
      })
    } else if (value === '3') {
      this.setState({
        showSupplement: false,
        addressClass: '3',
      })
    } else {
      if (this.state.group) {
        this.group = `${this.state.group}组`
      }
      if (this.state.roadNumberB) {
        this.roadNumberB = `${this.state.roadNumberB}号`
      }
      if (this.state.roadNumberE) {
        this.roadNumberE = `-${this.state.roadNumberE}号`
      }
      if (this.state.houseNumber) {
        this.houseNumber = `${this.state.houseNumber}${value}`
      }
      this.setState({
        houseClass: value,
        addressFullName: (`宿迁市${this.state.areaStation}
            ${this.state.countryStation}${this.state.villageStation}
            ${this.group}${this.state.roadStation || ''}
            ${this.roadNumberB}${this.roadNumberE}
            ${this.state.houseMarkStation || ''}${this.houseNumber}`.replace(/\s/ig, '')),
      })
    }
  }

  // 输入内容发生改变后的回调
  handleNumberChange(name, e) {
    switch (name) {
    case 'group': {
      if (e.target.value) {
        this.group = `${e.target.value}组`
      } else {
        this.group = ''
      }
      if (this.state.roadNumberB) {
        this.roadNumberB = `${this.state.roadNumberB}号`
      }
      if (this.state.roadNumberE) {
        this.roadNumberE = `-${this.state.roadNumberE}号`
      }
      if (this.state.houseNumber) {
        this.houseNumber = `${this.state.houseNumber}${this.state.houseClass}`
      } else {
        this.houseNumber = ''
      }
      this.setState({
        group: e.target.value,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${this.state.villageStation}${this.group}
        ${this.state.roadStation || ''}${this.roadNumberB}${this.roadNumberE}
        ${this.state.houseMarkStation || ''}${this.state.houseMarkNameStation || ''}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      break
    }
    case 'roadNumberB': {
      if (this.state.group) {
        this.group = `${this.state.group}组`
      }
      if (e.target.value) {
        this.roadNumberB = `${e.target.value}号`
      } else {
        this.roadNumberB = ''
      }
      if (this.state.roadNumberE) {
        this.roadNumberE = `-${this.state.roadNumberE}号`
      } else {
        this.roadNumberE = ''
      }
      if (this.state.houseNumber) {
        this.houseNumber = `${this.state.houseNumber}${this.state.houseClass}`
      } else {
        this.houseNumber = ''
      }
      this.setState({
        roadNumberB: e.target.value,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${this.state.villageStation}${this.group}
        ${this.state.roadStation || ''}${this.roadNumberB}${this.roadNumberE}
        ${this.state.houseMarkStation || ''}${this.state.houseMarkNameStation || ''}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      break
    }
    case 'roadNumberE': {
      if (this.state.group) {
        this.group = `${this.state.group}组`
      }
      if (this.state.roadNumberB) {
        this.roadNumberB = `${this.state.roadNumberB}号`
      }
      if (e.target.value) {
        this.roadNumberE = `-${e.target.value}号`
      } else {
        this.roadNumberE = ''
      }
      if (this.state.houseNumber) {
        this.houseNumber = `${this.state.houseNumber}${this.state.houseClass}`
      } else {
        this.houseNumber = ''
      }
      this.setState({
        roadNumberE: e.target.value,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${this.state.villageStation}${this.group}
        ${this.state.roadStation || ''}${this.roadNumberB}${this.roadNumberE}
        ${this.state.houseMarkStation || ''}${this.state.houseMarkNameStation || ''}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      break
    }
    case 'houseNumber': {
      if (this.state.group) {
        this.group = `${this.state.group}组`
      }
      if (this.state.roadNumberB) {
        this.roadNumberB = `${this.state.roadNumberB}号`
      }
      if (this.state.roadNumberE) {
        this.roadNumberE = `-${this.state.roadNumberE}号`
      }
      if (e.target.value) {
        this.houseNumber = `${e.target.value}${this.state.houseClass}`
      } else {
        this.houseNumber = ''
      }
      this.setState({
        houseNumber: e.target.value,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${this.state.villageStation}${this.group}
        ${this.state.roadStation || ''}${this.roadNumberB}${this.roadNumberE}
        ${this.state.houseMarkStation || ''}${this.state.houseMarkNameStation || ''}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      break
    }
    case 'additionAddress': {
      this.setState({
        additionAddress: e.target.value,
      })
      break
    }
    default: {
      return
    }
    }
  }

  // 弹窗内部选项点击后的回调事件
  poblicClick(value, grade) {
    // debugger
    const overVisible = this.state.overVisible
    let name = ''
    for (const n of Object.keys(overVisible)) {
      if (overVisible[n] === true) { // 确定当前弹出的页面
        name = n
        break
      }
    }
    if (this.state.group) {
      this.group = `${this.state.group}组`
    }
    if (this.state.roadNumberB) {
      this.roadNumberB = `${this.state.roadNumberB}号`
    }
    if (this.state.roadNumberE) {
      this.roadNumberE = `-${this.state.roadNumberE}号`
    }
    if (this.state.houseNumber) {
      if (this.state.houseClass) {
        this.houseNumber = `${this.state.houseNumber}${this.state.houseClass}`
      } else {
        this.houseNumber = `${this.state.houseNumber}`
      }
    } else {
      this.houseNumber = ''
    }
    switch (name) {
    case 'unit':
      this.props.dispatch(fetchPoliceResult({ parentdm: grade }))
      this.setState({
        policeStation: '',
        poblicStation: value,
        publicStationGrade: grade,
      })
      overVisible.unit = false
      overVisible.police = true
      break
    case 'police':
      this.setState({
        policeStation: value,
        policeStationGrade: grade,
      })
      overVisible.police = false
      break
    case 'division':
      this.props.dispatch(fetchCountryResult({ parentdm: grade }))
      this.setState({
        countryStation: '',
        villageStation: '',
        areaStation: value,
        areaStationGrade: grade,
        addressFullName: (`宿迁市${value}
        ${this.group}${this.roadNumberB}${this.roadNumberE}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      overVisible.division = false
      overVisible.country = true
      break
    case 'country':
      this.props.dispatch(fetchStreetResult({ parentdm: grade }))
      this.setState({
        villageStation: '',
        countryStation: value,
        countryStationGrade: grade,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${value}${this.group}${this.roadNumberB}
        ${this.roadNumberE}${this.houseNumber}`).replace(/\s/ig, ''),
      })
      overVisible.country = false
      overVisible.village = true
      break
    case 'village':
      this.setState({
        roadStation: '',
        houseMarkStation: '',
        houseMarkNameStation: '',
        villageStation: value,
        villageStationGrade: grade,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${value}${this.group}
        ${this.roadNumberB}${this.roadNumberE}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      overVisible.village = false
      break
    case 'road':
      this.setState({
        roadStation: value,
        roadStationGrade: grade,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${this.group}${value}
        ${this.roadNumberB}${this.roadNumberE}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      overVisible.road = false
      break
    case 'houseMark':
      this.setState({
        houseMarkNameStation: '',
        houseMarkStation: value,
        houseMarkStationGrade: grade,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${this.group}
        ${this.roadNumberB}${this.roadNumberE}${value}
        ${this.houseNumber}`).replace(/\s/ig, ''),
      })
      overVisible.houseMark = false
      break
    case 'houseMarkName':
      this.setState({
        houseMarkNameStation: value,
        houseMarkNameStationGrade: grade,
        addressFullName: (`宿迁市${this.state.areaStation}
        ${this.state.countryStation}${this.group}
        ${this.roadNumberB}${this.roadNumberE}
        ${value}${this.houseNumber}`).replace(/\s/ig, ''),
      })
      overVisible.houseMarkName = false
      break
    default: {
      return
    }
    }
    this.setState({ overVisible: overVisible })
  }

  // 智能解析地址下拉信息的选中
  onSelect(value) {
    for (const item of Object.keys(searchData)) {
      if (searchData[item].bzdz === value) {
        // console.log(searchData[item])
        this.setState({
          listComplete: true,
          areaStationGrade: searchData[item].qxdm,
          countryStationGrade: searchData[item].xzjddm,
          villageStationGrade: searchData[item].cjwhdm,
          poblicStation: searchData[item].fjmc,
          policeStation: searchData[item].pcsmc,
          areaStation: searchData[item].qxmc,
          countryStation: searchData[item].xzjdmc,
          villageStation: searchData[item].cjwhmc,
          group: searchData[item].czmc.split('组')[0],
          roadNumberB: searchData[item].mph.split('号')[0].split('-')[0] || searchData[item].mph.split('号')[0],
          roadNumberE: searchData[item].mph.split('-')[1] ? searchData[item].mph.split('-')[1].split('号')[0] : '',
          roadStation: searchData[item].jlxmc,
          houseMarkStation: searchData[item].xqbzwmc,
          houseMarkNameStation: searchData[item].xqbzwbcmc,
          addressFullName: value,
        })
      }
    }
    this.inputVal = value
  }

  // 智能解析地址内容改变时的调用
  inputChange(val) {
    /* this.setState({
      listComplete:false,
    })*/
    const inputThis = this
    if (this.inputVal !== val) {
      inputThis.setState({
        listComplete: false,
      })
      this.inputVal = val
      this.props.dispatch(fetchAddressResult({ keyword: val }, (res) => {
        if (res) {
          const inputArr = []
          for (const item of Object.keys(res.data)) {
            inputArr.push(res.data[item].bzdz)
          }
          // 数组去重
          // console.log(Array.from(new Set(inputArr)))
          searchData = res.data
          inputThis.setState({
            listComplete: true,
            dataSource: Array.from(new Set(inputArr)),
          })
        }
      }))
    } else {
      inputThis.setState({
        listComplete: true,
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      searchAddressResult,
      publicStationResult,
      policeStationResult,
      AreaResult,
      countryResult,
      streetResult,
      roadResult,
      houseMarkResult,
      houseMarkNameResult,
    } = this.props
    // 获取 分局 列表
    const publicStationList = []
    if (publicStationResult) {
      for (const item of Object.keys(publicStationResult)) {
        if (item === 'loading') break
        publicStationList.push({
          grade: publicStationResult[item].gxdwdm,
          content: publicStationResult[item].gxdwqc,
          key: publicStationResult[item].gxdwqc,
        })
      }
    }
    // 获取 派出所（管辖单位）列表
    const policeStationList = []
    if (policeStationResult) {
      for (const item of Object.keys(policeStationResult)) {
        if (item === 'loading') break
        policeStationList.push({
          grade: policeStationResult[item].gxdwdm,
          content: policeStationResult[item].gxdwqc,
          key: policeStationResult[item].gxdwqc,
        })
      }
    }

    // 获取智能搜索列表
    const searchAddressArr = []
    if (searchAddressResult) {
      for (const item of Object.keys(searchAddressResult)) {
        searchAddressArr.push({
          bzdz: searchAddressResult[item].bzdz,
        })
      }
    }

    // 获取 行政区划 列表
    const areaList = []
    if (AreaResult) {
      for (const item of Object.keys(AreaResult)) {
        if (item === 'loading') break
        areaList.push({
          grade: AreaResult[item].xzqhdm,
          content: AreaResult[item].xzqhqc,
          key: AreaResult[item].xzqhqc,
        })
      }
    }

    // 获取 区县 列表
    const countryList = []
    if (countryResult) {
      for (const item of Object.keys(countryResult)) {
        if (item === 'loading') break
        countryList.push({
          grade: countryResult[item].xzqhdm,
          content: countryResult[item].xzqhqc,
          key: countryResult[item].xzqhqc,
        })
      }
    }

    // 获取 街道 列表
    const streetList = []
    if (streetResult) {
      for (const item of Object.keys(streetResult)) {
        if (item === 'loading') break
        streetList.push({
          id: streetResult[item].id,
          grade: streetResult[item].xzqhdm,
          content: streetResult[item].xzqhqc,
          key: streetResult[item].xzqhqc,
        })
      }
    }

    // 获取 道路 列表
    const roadList = []
    if (roadResult) {
      if (roadResult.list) {
        for (const item of Object.keys(roadResult.list)) {
          if (item === 'loading') break
          roadList.push({
            grade: roadResult.list[item].id,
            content: roadResult.list[item].mc,
            key: roadResult.list[item].mc,
          })
        }
      }
    }

    // 获取 小区、自然村 列表
    const houseMarkList = []
    if (houseMarkResult) {
      if (houseMarkResult.list) {
        for (const item of Object.keys(houseMarkResult.list)) {
          if (item === 'loading') break
          houseMarkList.push({
            grade: houseMarkResult.list[item].id,
            content: houseMarkResult.list[item].mc,
            key: houseMarkResult.list[item].mc,
          })
        }
      }
    }

    // 获取 补充小区、自然村 列表
    const houseMarkNameList = []
    if (houseMarkNameResult) {
      if (houseMarkNameResult.list) {
        for (const item of Object.keys(houseMarkNameResult.list)) {
          if (item === 'loading') break
          houseMarkNameList.push({
            grade: houseMarkNameResult.list[item].id,
            content: houseMarkNameResult.list[item].mc,
            key: houseMarkNameResult.list[item].mc,
          })
        }
      }
    }
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    }
    const selectAfter = (
      <Select defaultValue="幢" style={{ width: 60 }} onChange={this.handleSelectChange}>
        <Option value="幢">幢</Option>
        <Option value="号">号</Option>
        <Option value="户">户</Option>
        <Option value="栋">栋</Option>
        <Option value="号楼">号楼</Option>
      </Select>
    )
    return (
      <div className="nav-second-nextContent" style={{ marginTop: '10px' }}>
        <Form horizontal className="div-flex-scroll">
          <FormItem {...formItemLayout} label="快捷输入" className="specialFormItem" hasFeedback
            validateStatus={this.state.listComplete ? '' : 'validating'}
          >
            <AutoComplete
              dataSource={this.state.dataSource}
              onSelect={this.onSelect}
              onChange={this.inputChange}
              placeholder="智能查询地址"
            />
          </FormItem>
          <FormItem {...formItemLayout} label="地址属性">
            <Select
              id="select"
              size="large"
              defaultValue="1"
              onChange={this.handleSelectChange}
            >
              <Option value="1">标准地址</Option>
              <Option value="2">非标准地址</Option>
              <Option value="3">虚拟地址</Option>
            </Select>
          </FormItem>

          <FormItem {...formItemLayout} label="管辖单位">
            <Row gutter={16}>
              <Col span="12">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={publicStationList} onClick={this.poblicClick}
                      loading={false}
                    />}
                    visible={this.state.overVisible.unit}
                    onVisibleChange={(visible) => { this.handleVisibleChange('unit', visible) }}
                    trigger="click" placement="bottom"
                  >
                    {getFieldDecorator('poblic', {
                      initialValue: this.state.poblicStation,
                    })(<Input placeholder="请选择分局" readOnly />)
                    }
                  </Popover>
                </FormItem>

              </Col>
              <Col span="12">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={policeStationList}
                      onClick={this.poblicClick} loading={policeStationResult.loading}
                    />}
                    visible={this.state.overVisible.police}
                    onVisibleChange={(visible) => { this.handleVisibleChange('police', visible) }}
                    trigger="click"
                    placement="bottom"
                  >
                    {getFieldDecorator('police', { initialValue: this.state.policeStation })(
                      <Input placeholder="请选择派出所" readOnly />)
                    }
                  </Popover>
                </FormItem>

              </Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="行政区划">
            <Row gutter={16}>
              <Col span="4">
                <Input defaultValue="江苏省" readOnly disabled />
              </Col>
              <Col span="4">
                <Input defaultValue="宿迁市" readOnly disabled />
              </Col>
              <Col span="4">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={areaList} areaStation={this.state.areaStation}
                      onClick={this.poblicClick} loading={false}
                    />}
                    visible={this.state.overVisible.division}
                    onVisibleChange={(visible) => { this.handleVisibleChange('division', visible) }}
                    trigger="click" placement="bottom"
                  >
                    {getFieldDecorator('area', { initialValue: this.state.areaStation })(
                      <Input placeholder="请选择行政区划" readOnly />)
                    }
                  </Popover>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={countryList} countryStation={this.state.countryStation}
                      onClick={this.poblicClick}
                      loading={countryResult.loading}
                    />}
                    visible={this.state.overVisible.country}
                    onVisibleChange={(visible) => { this.handleVisibleChange('country', visible) }}
                    trigger="click"
                    placement="bottom"
                  >
                    {getFieldDecorator('country', { initialValue: this.state.countryStation })(
                      <Input placeholder="请选择街道、镇" readOnly />)
                    }
                  </Popover>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={streetList} villageStation={this.state.villageStation}
                      onClick={this.poblicClick}
                      loading={streetResult.loading}
                    />}
                    visible={this.state.overVisible.village}
                    onVisibleChange={(visible) => { this.handleVisibleChange('village', visible) }}
                    trigger="click"
                    placement="bottom"
                  >
                    {getFieldDecorator('village', { initialValue: this.state.villageStation })(
                      <Input placeholder="请选择社区、居委会" readOnly />)
                    }
                  </Popover>
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="村组信息">
            {getFieldDecorator('group', { initialValue: this.state.group })(
              <Input addonAfter="组"
                onChange={(e) => { this.handleNumberChange('group', e) }}
                placeholder="地名办命名的道、路、街、巷"
              />)
            }
          </FormItem>

          <FormItem {...formItemLayout} label="道路地址"
            hasFeedback
          >
            <Row gutter={16}>
              <Col span="12">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={roadList} onClick={this.poblicClick}
                      roadStation={this.state.roadStation}
                      loading={roadResult.loading}
                    />}
                    visible={this.state.overVisible.road}
                    onVisibleChange={(visible) => { this.handleVisibleChange('road', visible) }}
                    trigger="click"
                    placement="bottom"
                  >
                    {getFieldDecorator('road', { initialValue: this.state.roadStation })(
                      <Input placeholder="默认道路" readOnly />)
                    }
                  </Popover>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  {getFieldDecorator('roadNumberB', { initialValue: this.state.roadNumberB,
                    rules: [{ pattern: regExpConfig.num, message: '只能为数字' }] })(
                    <Input addonAfter="号" placeholder="请输入道路号"
                      onChange={(e) => { this.handleNumberChange('roadNumberB', e) }}
                      maxLength={4}
                    />)
                  }
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  {getFieldDecorator('roadNumberE', { initialValue: this.state.roadNumberE,
                    rules: [{ pattern: regExpConfig.num, message: '只能为数字' }] })(
                    <Input addonBefore="-" addonAfter="号" placeholder="请输入道路号"
                      onChange={(e) => { this.handleNumberChange('roadNumberE', e) }}
                      maxLength={4}
                    />)
                  }
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="区域地址"
            hasFeedback
          >
            <Row gutter={16}>
              <Col span="8">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={houseMarkList} onClick={this.poblicClick}
                      houseMarkStation={this.state.houseMarkStation}
                      loading={houseMarkResult.loading}
                    />}
                    visible={this.state.overVisible.houseMark}
                    onVisibleChange={(visible) => { this.handleVisibleChange('houseMark', visible) }}
                    trigger="click"
                    placement="bottom"
                  >
                    {getFieldDecorator('houseMark', { initialValue: this.state.houseMarkStation })(
                      <Input placeholder="小区、自然村" readOnly />)
                    }
                  </Popover>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem>
                  <Popover
                    content={<ButtonLayout arrs={houseMarkNameList} onClick={this.poblicClick}
                      houseMarkNameStation={this.state.houseMarkNameStation}
                      loading={houseMarkNameResult.loading}
                    />}
                    visible={this.state.overVisible.houseMarkName}
                    onVisibleChange={(visible) => { this.handleVisibleChange('houseMarkName', visible) }}
                    trigger="click"
                    placement="bottom"
                  >
                    {getFieldDecorator('houseMarkName', { initialValue: this.state.houseMarkNameStation })(
                      <Input placeholder="补充小区、自然村" readOnly />)
                    }
                  </Popover>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem>
                  {getFieldDecorator('houseNumber', { initialValue: this.state.houseNumber,
                    rules: [{ pattern: regExpConfig.isNumAlpha, message: '不能有中文' }] })(
                    <Input placeholder="请输入楼栋号" addonAfter={selectAfter}
                      onChange={(e) => { this.handleNumberChange('houseNumber', e) }}
                      maxLength={4}
                    />)
                  }
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          {this.state.showSupplement ? <FormItem
            {...formItemLayout}
            label="补充地址"
          >
            <Input placeholder="随便写" id="textarea"
              onChange={(e) => { this.handleNumberChange('additionAddress', e) }}
            />
          </FormItem> : null}

          <FormItem
            {...formItemLayout}
            label="地址全称"
          >
            <Input value={this.state.addressFullName} id="textarea" readOnly />
          </FormItem>
        </Form>
      </div>
    )
  }
}
