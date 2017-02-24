/**
 * Created by 叶婷婷
 * 语法检查:19 errors, 1 warning
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Popconfirm, message } from 'antd'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import RelateAddrModal from 'components/relateAddrModal/relateAddrModal'
import getConfigItems from 'utils/getGformConfigItems'
import {
  // 获取二维码列表
  fetchQrcodeManagement,
  // 解绑
  fetchQrcodeUnbundling,
  // 绑定
  fetchQrcodeBind,
} from 'actions/houseVisitPop'


// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取二维码列表
    qrcodeManagementSearchResult: state.qrcodeManagementSearchResult,
  })
)

// 声明组件  并对外输出
export default class index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);

    this.state = {
      qrcodeVisible: false,
      currentpage: 1,
      pagesize: 10,
    };

    // 需要绑定的数据code、barcode
    this.changefield = {
      code: '',
      barcode: '',
    }

    this.searchKey = {
      gxdwdm: '',
      isBindBarcode: '',
      type: '',
      key: '',
    }
    // 导出列表的Excel表格
    this.exportExcel1 = this.exportExcel1.bind(this);
    // 解绑
    this.handleUnbundling = this.handleUnbundling.bind(this);
    // 显示绑定弹窗
    this.handleShowHosehold = this.handleShowHosehold.bind(this);
    // 绑定回调函数
    this.handleOkHosehold = this.handleOkHosehold.bind(this);
    // 隐藏绑定弹窗
    this.handleCancelHosehold = this.handleCancelHosehold.bind(this);
    // 搜索条件回调
    this.gFormSubmit = this.gFormSubmit.bind(this)
    // 改变页面显示个数
    this.pageSizeChange = this.pageSizeChange.bind(this)
    // 翻页
    this.pageChange = this.pageChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.goodsBasicResult(this.state.currentpage, this.state.pagesize);
    getConfigItems(this, {
      GXDW: sessionStorage.getItem('divisionid'),
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
        width: '5%',
      },
      {
        title: '地址',
        dataIndex: 'standardaddress',
        key: 'standardaddress',
        width: '15%',
      },
      {
        title: '二维码',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
      },
      {
        title: '二维码编码',
        dataIndex: 'barcode',
        key: 'barcode',
        width: '8%',
      },
      {
        title: '行政区划',
        dataIndex: 'privilegename',
        key: 'privilegename',
        width: '10%',
      },
      {
        title: '管辖单位',
        dataIndex: 'pcsmc',
        key: 'pcsmc',
        width: '10%',
      },
      {
        title: '绑定警员',
        dataIndex: 'cjr',
        key: 'cjr',
        width: '6%',
      },
      {
        title: '绑定状态',
        dataIndex: 'bdzt',
        key: 'bdzt',
        width: '6%',
        render: function (text, record) {
          return (
            <span>
              {(record.type == '1' || record.type == '2' || record.type != undefined) ? '已绑定' : '未绑定'}
            </span>
          )
        },
      },
      {
        title: '地址类型',
        dataIndex: 'type',
        key: 'type',
        width: '6%',
        render: function (text, record) {
          let html = '';
          if (record.type == '1') {
            html = '楼幢';
          } else if (record.type == '2') {
            html = '房间';
          } else {
            html = '';
          }
          return html;
        },
      },
      {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
        width: '5%',
        render: function (text, record) {
          return (
            <span>
              {
                (record.type == '1' || record.type == '2' || record.type != undefined) ?
                  <Popconfirm
                    title="是否解绑?"
                    placement="topRight"
                    onConfirm={() => self.handleUnbundling(`${record.code}`, `${record.barcode}`, `${record.bldid}`)}
                  >
                    <a>解绑</a>
                  </Popconfirm>
                  : <a onClick={() => self.handleShowHosehold(`${record.code}`, `${record.barcode}`)}>绑定</a>
              }
            </span>
          )
        },
      },
    ]
  }

  // 获取列表数据
  goodsBasicResult(currentpage, pagesize) {
    this.props.dispatch(fetchQrcodeManagement({
      ...this.searchKey,
      currentPage: currentpage,
      pageSize: pagesize,
    }))
  }

  // 改变每页显示条数回调函数
  pageSizeChange(e, pageSize) {
    this.setState({
      currentpage: 1,
      pagesize: pageSize,
    })
    this.goodsBasicResult('1', pageSize)
  }

  // 点击每页回调函数
  pageChange(currentPage) {
    this.setState({
      currentpage: currentPage,
    })
    this.goodsBasicResult(currentPage, this.state.pagesize)
  }

  // 导出按钮
  exportExcel1() {
    if (this.props.qrcodeManagementSearchResult.totalCount > 5000) {
      message.info('当前数据大于5000条！');
      return;
    } else if (this.props.qrcodeManagementSearchResult.totalCount <= 0) {
      message.info('当前数据无可导出数据！');
      return;
    }
    let searchItem = '?';
    searchItem += 'gxdwdm=' + `${this.searchKey.gxdwdm}`;
    searchItem += '&isBindBarcode=' + `${this.searchKey.isBindBarcode}`;
    searchItem += '&type=' + `${this.searchKey.type}`;
    searchItem += '&key=' + `${this.searchKey.key}`;
    searchItem += '&pageSize=' + `${'-1'}`;
    // 导出必带参数
    searchItem += '&token=' + `${sessionStorage.getItem('token')}`;
    window.open(`${this.props.config.$ctx}/jcjw/barcodeManageExpExcel.json` + searchItem);
  }

  // Gfrom配置
  gFormConfig() {
    const { config } = this.props;
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.GXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwid',
        needNum: false,
        needMulti: false,
        needArrowIcon: false,
      },
      {
        sort: 'superSelect',
        label: '绑定状态',
        items: [
          { name: '已绑定', id: 'bd', pid: '', lv: 1 },
          { name: '未绑定', id: 'wbd', pid: '', lv: 1 },
          { name: '楼幢', id: 1, pid: 'bd', lv: 2 },
          { name: '房间', id: 2, pid: 'bd', lv: 2 },
        ],
        key: 'type',
        needNum: false,
      },
    ]
  }

  // Gfrom回调
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

    // 是否绑定，绑定则可选绑定类型，否则无选项
    const isBind = query.type[query.type.length - 1];
    if (isBind != undefined) {
      if (isBind.id == 'wbd') {
        this.searchKey.isBindBarcode = 'wbd';
        this.searchKey.type = ''
      } else {
        this.searchKey.isBindBarcode = 'bd';
        if (isBind.id != 'bd') {
          this.searchKey.type = isBind.id;
        }
      }
    } else {
      this.searchKey.isBindBarcode = '';
      this.searchKey.type = '';
    }

    // 关键词搜索
    this.searchKey.key = query.keyword;

    this.setState({
      currentpage: 1,
    });

    this.goodsBasicResult(1, this.state.pagesize);
  }

  // 解绑
  handleUnbundling(code, barcode, bldid) {
    this.props.dispatch(fetchQrcodeUnbundling({
      code: code,
      barcode: barcode,
      bldid: bldid,
    }, () => {
      this.goodsBasicResult(this.state.currentpage, this.state.pagesize);
    }))
  }

  // 绑定
  handleShowHosehold(code, barcode) {
    this.setState({
      qrcodeVisible: true,
    })
    this.changefield.code = code;
    this.changefield.barcode = barcode;
  }

  // 点击确定回调函数
  handleOkHosehold(param) {
    this.props.dispatch(fetchQrcodeBind({
      code: this.changefield.code,
      barcode: this.changefield.barcode,
      bldid: param.buildingcode,
      fjid: param.roomcode,
      xxdz: param.xzdz,
    }, () => {
      this.setState({
        qrcodeVisible: false,
      })
      this.goodsBasicResult(this.state.currentpage, this.state.pagesize);
    }))
  }

  // 点击取消或遮罩层回调函数
  handleCancelHosehold() {
    this.setState({ qrcodeVisible: false })
  }

  render() {
    const {
      qrcodeManagementSearchResult,
      } = this.props;
    const loading = qrcodeManagementSearchResult.loading ? true : qrcodeManagementSearchResult.loading;
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="qrcodeManagement"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={qrcodeManagementSearchResult.totalCount}
        />
        <br />
        <div className="gform-next-div">
          <TableList
            columns={this.columns()}
            dataSource={qrcodeManagementSearchResult.list}
            totalCount={qrcodeManagementSearchResult.totalCount}
            loading={loading}
            currentPage={qrcodeManagementSearchResult.pageNo}
            pageSize={qrcodeManagementSearchResult.pageSize}
            scroll={{ y: true }}
            onShowSizeChange={this.pageSizeChange}
            onChange={this.pageChange}
          />
          <div className="ability-button">
            <Button className="exportData" onClick={this.exportExcel1}>导出数据</Button>
          </div>
          {
            this.state.qrcodeVisible ?
              <RelateAddrModal
                visible={this.state.qrcodeVisible}
                onCancel={this.handleCancelHosehold}
                onOk={this.handleOkHosehold}
                title="二维码绑定"
              /> : null
          }
        </div>
      </div>
    )
  }
}
