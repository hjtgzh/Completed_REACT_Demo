import React, { Component } from 'react'

// 声明组件  并对外输出
export default class windowSize extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      // activeTab: 'pop' ,
    }
    this.updateState = this.updateState.bind(this)
  }

  updateState(){
    global.$GLOBALCONFIG.PAGEHEIGHT = document.body.clientHeight - 51
    this.props.updateState()
  }

  // 组件已经加载到dom中
  componentDidMount() {
    global.$GLOBALCONFIG.PAGEHEIGHT = document.body.clientHeight - 51
    // this.setState({})
    this.props.updateState()
  }
  
  componentWillMount(){
    window.addEventListener('resize', this.updateState)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateState)
  }


  
  render() {
    return null
  }
}
