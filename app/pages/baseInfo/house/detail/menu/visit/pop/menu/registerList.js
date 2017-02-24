/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Select, message, Tabs } from 'antd'
import returnIconBy from 'utils/transformToIcon'
import TableList from 'components/tableList/tableList'
import {
  fetchRegisterList,
  fetchHouseRoomVisit,
  fetchRegisterPopStatusChange,
  fetchRegisterBindRoomOrDz,
} from 'actions/houseVisitPop'
// 新增人员
import VisitableModal from '../../../../../../pop/visit/visitListModal/visitableModal'
// 新增境外人员
import ForeiModal from '../../../../../../pop/visit/visitListModal/foreignModal'
import '../popInf.css'

const Option = Select.Option
const TabPane = Tabs.TabPane

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    registerListSearchResult: state.registerListSearchResult,
  })
)


// 声明组件  并对外输出
export default class registerList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      currentpage: 1,
      pagesize: 10,
      roomId: this.props.roomId || this.props.param.roomId || 1,
      visibleForVisitablePopulation: false,
      foreignModalVisiable: false,
    }
    this.ckzkId = ''
    this.jwryId = ''
    this.showVisitableModal = this.showVisitableModal.bind(this)// 显示新增访查人员窗口
    this.handleRoomVisit = this.handleRoomVisit.bind(this)// 房间单个访查
    this.handlePopStatusChange = this.handlePopStatusChange.bind(this)// 房间人员状态改变
    this.cancelVisitableModal = this.cancelVisitableModal.bind(this)// 取消新增访查人员
    this.confirmVisitableModal = this.confirmVisitableModal.bind(this)// 确认新增访查人员
    this.visibleForForeiModal = this.visibleForForeiModal.bind(this)
    this.foreignModalOk = this.foreignModalOk.bind(this)
    this.foreignModalCancel = this.foreignModalCancel.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchRegisterList({ fjId: this.state.roomId }))
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.roomId!==this.props.roomId){
      this.props.dispatch(fetchRegisterList({ fjId: nextProps.roomId }))
    }
  }

  // 改变人员状态
  handlePopStatusChange(id, value) {
    this.props.dispatch(fetchRegisterPopStatusChange({ id: id, ryzt: value }, () => {
      message.success('保存成功', 3)
    }))
  }

  // 人员状态下拉选框
  czrklxItem() {
    return [
      { code: '0', czrklx: '' },
      { code: '1', czrklx: '人户一致' },
      { code: '2', czrklx: '人在户不在' },
      { code: '3', czrklx: '户在人不在' },
    ]
  }

  // 表格展示项的配置
  columns() {
    const self = this
    return [
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: '10%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>{text}
              <Link className="right" to={`/pop$/visitDetail/${record.id}`}>详情</Link>
            </span>
          )
        },
      },
      {
        title: '性别',
        dataIndex: 'xb',
        key: 'xb',
        width: '5%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>
              {text == 1 ? '男' : '女'}
            </span>
          )
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: '5%',
      },
      {
        title: '身份证号码（护照号码）',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width: 200,
        width: '15%',
      },
      {
        title: '户籍（国籍）',
        dataIndex: 'gj',
        key: 'gj',
        width: '10%',
      },
      {
        title: '登记状态',
        dataIndex: 'zkstr',
        key: 'zkstr',
        width: '10%',
      },
      {
        title: '人员状态',
        dataIndex: 'czrklx',
        key: 'czrklx',
        width: 200,
        width: '15%',
        render: function (text, record, index) {
          let czrklx = record.czrklx ? record.czrklx.toString() : '0'
          self.ckzkId += record.id + ','
          return (
            <Select name="czrklx" defaultValue={czrklx} onChange={()=>self.handlePopStatusChange(record.id)} style={{ width: '100%' }}>
              {self.czrklxItem().map((v, i) => <Option value={v.code} key={v.code}>{v.czrklx}</Option>)}
            </Select>
          )
        },
      },
      {
        title: '关注类别',
        dataIndex: 'zdry',
        key: 'zdry',
        width: '10%',
        render: (text, record, index) => returnIconBy('people', record.zdry),
      },
      {
        title: '操作',
        dataIndex: 'fangcha',
        key: 'fangcha',
        width: '5%',
        render: function (text, record, index) {
          return (
            <a onClick={()=>self.handleRoomVisit(record.id)}>访查</a>
          )
        },
      },
      {
        title: '访查日期',
        dataIndex: 'fcsj',
        key: 'fcsj',
        width: '15%',
      },
    ]
  }

  // 境外人员表格展示项的配置
  foreignColumns() {
    const self = this
    return [
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: '10%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>{text}
              <Link className="right" to={`/pop$/visitDetail/${record.id}`}>详情</Link>
            </span>
          )
        },
      },
      {
        title: '性别',
        dataIndex: 'xb',
        key: 'xb',
        width: '5%',
        render: function (text, record, index) {
          if (!text) {
            return
          }
          return (
            <span>
              {text == 1 ? '男' : '女'}
            </span>
          )
        },
      },
      {
        title: '出生日期',
        dataIndex: 'csrq',
        key: 'csrq',
        width: '10%',
      },
      {
        title: '证件号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width: 200,
        width: '15%',
      },
      {
        title: '户籍（国籍）',
        dataIndex: 'gj',
        key: 'gj',
        width: '10%',
      },
      {
        title: '登记状态',
        dataIndex: 'zkstr',
        key: 'zkstr',
        width: '10%',
      },
      {
        title: '人员状态',
        dataIndex: 'czrklx',
        key: 'czrklx',
        width: 200,
        width: '15%',
        render: function (text, record, index) {
          const czrklx = record.czrklx ? record.czrklx.toString() : '0'
          self.jwryId += record.id + ','
          return (
            <Select name="czrklx" defaultValue={czrklx} style={{ width: '100%' }}>
              {self.czrklxItem().map((v, i) => <Option value={v.code} key={v.code}>{v.czrklx}</Option>)}
            </Select>
          )
        },
      },
      {
        title: '关注类别',
        dataIndex: 'zdry',
        key: 'zdry',
        width: '10%',
        render: (text, record, index) => <p>{returnIconBy('department', text)}</p>,
      },
      {
        title: '操作',
        dataIndex: 'fangcha',
        key: 'fangcha',
        width: '5%',
        render: function (text, record, index) {
          return (
            <a onClick={()=>self.handleRoomVisit(record.id)}>访查</a>
          )
        },
      },
      {
        title: '访查日期',
        dataIndex: 'fcsj',
        key: 'fcsj',
        width: '15%',
      },
    ]
  }

  // 访查
  handleRoomVisit(id) {
    let visitParam = ''
    if (id == '' || id == undefined) {
      visitParam = this.ckzkId + this.jwryId
      visitParam = visitParam.substring(0, visitParam.length - 1)
    } else {
      visitParam = id
    }
    if (visitParam == '') {
      message.warning('暂不存在人员信息')
      return
    }
    this.props.dispatch(fetchHouseRoomVisit({ idList: visitParam }, (reply) => {
      message.success(reply.msg, 3)
      this.props.dispatch(fetchRegisterList({ fjId: this.state.roomId }))
    }))
  }

  // 境外人员的显隐
  visibleForForeiModal() {
    this.setState({
      foreignModalVisiable: true,
    })
  }

  // 境外人员取消
  foreignModalCancel() {
    this.setState({ foreignModalVisiable: false })
  }

  // 境外人员新增确认
  foreignModalOk() {
    this.setState({ foreignModalVisiable: false })
  }

  // 访查人口的显隐
  showVisitableModal() {
    this.setState({
      visibleForVisitablePopulation: true,
    })
  }

  // 访查人员弹框的确定和取消函数
  confirmVisitableModal(obj) {
    if (!obj.id) {
      message.error('请先查询后再添加')
      return
    }
    this.props.dispatch(fetchRegisterBindRoomOrDz({ baseid: obj.id, fjbm: this.state.roomId }, () => {
      message.success('添加访查人员成功')
      this.setState({
        visibleForVisitablePopulation: false,
      });
      this.props.dispatch(fetchRegisterList({ fjId: this.state.roomId }))
    }))
  }

  // 新增访查人口取消
  cancelVisitableModal() {
    this.setState({
      visibleForVisitablePopulation: false,
    });
  }

  render() {
    const { registerListSearchResult } = this.props
    const loading = registerListSearchResult.loading ? true : registerListSearchResult.loading;
    return (
      <div className="nav-third-nextContent">
        <div className="top_detail_ytt">
          <div className="list_detail_ytt">
            <p>
              常住 人口： 人户一致(<i>{registerListSearchResult.rhyzcount}</i>)，
              人在户不在(<i>{registerListSearchResult.hzrbzcount}</i>)，
              户在人不在(<i>{registerListSearchResult.rzhbzcount}</i>)
            </p>
            <p>暂住人口： 未登记(<i>{registerListSearchResult.wdjcount}</i>)， 即将到期(<i>{registerListSearchResult.jjdqcount}</i>)，
              需变更(<i>{registerListSearchResult.xbgcount}</i>)， 已过期(<i>{registerListSearchResult.ygqcount}</i>)，
              已注销(<i>{registerListSearchResult.yzxcount}</i>)， 未访查(<i>{registerListSearchResult.needfangchacount}</i>)，
              逾期未访查(<i>{registerListSearchResult.yqwfccount}</i>)</p>
            <p>重点人员：重点人员(<i>{registerListSearchResult.zdrycount}</i>)</p>
          </div>
          <div className="table_detail_ytt">
            <Tabs tabPosition="top" size="small">
              <TabPane tab={<p>常住人口：<i>{registerListSearchResult.changkou.length}</i></p>} key={1}>
                <div className="table-max-height">
                  <TableList
                    columns={this.columns()}
                    dataSource={registerListSearchResult.changkou}
                    loading={loading}
                    scroll={{ y: true }}
                  />
                </div>
              </TabPane>
              <TabPane tab={<p>暂住人口：<i>{registerListSearchResult.zankou.length}</i></p>} key={2}>
                <div className="table-max-height">
                  <TableList
                    columns={this.columns()}
                    dataSource={registerListSearchResult.zankou}
                    loading={loading}
                    scroll={{ y: true }}
                  />
                </div>
              </TabPane>
              <TabPane tab={<p>境外人员：<i>{registerListSearchResult.jingwai.length}</i></p>} key={3}>
                <div className="foreign-tbale-zmy">
                  <TableList
                    columns={this.foreignColumns()}
                    dataSource={registerListSearchResult.jingwai}
                    loading={loading}
                    scroll={{ y: true }}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="ability-button">
          <div className="foot-right-button">
            <Button onClick={this.showVisitableModal}>新增访查人员</Button>
            <Button onClick={this.visibleForForeiModal}>新增境外人员</Button>
            <Button onClick={()=>this.handleRoomVisit('')}>批量访查</Button>
          </div>
        </div>
        {
          this.state.visibleForVisitablePopulation ?
          <VisitableModal
            title="新增人员"
            visible={this.state.visibleForVisitablePopulation}
            onOk={this.confirmVisitableModal}
            onCancel={this.cancelVisitableModal}
          /> : null
        }
        {this.state.foreignModalVisiable ?
          <ForeiModal
            title="新增境外人员"
            visible={this.state.foreignModalVisiable}
            onCancel={this.foreignModalCancel}
            onOk={this.confirmVisitableModal}
          />
          : null
        }
      </div>
    )
  }
}
