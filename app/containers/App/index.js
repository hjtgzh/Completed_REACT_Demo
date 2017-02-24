
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message } from 'antd'

import Header from './header'
import Footer from './footer'
import LeftNav from './leftNav'
import RightAside from './rightAside'
import TabList from './tabList'
import Extra from './extra'
import WindowSize from 'components/windowSize'
import 'antd/dist/antd.less'
import '../../style/base.less'

@connect(
    (state, props) => ({
      config:state.config
    }),
    (dispatch) => ({ actions: bindActionCreators({}, dispatch) })
)
export default class App extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = { 
      pageHeight: 0,
    }
    this.updateState = this.updateState.bind(this)
  }

  updateState(){
    this.setState({})
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // antd的message组件 的全局配置
    message.config({
      duration: 3,
    })
  }

  // createWaterMark(){
  //   const {config}=this.props
  //   const arr=[]
  //   for(var i=0;i<30;i++){
  //     arr.push({
  //       name:config.username,
  //       idnumber:config.sfzh,
  //       loginTime:(new Date()).toLocaleString()
  //     })
  //   }
  //   return arr
  // }

  render() {
    const { location, children } = this.props
    return (
      <div id="container" className="effect easeInOutBack mainnav-lg aside-bright">
        <Header />
        <div className="boxed">
          <div id="content-container">
            <div id="page-content" style={{height: global.$GLOBALCONFIG.PAGEHEIGHT,position:'relative'}}>
              <TabList />
              {children}
            </div>
          </div>
          <LeftNav location={location} />
          <RightAside />
        </div>
        <Footer />
        <Extra />
        <WindowSize updateState={this.updateState}/>
        {/*<div id='watermark'>
                {
                  this.createWaterMark().map((o,i)=>(<div key={i}><p>{o.name}</p><p>{o.idnumber}</p><p>{o.loginTime}</p></div>))
                }
                </div>*/}
      </div>
    )
  }
}
