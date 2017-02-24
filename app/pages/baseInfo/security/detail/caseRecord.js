/**
 * Created by 叶婷婷
 * 语法检查： 0 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Clue from 'components/clue'
import '../style.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

// 声明组件  并对外输出
export default class caseRecord extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Clue type="law" clueType="recordAj" id={this.props.securityId} locationType="security"/>
      </div>
    )
  }
}
