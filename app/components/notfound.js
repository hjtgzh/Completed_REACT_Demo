import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Progress } from 'antd'
import { updateTabList } from 'actions/tabList'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
    })
)

// 声明组件  并对外输出
export default class notfound extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      // activeTab: 'pop' ,
    }
    // this.back = this.back.bind(this)
  }


  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(updateTabList({
      title: `404`,
      key: `/notfound$`,
    }))
  }

  back(){
    console.log(hashHistory)
    hashHistory.goBack()
  }
  
  render() {
    return (
      <div className="developing notfound">
        <Progress 
          type="circle" 
          percent={100} 
          format={() => '404 页面未找到'} 
          width={200}
          status='active' />

        <div className="link">
          <p><Link to={'/'}>跳转至首页</Link></p>
          <p><Link to={'/login'}>跳转至登陆页</Link></p>
          <p className="blue" onClick={this.back}>点击返回</p>
        </div>
      </div>
    )
  }
}
