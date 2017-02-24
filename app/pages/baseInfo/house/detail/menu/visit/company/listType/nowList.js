/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment';
import TableList from 'components/tableList/tableList'

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // debugger
  }

  render() {
    const {
      dataSource,
      loading,
      } = this.props

    // 表格展示项的配置
    const columns = [
      {
        title: '序号',
        key: 'index',
        width: 50,
        render: (text, record, index) => <span>{index + 1}</span>,
      }, {
        title: '单位名称',
        dataIndex: 'dwmc',
        key: 'dwmc',
        // width:10,
        render: (text, record, index) => (
          <p>
            <span className="left">{text}</span>
            <Link className="right" to={`/group$/departmentDetail/${record.id}`}>详情</Link>
          </p>
        ),
      }, {
        title: '法人代表',
        dataIndex: 'frdb',
        key: 'frdb',
        width: '20%',
      }, {
        title: '法人联系电话',
        dataIndex: 'frlxdh',
        key: 'frlxdh',
        width: '20%',
      }, {
        title: '访查日期',
        dataIndex: 'fcsj',
        key: 'fcsj',
        width: '20%',
        render: (text, record, index) => {
          { moment('2015-06-04') }
        },
      },
    ]
    return (
      <TableList
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: true }}
        loading={loading}
      />
    )
  }
}
