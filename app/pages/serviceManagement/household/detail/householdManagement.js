/**
 * Created by 叶婷婷
 * 语法检查:14 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Popconfirm, message } from 'antd'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import RelateAddrModal from 'components/relateAddrModal/relateAddrModal'
import getConfigItems from 'utils/getGformConfigItems'
import {
// 户号管理
  fetchHouseholdManagementList,
// 解绑
  fetchUnbundlingHousehold,
// 绑定
  fetchBundlingHousehold,
} from 'actions/household'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
// 户号管理
    householdManagementListSearchResult: state.householdManagementListSearchResult,
  })
)

// 声明组件  并对外输出
export default class index extends Component {
// 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      householdVisible: false,
      currentpage: 1,
      pagesize: 10,
    };
    this.changefield = {
      bindhouseId: '',
    };
    this.searchKey = {
      gxdwdm: '',  // 管辖单位
      dzlx: '',  // 地质类型
      lx: '',  // 绑定类型
    }

// 导出列表的Excel表格
    this.exportExcel1 = this.exportExcel1.bind(this);
// 解绑
    this.handleUnbundling = this.handleUnbundling.bind(this);
// 绑定
    this.handleShowHosehold = this.handleShowHosehold.bind(this);
// 取消绑定
    this.handleCancelHosehold = this.handleCancelHosehold.bind(this);
// 绑定回调
    this.handleOkHosehold = this.handleOkHosehold.bind(this);
// Gfrom回调
    this.gFormSubmit = this.gFormSubmit.bind(this);
// 改变页面显示个数
    this.pageSizeChange = this.pageSizeChange.bind(this);
// 改变页数
    this.pageChange = this.pageChange.bind(this);
  }

// 组件已经加载到dom中
  componentDidMount() {
    this.getHouseholdManagementList(this.state.currentpage, this.state.pagesize)
    getConfigItems(this, {
      Gxdw: sessionStorage.getItem('divisionid'),
    })
  }

// 表格展示项的配置
  columns() {
    const self = this;
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, i) => <span>{i + 1}</span>,
        width: '4%',
      },
      {
        title: '户籍号',
        dataIndex: 'hh',
        key: 'hh',
        width: '13%',
      },
      {
        title: '户号',
        dataIndex: 'zshh',
        key: 'zshh',
        width: '9%',
      },
      {
        title: '管辖单位',
        dataIndex: 'pcsmc',
        key: 'pcsmc',
        width: '10%',
      },
      {
        title: '参考地址',
        dataIndex: 'ckdz',
        key: 'ckdz',
        width: '22%',
      },
      {
        title: '绑定地址',
        dataIndex: 'bzdz',
        key: 'bzdz',
        width: '23%',
      },
      {
        title: '绑定警员',
        dataIndex: 'gxrxm',
        key: 'gxrxm',
        width: '6%',
      },
      {
        title: '地址属性',
        dataIndex: 'dzlx',
        key: 'dzlx',
        width: '7%',
        render: function (text, record) {
          if (record.dzlx == '1') {
            return '标准地址';
          } else if (record.dzlx == '0') {
            return '非标准地址';
          } else if (record.dzlx == '3') {
            return '虚拟地址';
          } else if (record.dzlx == '5') {
            return '历史地址';
          }
        },
      },
      {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
        width: '6%',
        render: function (text, record) {
          return (
            <span>
              {
                record.dzlx != undefined ?
                  <Popconfirm
                    title="是否解绑?"
                    placement="topRight"
                    onConfirm={() => self.handleUnbundling(`${record.id}`)}
                  >
                    <a>解绑</a>
                  </Popconfirm>
                  :
                  <a onClick={() => self.handleShowHosehold(`${record.hh}`)}>绑定</a>

              }
            </span>
          )
        },
      },
    ]
  }

// 获取户号管理列表
  getHouseholdManagementList(currentpage, pagesize) {
    this.props.dispatch(fetchHouseholdManagementList({
      ...this.searchKey,
      currentPage: currentpage,
      pageSize: pagesize,
    }))
  }

// 导出按钮
  exportExcel1() {
    if (this.props.householdManagementListSearchResult.totalCount > 5000) {
      message.info('当前数据大于5000条！');
      return;
    } else if (this.props.householdManagementListSearchResult.totalCount <= 0) {
      message.info('当前数据无可导出数据！');
      return;
    }

    let searchItem = '?';
    searchItem += 'lx=' + `${this.searchKey.lx}`;
    searchItem += '&dzlx=' + `${this.searchKey.dzlx}`;
    searchItem += '&gxdwdm=' + `${this.searchKey.gxdwdm}`;
// 导出必带参数
    searchItem += '&token=' + `${sessionStorage.getItem('token')}`;
    window.open(`${this.props.config.$ctx}/jcjw/hhxx/export.json` + searchItem);
  }

// 解绑
  handleUnbundling(id) {
    this.props.dispatch(fetchUnbundlingHousehold({
      id: id,
    }, () => {
      this.getHouseholdManagementList(this.state.currentpage, this.state.pagesize)
    }))
  }

// 绑定
  handleShowHosehold(hh) {
    this.setState({
      householdVisible: true,
    })
    this.changefield.bindhouseId = hh;
  }

  gFormSubmit(query) {
    if (query.gxdw.length > 0) {
      this.searchKey.gxdwdm = query.gxdw[query.gxdw.length - 1].id;
    } else {
      this.searchKey.gxdwdm = '';
    }

    if (query.dzsx != undefined) {
      switch (query.dzsx.name) {
      case '标准地址':
        this.searchKey.dzlx = 1
        break
      case '非标准地址':
        this.searchKey.dzlx = 0
        break
      case '虚拟地址':
        this.searchKey.dzlx = 3
        break
      case '历史地址':
        this.searchKey.dzlx = 5
        break
      default:
        this.searchKey.dzlx = '';
      }
    }
    if (query.type.length != 0) {
      const typeIndex = query.type.length - 1;
      const typeName = query.type[typeIndex].name;
      switch (typeName) {
      case '已绑定':
        this.searchKey.lx = 3;
        break;
      case '未绑定':
        this.searchKey.lx = 0;
        break;
      case '楼幢':
        this.searchKey.lx = 1;
        break;
      case '房间':
        this.searchKey.lx = 2;
        break
      }
    } else {
      this.searchKey.lx = '';
    }

    this.searchKey.key = query.keyword || '';

    this.setState({
      currentpage: 1,
    })

    this.getHouseholdManagementList(1, this.state.pagesize)
  }

// 点击确定回调函数
  handleOkHosehold(param) {
    this.props.dispatch(fetchBundlingHousehold({
      roomId: param.roomcode,
      bldId: param.buildingcode,
      hh: this.changefield.bindhouseId,
    }, () => {
      this.setState({
        householdVisible: false,
      });
      this.getHouseholdManagementList(this.state.currentpage, this.state.pagesize)
    }))
  }

// 点击取消或遮罩层回调函数
  handleCancelHosehold() {
    this.setState({ householdVisible: false })
  }

// 改变每页显示条数回调函数
  pageSizeChange(e, pageSize) {
    this.setState({
      pagesize: pageSize,
      currentpage: 1,
    })
    this.getHouseholdManagementList(1, pageSize)
  }

// 点击每页回调函数
  pageChange(currentPage) {
    this.setState({
      currentpage: currentPage,
    })
    this.getHouseholdManagementList(currentPage, this.state.pagesize)
  }

// Gfrom配置
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.Gxdw,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwids',
        needNum: false,

      },
      {
        sort: 'superSelect',
        label: '绑定状态',
        items: [
          { name: '已绑定', id: 1, pid: '', lv: 1 },
          { name: '未绑定', id: 2, pid: '', lv: 1 },
          { name: '楼幢', id: 3, pid: '1', lv: 2 },
          { name: '房间', id: 4, pid: '1', lv: 2 },
        ],
        key: 'type',
        needNum: false,
      },
      {
        sort: 'singleSelect',
        label: '地址状态',
        items: [
          { name: '标准地址', id: 1 },
          { name: '非标准地址', id: 2 },
          { name: '虚拟地址', id: 3 },
          { name: '历史地址', id: 4 },
        ],
        key: 'dzsx',
        needNum: false,
      },
    ]
  }

  render() {
    const {
      householdManagementListSearchResult,
      } = this.props;
    const loading = householdManagementListSearchResult.loading ? true : householdManagementListSearchResult.loading;
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="getHouseholdManagement"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={householdManagementListSearchResult.totalCount}
        />
        <div className="gform-next-div">
          <TableList
            columns={this.columns()}
            dataSource={householdManagementListSearchResult.list}
            totalCount={householdManagementListSearchResult.totalCount}
            loading={loading}
            currentPage={householdManagementListSearchResult.pageNo}
            pageSize={householdManagementListSearchResult.pageSize}
            scroll={{ y: true }}
            onShowSizeChange={this.pageSizeChange}
            onChange={this.pageChange}
          />
          <div className="ability-button">
            <Button onClick={this.exportExcel1}>导出数据</Button>
          </div>
          {
            this.state.householdVisible ?
              <RelateAddrModal
                visible={this.state.householdVisible}
                onCancel={this.handleCancelHosehold}
                onOk={this.handleOkHosehold}
                title="户号绑定"
              /> : null
          }
        </div>
      </div>
    )
  }
}
