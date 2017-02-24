import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs } from 'antd'
import Panel from 'components/panel'




// 声明组件  并对外输出
export default class roomDetails extends Component {


    render() {
        const {
            houseCheckSearchQuery,
            houseCheckSearchResult,
            hasSubmitBtn,
            hasResetBtn,
        } = this.props

        return (
            <Panel>
                punish
            </Panel>
        )
    }
}
