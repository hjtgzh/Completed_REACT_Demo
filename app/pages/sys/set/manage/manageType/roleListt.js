/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Icon, Popconfirm } from 'antd'

export default class RloeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
    this.onDelete = this.onDelete.bind(this)
    this.roleNameClick = this.roleNameClick.bind(this)
    this.roleModify = this.roleModify.bind(this)
  }

  componentDidMount() {
    // debugger
  }

  // 角色名点击
  roleNameClick(roleid, index) {
    this.setState({ currentIndex: index })
    this.props.onCurrentIndex(roleid)
  }

  check_title_index(index) {
    return index == this.state.currentIndex ? 'lihit' : null
  }

  roleModify(info) {
    this.props.onRoleModify(info)
  }

  onDelete(info) {
    this.props.handleRoleDelete(info)
  }

  render() {
    const { roles } = this.props
    const loop = data => data.map((item, index) => {
      return (
        <li key={index} className={this.check_title_index(index)}>
          <a onClick={()=>this.roleNameClick(item.id, index)}>{item.name}</a>
          <a className="role_handle">
            <Icon type="edit" onClick={()=>this.roleModify(item.id)} />
            <Popconfirm title="删除?" onConfirm={()=>this.onDelete(item.id)}>
              <Icon type="cross" />
            </Popconfirm>
          </a>
        </li>
      )
    })
    const roleNodes = loop(roles)
    return (
      <ul className="roleslist-jxy">
        <span className="tittle">角色类别</span>
        {roleNodes}
      </ul>
    )
  }
}
