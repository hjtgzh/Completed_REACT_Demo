/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Popconfirm } from 'antd';
import TableList from 'components/tableList/tableList'
import '../../jxy.css'

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 组件已经加载到dom中
  componentDidMount() {
  }

  render() {
    const _self = this
    const {
      dataSource,
      deleteInfo,
      updateBox,
    } = this.props

    // 表格展示项的配置
    const columns = [{
      title: '所属品牌公司',
      dataIndex: 'ssppgs',
      key: 'ssppgs',
    }, {
      title: '快件箱地址',
      dataIndex: 'kjxdz',
      key: 'kjxdz',
    }, {
      title: '放置地管理单位',
      dataIndex: 'snxkdw',
      key: 'snxkdw',
    }, {
      title: '放置地负责人',
      dataIndex: 'fzdfzr',
      key: 'fzdfzr',
    }, {
      title: '放置地负责人联系方式',
      dataIndex: 'fzdfzrlxfs',
      key: 'fzdfzrlxfs',
    }, {
      title: '操作',
      key: 'operate',
      render: (text, record, index) => {
        return (
          <span className="a-jxy">
            <a onClick={(e) => updateBox(e, record.id)}>修改</a>
            <span className="ant-divider" />
            <Popconfirm title="删除?" placement="left" onConfirm={(e)=>deleteInfo( record.id)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      },
    }]
    return (
      <div className="intelligentBox">
        <TableList
          columns={columns}
          dataSource={dataSource.list}
          loading={dataSource.loading}
          scroll={{ y: 300 }}
          bordered
        />
      </div>
    )
  }
}
