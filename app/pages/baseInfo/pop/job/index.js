/**
 * Created by 叶婷婷
 * 语法检查：12 errors, 3 warnings
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, message } from 'antd'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import getConfigItems from 'utils/getGformConfigItems'
import {
  // 获取从业人员列表
  fetchJobListList,
} from 'actions/job'
import './style.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 从业人员列表
    jobListSearchResult: state.jobListSearchResult,
  })
)

// 声明组件  并对外输出
export default class index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      currentpage: 1,  // 初始化页面
      pagesize: 10,  // 初始化个数
    };
    // Gform搜索条件集合
    this.searchKey = {
      xzqhdm: '',  // 行政单位
      gxdwdm: '',  // 管辖单位
      gkzdry: '',  // 关注类别
      keyWord: '',  // 关键词
    };

    // 导出列表的Excel表格
    this.exportExcel1 = this.exportExcel1.bind(this);
    // Gfrom回调搜索条件集合
    this.gFormSubmit = this.gFormSubmit.bind(this)
    // 改变页面显示个数
    this.pageSizeChange = this.pageSizeChange.bind(this)
    // 翻页
    this.pageChange = this.pageChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.getJobList(this.state.currentpage, this.state.pagesize);
    // 传递Gfrom行政单位、管辖单位当前部门，
    getConfigItems(this, {
      XZQH: '',
      GXDW: sessionStorage.getItem('divisionid'),
    })
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: '5%',
        render: function (text, record, i) {
          return (
            <span>{i + 1}</span>
          )
        },
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: '10%',
        render: function (text, record) {
          return (
            <p>
              <span className="left">{text}</span>
              <Link className="right" to={`/pop$/peopleDetails/${record.id}`}>详情</Link>
            </p>
          )
        },
      },
      {
        title: '性别',
        dataIndex: 'xbLable',
        key: 'xbLable',
        width: '5%',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: '5%',
      },
      {
        title: '证件号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width: '12%',
      },
      {
        title: '双实人口',
        dataIndex: 'hjlx',
        key: 'hjlx',
        width: '7%',
        render: function (text, record) {
          if (record.hjlx == '1') {
            return '常住人口';
          } else if (record.hjlx == '2') {
            return '暂住人口';
          } else if (record.hjlx == '3') {
            return '境外人口';
          }
        },
      },
      {
        title: '机构名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
        width: '12%',
      },
      {
        title: '机构地址',
        dataIndex: 'jglb',
        key: 'jglb',
        width: '12%',
      },
      {
        title: '机构类别',
        dataIndex: 'dzmc',
        key: 'dzmc',
        width: '10%',
      },
      {
        title: '管辖单位',
        dataIndex: 'pcsmc',
        key: 'pcsmc',
        width: '12%',
      },
      {
        title: '人员类别',
        dataIndex: 'gkzdry',
        key: 'gkzdry',
        width: '10%',
      },
    ]
  }

  // 获取从业人员数据
  getJobList(currentpage, pagesize) {
    this.props.dispatch(fetchJobListList({
      ...this.searchKey,
      currentPage: currentpage,
      pageSize: pagesize,
    }))
  }

  // 改变每页显示条数回调函数
  pageSizeChange(e, pageSize) {
    this.setState({
      pagesize: pageSize,
      currentpage: 1,
    });
    this.getJobList('1', pageSize)
  }

  // 点击每页回调函数
  pageChange(currentPage) {
    this.setState({
      currentpage: currentPage,
    });
    this.getJobList(currentPage, this.state.pagesize)
  }

  // 导出列表的Excel表格
  exportExcel1() {
    if (this.props.jobListSearchResult.totalCount > 5000) {
      message.info('当前数据大于5000条！');
      return;
    } else if (this.props.jobListSearchResult.totalCount <= 0) {
      message.info('当前数据无可导出数据！');
      return;
    }
    let searchItem = '?';
    searchItem += 'gkzdry=' + `${this.searchKey.gkzdry}`;
    searchItem += '&xzqhdm=' + `${this.searchKey.xzqhdm}`;
    searchItem += '&gxdwdm=' + `${this.searchKey.gxdwdm}`;
    searchItem += '&keyWord=' + `${this.searchKey.keyWord}`;
     // 导出必带参数
    searchItem += '&token=' + `${sessionStorage.getItem('token')}`;
    window.open(`${this.props.config.$ctx}/jcjw/cyry/export.json` + searchItem);
  }

  // Gform选项配置
  gFormConfig() {
    const { config } = this.props;
    return [
      {
        sort: 'superSelect',
        label: '行政区划',
        items: config.XZQH,
        key: 'xzqh',
        numResKey: 'xzqh',
        numReqKey: 'xzqhid',
        needNum: false,
        needMulti: true,
        needArrowIcon: true,
      },
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
        sort: 'superSelect',
        label: '关注类别',
        items: [
          { name: '涉恐', id: 'RS01', lv: 1, pid: '' },
          { name: '涉稳', id: 'RS02', lv: 1, pid: '' },
          { name: '在逃', id: 'RS03', lv: 1, pid: '' },
          { name: '涉毒', id: 'RS04', lv: 1, pid: '' },
          { name: '部前科', id: 'RS05', lv: 1, pid: '' },
          { name: '肇事肇祸精神病', id: 'RS06', lv: 1, pid: '' },
          { name: '上访', id: 'RS07', lv: 1, pid: '' },
          { name: '高危人员', id: 'RS11', lv: 1, pid: '' },
          { name: '自行列管涉稳', id: 'RS14', lv: 1, pid: '' },
          { name: '自行列管上访', id: 'RS15', lv: 1, pid: '' },
          { name: '自行列管精神病', id: 'RS16', lv: 1, pid: '' },
          { name: '自行列管国保人员', id: 'RS18', lv: 1, pid: '' },
          { name: '取保候审', id: 'RS19', lv: 1, pid: '' },
          { name: '监视居住', id: 'RS20', lv: 1, pid: '' },
          { name: '被剥夺政治权利', id: 'RS24', lv: 1, pid: '' },
          { name: '个人极端', id: 'RS25', lv: 1, pid: '' },
          { name: '社区矫正', id: 'RS26', lv: 1, pid: '' },
          { name: '重口人员', id: 'RS27', lv: 1, pid: '' },
          { name: '其他管控类', id: 'RS28', lv: 1, pid: '' },
          { name: '经侦前科', id: 'RS29', lv: 1, pid: '' },
          { name: '其他刑嫌前科', id: 'RS30', lv: 1, pid: '' },
          { name: '省侵财前科(打防控)', id: 'RS31', lv: 1, pid: '' },
          { name: '脱失', id: 'RS32', lv: 1, pid: '' },
        ],
        key: 'gkzdry',
        needNum: false,
        needMulti: true,
        needArrowIcon: true,
      },
    ]
  }

  // Gfrom回调搜索条件集合
  gFormSubmit(query) {
    // 多选管辖单位
    const gxdwData = query.gxdw;
    if (gxdwData.length > 0) {
      const lvcode = query.gxdw[gxdwData.length - 1].lv;
      const gxdwidStr = [];
      for (let len = 0; len < gxdwData.length; len++) {
        const one = gxdwData[len];
        if (one.lv == lvcode) {
          gxdwidStr.push(one.id)
        }
      }
      this.searchKey.gxdwdm = gxdwidStr.toString();
    } else {
      this.searchKey.gxdwdm = '';
    }

    // 多选行政区划
    const xzqhData = query.xzqh;
    if (xzqhData.length > 0) {
      const lvcode = query.xzqh[xzqhData.length - 1].lv;
      const xzqhidStr = [];
      for (let len = 0; len < xzqhData.length; len++) {
        const one = xzqhData[len];
        if (one.lv == lvcode) {
          xzqhidStr.push(one.id)
        }
      }
      this.searchKey.xzqhdm = xzqhidStr.toString();
    } else {
      this.searchKey.xzqhdm = '';
    }

    // 多选关注类别
    const gzlbData = query.gkzdry;
    if (gzlbData.length > 0) {
      const gzlbidStr = [];
      for (let i = 0; i < gzlbData.length; i++) {
        const onei = gzlbData[i];
        gzlbidStr.push(onei.id)
      }
      this.searchKey.gkzdry = gzlbidStr.toString();
    } else {
      this.searchKey.gkzdry = '';
    }

    // 关键词
    this.searchKey.keyWord = query.keyword || '';

    this.setState({
      currentpage: 1,
    });

    this.getJobList(1, this.state.pagesize);
  }

  render() {
    const {
      jobListSearchResult,
      } = this.props;
    const loading = jobListSearchResult.loading ? true : jobListSearchResult.loading;
    return (
      <Panel>
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="job"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={jobListSearchResult.totalCount}
        />
        <div className="gform-next-div">
          <TableList
            columns={this.columns()}
            dataSource={jobListSearchResult.list}
            totalCount={jobListSearchResult.totalCount}
            loading={loading}
            currentPage={jobListSearchResult.pageNo}
            pageSize={jobListSearchResult.pageSize}
            scroll={{ x: 1500, y: true }}
            onShowSizeChange={this.pageSizeChange}
            onChange={this.pageChange}
          />
          <div className="ability-button">
            <Button onClick={this.exportExcel1}>导出数据</Button>
          </div>
        </div>
      </Panel>
    )
  }
}
