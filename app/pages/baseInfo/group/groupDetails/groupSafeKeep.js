/**
 * Created by 叶婷婷
 * 语法检查：8 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button } from 'antd'
import moment from 'moment'
import TableList from 'components/tableList/tableList'
import {
  // 获取安全防范列表
  fetchSafeKeepList,
  // 删除安全防范数据
  fetchDeleteSafeKeep,
} from 'actions/houseVisitPop'
import AddSafeKeepModal from '../groupModal/addSafeKeepModal'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 安全防范列表数据
    safeKeepListSearchResult: state.safeKeepListSearchResult,
  })
)

// 声明组件  并对外输出
export default class index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      addSafeKeepModalVisible: false,  // 判断是否显示新增/修改窗口
    };
    this.regular = {
      departmentId: this.props.departmentId || this.props.params.departmentId || 1,
    };
    this.changefield = {
      addOrUpdate: '',  // 修改还是新增
      updateId: '',  // 需要修改的数据id
    };

    // 显示新增窗口
    this.visibleAddSafeKeepModal = this.visibleAddSafeKeepModal.bind(this);
    // 显示修改窗口
    this.visibleUpdateSafeKeepModal = this.visibleUpdateSafeKeepModal.bind(this);
    // 隐藏新增/修改窗口
    this.cancelAddSafeKeepModal = this.cancelAddSafeKeepModal.bind(this);
    // 保存安全防范数据
    this.okAddSafeKeepModal = this.okAddSafeKeepModal.bind(this);
    // 删除安全防范数据
    this.handleDelete = this.handleDelete.bind(this)
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.departmentId != this.props.departmentId) {
      this.regular.departmentId = nextProps.departmentId;
      this.getSafeKeepList();
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.getSafeKeepList();
  }

  // 表格展示项的配置
  columns() {
    const self = this;
    return [
      {
        title: '设施名称',
        dataIndex: 'ssmc',
        key: 'ssmc',
        width: '20%',
        render: function (text, record) {
          return (
            <span>{text}
              <a className="right" onClick={() => self.visibleUpdateSafeKeepModal(`${record.id}`)}>详情</a>
            </span>
          )
        },
      },
      {
        title: '设施种类',
        dataIndex: 'sszl',
        key: 'sszl',
        width: '20%',
        render: function (text, record) {
          if (record.sszl == '1') {
            return '视频监控';
          } else if (record.sszl == '2') {
            return '入侵报警';
          } else if (record.sszl == '3') {
            return '紧急报警';
          } else if (record.sszl == '4') {
            return '实时录音';
          } else if (record.sszl == '5') {
            return '物防设施';
          }
        },
      },
      {
        title: '设施型号',
        dataIndex: 'xh',
        key: 'xh',
        width: '15%',
      },
      {
        title: '设施数量',
        dataIndex: 'sl',
        key: 'sl',
        width: '15%',
      },
      {
        title: '安装时间',
        dataIndex: 'azsjStr',
        key: 'azsjStr',
        width: '20%',
        render: function (text, record) {
          return (record.azsj ? moment(record.azsj).format('YYYY-MM-DD') : '')
        },
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        width: '10%',
        render: function (text, record) {
          return (
            <Popconfirm
              title="是否删除?"
              placement="topRight"
              onConfirm={() => self.handleDelete(`${record.id}`)}
            >
              <a>删除</a>
            </Popconfirm>
          )
        },
      },
    ]
  }

  // 获取安全防范列表
  getSafeKeepList() {
    this.props.dispatch(fetchSafeKeepList({ dptId: this.regular.departmentId }))
  }

  // 显示安全防范--新增
  visibleAddSafeKeepModal() {
    this.changefield.addOrUpdate = 'add';
    this.setState({
      addSafeKeepModalVisible: true,
    })
  }

  // 显示安全防范--修改
  visibleUpdateSafeKeepModal(id) {
    this.changefield.addOrUpdate = 'update';
    this.changefield.updateId = id;
    this.setState({
      addSafeKeepModalVisible: true,
    })
  }

  // 删除安全防范数据
  handleDelete(id) {
    this.props.dispatch(fetchDeleteSafeKeep({ id: id }, () => {
      this.getSafeKeepList();
    }))
  }

  // 取消新增/修改窗口
  cancelAddSafeKeepModal() {
    this.setState({ addSafeKeepModalVisible: false })
  }

  // 保存新增、修改
  okAddSafeKeepModal() {
    this.setState({ addSafeKeepModalVisible: false })
    this.getSafeKeepList();
  }

  render() {
    const {
      safeKeepListSearchResult,
      } = this.props
    const loading = safeKeepListSearchResult.loading ? true : safeKeepListSearchResult.loading;
    return (
      <div className="nav-second-nextContent maTop-jxy ">
        <div className="detail-content">
          <TableList
            columns={this.columns()}
            dataSource={safeKeepListSearchResult.list}
            loading={loading}
            scroll={{ y: true }}
          />
          <div className="ability-button">
            <Button type="button" onClick={this.visibleAddSafeKeepModal}>新增安全防范</Button>
          </div>
          {
            this.state.addSafeKeepModalVisible ?
              <AddSafeKeepModal
                title={this.changefield.addOrUpdate == 'add' ? '组织机构信息采集' : '修改组织机构信息'}
                state={this.changefield.addOrUpdate}
                visible={this.state.addSafeKeepModalVisible}
                cancle={this.cancelAddSafeKeepModal}
                handleOk={this.okAddSafeKeepModal}
                updateId={this.changefield.updateId}
                dptId={this.regular.departmentId}
              /> : null
          }
        </div>
      </div>
    )
  }
}
