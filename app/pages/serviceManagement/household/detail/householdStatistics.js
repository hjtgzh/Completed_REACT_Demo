/**
 * Created by 叶婷婷
 * 语法检查: 3 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import TableList from 'components/tableList/tableList'
import Gform from 'components/gForm'
import getConfigItems from 'utils/getGformConfigItems'
import {
  // 获取户号统计列表
  fetchHouseholdStatisticsList,
} from 'actions/household'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取户号统计列表
    householdStatisticsListSearchResult: state.householdStatisticsListSearchResult,
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
    }

    // 搜索条件返回值
    this.gFormSubmit = this.gFormSubmit.bind(this)
    // 导出列表的Excel表格
    this.exportExcel1 = this.exportExcel1.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchHouseholdStatisticsList({
      ...this.searchKey,
    }))
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
        render: (text, recordId, i) => <span>{i + 1}</span>,
        width: '5%',
      },
      {
        title: '管辖单位名称',
        dataIndex: 'gxdwmc',
        key: 'gxdwmc',
        width: '10%',
      },
      {
        title: '绑定房间总数',
        dataIndex: 'roomzs',
        key: 'roomzs',
        width: '10%',
      },
      {
        title: '绑定地址总数',
        dataIndex: 'buildingzs',
        key: 'buildingzs',
        width: '10%',
      },
      {
        title: '总数',
        dataIndex: 'zs',
        key: 'zs',
        width: '10%',
      },
      {
        title: '绑定率',
        dataIndex: 'bdl',
        key: 'bdl',
        width: '10%',
      },
    ]
  }

  // 导出按钮
  exportExcel1() {
    if (this.props.householdStatisticsListSearchResult.list.length > 5000) {
      message.info('当前数据大于5000条！');
      return;
    } else if (this.props.householdStatisticsListSearchResult.list.length <= 0) {
      message.info('当前数据无可导出数据！');
      return;
    }
    let searchItem = '?';
    searchItem += 'gxdwdm=' + `${this.searchKey.gxdwdm}`;
    // 导出必带参数
    searchItem += '&token=' + `${sessionStorage.getItem('token')}`;
    window.open(`${this.props.config.$ctx}/jcjw/hhxx/exportTongJi.json` + searchItem);
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
    this.props.dispatch(fetchHouseholdStatisticsList({
      ...this.searchKey,
    }))
  }

  render() {
    const {
      householdStatisticsListSearchResult,
      } = this.props;
    const loading = householdStatisticsListSearchResult.loading ? true : householdStatisticsListSearchResult.loading;
    return (
      <div className="nav-second-nextContent">
        <Gform
          gFormConfig={this.gFormConfig()}
          cacheKey="householdStatistics"
          gFormSubmit={this.gFormSubmit}
          nums={{}}
          totalCount={householdStatisticsListSearchResult.list.length}
          loading={false}
          needKeyword={false}
        />
        <div className="gform-next-div">
          <TableList
            columns={this.columns()}
            dataSource={householdStatisticsListSearchResult.list}
            loading={loading}
            scroll={{ y: true }}
          />
          <div className="ability-button">
            <Button onClick={this.exportExcel1}>导出数据</Button>
          </div>
        </div>
      </div>
    )
  }
}
