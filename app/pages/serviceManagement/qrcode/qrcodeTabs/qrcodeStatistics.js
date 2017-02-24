/**
 * Created by 叶婷婷
 * 语法检查:3 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import Gform from 'components/gForm'
import TableList from 'components/tableList/tableList'
import getConfigItems from 'utils/getGformConfigItems'
import {
  // 获取二维码统计数据
  fetchQrcodeStatistics,
} from 'actions/houseVisitPop'


// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取二维码统计数据
    qrcodeStatisticsSearchResult: state.qrcodeStatisticsSearchResult,
  })
)

// 声明组件  并对外输出
export default class index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {};
    this.searchKey = {
      gxdwdm: sessionStorage.getItem('divisionid'),
    };
    // 导出列表的Excel表格
    this.exportExcel1 = this.exportExcel1.bind(this);
    // 搜索条件回调
    this.gFormSubmit = this.gFormSubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.getQrcodeStatistics();
    getConfigItems(this, {
      OGXDW: sessionStorage.getItem('divisionid'),
    })
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        dataIndex: 'index',
        render: (text, record, i) => <span>{i + 1}</span>,
        width: '80px',
      },
      {
        title: '单位',
        dataIndex: 'gxdwmc',
        key: 'gxdwmc',
        width: '100px',
      },
      {
        title: '楼幢',
        children: [
          {
            title: '总数',
            dataIndex: 'bldcount',
            key: 'bldcount',
            width: '100px',
          },
          {
            title: '绑定数',
            dataIndex: 'buildingbarcodecount',
            key: 'buildingbarcodecount',
            width: '100px',
          },
          {
            title: '绑定率',
            dataIndex: 'buildingbdl',
            key: 'buildingbdl',
            width: '100px',
          },
          {
            title: '扫描数',
            dataIndex: 'buildingscancount',
            key: 'buildingscancount',
            width: '100px',
          },
        ],
      },
      {
        title: '单位',
        children: [
          {
            title: '总数',
            dataIndex: 'unitecount',
            key: 'unitecount',
            width: '100px',
          },
          {
            title: '绑定数',
            dataIndex: 'unitebarcodecount',
            key: 'unitebarcodecount',
            width: '100px',
          },
          {
            title: '绑定率',
            dataIndex: 'unitebdl',
            key: 'unitebdl',
            width: '100px',
          },
          {
            title: '扫描数',
            dataIndex: 'unitescancount',
            key: 'unitescancount',
            width: '100px',
          },
        ],
      },
      {
        title: '房间',
        children: [
          {
            title: '总数',
            dataIndex: 'roomcount',
            key: 'roomcount',
            width: '100px',
          },
          {
            title: '绑定数',
            dataIndex: 'roombarcodecount',
            key: 'roombarcodecount',
            width: '100px',
          },
          {
            title: '绑定率',
            dataIndex: 'roombdl',
            key: 'roombdl',
            width: '100px',
          },
          {
            title: '扫描数',
            dataIndex: 'roomscancount',
            key: 'roomscancount',
            width: '100px',
          },
        ],
      },

    ]
  }

  // 获取二维码数据
  getQrcodeStatistics() {
    this.props.dispatch(fetchQrcodeStatistics({
      ...this.searchKey,
    }))
  }

  // 导出按钮
  exportExcel1() {
    if (this.props.qrcodeStatisticsSearchResult.list.length > 5000) {
      message.info('当前数据大于5000条！');
      return;
    } else if (this.props.qrcodeStatisticsSearchResult.list.length <= 0) {
      message.info('当前数据无可导出数据！');
      return;
    }
    let searchItem = '?';
    searchItem += 'gxdwdm=' + `${this.searchKey.gxdwdm}`;
    // 导出必带参数
    searchItem += '&token=' + `${sessionStorage.getItem('token')}`;
    window.open(`${this.props.config.$ctx}/jcjw/barcodeCountExpExcel.json` + searchItem)
  }

  // Gfrom配置
  gFormConfig() {
    const { config } = this.props
    return [
      {
        sort: 'superSelect',
        label: '管辖单位',
        items: config.OGXDW,
        key: 'gxdw',
        numResKey: 'gxdw',
        numReqKey: 'gxdwids',
      },
    ]
  }

  // Gfrom回调
  gFormSubmit(query) {
    if (query.gxdw.length > 0) {
      this.searchKey.gxdwdm = query.gxdw[query.gxdw.length - 1].id;
    } else {
      this.searchKey.gxdwdm = sessionStorage.getItem('divisionid');
    }

    this.getQrcodeStatistics();
  }

  render() {
    const {
      qrcodeStatisticsSearchResult,
      } = this.props;
    const loading = qrcodeStatisticsSearchResult.loading ? true : qrcodeStatisticsSearchResult.loading;
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="qrcodeStatistics"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          loading={false}
          totalCount={qrcodeStatisticsSearchResult.list.length}
          needKeyword={false}
        />
        <div className="gform-next-div">
          <TableList
            columns={this.columns()}
            dataSource={qrcodeStatisticsSearchResult.list}
            loading={loading}
            scroll={{ x: 1000, y: true }}
          />
          <div className="ability-button">
            <Button type="" onClick={this.exportExcel1}>导出数据</Button>
          </div>
        </div>
      </div>
    )
  }
}
