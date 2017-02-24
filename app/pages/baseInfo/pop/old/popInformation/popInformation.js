import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Spin } from 'antd'
// import Panel from 'components/panel'

import { updateTabList } from 'actions/tabList'
import { POPINFORMATION_SUB_MENUS } from 'utils/config'

import Register from './poptables/register'
import OnceRegister from './poptables/onceRegister'
import StyleRegister from './poptables/styleRegister'
import CardHolder from './poptables/cardHolder'
import SocialDeclaration from './poptables/socialDeclaration'

const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
        config: state.config,
    })
)

// 声明组件  并对外输出
export default class popInformation extends Component {
    // 初始化页面常量 绑定事件方法
    constructor(props) {
        super(props)
        this.state = {
            activeSub: 'register'
        }
        this._getTabMenus = this._getTabMenus.bind(this)//绑定作用域
    }

    // 组件已经加载到dom中
    componentDidMount() {

    }

    _getTabMenus(){
        const menu = []
        // 这里没有遍历整个菜单列表是考虑到可能的权限
        menu.push(POPINFORMATION_SUB_MENUS[0])
        menu.push(POPINFORMATION_SUB_MENUS[1])
        menu.push(POPINFORMATION_SUB_MENUS[2])
        menu.push(POPINFORMATION_SUB_MENUS[3])
        menu.push(POPINFORMATION_SUB_MENUS[4])
        return menu
    }
    _tabChange = (key) => {
        this.setState({ activeSub: key })
    }


    render() {
        let { loading } = this.props.houseDetailResult || false
        if(loading == 'undefined'){
            loading = false
        }
        // debugger
        const { dispatch } = this.props
        const houseId = this.props.houseId || this.props.params.houseId || 1
        const templateConfig = {
            register: (<Register houseId={1} />),
            onceRegister: (<OnceRegister houseId={1} />),
            styleRegister: (<StyleRegister houseId={1} />),
            cardHolder: (<CardHolder houseId={1} />),
            socialDeclaration: (<SocialDeclaration houseId={1} />),
        }

        // console.log(this.state.activeSub);

        return (
            <div>
                <Spin spinning={ false }>
                    <Tabs defaultActiveKey="register" tabPosition="top" onChange={this._tabChange}>
                        {
                            this._getTabMenus().map((sub) => (
                                <TabPane tab={sub.name} key={sub.url}>
                                  
                                </TabPane>
                            ))
                        }
                    </Tabs>
                    <div >
                        {templateConfig[this.state.activeSub]}
                    </div>
                </Spin>
            </div>
        )
    }
}
