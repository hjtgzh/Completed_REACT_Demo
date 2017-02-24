/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { Table } from 'antd';
import RoleCheckbox from './RoleCheckbox';
import Map from './Map';

export default class RoleApplicationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirst: true,
    };
    this.addColName = this.addColName.bind(this);
    this.addDataPid = this.addDataPid.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.addChildrenRow = this.addChildrenRow.bind(this);
    this.addParentCol = this.addParentCol.bind(this);
    this.setCheckboxValues = this.setCheckboxValues.bind(this);
    this.sendCheckData = this.sendCheckData.bind(this);
    this.checkboxIdMapState = new Map()
    this.parentCol = new Map()
    this.childrenRow = new Map()
  }

  componentDidMount() {
    this.addDataPid(this.props.dataSource)
    if (this.props.checkedId) {
      this.setCheckboxValues(this.props.checkedId)
    }
  }

  componentWillReceiveProps() {
    this.addDataPid(this.props.dataSource)
    if (this.props.checkedId) {
      this.setCheckboxValues(this.props.checkedId)
    }
  }

  setCheckboxValues(value) {
    const checkboxIdMapState = this.checkboxIdMapState
    if (value.length != 0) {
      for (let i = 0; i < value.length; i++) {
        checkboxIdMapState.put(value[i], true)
      }
    }
    this.sendCheckData();
  }

  addColName(appData) {
    if (appData) {
      const keySet = this.childrenRow.keySet()
      for (const key in keySet) {
        if (this.childrenRow.get(keySet[key]) && this.childrenRow.get(keySet[key]).length) {
          this.childrenRow.get(keySet[key]).length = 0
        }
      }
      this.addChildrenRow(appData)
      this.addParentCol()
    }
  }

  addDataPid(appData) {
    if (!appData) return
    for (let i = 0; i < appData.length; ++i) {
      const cid = appData[i].id
      this.checkboxIdMapState.put(cid, false)
      this.addDataPid(appData[i].children)
    }
  }

  addChildrenRow(appData) {
    if (!appData) return;
    for (let i = 0; i < appData.length; ++i) {
      const curRowHeadCheckboxId = appData[i].id
      const childrenRow = this.childrenRow
      if (!childrenRow.get(curRowHeadCheckboxId)) {
        childrenRow.put(curRowHeadCheckboxId, [])
      }
      this.addChildrenRow(appData[i].children);
      childrenRow.get(curRowHeadCheckboxId).push(curRowHeadCheckboxId)
      if (appData[i].children) {
        for (let j = 0; j < appData[i].children.length; ++j) {
          const childCurRowHeadCheckboxId = appData[i].children[j].id
          const descendants = childrenRow.get(childCurRowHeadCheckboxId)
          for (let k = 0; k < descendants.length; ++k) {
            childrenRow.get(curRowHeadCheckboxId).push(descendants[k])
          }
        }
      }
    }
  }

  addParentCol() {
    const parentCol = this.parentCol
    const childrenRow = this.childrenRow
    const keySet = this.childrenRow.keySet()
    for (let i = 0; i < keySet.length; ++i) {
      parentCol.put(keySet[i], [])
      for (let q = 0; q < keySet.length; q++) {
        const childrenRowNum = childrenRow.get(keySet[q])
        for (let j = 0; j < childrenRowNum.length; j++) {
          if (keySet[i] == childrenRowNum[j]) {
            parentCol.get(keySet[i]).push(keySet[q])
          }
        }
      }
    }
  }

  onChecked(cid, checked) {
    const checkboxIdMapState = this.checkboxIdMapState
    const childrenRow = this.childrenRow
    const parentCol = this.parentCol
    const rowHeadCheckboxIds = childrenRow.get(cid)
    for (let i = 0; i < rowHeadCheckboxIds.length; ++i) {
      checkboxIdMapState.put(rowHeadCheckboxIds[i], checked)
    }
    if (checked == true) {
      const parentColCheckboxIds = parentCol.get(cid)
      for (let i = 0; i < parentColCheckboxIds.length; ++i) {
        checkboxIdMapState.put(parentColCheckboxIds[i], true)
      }
    }
    this.setState({})
    this.sendCheckData();
  }

  sendCheckData() {
    const checkboxIdMapState = this.checkboxIdMapState
    const keySet = this.childrenRow.keySet()
    let result = ''
    for (let i = 0; i < keySet.length; ++i) {
      if (checkboxIdMapState.get(keySet[i]) == true) {
        result += (keySet[i] + ',')
      }
    }
    this.props.onChenckModify(result)
  }

  render() {
    const {
      dataSource,
      scroll,
    } = this.props
    const checkboxIdMapState = this.checkboxIdMapState
    const self = this
    // 对应用的数据进行一个简单的处理
    this.addColName(dataSource)
    const btnGroupColumns = [
      {
        title: '功能',
        dataIndex: 'name',
        key: 'name',
        render: function (text, record, index) {
          return (
            <span>
              <RoleCheckbox
                cid={record.id}
                onChecked={self.onChecked}
                checked={checkboxIdMapState.get(record.id)}
              />
              {text}
            </span>
          )
        },
      },
    ]

    return (
      <div className="detail-content tree-jxy maTop-jxy">
        <Table
          columns={btnGroupColumns}
          dataSource={dataSource}
          pagination={false}
          scroll={scroll}
          bordered
          rowKey="id"
        />
      </div>
    );
  }
}
