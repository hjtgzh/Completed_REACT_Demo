/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, Button, Popconfirm, Tabs, Form, Input } from 'antd'
import TableList from 'components/tableList/tableList'
import {
  fetchRoleList,
  fetchRoleDetail,
  fetchRoleDelete,
  fetchModuleListInRole,
  fetchRloeRes,
  fetchUpdateRloeRes,
  fetchRolePeople,
  fetchRoleDeletePeople,
} from 'actions/setrole'
import RolesList from './manageType/roleListt'
import RolesModule from './manageType/roleModuleList'
import RoleEditModal from './modal/roleAdd'
import '../style.css'

const FormItem = Form.Item
const TabPane = Tabs.TabPane;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    roleListResult: state.roleListResult,
    roleDetailManagResult: state.roleDetailManagResult,
    roleModuleListInRoleResult: state.roleModuleListInRoleResult,
    rloeResResult: state.rloeResResult,
    rolePeopleResult: state.rolePeopleResult,
  })
)

@Form.create({})

// 声明组件  并对外输出
export default class userManage extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'setmodules',
      Visible: false,
      title: '',
      type: '',
      currRoleId: '',
      modifyId: '',
      isReload: true,
      currentPage: 1,
      pageSize: 10,
      spinloading: true,
      tabsloading: false,
    }
    this.roleAdd = this.roleAdd.bind(this)
    this.onRoleModify = this.onRoleModify.bind(this)
    this.handleRoleDelete = this.handleRoleDelete.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCurrentIndex = this.handleCurrentIndex.bind(this)
    this.handleChenckModify = this.handleChenckModify.bind(this)
    this.editSave = this.editSave.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this._typeChange = this._typeChange.bind(this)
    this.pageChange=this.pageChange.bind(this)
    this.pageSizeChange=this.pageSizeChange.bind(this)
    this.resultCkecked = ''
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchModuleListInRole())
    this.props.dispatch(fetchRoleList('', (result) => {
      const roleId = this.props.roleListResult.list[0].id
      this.props.dispatch(fetchRloeRes({ roleid: roleId }))
      this.props.dispatch(fetchRolePeople({ roleid: roleId }))
      this.setState({ currRoleId: roleId, spinloading: false })
    }))
  }

  componentWillMount() {
    if ($GLOBALCONFIG.tabCache['/set/role']) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache['/set/role'].val })
    }
  }

  // 点击角色name后执行的操作
  handleCurrentIndex(id) {
    this.setState({ tabsloading: true })
    this.props.dispatch(fetchRloeRes({ roleid: id }, (result) => {
      this.setState({ currRoleId: id, isReload: false, tabsloading: false })
    }))
    this.props.dispatch(fetchRolePeople({ roleid: id }, (result) => {
      this.setState({ currRoleId: id })
    }))
  }

  handleChenckModify(valus) {
    this.resultCkecked = valus
  }

  // 修改保存
  editSave() {
    this.props.dispatch(fetchUpdateRloeRes({
      id: this.state.currRoleId,
      resourceIds: this.resultCkecked,
    }))
  }

  // 角色添加
  roleAdd() {
    this.setState({ Visible: true, title: '新增角色', type: 'add' })
  }

  // 角色修改时执行的操作
  onRoleModify(id) {
    this.props.dispatch(fetchRoleDetail({ id: id }, (result) => {
      this.setState({ Visible: true, title: '修改角色', type: 'modify', modifyId: id })
    }))
  }

  // 角色删除事件
  handleRoleDelete(id) {
    this.props.dispatch(fetchRoleDelete({ id: id }, (result) => {
      this.props.dispatch(fetchRoleList())
    }))
  }

  // 删除人
  handleDelete(id) {
    this.props.dispatch(fetchRoleDeletePeople({ id: id }, (result) => {
      this.props.dispatch(fetchRolePeople({ roleid: this.state.currRoleId }))
    }))
  }

  // 搜索
  handleSearch() {
    const keyword = this.props.form.getFieldValue('key')
    if (keyword) {
      this.props.dispatch(fetchRolePeople({
        roleid: this.state.currRoleId,
        keyword: keyword,
      }))
    }
  }

  // form 表单保存后调用
  handleOk() {
    this.setState({ Visible: false })
    this.props.dispatch(fetchRoleList())
  }

  // Modal取消
  handleCancel() {
    this.setState({ Visible: false })
  }

  // 页数改变
  pageChange(newPage) {
    this.setState({
      currentPage: newPage,
    })
    // this只想改变需要bind一下
    this.props.dispatch(fetchRolePeople({
      roleid: this.state.currRoleId,
      currentPage: newPage,
      pageSize: this.state.pageSize,
    }))
  }

  // 页大小改变事件
  pageSizeChange(e, pageSize) {
    this.setState({
      pageSize: pageSize,
      currentPage: 1,
    })
    this.props.dispatch(fetchRolePeople({
      roleid: this.state.currRoleId,
      currentPage: 1,
      pageSize: pageSize,
    }))
  }

  _typeChange(key) {
    this.setState({ activeSub: key })
    const tab = { key: '/set/role', val: key }
    $GLOBALCONFIG.tabCache['/set/role'] = tab
  }

  // table column
  column(){
    const _self = this
    // 表格展示项的配置
    return [
      {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
        width: 200,
      },
      {
        title: '单位',
        dataIndex: 'gxdwqc',
        key: 'gxdwqc',
        width: 200,
      },
      {
        title: '部门',
        dataIndex: 'deptname',
        key: 'deptname',
        width: 150,
      },
      {
        title: '职位',
        dataIndex: 'post',
        key: 'post',
        width: 200,
      },
      {
        title: '账号',
        dataIndex: 'usercode',
        key: 'usercode',
        width: 150,
      },
      {
        title: '操作',
        key: 'operate',
        width: 100,
        render: function (text, record, index) {
          return (
            <span className="a-jxy">
              <Popconfirm title="删除?" onConfirm={()=>_self.handleDelete( record.id)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]
  }

  returnContent(key) {
    switch (key) {
    case 'setmodules':
      const {
        roleModuleListInRoleResult,
        rloeResResult,
      } = this.props
      return (
        <RolesModule
          dataSource={roleModuleListInRoleResult.list}
          loading={roleModuleListInRoleResult.loading}
          scroll={{ y: global.$GLOBALCONFIG.PAGEHEIGHT - 214 }}
          checkedId={rloeResResult.checkedIds}
          onChenckModify={this.handleChenckModify}
          isReload={this.state.isReload}
        />
      )
    case 'setpeoples':
      const { rolePeopleResult } = this.props
      const { getFieldDecorator } = this.props.form
      return (
        <div className="nav-third-nextContent">
          <div className="search-jxy">
            <FormItem style={{ marginBottom: 0 }}>
              {getFieldDecorator('key')(
                <Input />
              )}
              <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            </FormItem>
          </div>
          <div className="list-tab maTop-jxy">
            <TableList
              columns={this.column()}
              dataSource={rolePeopleResult.list}
              loading={rolePeopleResult.loading}
              currentPage={this.state.currentPage}
              scroll={{ y: true }}
              onChange={this.pageChange}
              onShowSizeChange={this.pageSizeChange}
              totalCount={rolePeopleResult.totalCount}
            />
          </div>
        </div>
      )
    default:
      break
    }
  }

  render() {
    const {
      roleListResult,
      roleDetailManagResult,
    } = this.props
    return (
      <Spin spinning={this.state.spinloading}>
        <div className="flex-row">
          <div className="role_list">
            <RolesList
              roles={roleListResult.list}
              handleRoleDelete={this.handleRoleDelete}
              onRoleModify={this.onRoleModify}
              onCurrentIndex={this.handleCurrentIndex}
            />
          </div>
          <div className="role_content">
            <Tabs
              className="right-nav-third"
              defaultActiveKey={this.state.activeSub}
              tabPosition="top"
              onChange={this._typeChange}
            >
              <TabPane tab="模块选择" key="setmodules" />
              <TabPane tab="警员列表" key="setpeoples" className="maTop-jxy" />
            </Tabs>
            {this.returnContent(this.state.activeSub)}
          </div>
        </div>
        <div className="ability-button">
          <Button onClick={this.roleAdd}>新增角色</Button>
          <Button onClick={this.editSave}>保存权限</Button>
        </div>
        {
          this.state.Visible ?
            <RoleEditModal
              visible={this.state.Visible}
              title={this.state.title}
              onCancel={this.handleCancel}
              handleOk={this.handleOk}
              value={this.state.type == 'modify' ? roleDetailManagResult : { name: '', sort: '' }}
              type={this.state.type}
              modifyId={this.state.modifyId}
            />
          : null
        }
      </Spin>
    )
  }
}
