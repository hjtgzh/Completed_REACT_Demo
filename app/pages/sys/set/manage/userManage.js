/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, notification, Button, Popconfirm, Form, Input, message } from 'antd'
import TableList from 'components/tableList/tableList'
import {
    fetchUserDepttList,
    fetchUserList,
    fetchUserDetail,
    fetchUserDelete,
    fetchUserRoleList,
} from 'actions/manage'
import TreeList from './manageType/treeList'
import PoliceAddModal from './modal/policeAdd'
import RoleSelect from './modal/roleSelect'
import '../style.css'

const FormItem = Form.Item

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    userDeptResult: state.userDeptResult,
    userListResult: state.userListResult,
    userDetailResult: state.userDetailResult,
    userRoleSetResult: state.userRoleSetResult,
  })
)
@Form.create({})
// 声明组件  并对外输出
export default class userManage extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      deptid: '',
      keyword: '',
      searchtitle: '',
      PoliceAddVisible: false,
      RoleVisible: false,
      spinloading: true,
      currentPage: 1,
      pageSize: 10,
      moduletitle: '',
      moduletype: '',
      currPeopleId: '',
      hasList: false,
    }
    this.onSelect = this.onSelect.bind(this)
    this.policeAdd = this.policeAdd.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUserInfo = this.handleUserInfo.bind(this)
    this.handleUserRole = this.handleUserRole.bind(this)
    this.handleOkRole = this.handleOkRole.bind(this)
    this.handleCancelRole = this.handleCancelRole.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.pageChange=this.pageChange.bind(this)
    this.pageSizeChange=this.pageSizeChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchUserRoleList())
    this.props.dispatch(fetchUserDepttList('', () => {
      this.setState({ spinloading: false })
    }))
  }

  // 删除用户
  handleDelete(id) {
    if (sessionStorage.getItem('userid') == id) {
      message.error('自己不能删除自己');
      return;
    }
    const curUserListResult = this.props.userListResult
    let curpage = this.state.currentPage;
    this.props.dispatch(fetchUserDelete({ deptcode: this.state.deptid, id: id }, () => {
      if (curUserListResult.totalPage > 1 && curUserListResult.totalCount % 10 == 1) {
        curpage = curpage - 1;
      }
      this.props.dispatch(fetchUserList({
        policedeptid: this.state.deptid,
        currentPage: curpage,
        pageSize: this.state.pageSize,
        keyword: this.state.keyword,
      }, () => {
        this.setState({
          currentPage: curpage,
        })
      }))
    }))
  }

  // 点击人员详情
  handleUserInfo(id) {
    this.props.dispatch(fetchUserDetail({ id: id }, () => {
      this.setState({
        PoliceAddVisible: true,
        moduletype: 'edit',
        moduletitle: '警员详情',
        currPeopleId: id,
      })
    }))
  }

  // 点击人员角色
  handleUserRole(id) {
    this.props.dispatch(fetchUserDetail({ id: id }, () => {
      this.setState({
        RoleVisible: true,
        currPeopleId: id,
      })
    }))
  }

  // 搜索
  handleSearch() {
    const keyword = this.props.form.getFieldValue('key')
    this.props.dispatch(fetchUserList({
      policedeptid: this.state.deptid,
      keyword: keyword,
      currentPage: 1,
      pageSize: this.state.pageSize,
    }, () => {
      this.setState({
        currentPage: 1,
        keyword: keyword,
      })
    }))
  }

  // 点击树节点的时候获取 当前部门 deptid
  onSelect(info, title) {
    if (info) {
      this.props.dispatch(fetchUserList({
        policedeptid: info,
        currentPage: 1,
        pageSize: this.state.pageSize,
      }, () => {
        this.setState({
          deptid: info,
          searchtitle: title,
          hasList: true,
          currentPage: 1,
          keyword: '',
        })
      }))
      this.props.form.setFieldsValue({ 'key': '' })
    }
  }

  // 点击新增人员的时候判断部门 deptid  是否存在，有则弹窗新增
  policeAdd() {
    if (this.state.deptid) {
      this.setState({
        PoliceAddVisible: true,
        moduletype: 'add',
        moduletitle: '新增警员',
      })
    } else {
      notification.error({
        message: '错误',
        description: '请先选择部门',
      });
    }
  }

  // form 表单保存后调用
  handleOk() {
    const curUserListResult = this.props.userListResult
    let curpage = this.state.currentPage
    if (this.state.moduletype == 'add' && curUserListResult.totalCount % 10 == 0) {
      curpage = curpage + 1;
    }
    this.props.dispatch(fetchUserList({
      policedeptid: this.state.deptid,
      currentPage: curpage,
      pageSize: this.state.pageSize,
      keyword: this.state.keyword }, () => {
      this.setState({
        currentPage: curpage,
        PoliceAddVisible: false,
      })
    }))
  }

  // 新增用户modal取消
  handleCancel() {
    this.setState({ PoliceAddVisible: false })
  }

  // 角色弹窗确认事件
  handleOkRole() {
    this.setState({ RoleVisible: false })
    this.props.dispatch(fetchUserList({
      policedeptid: this.state.deptid,
      keyword: this.state.keyword,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
    }))
  }

  // 角色弹窗取消事件
  handleCancelRole() {
    this.setState({ RoleVisible: false })
  }

  // 页数改变事件
  pageChange(newPage) {
    // this只想改变需要bind一下
    this.props.dispatch(fetchUserList({
      currentPage: newPage,
      pageSize: this.state.pageSize,
      policedeptid: this.state.deptid,
      keyword: this.state.keyword,
    }, () => {
      this.setState({
        currentPage: newPage,
      })
    }))
  }

  // 页大小改变事件
  pageSizeChange(e, pageSize) {
    this.props.dispatch(fetchUserList({
      currentPage: 1,
      pageSize: pageSize,
      policedeptid: this.state.deptid,
      keyword: this.state.keyword,
    }, () => {
      this.setState({
        pageSize: pageSize,
        currentPage: 1,
      })
    }))
  }

  render() {
    const _self = this
    const {
      userDeptResult,
      userListResult,
      userDetailResult,
      userRoleSetResult,
    } = this.props
    const { getFieldDecorator } = this.props.form
    const thevalue = this.state.moduletype == 'add' ? '' : userDetailResult
      // 表格展示项的配置
    const columns = [
      {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
        width: 250,
      },
      {
        title: '职务',
        dataIndex: 'post',
        key: 'post',
        width: 250,
      },
      {
        title: '帐号',
        dataIndex: 'usercode',
        key: 'usercode',
        width: 200,
      },
      {
        title: '角色',
        dataIndex: 'rolename',
        key: 'rolename',
        width: 200,
        render: function (text, record, index) {
          if (text) {
            return (
              <span className="roletext" onClick={()=>_self.handleUserRole( record.id)} key={index}>
                {text}
              </span>
            )
          } else {
            return (
              <span
                className="roletext"
                onClick={()=>_self.handleUserRole(record.id)}
                key={index}
              >添加角色</span>
            )
          }
        },
      },
      {
        title: '操作',
        key: 'operate',
        width: 120,
        render: function (text, record, index) {
          return (
            <span className="a-jxy">
              <Popconfirm title="删除?" onConfirm={()=>_self.handleDelete(record.id)}>
                <a>删除</a>
              </Popconfirm>
              <span className="ant-divider" />
              <a onClick={()=>_self.handleUserInfo(record.id)}>详情</a>
            </span>
          )
        },
      },
    ]
    return (
      <div className="usermanage-jxy flex-column">
        <Spin spinning={this.state.spinloading}>
          <div className="treeside" style={{ height: global.$GLOBALCONFIG.PAGEHEIGHT - 95 }}>
            <TreeList
              trees={userDeptResult.list}
              onSelect={this.onSelect}
            />
          </div>
          <div className="userset-jxy">
            <div className="search-jxy">
              <FormItem style={{ marginBottom: 0 }}>
                <span>{
                  this.state.hasList ?
                    (this.state.searchtitle + (userListResult.totalCount ? userListResult.totalCount : 0) + '人')
                  : null
                } </span>
                {getFieldDecorator('key')(
                  <Input />
                )}
                <Button type="primary" onClick={this.handleSearch}>搜索</Button>
              </FormItem>
            </div>
            <Button type="primary" size="large" onClick={this.policeAdd} className="maTop-jxy abtopright-jxy"> 新增人员
            </Button>
            <TableList
              columns={columns}
              dataSource={userListResult.list}
              currentPage={this.state.currentPage}
              pageSize={this.state.pageSize}
              loading={userListResult.loading}
              scroll={{ y: true }}
              onChange={this.pageChange}
              onShowSizeChange={this.pageSizeChange}
              totalCount={userListResult.totalCount}
            />
            <div className="ability-button"></div>
          </div>
        </Spin>
        {
          this.state.PoliceAddVisible ?
            <PoliceAddModal
              visible={this.state.PoliceAddVisible}
              title={this.state.moduletitle}
              handleOk={this.handleOk}
              values={thevalue}
              deptId={this.state.deptid}
              currPeopleId={this.state.currPeopleId}
              type={this.state.moduletype}
              onCancel={this.handleCancel}
            />
          : null
        }
        {
          this.state.RoleVisible ?
            <RoleSelect
              visible={this.state.RoleVisible}
              handleOkRole={this.handleOkRole}
              values={userDetailResult}
              currPeopleId={this.state.currPeopleId}
              select={userRoleSetResult.list}
              onCancel={this.handleCancelRole}
            />
          : null
        }
      </div>
    )
  }
}
