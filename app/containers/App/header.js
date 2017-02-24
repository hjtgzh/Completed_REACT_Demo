import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { hashHistory } from 'react-router'
import { Menu, Dropdown, Icon, Button, Modal } from 'antd'
import { 
  fetchStaff,
} from 'actions/common'

const confirm = Modal.confirm

@connect(
  (state, props) => ({ 
    config: state.config,
    staffResponse: state.staffResponse,
  })
)
export default class Header extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = { 
      loading: false,
      staff:{
        onlineCount: "",
        monthCount: "",
        usertable: {
          "gxdwqc": "",
          "longmobile": "",
          "post": "",
          "shortmobile": "",
          "username": "",
          "userid": "",
        }
      }
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchStaff(sessionStorage.getItem('usercode')))
    const usercode = sessionStorage.getItem('usercode')
    this.props.dispatch(fetchStaff({'usercode': usercode}))
  }

  componentWillReceiveProps(nextProps){
    if(this.props.staffResponse != nextProps.staffResponse){
        // console.log(nextProps.staffResponse)
    }
  }

  handleLogout(){
    confirm({
      title: '提示',
      content: '确认退出登录吗？',
      onOk(){
        sessionStorage.removeItem('usercode')
        sessionStorage.removeItem('userpwd')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userid')
        sessionStorage.removeItem('divisionid')
        sessionStorage.removeItem('userinfo')
        sessionStorage.removeItem('tabList')
        hashHistory.push('/login')
      }
    })
  }

  render() {
    let staff = this.state.staff
    if(this.props.staffResponse && this.props.staffResponse.data && this.props.staffResponse.data.data){
      // es6的语法更新对象
      Object.assign(staff, this.props.staffResponse.data.data)
      sessionStorage.setItem('userid', this.props.staffResponse.data.data.usertable.id)
      sessionStorage.setItem('divisionid', this.props.staffResponse.data.data.usertable.gxdwdm)
      sessionStorage.setItem('userinfo', JSON.stringify(this.props.staffResponse.data.data.usertable))
    }
    const menu = (
      <Menu className="nav-dropmenu">
        <Menu.Item key="0">
          <label>所属单位</label><span>{staff.usertable.gxdwqc}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <label>用户姓名</label><span>{staff.usertable.username}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <label>用户职务</label><span>{staff.usertable.post}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <label>手机号码</label><span>{staff.usertable.longmobile}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <label>虚拟短号</label><span>{staff.usertable.shortmobile}</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Button type="primary" size="small" onClick={this.handleLogout}>退出登录</Button>
        </Menu.Item>
      </Menu>
    )
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <Link to={`/`} className="navbar-brand">
              <div className="brand-title">
                <span className="brand-text">宿迁市</span>
              </div>
            </Link>

          </div>

          <div className="navbar-content clearfix">

            <ul className="nav navbar-top-links pull-right">
              <li className="login-info">
                <a>在线人数 {staff.onlineCount}</a>
              </li>
              <li className="login-info">
                <a>月访问量 {staff.monthCount}</a>
              </li>
              <li className="login-info">
                <a>用户手册</a>
              </li>
              <li className="login-info">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link">{staff.usertable.username}</a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
