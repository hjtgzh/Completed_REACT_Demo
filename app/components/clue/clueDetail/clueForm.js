/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import { Table } from 'antd'
import Gform from 'components/gForm'
import getConfigItems from 'utils/getGformConfigItems'
import {
  fetchClueList } from 'actions/people'
import ImageView from './popUp/imageView'


// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      clueListSearchResult: state.clueListSearchResult,
    })
)

// 声明组件  并对外输出
export default class cueFrom extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      mark: {
        1: '纠纷',
        2: '涉恐',
        3: '涉疆',
        4: '涉日',
        5: '涉外',
        6: '低慢小',
      },
      imageViewShow: false,
      imgs: [], //窗口显示的图片
    }
    this.initReqNum = {
      xzqhid: '',
      gxdwid: sessionStorage.getItem('divisionid'),
    }
    this.searchKey = {
      pageNo: 1,
      pageSize: 10,
      mark:'',
    }
    this.searchClueList = this.searchClueList.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.gFormSubmit = this.gFormSubmit.bind(this)

    this.handleCancel = this.handleCancel.bind(this)
    this.showView = this.showView.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.searchClueList()
    getConfigItems(this, {
      GXDW: sessionStorage.getItem('divisionid'),
    })
  }

  searchClueList() {
    const value = {
      pageNo: 1, // 当前页面
      pageSize: this.searchKey.pageSize, //每页条数
      // gxdwid:'', //管辖单位id
      // text:'',   //内容（搜索框输入）
      // mark:'',   //标签
      // sjly:'',   //数据来源
      // startdate:'', //开始时间
      // enddate:'',   //结束时间
    }
    this.props.dispatch(fetchClueList(value))
  }

  onShowSizeChange(current, size) {
    const value = {
      ...this.searchKey,
      pageNo: 1, // 当前页面
      pageSize: size, //每页条数
      // gxdwid:'', //管辖单位id
      // text:'',   //内容（搜索框输入）
      // mark:'',   //标签
      // sjly:'',   //数据来源
      // startdate:'', //开始时间
      // enddate:'',   //结束时间
    }
    this.searchKey.pageSize = size
    this.searchKey.pageNo = 1
    this.props.dispatch(fetchClueList(value))
  }

  onPageChange(page) {
    const value = {
      ...this.searchKey,
      pageNo: page, //当前页面
      // pageSize:this.searchKey.pageSize,//每页条数
      // gxdwid:'', //管辖单位id
      // text:'',   //内容（搜索框输入）
      // mark:'',   //标签
      // sjly:'',   //数据来源
      // startdate:'', //开始时间
      // enddate:'',   //结束时间
    }
    this.searchKey.pageNo = page
    this.props.dispatch(fetchClueList(value))
  }

  // 隐藏图片弹窗
  handleCancel() {
    this.setState({ imageViewShow: false })
  }

  // 展示图片弹窗
  showView(imgs) {
    this.setState({ imageViewShow: true, imgs: imgs })
  }

  columns() {
    const self = this
    return [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '7%',
        render: (text, record, index) =>
          <span>{((this.searchKey.pageNo - 1) * this.searchKey.pageSize) + index + 1}</span>,
      },
      {
        title: '内容',
        dataIndex: 'text',
        key: 'text',
        width: '20%',
      },
      {
        title: '标签',
        dataIndex: 'mark',
        key: 'mark',
        width: '18%',
        render: (text, record, index) => {
          if (text) {
            const arr = text.split(',')
            let mark = ''
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] !== '') {
                mark += `${self.state.mark[arr[i]]},`
              }
            }
            mark = mark.substr(0, mark.length - 1)
            return <span className="red-color">{mark}</span>
          } else {
            return '无标签'
          }
        },
      },
      {
        title: '照片',
        dataIndex: 'tps',
        key: 'tps',
        width: '10%',
        render: (text, record, index) =>
          record.tps > 0 ? <a onClick={() => self.showView(record.path)}>查看照片</a> : <span>无照片</span>,
      },
      {
        title: '数据来源',
        dataIndex: 'sjly',
        key: 'sjly',
        width: '10%',
      },
      {
        title: '创建时间',
        dataIndex: 'cjsj',
        key: 'cjsj',
        width: '15%',
        render: (text, record, index) => moment(text).format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        title: '创建人',
        dataIndex: 'cjrmc',
        key: 'cjrmc',
        width: '10%',
      },
      {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        width: '10%',
        render: (text, record, index) => <Link to={`/cue$/newClue/${record.id}`}>详情</Link>,
      },
    ]
  }

  // 筛选条件组件调用
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwid',
        needNum: false,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'singleSelect',
        label: '状态类型',
        key: 'mark',
        items: [
          { id: 1, name: '纠纷' },
          { id: 2, name: '渉恐' },
          { id: 3, name: '渉疆' },
          { id: 4, name: '渉日' },
          { id: 5, name: '渉外' },
          { id: 6, name: '低慢小' },
        ],
        numResKey: 'mark',
        numReqKey: 'mark',
        needArrowIcon: true,
      },
      {
        sort: 'rangePicker',
        label: '时间筛选',
        key: ['starttime', 'endtime'],
        numReqKey: ['starttime', 'endtime'],
        format: '',
      },
      // {
      //   sort:'singleSelect',
      //   label:'落地情况',
      //   key:'ldqk',
      //   items:config.Ldqk,
      // }
    ]
  }

  gFormSubmit(query) {
    const params = this.searchKey;
    if (query.gxdw.length > 0) {
      params.gxdwid = query.gxdw[query.gxdw.length - 1].id
    } else {
      params.gxdwid = sessionStorage.getItem('divisionid')
    }
    if (query.keyword !== '') {
      params.text = query.keyword
    } else {
      delete params.text;
    }
    if (query.mark){
      params.mark = query.mark.id
    }else{
      delete params.mark
    }
    if (query.starttime.dateString) {
      params.startdate = query.starttime.dateString
      params.enddate = query.endtime.dateString
    } else {
      delete params.startdate;
      delete params.enddate;
    }
    this.searchKey = {
      ...params,
    }
    this.searchKey.pageNo = query.page
    this.searchKey.pageSize = query.pageSize
    this.setState({})
    this.props.dispatch(fetchClueList(this.searchKey))
  }

  render() {
    const {
      clueListSearchResult,
    } = this.props
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="clueList"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={clueListSearchResult.loading || this.state._requestLoading}
          totalCount={clueListSearchResult.totalCount}
          initParam={this.initReqNum}
          page={this.searchKey.pageNo}
          pageSize={this.searchKey.pageSize}
        />
        <div className="detail-content">
          <Table
            scroll={{ y: true }}
            loading={clueListSearchResult.loading}
            columns={this.columns()}
            dataSource={clueListSearchResult.list}
            bordered
            pagination={{
              showSizeChanger: true,
              onShowSizeChange: this.onShowSizeChange,
              pageSize: this.searchKey.pageSize,
              onChange: this.onPageChange,
              current: this.searchKey.pageNo,
              total: clueListSearchResult.totalCount,
            }}
          />
        </div>
        {this.state.imageViewShow ?
          <ImageView onCancel={this.handleCancel} imgs={this.state.imgs} /> : null
        }
      </div>
    )
  }
}
