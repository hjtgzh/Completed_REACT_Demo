/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  fetchCluePeopleMesg, // 获取线索记录人员信息
  fetchClueLawMesg, // 获取线索记录案件信息
  fetchClueAlarmMesg, // 获取线索记录警情信息
  fetchClueBikeMesg, // 获取线索记录电动车信息
  fetchClueCarMesg, // 获取线索记录机动车信息
  fetchClueUnitMesg, // 获取线索记录单位信息
  fetchCluePhotoMesg, // 获取线索记录照片
} from 'actions/people'
import ImageView from './popUp/imageView'


@connect(
  (state) => ({
    config: state.config,
    cluePeopleMesgSearchResult: state.cluePeopleMesgSearchResult, // 人员
    clueLawMesgSearchResult: state.clueLawMesgSearchResult, // 案件
    clueAlarmMesgSearchResult: state.clueAlarmMesgSearchResult, // 警情
    clueBikeMesgSearchResult: state.clueBikeMesgSearchResult, // 电动车
    clueCarMesgSearchResult: state.clueCarMesgSearchResult, // 机动车
    clueUnitMesgSearchResult: state.clueUnitMesgSearchResult, // 单位
    cluePhotoMesgSearchResult: state.cluePhotoMesgSearchResult, //照片
  })
)
export default class contentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      contents: '',
      messageShow: false,
      messageName: '',
      imageViewShow: false,
    }
    this.showMessage = this.showMessage.bind(this)
    this.showImage = this.showImage.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDispatch = this.handleDispatch.bind(this)
  }

  // 显示隐藏列表信息
  showMessage(mes) {
    if (this.state.messageName === mes && this.state.messageShow) {
      this.setState({ messageShow: false })
    } else {
      this.state.contents = ''
      this.setState({ messageShow: true })
      this.handleDispatch(mes)
      this.state.messageName = mes
    }
  }

  // 查询对应信息
  handleDispatch(mes) {
    const value = {
      pageNo: '1',
      pageSize: '10',
      id: this.props.dataSource.id,
    }
    switch (mes) {
    case 'people':
      this.state.loading = true
      this.props.dispatch(fetchCluePeopleMesg(value, () => {
        this.state.contents = this.props.cluePeopleMesgSearchResult.list.map((v, i) => <li key={i}>人员：{v.xm}</li>)
        this.state.loading = false
        this.setState({})
      }))
      break
    case 'law':
      this.props.dispatch(fetchClueLawMesg(value, () => {
        this.state.contents = this.props.clueLawMesgSearchResult.list.map((v, i) =>
          <li key={i}>案件：{value.ajbh},{value.ajlb1}</li>)
        this.setState({})
      }))
      break
    case 'alarm':
      this.props.dispatch(fetchClueAlarmMesg(value, () => {
        this.state.contents = this.props.clueAlarmMesgSearchResult.list.map((v, i) =>
          <li key={i}>警情：{value.jjdbh},{value.bjlb}</li>)
        this.setState({})
      }))
      break
    case 'bike':
      this.props.dispatch(fetchClueBikeMesg(value, () => {
        this.state.contents = this.props.clueBikeMesgSearchResult.list.map((v, i) =>
          <li key={i}>电动车：{v.clph}</li>)
        this.setState({})
      }))
      break
    case 'car':
      this.props.dispatch(fetchClueCarMesg(value, () => {
        this.state.contents = this.props.clueCarMesgSearchResult.list.map((v, i) =>
          <li key={i}>机动车：{v.clph}</li>)
        this.setState({})
      }))
      break
    case 'unit':
      this.props.dispatch(fetchClueUnitMesg(value, () => {
        this.state.contents = this.props.clueUnitMesgSearchResult.list.map((v, i) =>
          <li key={i}>单位：{v.dwmc}</li>)
        this.setState({})
      }))
      break
    case 'photo':
      this.props.dispatch(fetchCluePhotoMesg({ id: value.id }))
      break
    default:
      break
    }
  }

  // 显示图片
  showImage() {
    this.handleDispatch('photo')
    this.setState({ imageViewShow: true })
  }

  handleCancel() {
    this.setState({ imageViewShow: false })
  }

  // 隐藏图片
  componentDidMount() {
    // debugger
  }

  render() {
    const { dataSource, cluePhotoMesgSearchResult } = this.props
    return (
      <div className="card-lzr">
        <div className="content">
          <p>{dataSource.text}</p>
        </div>
        <div className="relateMessage">
          <div className="message-left">
            <div className="message-left-content">
              <div onClick={() => this.showMessage('people')}><a>{dataSource.rys}个</a><span>人员信息</span></div>
              <div onClick={() => this.showMessage('law')}><a>{dataSource.ajs}个</a><span>案件信息</span></div>
              <div onClick={() => this.showMessage('alarm')}><a>{dataSource.jqs}个</a><span>警情信息</span></div>
              <div onClick={() => this.showMessage('bike')}><a>{dataSource.ddcs}个</a><span>电动车信息</span></div>
              <div onClick={() => this.showMessage('car')}><a>{dataSource.jdcs}个</a><span>机动车信息</span></div>
              <div onClick={() => this.showMessage('unit')}><a>{dataSource.dws}个</a><span>单位信息</span></div>
              <div onClick={() => this.showImage('photo')}><a>{dataSource.tps}个</a><span>照片</span></div>
              {this.state.imageViewShow ?
                <ImageView onCancel={this.handleCancel} imgs={cluePhotoMesgSearchResult.list} /> : null
              }
            </div>
            <div className={this.state.messageShow ? 'message-list-hidden' : 'message-list'}>
              <Spin spinning={this.state.loading}>
                <ul>
                  {this.state.contents}
                </ul>
              </Spin>
            </div>
          </div>
          <div className="message-right">
            <span>来自 {dataSource.cjrmc}</span>
            <span>{moment(dataSource.cjsj).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
        </div>
      </div>
    )
  }
 }
