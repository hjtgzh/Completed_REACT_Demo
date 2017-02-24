/*
 *Create By 韩卿
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Icon, Checkbox, Spin } from 'antd'
import { setGformCache } from 'actions/common'
import 'components/gForm/style.css'
import Taobao from './taobao'
import RangeTimePicker from './rangeTimePicker'
import SingleSelect from './singleSelect'
// import { chunk, clone } from 'lodash'

// 请求头部文本后面跟的统计值的初始参数
let initParam

// 用来同步
// cache中的page和父级传来的page的
// 中间参数
let page

// 用来同步
// cache中的pageSize和父级传来的pageSize的
// 中间参数
let pageSize

// var callTimes=0

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取所有gForm中的cache
    cache: state.gFormCache,
  })
)

// 声明组件  并对外输出模块
export default class form extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      // 输入栏内容
      keyword: '',
      // 统计的总数
      total: 0,
      // 是否显示现住地址的checkbox
      isXzdz: false,
      // 头部标签的缓存数组
      selectedArr: [],
      // 所有筛选条件的缓存对象
      selectedObj: {},
      // 筛选条件的请求对象
      request: {},
      // 是否显隐筛选栏
      conditionVisible: true,
    }
    this.callTimes = 0

    // 绑定init函数的this指向
    this.init = this.init.bind(this)

    // 绑定handleChange函数的this指向
    this.handleChange = this.handleChange.bind(this)

    // 绑定setCache函数的this指向
    this.setCache = this.setCache.bind(this)

    // 绑定handleCancelSelect函数的this指向
    this.handleCancelSelect = this.handleCancelSelect.bind(this)

    // 绑定handleCancelSingleSelect函数的this指向
    this.handleCancelSingleSelect = this.handleCancelSingleSelect.bind(this)

    // 绑定handleGformSubmit函数的this指向
    this.handleGformSubmit = this.handleGformSubmit.bind(this)

    // 绑定getRangePicker函数的this指向
    this.getRangePicker = this.getRangePicker.bind(this)

    // 绑定getTaobao函数的this指向
    this.getTaobao = this.getTaobao.bind(this)

    // 绑定getSingleSelect函数的this指向
    this.getSingleSelect = this.getSingleSelect.bind(this)

    // 绑定toggleConditionVisible函数的this指向
    this.toggleConditionVisible = this.toggleConditionVisible.bind(this)

    // 绑定invokeGetStatisticsNum函数的this指向
    this.invokeGetStatisticsNum = this.invokeGetStatisticsNum.bind(this)

    // 绑定handleClean函数的this指向
    this.handleClean = this.handleClean.bind(this)
  }

  // 在render之前初始化配置
  componentWillMount() {
    this.init()
    initParam = this.props.initParam && { ...this.props.initParam }
  }
  componentDidMount() {
    // this.invokeGetStatisticsNum()
    if (typeof (this.props.gFormSubmit) === 'function') {
      this.handleGformSubmit()
    } else {
      console.warn('gFormSubmit函数未配置')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.pageSize !== nextProps.pageSize || this.props.page !== nextProps.page) {
      this.setCache(nextProps.page, nextProps.pageSize)
      page = nextProps.page
      pageSize = nextProps.pageSize
    }
  }
  // 进入页面初始化方法
  init() {
    const { cacheKey, cache } = this.props
    if (!cacheKey) {
      console.error('cacheKey未设置')
      return
    }
    if (!this.props.nums) {
      console.error('未配置nums')
    }
    try { this.state.selectedArr = cache[cacheKey].selectedArr } catch (e) { console.warn(e) }
    try { this.state.selectedObj = cache[cacheKey].selectedObj } catch (e) { console.warn(e) }
    try { this.state.request = cache[cacheKey].request } catch (e) { console.warn(e) }
    try { this.state.keyword = cache[cacheKey].keyword } catch (e) { console.warn(e) }
    try { page = cache[cacheKey].page } catch (e) { console.warn(e) }
    try { pageSize = cache[cacheKey].pageSize } catch (e) { console.warn(e) }
    // this.state.selectedArr = (this.props.cache || {}).conditionArr || []
    // this.state.selectedObj = (this.props.cache || {}).conditionObj || {}
    // this.state.request = (this.props.cache || {}).request || {}
    // this.invokeGetStatisticsNum()
  }
  // 调用父级函数请求统计值
  invokeGetStatisticsNum(isAddTime) {
    let request
    let req = {}
    if (Object.keys(this.state.request).length > 0) {
      request = { ...this.state.request }
      Object.keys(request).map((key, i) => {
        if (request[key].type === 'time' && !isAddTime) {
          return
        }
        req[key] = request[key].id
        if (!req[key] && initParam && initParam[key] !== undefined) {
          req[key] = initParam[key]
        }
      })
    } else {
      req = { ...initParam }
    }
    if (typeof (this.props.getStatisticsNum) === 'function') {
      this.props.getStatisticsNum({ ...req, keyword: this.state.keyword, isXzdz: this.state.isXzdz })
    } else {
      console.warn('未配置getStatisticsNum函数')
    }
  }
  setCache(_page, _pageSize) {
    if (this.props.cacheKey === undefined) {
      console.error('cacheKey未设置')
      return
    }
    const o = {}
    o[this.props.cacheKey] = {
      selectedArr: this.state.selectedArr,
      selectedObj: this.state.selectedObj,
      request: this.state.request,
      keyword: this.state.keyword,
      page: _page || this.props.page,
      pageSize: _pageSize || this.props.pageSize,
    }
    this.props.dispatch(setGformCache(o))
  }
  // 构建Taobao组件
  getTaobao(item) {
    this.state.selectedObj[item.key] = this.state.selectedObj[item.key] || []
    const length = this.state.selectedObj[item.key].length
    item.items = item.items || []
    // console.warn(item.items)
    item.items.map((one, index) => {
      if (this.state.request[item.numReqKey] && this.state.request[item.numReqKey].type === 'multiple') {
        if (this.state.request[item.numReqKey].ids.indexOf(one.id) > -1) {
          one.num = (this.props.nums[item.numResKey] || {})[one.id] || 0
        } else {
          one.num = 0
        }
      } else {
        one.num = (this.props.nums[item.numResKey] || {})[one.id] || 0
      }

      const selected = this.state.selectedObj[item.key]
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].id === one.id && selected[i].type === 'multiple') {
          one.checked = true
          return
        }
      }
      one.checked = false
    })

    if (length > 0) {
      const { id, lv, pid, type } = this.state.selectedObj[item.key][length - 1]
      this.state[`preSet${item.key}`] = { preId: id, preLv: lv, prePid: pid, preType: type }
    } else {
      this.state[`preSet${item.key}`] = {}
    }

    // console.warn('getTaobao...')
    return (
      <Taobao
        label={item.label}
        items={item.items}
        key={item.key}
        needNum={!!item.needNum}
        needMulti={!!item.needMulti}
        needArrowIcon={!!item.needArrowIcon}
        // getComponentInternalData={
        //  this.getTaobaoComponentInternalData.bind(
        //     this, item.key, item.numReqKey
        //   )
        // }
        getComponentInternalData={
          (...args) =>
            this.getTaobaoComponentInternalData.apply(this, [item.key, item.numReqKey, ...args])
        }
        preSet={this.state[`preSet${item.key}`]}
      />
    )
  }
  // 构建rangePicker组件
  getRangePicker(item) {
    this.state.selectedObj[item.key[0]] = this.state.selectedObj[item.key[0]] || {}
    this.state.selectedObj[item.key[1]] = this.state.selectedObj[item.key[1]] || {}
    return (
      <RangeTimePicker
        label={item.label}
        format={item.format || 'YYYY-MM-DD'}
        key={item.key}
        getComponentInternalData={(...args) => this.getRangePickerInternalData.apply(this, [item, ...args])}
        value={
          [
            this.state.selectedObj[item.key[0]] || {},
            this.state.selectedObj[item.key[1]] || {},
          ]
        }
      />
    )
  }

  getSingleSelect(item) {
    // console.log('singleSelect',item)
    this.state.selectedObj[item.key] = this.state.selectedObj[item.key] || {}
    item.items = item.items || []
    item.items.map((o, i) => {
      o.num = (this.props.nums[item.numResKey] || {})[o.id] || 0
    })
    return (
      <SingleSelect
        label={item.label}
        items={item.items}
        key={item.key}
        needNum={item.needNum || false}
        needArrowIcon={item.needArrowIcon || false}
        getComponentInternalData={(...args) => this.getSingleSelectComponentInternalData.apply(this, [item, ...args])}
        show={!Object.keys(this.state.selectedObj[item.key]).length}
      />
    )
  }
  /*
   *obj              type[Object]
   *obj.item         type[Array]
   *obj.action       type[String]  add|remove
   *obj.type         type[String]  single|multiple
   *obj.currentLv    type[String]
   */
   // 获取taobao组件内部的数据
  getTaobaoComponentInternalData(key, numReqKey, obj) {
    const selectedArr = this.state.selectedArr
    const selectedObj = this.state.selectedObj
    const currentLv = obj.currentLv
    let reqId
    const ids = []
    switch (obj.action) {
    case 'add':
      // 将同类型（key）同Lv的数据从selectedArr中去掉，并取消checked状态
      for (let i = selectedArr.length - 1; i >= 0; i--) {
        if (selectedArr[i].lv === currentLv && selectedArr[i].key === key) {
          // 由于每个元素为引用类型，所以直接修改checked属性，并刷新视图，可让子组件的checked属性发生变化
          selectedArr[i].checked = false
          selectedArr.splice(i, 1)
        }
      }
      // 将同Lv的数据从selectedObj[key]中去掉，并取消checked状态
      for (let j = selectedObj[key].length - 1; j >= 0; j--) {
        if (selectedObj[key][j].lv === currentLv) {
          selectedObj[key][j].checked = false
          selectedObj[key].splice(j, 1)
        }
      }
      obj.item.map((v, i) => {
        ids.push(v.id)
        v.key = key
        v.numReqKey = numReqKey
        v.type = obj.type
        // 将被多选的对象添加checked为true的属性
        if (obj.type === 'multiple') {
          v.checked = true
          reqId = v.pid
        } else {
          reqId = v.id
        }
      })
      // 将选项添加到selectedArr和selectedObj[key]的队列后面
      this.state.selectedArr = selectedArr.concat(obj.item)
      this.state.selectedObj[key] = selectedObj[key].concat(obj.item)
      if (obj.type === 'multiple') {
        this.state.request[numReqKey] = { id: reqId, ids: ids, type: 'multiple' }
      } else {
        this.state.request[numReqKey] = { id: reqId }
      }
      // 将当前所有的选项缓存到redux中
      this.setCache()
      break
    case 'remove':
    default:
      console.error('组件内部修改类型不匹配')
      return
    }
    // 刷新组件状态
    this.setState({})
    // 转换需要传递到父级的数据
    // const toParentObj={ids:ids.join(''),type:obj.type}
    // this.props.getStatisticsNum({[key]:toParentObj})
    this.invokeGetStatisticsNum()
  }

  getRangePickerInternalData(item, dateObj) {
    // 将修改selectedObj对应元素对象属性中的值
    this.state.selectedObj[item.key[0]] = { date: dateObj.startDate, dateString: dateObj.startDateString }
    this.state.selectedObj[item.key[1]] = { date: dateObj.endDate, dateString: dateObj.endDateString }
    // 此处的键值设置为id是为了配合invokeGetStatisticsNum解析
    try {
      this.state.request[item.numReqKey[0]] = { id: dateObj.startDateString, type: 'time' }
      this.state.request[item.numReqKey[1]] = { id: dateObj.endDateString, type: 'time' }
    } catch (e) {
      console.error(`${item.label}的numReqKey未配置`)
    }
    // 刷新组件状态
    this.setState({})
    // 将当前所有的选项缓存到redux中
    this.setCache()
    // this.invokeGetStatisticsNum()
  }
  /*
   *obj         type[Object]
   *obj.item    type[Object]
   *obj.action  type[String]  add
   *obj.type    type[String]  single
   */
  getSingleSelectComponentInternalData(item, obj) {
    obj.item.key = item.key
    obj.item.numReqKey = item.numReqKey
    obj.item.sort = item.sort
    obj.item.type = obj.type
    this.state.selectedArr.push(obj.item)
    this.state.selectedObj[item.key] = obj.item
    if (item.numReqKey) {
      this.state.request[item.numReqKey] = { id: obj.item.id }
    }
    this.setState({})
    this.setCache()
    this.invokeGetStatisticsNum()
  }
  // 点击标签取消选择
  handleCancelSelect(item) {
    // if (item.checked) {
    //   item.checked = !item.checked
    // }
    // console.log(this)
    const selectedArrNew = []
    const keyArr = []
    const key = item.key

    this.state.selectedArr.map((v, i) => {
      if (!((v.id === item.id && v.key === key) || (v.lv > item.lv && v.key === key))) {
        selectedArrNew.push(v)
      } else {
        v.checked = false
      }
    })
    this.state.selectedObj[key].map((v, i) => {
      if (!(v.id === item.id || v.lv > item.lv)) {
        keyArr.push(v)
      }
    })

    this.state.selectedArr = selectedArrNew
    this.state.selectedObj[key] = keyArr
    const ids = []
    for (let i = keyArr.length - 1; i >= 0; i--) {
      if (keyArr[i].type !== 'multiple') {
        break;
      } else {
        ids.push(keyArr[i].id)
      }
    }
    if (ids.length > 0) {
      this.state.request[item.numReqKey] = { id: item.pid, ids: ids, type: 'multiple' }
    } else {
      this.state.request[item.numReqKey] = { id: item.pid }
    }

    // this.state[`prePid${key}`]=item.pid
    // this.state[`preLv${key}`]=item.lv
    // console.log({preLv:item.lv,prePid:item.pid})

    // 必须赋值一个新对象，使视图更新
    this.state[`preSet${key}`] = { preLv: item.lv, prePid: item.pid }
    this.invokeGetStatisticsNum()
    this.setCache()
    this.setState({})
  }
  handleCancelSingleSelect(item) {
    this.state.selectedArr.forEach((v, i) => {
      // console.log(i);
      if (v.key === item.key) {
        this.state.selectedArr.splice(i, 1)
        // console.log(`delete${i}`)
        // return false
      }
      // return true
    })
    this.state.selectedObj[item.key] = undefined
    this.state.request[item.numReqKey] = ''
    this.setState({})
    this.setCache()
    this.invokeGetStatisticsNum()
  }
  // 搜索框的值发生改变的事件绑定
  handleChange(e) {
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }
  // 切换条件栏的显隐
  toggleConditionVisible() {
    this.setState({ conditionVisible: !this.state.conditionVisible })
  }

  // 循环要渲染的模块
  renderRow(item, key) {
    return (
      <div key={key}>
        {this.getFormItem(item)}
      </div>
    )
  }

  // 搜索区域点击提交事件
  handleGformSubmit() {
    let tpage
    let tpageSize
    // console.log('this.callTimes:',this.callTimes)
    // debugger
    if (this.callTimes < 1) {
      this.callTimes++
      tpage = page || this.props.page
      tpageSize = pageSize || this.props.pageSize
    } else {
      tpage = 1
      tpageSize = 10
    }
    this.setCache(tpage, tpageSize)
    this.invokeGetStatisticsNum(true)
    this.props.gFormSubmit({
      ...this.state.selectedObj,
      keyword: this.state.keyword,
      page: tpage,
      pageSize: tpageSize,
      isXzdz: this.state.isXzdz })
    // page=undefined
    // pageSize=undefined
  }
  // 清空所有的搜索条件
  handleClean() {
    this.state.selectedArr = []
    const temp = {}
    Object.keys(this.state.selectedObj).map((key, index) => {
      const invoke = this.state.selectedObj[key]
      if (invoke instanceof Array) {
        temp[key] = []
        return
      }
      if (invoke instanceof Object) {
        temp[key] = {}
        return
      }
      console.error(`${invoke}不是一个对象或数组`)
    })
    this.state.selectedObj = temp
    this.state.request = {}
    this.state.keyword = ''
    this.state.isXzdz = false
    page = 1
    pageSize = 10
    this.setState({})
    this.handleGformSubmit()
  }

  render() {
    // console.log('render gForm')
    const self = this
    // 已经选择的标签的视图
    // console.log("selectedArr",this.state.selectedArr)
    const selectedArrList = this.state.selectedArr.map((item, index) => {
      // 根据item.sort的值返回要显示的文本结构
      function returnContent(one) {
        switch (one.sort) {
          // case 'time':return `${item.time.starttime}~${item.time.endtime}`
        // default:return `${one.name}(${one.num||0})`
        default:return one.name
        }
      }
      // 根据item.sort的值绑定点击已选项时对应的click事件
      function returnClickHandle(sort) {
        switch (sort) {
        case 'singleSelect':return self.handleCancelSingleSelect
        default:return self.handleCancelSelect
        }
      }
      return (
        <Button
          className="selected-btn"
          type="primary"
          key={index}
          size="small"
          // onClick={returnClickHandle(item.sort).bind(self, item)}
          onClick={() => returnClickHandle(item.sort).call(self, item)}
        >{returnContent(item)}<Icon type="minus-circle" />
        </Button>
      )
    })
    return (
      <div className="gform-loading">
        <Spin spinning={this.props.loading}>
          <div className="gform">
            <div className="gform-head clearfix">
              <span className="totle">{this.props.totalCount || 0}</span>
              <span className="selected-list">
                {selectedArrList}
              </span>
              <span className="search-box">
                {
                  this.props.needKeyword === false ?
                    null :
                    <Input
                      className="search-input"
                      icon="search" name="keyword"
                      value={this.state.keyword}
                      onChange={this.handleChange} type="text"
                    />
                }
                <Button type="primary" icon="search" className="search-btn" onClick={this.handleGformSubmit}>搜索</Button>
                {
                  this.props.needClean === false ?
                    null : <Button type="ghost" className="search-btn" onClick={this.handleClean}>重置</Button>
                }
                {
                  this.props.needXzdz ?
                    <span><Checkbox
                      className="search-checkbox"
                      value={this.state.isXzdz}
                      name="isXzdz"
                      onChange={(e) => { this.setState({ isXzdz: !e.target.value }) }}
                    />现住地址</span>
                    : null
                }
              </span>
              <Button
                type="primary"
                onClick={this.toggleConditionVisible}
                className="right"
              >
                {this.state.conditionVisible ? '收起筛选' : '显示筛选'}
              </Button>
            </div>
            <div className="groups clearfix" style={{ display: this.state.conditionVisible ? 'block' : 'none' }}>
            {
              this.props.gFormConfig.map((item, index) => {
                if (!item.key) {
                  return console.error(`${item.label}的key不能为空`)
                }
                switch (item.sort) {
                case 'superSelect':
                  return this.getTaobao(item)
                case 'rangePicker':
                  return this.getRangePicker(item)
                case 'singleSelect':
                  return this.getSingleSelect(item)
                default:return null
                }
              })
              // this.state.components.map((v,i)=>{
              //   // console.log("components",this.state.components)
              //   // console.log('preSet',`preSet${v.props.key}`)
              //   // console.log('state',this.state)
              //   return React.createElement(v.tag,
              // {...v.props,preSet:this.state[`preSet${v.props.key}`]})
              // })
            }
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}
