/**
 * Created by 叶婷婷
 * 语法检查: 32 errors, 4 warnings
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
  // 获取数据列表
  fetchGoodsList,
} from 'actions/goods'
import { updateTabList } from 'actions/tabList'
import './style.css'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取物品列表
    goodsListSearchResult: state.goodsListSearchResult,
  })
)

// 声明组件  并对外输出
export default class index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      currentpage: 1,
      pagesize: 20,
    };
    this.searchKey = {
      gxdwdm: '',
      wpzl: '',
      wply: '',
      glqk: '',
      sjly: '',
      keyword: '',
    }
    // 导出按钮
    this.exportExcel1 = this.exportExcel1.bind(this);
    // Gfrom搜索条件回调
    this.gFormSubmit = this.gFormSubmit.bind(this);
    // 改变页面显示个数
    this.pageSizeChange = this.pageSizeChange.bind(this);
    // 翻页
    this.pageChange = this.pageChange.bind(this);
  }

  // 在组件Dom加载完成后运行
  componentDidMount() {
    this.getGoodsList(this.state.currentpage, this.state.pagesize);
    getConfigItems(this, {
      GXDW: sessionStorage.getItem('divisionid'),
    })
    this.props.dispatch(updateTabList({
      title: '物品挂历',
      key: '/goods$',
    }))
  }

  // 获取物品列表
  getGoodsList(currentpage, pagesize) {
    this.props.dispatch(fetchGoodsList({
      ...this.searchKey,
      currentPage: currentpage,
      pageSize: pagesize,
    }))
  }

  // 导出按钮
  exportExcel1() {
    if (this.props.goodsListSearchResult.totalCount > 5000) {
      message.info('当前数据大于5000条！');
      return;
    } else if (this.props.goodsListSearchResult.totalCount <= 0) {
      message.info('当前数据无可导出数据！');
      return;
    }
    let searchItem = '?';
    searchItem += 'gxdwdm=' + `${this.searchKey.gxdwdm}`;
    searchItem += '&wpzl=' + `${this.searchKey.wpzl}`;
    searchItem += '&wply=' + `${this.searchKey.wply}`;
    searchItem += '&glqk=' + `${this.searchKey.glqk}`;
    searchItem += '&sjly=' + `${this.searchKey.sjly}`;
    searchItem += '&keyword=' + `${this.searchKey.keyword}`;
    // 导出必带参数
    searchItem += '&token=' + `${sessionStorage.getItem('token')}`;
    window.open(`${this.props.config.$ctx}/jcjw/article/exportArticle.json` + searchItem);
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: '5%',
        render: (text, recordId, i) => <span>{i + 1}</span>,
      },
      {
        title: '物品名称',
        dataIndex: 'wpmc',
        key: 'wpmc',
        width: '15%',
        render: function (text, record) {
          return (
            <p>
              <span className="left wpmctitle-ytt">{text}</span>
              <Link className="right" to={`/goods$Tabs/${record.id}`}>详情</Link>
            </p>
          )
        },
      },
      {
        title: '物品持有人',
        dataIndex: 'wpcyr',
        key: 'wpcyr',
        width: '10%',
      },
      {
        title: '持有人身份证',
        dataIndex: 'cyrsfz',
        key: 'cyrsfz',
        width: '15%',
      },
      {
        title: '物品种类',
        dataIndex: 'wpzl',
        key: 'wpzl',
        width: '10%',
        render: function (text, record) {
          if (record.wpzl == '0') {
            return (<p>无人机</p>);
          } else if (record.wpzl == '1') {
            return (<p>滑翔机</p>);
          } else if (record.wpzl == '2') {
            return (<p>三角翼</p>);
          } else if (record.wpzl == '3') {
            return (<p>滑翔伞</p>);
          } else if (record.wpzl == '4') {
            return (<p>动力伞</p>);
          } else if (record.wpzl == '5') {
            return (<p>热气球</p>);
          } else if (record.wpzl == '6') {
            return (<p>飞艇</p>);
          } else if (record.wpzl == '7') {
            return (<p>航空模型</p>);
          }
        },
      },
      {
        title: '物品来源',
        dataIndex: 'wply',
        key: 'wply',
        width: '10%',
        render: function (text, record) {
          if (record.wply == '1') {
            return (<p>自制</p>);
          } else if (record.wply == '2') {
            return (<p>购买</p>);
          } else if (record.wply == '3') {
            return (<p>租用</p>);
          }
        },
      },
      {
        title: '关联情况',
        dataIndex: 'glqk',
        key: 'glqk',
        width: '10%',
        render: function (text, record) {
          if (record.glqk == '1') {
            return (<p>未关联</p>);
          } else if (record.glqk == '2') {
            return (<p>关联到人</p>);
          } else if (record.glqk == '3') {
            return (<p>关联到单位</p>);
          }
        },
      },
      {
        title: '数据来源',
        dataIndex: 'sjly',
        key: 'sjly',
        width: '10%',
        render: function (text, record) {
          if (record.sjly == '1') {
            return (<p>其他平台导入</p>);
          } else if (record.sjly == '2') {
            return (<p>本平台新增</p>);
          }
        },
      },
      {
        title: '管辖单位',
        dataIndex: 'pcsmc',
        key: 'pcsmc',
        width: '10%',
      },
    ]
  }

  // Gfrom条件配置
  gFormConfig() {
    const { config } = this.props;
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwdm',
        needNum: false,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '物品种类',
        items: [
          { name: '无人机', id: 0, lv: 1, pid: '' },
          { name: '滑翔机', id: 1, lv: 1, pid: '' },
          { name: '三角翼', id: 2, lv: 1, pid: '' },
          { name: '滑翔伞', id: 3, lv: 1, pid: '' },
          { name: '动力伞', id: 4, lv: 1, pid: '' },
          { name: '热气球', id: 5, lv: 1, pid: '' },
          { name: '飞艇', id: 6, lv: 1, pid: '' },
          { name: '航空模型', id: 7, lv: 1, pid: '' },
        ],
        key: 'wpzl',
        needNum: false,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '物品来源',
        items: [
          { name: '自制', id: 1, lv: 1, pid: '' },
          { name: '购买', id: 2, lv: 1, pid: '' },
          { name: '租用', id: 3, lv: 1, pid: '' },
        ],
        key: 'wply',
        needNum: false,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'superSelect',
        label: '关联情况',
        items: [
          { name: '未关联', id: 1, lv: 1, pid: '' },
          { name: '关联到人', id: 2, lv: 1, pid: '' },
          { name: '关联到单位', id: 3, lv: 1, pid: '' },
        ],
        key: 'glqk',
        needNum: false,
        needMulti: true,
        needArrowIcon: true,
      },
      {
        sort: 'singleSelect',
        label: '数据来源',
        items: [
          { name: '其他平台导入', id: 1 },
          { name: '本平台新增', id: 2 },
        ],
        key: 'sjly',
        needNum: false,
      },
    ]
  }

  // 改变每页显示条数回调函数
  pageSizeChange(e, pageSize) {
    this.setState({
      currentpage: 1,
      pagesize: pageSize,
    })
    this.getGoodsList('1', pageSize)
  }

  // 点击每页回调函数
  pageChange(currentPage) {
    this.setState({
      currentpage: currentPage,
    })
    this.getGoodsList(currentPage, this.state.pagesize)
  }

  // Gfrom搜索条件回调
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
      this.searchKey.gxdwdm = sessionStorage.getItem('divisionid');
    }

    // 多选物品种类
    const wpzlData = query.wpzl;
    if (wpzlData.length > 0) {
      const lvcode = query.wpzl[wpzlData.length - 1].lv;
      const wpzlidStr = [];
      for (let len = 0; len < wpzlData.length; len++) {
        const one = wpzlData[len];
        if (one.lv == lvcode) {
          wpzlidStr.push(one.id)
        }
      }
      this.searchKey.wpzl = wpzlidStr.toString();
    } else {
      this.searchKey.wpzl = '';
    }

    // 多选物品来源
    const wplyData = query.wply;
    if (wplyData.length > 0) {
      const lvcode = query.wply[wplyData.length - 1].lv;
      const wplyidStr = [];
      for (let len = 0; len < wplyData.length; len++) {
        const one = wplyData[len];
        if (one.lv == lvcode) {
          wplyidStr.push(one.id)
        }
      }
      this.searchKey.wply = wplyidStr.toString();
    } else {
      this.searchKey.wply = '';
    }

    // 多选关联情况
    const glqkData = query.glqk;
    if (glqkData.length > 0) {
      const lvcode = query.glqk[glqkData.length - 1].lv;
      const glqkidStr = [];
      for (let len = 0; len < glqkData.length; len++) {
        const one = glqkData[len];
        if (one.lv == lvcode) {
          glqkidStr.push(one.id)
        }
      }
      this.searchKey.glqk = glqkidStr.toString();
    } else {
      this.searchKey.glqk = '';
    }

    // 数据来源
    this.searchKey.sjly = query.sjly.id || '';

    // 关键词搜索
    this.searchKey.keyword = query.keyword || '';

    this.setState({
      currentpage: 1,
    });
    this.getGoodsList(1, this.state.pagesize);
  }

  render() {
    const {
      goodsListSearchResult,
      } = this.props;

    const loading = goodsListSearchResult.loading ? true : goodsListSearchResult.loading;

    return (
      <Panel>
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="goods"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={goodsListSearchResult.totalCount}
        />
        <div className="list-tab list_tab_trf">
          <TableList
            columns={this.columns()}
            dataSource={goodsListSearchResult.list}
            totalCount={goodsListSearchResult.totalCount}
            loading={loading}
            currentPage={goodsListSearchResult.pageNo}
            pageSize={goodsListSearchResult.pageSize}
            scroll={{ y: true }}
            onShowSizeChange={this.pageSizeChange}
            onChange={this.pageChange}
          />
        </div>
        <div className="ability-button">
          <Button className="exportData" onClick={this.exportExcel1}>导出数据</Button>
        </div>
      </Panel>
    )
  }
}

