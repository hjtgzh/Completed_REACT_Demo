/*
 * creator：周美英 2016-11-10 10:30 创建js
 * editor:周美英 2017-2-13 10:30 在头部添加文件修改记录
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Select, message } from 'antd'
import TableList from 'components/tableList/tableList'
import Gform from 'components/gForm'
import RelateAddrModal from 'components/relateAddrModal/relateAddrModal'
import getConfigItems from 'utils/getGformConfigItems'
import {
  fetchDeclareList,
  fetchUpdateSblb,
  fetchBindSblb,
} from 'actions/declare'

const Option = Select.Option;
const gxdwid = sessionStorage.getItem('divisionid')


// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    allDeclareListSearchResult: state.allDeclareListSearchResult,
  })
)

// 声明组件  并对外输出
export default class declareManagement extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      onclickParam: {
        id: '',
        czrsfz: '',
        residentId: '',
      },
      householdVisible: false,
      loading: true,
      counts: '',
    }
    this.params = {
      currentPage: 1,
      pageSize: 10,
      gxdwdm: gxdwid,
      pcsdm: '',
      sjly: '',
      sbzt: '',
      ewmbdzt: '',
      sblb: '',
      zt: '',
      name: '',

    }
    this.handleShowHosehold = this.handleShowHosehold.bind(this)
    this.handleOkHosehold = this.handleOkHosehold.bind(this)
    this.handleCancelHosehold = this.handleCancelHosehold.bind(this)
    this.exportExcel = this.exportExcel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }

  componentWillMount() {
  }

  // 数据查询
  getData() {
    this.props.dispatch(fetchDeclareList(this.params, (reply) => {
      this.setState({ loading: false, counts: reply.data.totalCount })
    }))
  }

  // 组件已经加载到dom中
  componentDidMount() {
    getConfigItems(this, {
      Gxdw: gxdwid,
    })
  }

// 表格展示项的配置
  columns() {
    const _self = this
    return [
      {
        title: '序号',
        key: 'index',
        width: 60,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'czrxm',
        key: 'czrxm',
        width: 60,
      },
      {
        title: '电话',
        dataIndex: 'czrsj',
        key: 'czrsj',
        width: 100,
      }, {
        title: '身份证',
        dataIndex: 'czrsfz',
        key: 'czrsfz',
        width: 150,
      }, {
        title: '申报地址',
        dataIndex: '',
        key: '',
        width: 150,
      }, {
        title: '二维码地址',
        dataIndex: 'zfdz',
        key: 'zfdz',
        width: 300,
      }, {
        title: '现住地址',
        dataIndex: 'standardaddress',
        key: 'standardaddress',
        width: 300,
      }, {
        title: '房间号',
        dataIndex: 'fjh',
        key: 'fjh',
        width: 120,
      }, {
        title: '状态',
        dataIndex: 'zt',
        key: 'zt',
        width: 100,
        render: function (text, record, index) {
          if (text === 1) {
            return (<p>人在户不在</p>)
          } else if (text === 2) {
            return (<p>未登记</p>)
          } else if (text === 3) {
            return (<p>已过期</p>)
          } else if (text === 4) {
            return (<p>即将到期</p>)
          } else if (text === 5) {
            return (<p>已登记</p>)
          } else if (text === 6) {
            return (<p>其他</p>)
          }
        },
      }, {
        title: '申报类型',
        dataIndex: 'sblb',
        key: 'sblb',
        width: 120,
        render: function (text, record, index) {
          return (
            <Select
              defaultValue={record.sblb.toString()}
              size="small"
              onChange={_self.handleChange(record.id)}
            >
              <Option value="1">未处理</Option>
              <Option value="2">已核实</Option>
              <Option value="3">已登记</Option>
              <Option value="4">已签证</Option>
              <Option value="5">已注销</Option>
              <Option value="6">已离开</Option>
              <Option value="7">信息错误</Option>
            </Select>
          )
        },
      }, {
        title: '申报时间 ',
        dataIndex: 'sbsjLabel',
        key: 'sbsjLabel',
        width: 150,
      }, {
        title: '操作',
        dataIndex: 'action',
        width: 80,
        render: function (text, record, index) {
          const onclickParam = {
            id: record.id,
            czrsfz: record.czrsfz,
            residentId: record.residentId,
          }
          if (record.residentId === '' || record.residentId === undefined || record.residentId === 'null') {
            return (<a onClick={_self.handleShowHosehold(onclickParam)}>入户</a>)
          } else {
            return (<p>已入户</p>)
          }
        },
      },
    ]
  }

  // gForm配置
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.Gxdw,
        // items: config.DIVISION,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwids',
        needNum: false,
      },
      {
        sort: 'singleSelect',
        label: '数据来源',
        items: [
          { name: '双实数据', id: 1 },
          { name: '警察叔叔', id: 2 },
          { name: '阿里社会申报', id: 3 },
        ],
        key: 'sjly',
        needNum: false,
      },
      {
        sort: 'singleSelect',
        label: '申报状态',
        items: [
          { name: '申报登记', id: 1 },
          { name: '申报注销', id: 2 },
        ],
        needNum: false,
        key: 'sbzt',
      },
      {
        sort: 'singleSelect',
        label: '关联状态',
        items: [
          { name: '二维码已关联', id: 1 },
          { name: '二维码未关联', id: 2 },
        ],
        key: 'ewmbdzt',
        needNum: false,
      },
      {
        sort: 'singleSelect',
        label: '申报类别',
        items: [
          { name: '未处理', id: 1 },
          { name: '已核实', id: 2 },
          { name: '已登记', id: 3 },
          { name: '已签证 ', id: 4 },
          { name: '已注销', id: 5 },
          { name: '已离开', id: 6 },
          { name: '信息错误', id: 7 },
        ],
        key: 'sblb',
        needNum: false,
      },
      {
        sort: 'singleSelect',
        label: '状　　态',
        items: [
          { name: '人在户不在', id: 1 },
          { name: '未登记', id: 2 },
          { name: '已到期', id: 3 },
          { name: '即将到期', id: 4 },
          { name: '已登记', id: 5 },
          { name: '已注销', id: 6 },
          { name: '其他', id: 7 },
        ],
        key: 'zt',
        needNum: false,
      },
    ]
  }

  // 判断对象是否为空
  isEmptyObj(obj) {
    const length = Object.keys(obj).length
    if (length === 0) {
      return true
    } else {
      return false
    }
  }

  // 筛选条件搜索
  gFormSubmit(query) {
    this.setState({ loading: true })
    if (query.gxdw.length !== 0) {
      const fjdmIndex = query.gxdw.length - 1
      this.params.gxdwdm = query.gxdw[fjdmIndex].id
    } else {
      this.params.gxdwdm = gxdwid
    }
    if (!this.isEmptyObj(query.sjly)) {
      switch (query.sjly.name) {
        case '双实数据':
          this.params.sjly = 1
          break
        case '警察叔叔导入':
          this.params.sjly = 2
          break
        case '阿里社会申报':
          this.params.sjly = 3
          break
        default:
      }
    } else {
      this.params.sjly = ''
    }
    if (!this.isEmptyObj(query.sbzt)) {
      switch (query.sbzt.name) {
        case '申报登记':
          this.params.sbzt = 0
          break
        case '申报注销':
          this.params.sbzt = 1
          break
        default:
      }
    } else {
      this.params.sbzt = ''
    }
    if (!this.isEmptyObj(query.ewmbdzt)) {
      switch (query.ewmbdzt.name) {
        case '二维码已关联':
          this.params.ewmbdzt = 1
          break
        case '二维码未关联':
          this.params.ewmbdzt = 2
          break
        default:
      }
    } else {
      this.params.ewmbdzt = ''
    }
    if (!this.isEmptyObj(query.sblb)) {
      switch (query.sblb.name) {
        case '未处理':
          this.params.sblb = 1
          break
        case '已核实':
          this.params.sblb = 2
          break
        case '已登记':
          this.params.sblb = 3
          break
        case '已签证':
          this.params.sblb = 4
          break
        case '已注销':
          this.params.sblb = 5
          break
        case '已离开':
          this.params.sblb = 6
          break
        case '信息错误':
          this.params.sblb = 7
          break
        default:
      }
    } else {
      this.params.sblb = ''
    }
    if (!this.isEmptyObj(query.zt)) {
      switch (query.zt.name) {
        case '人在户不在':
          this.params.zt = 1
          break
        case '未登记':
          this.params.zt = 2
          break
        case '已过期':
          this.params.zt = 3
          break
        case '即将到期':
          this.params.zt = 4
          break
        case '已登记':
          this.params.zt = 5
          break
        case '已注销':
          this.params.zt = 6
          break
        case '其他':
          this.params.zt = 7
          break
        default:
      }
    } else {
      this.params.zt = ''
    }
    this.params.name = query.keyword
    this.getData()
  }

  // 点击弹框的一系列操作
  handleShowHosehold(onclickParam) {
    this.state.onclickParam = onclickParam
    this.setState({ householdVisible: true })
  }

  // 点击确定回调函数
  handleOkHosehold(param) {
    if (param.roomcode === '' || param.roomcode === undefined) {
      message.error('请输入有效关键字，在下拉框里选择房间信息！')
      return
    }
    const _self = this
    const onclickParam = this.state.onclickParam
    const postParam = {
      id: onclickParam.id,
      residentId: onclickParam.residentId,
      czrsfz: onclickParam.czrsfz,
      bldId: param.buildingcode,
      roomId: param.roomcode,
    }
    this.setState({ householdVisible: false })
    this.props.dispatch(fetchBindSblb(postParam, (reply) => {
      message.success(reply.msg)
      _self.getData()
    }))
  }

  // 点击取消或遮罩层回调函数
  handleCancelHosehold() {
    this.setState({ householdVisible: false })
  }

  // 点击导出
  exportExcel() {
    const urlBase = this.props.config.$ctx// 当前IP
    const token = sessionStorage.getItem('token')
    const exportObj = { ...this.params }
    exportObj.currentPage = 1
    exportObj.pageSize = 5000
    const strArr = []
    Object.keys(exportObj).map((key, index) => {
      strArr.push(`${key} = ${exportObj[key]}`)
    })
    if (this.state.counts <= 5000) {
      window.open(`${urlBase}/jcjw/shsb/exportShsb.json?${strArr.join('&')}&token=${token}`)
    } else if (this.state.counts > 5000) {
      message.warn('导出数据不能大于5000条，请先精确筛选条件', 3)
      return
    } else {
      message.warn('没有查询到数据，无法导出', 3)
    }
  }

  pageSizeChange(e, pageSize) { // 改变每页显示条数回调函数
    this.setState({ loading: true })
    this.params.pageSize = pageSize
    this.getData()
  }

  pageChange(currentPage) { // 点击每页返回函数
    this.setState({ loading: true })
    this.params.currentPage = currentPage
    this.props.dispatch(fetchDeclareList(this.params))
    this.getData()
  }

  // 修改社会申报类别
  handleChange(id, value) {
    this.props.dispatch(fetchUpdateSblb({ id: id, sblb: value }, (reply) => {
      message.info(reply.msg)
    }))
  }

  render() {
    const {
      allDeclareListSearchResult,
      } = this.props
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          totalCount={allDeclareListSearchResult.totalCount || 0}
          loading={false}
          cacheKey="declareManagement"
        />
        <div className="list-tab">
          <TableList
            columns={this.columns()}
            dataSource={allDeclareListSearchResult.list}
            totalCount={allDeclareListSearchResult.totalCount}
            loading={this.state.loading}
            currentPage={this.params.currentPage}
            pageSize={this.params.pageSize}
            scroll={{ x: 1000, y: true }}
            onShowSizeChange={this.pageSizeChange}
            onChange={this.pageChange}
          />
        </div>
        <div className="ability-button">
          <Button type="button" onClick={this.exportExcel}>导出</Button>
        </div>
        {
          this.state.householdVisible ?
            <RelateAddrModal
              onCancel={this.handleCancelHosehold}
              onOk={this.handleOkHosehold}
              visible
              title="关联入户"
            /> : null
        }
      </div>
    )
  }
}
