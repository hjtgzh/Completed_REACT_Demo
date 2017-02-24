/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Form, Table, Button, Popconfirm } from 'antd'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import {
  fetchTaskList,
  fetchTaskDelete,
} from 'actions/task'
import AddTask from './modal/addTask'

@Form.create({
  /* onFieldsChange(props, items) {
   console.log(props)
   console.log(items)
   // props.cacheSearch(items);
   },*/
})
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    taskListSearchResult: state.taskListSearchResult,

  })
)

// 声明组件  并对外输出
export default class task extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      addTaskvisible: false,
      taskId: '',

    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleShowAddTask = this.handleShowAddTask.bind(this)
    this.handleokAddTask = this.handleokAddTask.bind(this)
    this.handleCancelAddTask = this.handleCancelAddTask.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchTaskList())
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '工作任务',
        key: '/task$',
      }))
    }
  }

  columns() {
    const _slef = this
    return [
      {
        title: '序号',
        key: 'index',
        width: '5%',
        render: function (text, record, index) {
          return (
            <span>{index + 1}</span>
          )
        },
      },
      {
        title: '任务名称',
        dataIndex: 'taskname',
        key: 'taskname',
        width: '15%',
      },
      {
        title: '起始时间',
        dataIndex: 'startdate',
        key: 'startdate',
        width: '10%',
      },
      {
        title: '结束时间',
        dataIndex: 'enddate',
        key: 'enddate',
        width: '10%',
      },
      {
        title: '完成情况',
        dataIndex: 'isfinish',
        key: 'isfinish',
        width: '20%',
      },
      {
        title: '有效性',
        dataIndex: 'yxx',
        key: 'yxx',
        width: '10%',
      },
      {
        title: '操作',
        key: 'action',
        width: '8%',
        render: function (text, record, index) {
          return (
            <div>
              <Link to={`/task$Detail/${record.id}`}>详情</Link>
              <Popconfirm title="是否删除" placement="left" onConfirm={_slef.handleDelete(record.id)}>
                <a>删除</a>
              </Popconfirm>
            </div>
          )
        },
      },
    ]
  }

  // 删除任务
  handleDelete(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchTaskDelete({ id: id }, (result) => {
        const currentPage = self.state.currentPage
        const pageSize = self.state.pageSize
        self.props.dispatch(fetchTaskList({ currentPage: currentPage, pageSize: pageSize }))
      }))
    }
  }

  handleShowAddTask() { // 点击显示新增任务弹框
    this.setState({
      addTaskvisible: true,
    })
  }

  handleokAddTask() {
    this.setState({ addTaskvisible: false })
    this.props.dispatch(fetchTaskList())
  }

  handleCancelAddTask() {
    this.setState({
      addTaskvisible: false,
    })
  }

  render() {
    const { taskListSearchResult } = this.props
    // console.log(taskListSearchResult)
    return (
      <Panel className="panel-margTop">
        <div className="nav-first-nextContent">
          <div className="detail-content">
            <Table
              columns={this.columns()}
              dataSource={taskListSearchResult.data}
              pagination={false}
              scroll={{ y: true }}
            />
          </div>
          <div className="ability-button">
            <Button type="button" onClick={this.handleShowAddTask}>新增任务</Button>
          </div>
          {
            this.state.addTaskvisible ?
              <AddTask
                visible
                handleOk={this.handleokAddTask}
                onCancel={this.handleCancelAddTask}
              /> : null
          }
        </div>
      </Panel>
    )
  }
}
