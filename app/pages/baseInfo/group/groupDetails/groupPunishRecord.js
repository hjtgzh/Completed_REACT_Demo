/**
 * Created by 余金彪 on 2016/12/14.处罚记录
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Button, Table, Popconfirm, message} from 'antd'
import GroupPunishRecordModal from './groupPunishRecordModal/groupPunishRecordModal'
import GroupPunishRecordDetail from './groupPunishRecordModal/groupPunishRecordDetail'
import {
  fetchCheckRecordInfo,
  fetchInsertCheckRecordInfo,
  fetchQueryCfjlDetail,
  fetchDeleteCfjlDetail,
} from 'actions/groupPunishRecord'
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class GroupPunishRecord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      punishModal: false,
      punushDetail: false,
      lodaing: false,
      id: '',
      list: [],
      detailValue: {},
      loading: true,
    }
    this.groupPunishRecord = this.groupPunishRecord.bind(this)
    this.showModal = this.showModal.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.showDetailModal = this.showDetailModal.bind(this)
    this.hideDetailModal = this.hideDetailModal.bind(this)
    this.onOk = this.onOk.bind(this)
    this.onRecordOk = this.onRecordOk.bind(this)
    this.deletedPunish = this.deletedPunish.bind(this)
  }

  componentDidMount() {
  this.searchDtails()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!=this.props.departmentId){
      this.searchDtails(nextProps.departmentId)
    }
  }

  searchDtails(id) {
    const departmentId = id||this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchCheckRecordInfo({dptId: departmentId}, (result)=> {
      if (result.data.list) {
        this.setState({
          list: result.data.list,
          loading: false
        })
      }
    }))
  }

  //获取检查记录详情
  groupPunishRecord(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchQueryCfjlDetail({id: id}, (result)=> {
        if (result.data) {
          self.setState({punushDetail: true, id: id, detailValue: result.data})
        }
      }))
    }
  }

  showDetailModal() {
    this.setState({
      punushDetail: true
    })
  }

  hideDetailModal() {
    this.setState({
      punushDetail: false
    })
  }

  onRecordOk() {
    this.setState({
      punushDetail: false
    })
    this.searchDtails()
  }

  showModal() {
    this.setState({
      punishModal: true
    })
  }

  onCancel() {
    this.setState({
      punishModal: false
    })
  }

  onOk() {
    this.setState({
      punishModal: false
    })
    this.searchDtails()
  }

  //删除检查记录
  deletedPunish(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchDeleteCfjlDetail({id: id}, (result)=> {
        message.success(result.msg)
        self.onOk()
      }))
    }
  }

  render() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const self = this
    const columns = [
      {
        title: '案件编号',
        dataIndex: 'ajjlbh',
        key: 'ajjlbh',
      },
      {
        title: '处罚时间',
        dataIndex: 'cfrqStr',
        key: 'cfrqStr',
      },
      {
        title: '处罚原因',
        dataIndex: 'cfyy',
        key: 'cfyy',
      },
      {
        title: '承办民警',
        dataIndex: 'cbmj',
        key: 'cbmj',
      },
      {
        title: '处罚措施',
        dataIndex: 'cfcs',
        key: 'cfcs',
      },
      {
        title: '详细内容',
        dataIndex: 'detail',
        key: 'detail',
        render: function (text, record, index) {
          return (
            <span>
            <a className="left" onClick={ self.groupPunishRecord(record.id) }>详情</a>
               <Popconfirm
                 title="是否删除"
                 placement="left"
                 onConfirm={self.deletedPunish(record.id)}
               >
                <a className="right">删除</a>
              </Popconfirm>
            </span>
          );
        }
      },

    ];
    return (
      <div className="nav-second-nextContent maTop-jxy ">
        <div className="detail-content">
          <Table
            columns={columns}
            bordered
            dataSource={this.state.list}
            pagination={false}
            loading={this.state.loading}
          />
          <div className="ability-button">
            <Button className='' onClick={this.showModal}>新增处罚记录</Button>
          </div>
          {
            <GroupPunishRecordModal
              visible={this.state.punishModal}
              showModal={this.showModal}
              onCancel={this.onCancel}
              onOk={this.onOk}
              dptId={departmentId}
            />
          }
          {
            this.state.punushDetail ?
              <GroupPunishRecordDetail
                visible={this.state.punushDetail}
                showDetailModal={this.showDetailModal}
                onCancel={this.hideDetailModal}
                id={this.state.id}
                detailValue={this.state.detailValue}
                onOk={this.onRecordOk}
                dptId={departmentId}
              />
              : null
          }
        </div>
      </div>
    )
  }
}

