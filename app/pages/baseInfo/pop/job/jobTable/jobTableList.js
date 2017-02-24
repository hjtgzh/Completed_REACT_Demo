///**
// * Created by Administrator on 2016-12-26.
// */
//import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Link } from 'react-router'
//import {
//  fetchJobListList
//} from 'actions/job'
//import TableList from 'components/tableList/tableList'
//import DeletePopWindow from './../jobModal/deletePopWindow'
//
////连接公用常量、后端返回的数据方法  并放置在props里面调用
//@connect(
//  (state, props) => ({
//    config: state.config,
//    jobListSearchResult: state.jobListSearchResult
//  })
//)
//export default class jobTableList extends Component {
//// 初始化页面常量 绑定事件方法
//  constructor(props) {
//    super(props);
//    this.state = {
//      deletePopVisible:false
//    };
//    this.pageData = {
//      currentpage: 1,
//      pagesize: 10
//    };
//    this.deleteId = {
//      popId :""
//    }
//  }
//
//  // 组件已经加载到dom中
//  componentWillMount() {
//    this.getJobList(this.pageData.currentpage, this.pageData.pagesize);
//  }
//
//  getJobList(currentpage, pagesize) {
//    this.props.dispatch(fetchJobListList({
//      currentPage: currentpage,
//      pageSize: pagesize,
//      privilegeid: "",
//      gxdwid: "",
//      gkzdry: "",
//      keyWord: ""
//    }, ()=> {
//      this.props.exportSize(this.props.jobListSearchResult.totalCount);
//      this.canceladd = this.canceladd.bind(this);  //取消窗口
//      this.handleReset = this.handleReset.bind(this);
//      this.OkaddData = this.OkaddData.bind(this);
//    }))
//  }
//
//  //改变每页显示条数回调函数
//  pageSizeChange(e, pageSize) {
//    this.pageData.pagesize = pageSize;
//    this.getJobList("1", pageSize)
//  }
//
//  //点击每页回调函数
//  pageChange(currentPage) {
//    this.pageData.currentpage = currentPage;
//    this.getJobList(currentPage, this.pageData.pagesize)
//  }
//
//  //显示离职原因弹窗
//  handleReset(id) {
//    this.deleteId.popId = id;
//    this.setState({
//      deletePopVisible: true
//    });
//  }
//
//
//  OkaddData() {
//    this.setState({
//      deletePopVisible: false
//    });
//  }
//
//  canceladd() {
//    this.setState({
//      deletePopVisible: false
//    });
//  }
//
//  // 表格展示项的配置
//  columns() {
//    self = this.props;
//    return [
//      {
//        title: '序号',
//        key: 'index',
//        render: (text, recordId, index) => <span>{index + 1}</span>,
//        width: "5%"
//      },
//      {
//        title: '姓名',
//        dataIndex: 'xm',
//        key: 'xm',
//        width: "10%",
//        render: function (text, record, index) {
//          return (
//            <p>
//              <span className="left">{text}</span>
//              <Link className="right" to={`/peopleDetails/${record.id}`}>详情</Link>
//            </p>
//          )
//        }
//      },
//      {
//        title: '性别',
//        dataIndex: 'xb',
//        key: 'xb',
//        width: "5%"
//      },
//      {
//        title: '年龄',
//        dataIndex: 'nl',
//        key: 'nl',
//        width: "5%"
//      },
//      {
//        title: '证件号码',
//        dataIndex: 'sfzh',
//        key: 'sfzh',
//        width: "10%"
//      },
//      {
//        title: '双实人口',
//        dataIndex: 'hjlx',
//        key: 'hjlx',
//        width: "10%"
//      },
//      {
//        title: '机构名称',
//        dataIndex: 'componymc',
//        key: 'componymc',
//        width: "10%"
//      },
//      {
//        title: '机构地址',
//        dataIndex: 'dzmc',
//        key: 'dzmc',
//        width: "10%"
//      },
//      {
//        title: '机构类别',
//        dataIndex: 'jglb',
//        key: 'jglb',
//        width: "10%"
//      },
//      {
//        title: '管辖单位',
//        dataIndex: 'gxdwid',
//        key: 'gxdwid',
//        width: "10%"
//      },
//      {
//        title: '人员类别',
//        dataIndex: 'gkzdry',
//        key: 'gkzdry',
//        width: "5%"
//      },
//      {
//        title: '操作',
//        dataIndex: 'cz',
//        key: 'cz',
//        width: "5%",
//        render: function (text, record, index) {
//          return (
//            <a onClick={self.handleReset(`${record.id}`)}>删除</a>
//          )
//        }
//      },
//    ]
//  }
//
//  render() {
//    const {
//      jobListSearchResult
//      }=this.props;
//    const loading = jobListSearchResult.loading ? true : jobListSearchResult.loading;
//    return (
//      <div className="detail-content">
//        <TableList
//          columns={this.columns()}
//          dataSource={jobListSearchResult.list}
//          totalCount={jobListSearchResult.totalCount}
//          loading={loading}
//          currentPage={jobListSearchResult.pageNo}
//          pageSize={jobListSearchResult.pageSize}
//          scroll={{y: true}}
//          onShowSizeChange={this.pageSizeChange.bind(this)}
//          onChange={this.pageChange.bind(this)}
//        />
//        {
//          this.state.deletePopVisible ?
//            <DeletePopWindow
//              visible={this.state.deletePopVisible}
//              title={"离职原因"}
//              handleOk={this.OkaddData}
//              handleCancel={this.canceladd}
//              popId={this.deleteId.popId}
//            />
//            : null
//        }
//      </div>
//    )
//  }
//
//}
