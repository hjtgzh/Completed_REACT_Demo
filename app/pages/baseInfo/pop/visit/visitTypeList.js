/**
 * Created by Administrator on 2016/12/27.三实人口列表
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import returnIconBy from 'utils/transformToIcon'
import TypeList from './visitListModal/typeList'

@connect(
  (state, props) => ({
    config: state.config,
    peopleCheckSearchQuery: state.peopleCheckSearchQuery,
    peopleCheckSearchResult: state.peopleCheckSearchResult,
  })
)

export default class visitTypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      // 关联地址显隐
      visibleForContactAddress: false,
      list: [],
    }
  }

  // 表格展示项的配置，设置表头和对应数据中的key值（这里是dataIndex）
  columns() {
    const _self = this
    return [
      {
        title: '序号',
        key: 'index',
        width: 50,
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'base',
        key: 'xm',
        width: 120,
        render: (text, record, index) =>
          (text ? (
            <p>
              <span className="left">{text.xm}</span>
              <Link className="right" to={`/pop$/visitDetail/${record.id}:${record.base.id}`}>详情</Link>
            </p>
          ) : null),
      },
      {
        title: '性别',
        dataIndex: 'xbstr',
        key: 'xb',
        width: 50,
      },
      {
        title: '年龄',
        dataIndex: 'nl',
        key: 'age',
        width: 50,
      },
      {
        title: '身份证（证件）号码',
        dataIndex: 'base',
        key: 'sfzh',
        width: 150,
        render: (text) => text.sfzh,
      },
      {
        title: '户籍类别',
        dataIndex: 'hjlb',
        key: 'hjlxLabel',
        width: 100,
      },
      {
        title: '国家/地区',
        dataIndex: 'base',
        key: 'gjmc',
        width: 100,
        render: (text) => text.gjmc,
      },
      {
        title: '现住地址',
        dataIndex: 'dzmc',
        key: 'zzdz',
        width: 350,
        render: (text, record, index) =>
          (text ? (
            <p>
              <span className="left">{text}</span>
              <Link className="right" to={`/house$Detail/${record.dzbm}`}>详情</Link>
            </p>
          ) : null),
      },
      {
        title: '房间名',
        dataIndex: 'fjmc',
        key: 'fjm',
        width: 120,
        render: (text, record, index) =>
          (text ? (
            <p>
              <span className="left">{text}</span>
              <Link className="right" to={`/house$/room/${record.dzbm}/${record.fjbm}`}>详情</Link>
            </p>
          ) : null),
      },
      // {
      //   title: '登记地址',
      //   dataIndex: 'buildingName',
      //   key: 'buildingName',
      //   width: '14%',
      //   render: function (text, record, index) {
      //     // console.log(record);
      //     return (text)
      //   },
      // },
      {
        title: '管辖单位',
        dataIndex: 'gxdwName',
        key: 'gxdwmc',
        width: 100,
        render: function (text, record, index) {
          // console.log(record);
          return (text)
        },
      },
      {
        title: '关注类别',
        dataIndex: 'base',
        key: 'qgzdry',
        width: 150,
        render: (text, record, index) => returnIconBy('people', text.gkzdry),
      },
      {
        title: '操作',
        key: 'operate',
        // fixed: 'right',
        width: 60,
        render: function (text, record, index) {
          // console.log("text:",text)
          return (
            <a onClick={() => _self.props.showContactAddressModal(record.id)}>入户</a>
          )
        },
      },
    ]
  }

  render() {
    const {
      peopleCheckSearchResult,
    } = this.props
    return (
      <div className="detail-content">
        <TypeList
          columns={this.columns()}
          pagination={false}
          dataSource={peopleCheckSearchResult.list}
          scroll={{ x: 1000, y: true }}
          loading={peopleCheckSearchResult.loading}
        />
      </div>
    )
  }
}
