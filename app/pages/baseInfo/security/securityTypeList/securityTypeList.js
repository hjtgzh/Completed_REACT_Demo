/**
 * Deleted by 叶婷婷
 * 无用，系统功能完整后，可删除
 */
//import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Link } from 'react-router'
//import moment from 'moment'
//import TypeList from '../common/typeList'
//import {
//  fetchSecurityList, //获取列表
//} from 'actions/security'
//
//import TableList from 'components/tableList/tableList'
//
////连接公用常量、后端返回的数据方法  并放置在props里面调用
//@connect(
//  (state, props) => ({
//    config: state.config,
//    securityListSearchResult: state.securityListSearchResult
//  })
//)
//export default class SecurityTypeList extends Component {
//  // 初始化页面常量 绑定事件方法
//  constructor(props) {
//    super(props)
//    this.state = {
//      currentpage: 1,
//      pagesize: 3,
//    }
//    this.params = {
//      gxdwid: 330106,
//      currentPage: 1,
//      pageSize: 10,
//    }
//  }
//
//  // 组件加载前
//  componentWillMount() {
//    this.getSecurityList(this.state.currentpage, this.state.pagesize);
//  }
//
//  // 获取治安情况数据
//  getSecurityList(currentpage, pagesize) {
//    this.props.dispatch(fetchSecurityList({
//      pageNo: currentpage,
//      pageSize: pagesize,
//      gxdwid: "",
//      privilegeid: "",
//      name: "",
//      ajlb1: "",
//      ajzt: "",
//    }))
//  }
//
////改变每页显示条数回调函数
//  pageSizeChange(e, pageSize) {
//    this.setState({
//      pagesize: pageSize
//    })
//    this.getSecurityList("1", pageSize)
//  }
//
//  //点击每页回调函数
//  pageChange(currentPage) {
//    this.setState({
//      currentpage: currentPage
//    })
//    this.getSecurityList(currentPage, this.state.pagesize)
//  }
//
//  //列表表头配置
//  columns() {
//    return [
//      {
//        title: '案件类别',
//        dataIndex: 'ajlb',
//        key: 'ajlb',
//        width: '18%'
//      },
//      {
//        title: '案件编号',
//        dataIndex: 'ajbh',
//        key: 'ajbh',
//        width: '18%',
//        render: function (text, record, index) {
//          return (
//            <span>{text}
//              <Link className="btn-detail-jxy" to={`/security$Tabs/${record.id}`}>详情</Link>
//            </span>
//          );
//        },
//      },
//      {
//        title: '案发时间',
//        dataIndex: 'fssj',
//        key: 'fssj',
//        width: '18%',
//        render: function (text, record, index) {
//          return moment(record.fssj).format("YYYY-MM-DD");
//        },
//      },
//      {
//        title: '案发地址',
//        dataIndex: 'afdz',
//        key: 'afdz',
//        width: '18%'
//      },
//      {
//        title: '管辖单位',
//        dataIndex: 'gxdw',
//        key: 'gxdw',
//        width: '18%'
//      },
//      {
//        title: '案件状态',
//        dataIndex: 'ajzt',
//        key: 'ajzt',
//        width: '10%'
//      }
//    ]
//  }
//
//  render() {
//    const {
//      securityListSearchResult
//      }=this.props
//    const loading = securityListSearchResult.loading ? true : securityListSearchResult.loading;
//    return (
//      <TableList
//        columns={this.columns()}
//        dataSource={securityListSearchResult.list}
//        totalCount={securityListSearchResult.totalCount}
//        loading={loading}
//        currentPage={securityListSearchResult.pageNo}
//        pageSize={securityListSearchResult.pageSize}
//        scroll={{y: true}}
//        onShowSizeChange={this.pageSizeChange.bind(this)}
//        onChange={this.pageChange.bind(this)}
//      />
//    )
//  }
//
//}