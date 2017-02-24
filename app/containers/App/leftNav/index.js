import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { Menu, Icon, Spin } from 'antd'
import { fetchNav } from 'actions/common'
import { menuIcon } from './../../../utils/config'
import { updateTabList } from '../../../actions/tabList'

const SubMenu = Menu.SubMenu

@connect(
    (state, props) => ({ 
      config: state.config,
      navResult: state.navResult
    }),
    (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch), dispatch: dispatch })
)
export default class LeftNav extends Component {
  constructor(props, context) {
    super(props, context)

    const { pathname } = props.location
    this.state = {
      current: pathname,
      openKeys: ['sub1'],
    }
    this._handleClick = this._handleClick.bind(this)
    this._handleToggle = this._handleToggle.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchNav())
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.navResult && nextProps.navResult.data && nextProps.navResult.data.data){
      // console.log(nextProps.navResult)
      const g = global.$GLOBALCONFIG
      g.NAVIGATION = nextProps.navResult.data.data
    }
  }

  _handleClick(e) {
    const { actions } = this.props
    console.log('click ', e)
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1),
    }, () => {
      actions.push(e.key)
      this.props.dispatch(updateTabList({ title: e.item.props.name, content: '', key: e.key }))
    })
  }

  _handleToggle(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    const { loading } = this.props.navResult
    // console.log('this.props.location', this.props.location)
    const selectedKeys = [`${this.props.location.pathname.split("$")[0]}$`]
    // console.log([`${this.props.location.pathname.split("$")[0]}$`])
    return (
      
      <nav id="mainnav-container">
        <Spin spinning={ loading }>
          <Menu onClick={this._handleClick}
            theme="dark"
            openKeys={this.state.openKeys}
            onOpenChange={this._handleToggle}
            // selectedKeys={[`${this.props.location.pathname}`]}
            selectedKeys={selectedKeys}
            mode="inline" >
            {
              this.props.config.NAVIGATION.map((subMenu, index) => (
                <SubMenu key={index} title={
                  <span>
                    <Icon type={menuIcon[subMenu.name]} />
                    <span>{subMenu.name}</span>
                  </span>}>
                  {
                    subMenu.children.map((menu) => (
                      <Menu.Item key={`/${menu.url}`}
                        name={menu.name}
                      >{menu.name}</Menu.Item>
                    ))
                  }
                </SubMenu>
              ))
            }
          </Menu>
        </Spin>
      </nav>
      
    )
  }
}
