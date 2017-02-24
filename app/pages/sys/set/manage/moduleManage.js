/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Button } from 'antd'
import {
  fetchModuleList,
  fetchModuleDelete,
  fetchModuleDetail,
} from 'actions/setmodule'
import ModuleList from './manageType/moduleList'
import ModuleModal from './modal/moduleAdd'
import '../style.css'

message.config({
  top: '40%',
})

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    moduleListResult: state.moduleListResult,
    moduleDetailResult: state.moduleDetailResult,
  })
)

// 声明组件  并对外输出
export default class userManage extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      title: '新增菜单',
      pid: '',
      itemId: '',
      type: '',
      values: {
        id: '',
        key: '',
        module: '',
        name: '',
        sort: '',
        type: '',
      },
      Visible: false,
      list: [
        {
          key: 1,
          menuname: '基础信息',
          children: [{
            key: 11,
            menuname: '治安情况',
          },
          {
            key: 12,
            menuname: '实有地址',
            children: [{
              key: 121,
              menuname: '楼幢信息',
              children: [{
                key: 125,
                menuname: '楼幢人员信息',
                children: [{
                  key: 126,
                  menuname: '楼幢人员访查',
                }],
              }],
            }],
          },
          {
            key: 13,
            menuname: '实有人口',
            children: [{
              key: 131,
              menuname: '三实访查人口',
              children: [{
                key: 1311,
                menuname: '新增访查人口',
              },
              {
                key: 1312,
                menuname: '新增境外人员',
              }],
            }],
          }],
        },
        {
          key: 2,
          menuname: '主页设置',
        },
      ],
    }
    this.moduleAdd = this.moduleAdd.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleModify = this.handleModify.bind(this)
    this.handleAddNode = this.handleAddNode.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchModuleList())
  }

  // 删除模块
  handleDelete(id) {
    this.props.dispatch(fetchModuleDelete({ id: id }, (result) => {
      this.props.dispatch(fetchModuleList())
    }))
  }

  // 修改模块
  handleModify(id, parentid) {
    this.props.dispatch(fetchModuleDetail({ id: id }, (result) => {
      this.setState({ Visible: true, title: '修改菜单', pid: parentid, itemId: id, type: 'modify' })
    }))
  }

  // 新增模块
  moduleAdd() {
    this.setState({ Visible: true, title: '新增菜单', pid: '', type: 'add' })
  }

  // 新增模块子菜单
  handleAddNode(id) {
    this.setState({ Visible: true, title: '新增子菜单', pid: id, type: 'add' })
  }

  // form 表单保存后调用
  handleOk() {
    this.setState({ Visible: false })
    this.props.dispatch(fetchModuleList())
  }

  handleCancel() {
    this.setState({ Visible: false, type: 'add' })
  }

  render() {
    const {
      moduleListResult,
      moduleDetailResult,
    } = this.props
    const thevalue = this.state.type == 'modify' ? moduleDetailResult : this.state.values
    return (
      <div className="main">
        <div className="list-tab main">
          <ModuleList
            dataSource={moduleListResult.list}
            loading={moduleListResult.loading}
            scroll={{ y: global.$GLOBALCONFIG.PAGEHEIGHT - 165 }}
            onDelete={this.handleDelete}
            onModify={this.handleModify}
            onAddNode={this.handleAddNode}
          />
        </div>
        <div className="ability-button">
          <Button onClick={this.moduleAdd} > 新增模块</Button>
        </div>
        {
          this.state.Visible ?
            <ModuleModal
              handleOk={this.handleOk}
              visible={this.state.Visible}
              title={this.state.title}
              pid={this.state.pid}
              itemId={this.state.itemId}
              values={thevalue}
              type={this.state.type}
              onCancel={this.handleCancel}
            />
          : null
        }
      </div>
    )
  }
}
