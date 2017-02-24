/**
 * Created by 黄建停---依靠力量列表
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Table, Button, Modal, Select, message } from 'antd'
import Pagination from 'components/pagination/pagination'
import {
  fetchRelyList,
  fetchDeleteDetail,
  fetchExportData,
  fetchAddRelyPower,
} from 'actions/rely'
import 'style/rely.less'
import SavePowerForm from './component/savePowerForm'

const Option = Select.Option;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    relyListSearchResult: state.relyListSearchResult,
    deleteDetailResult: state.deleteDetailResult,
    exportDataResult: state.exportDataResult,
    addRelyPowerResult: state.addRelyPowerResult,
    // peopleSituationResult: state.peopleSituationResult,
    amList: state.amList,
  })
)

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRows: '',
      deleteArr: '',
      visible: false,
      leaveReasonForm: false,
      addPower: false,
      isAddPower: false,
      deleteReason: '自愿离职',
      deleteSuccess: false,
      exportData: false,
      saveSuccess: false,
      defaultChecked: false,
      pleaseChooseOne: false,
      selectedRowKeys: [],
      currentPage: 1,
      counts: 0,
    }
    this.hasDelete = this.hasDelete.bind(this)
    this.deleteSuccessOk = this.deleteSuccessOk.bind(this)
    this.exportDataOk = this.exportDataOk.bind(this)
    this.saveSuccessOk = this.saveSuccessOk.bind(this)
    this.chooseOneOk = this.chooseOneOk.bind(this)
    this.selectChange = this.selectChange.bind(this)
    this.addPowerModal = this.addPowerModal.bind(this)
    this.cancleAdd = this.cancleAdd.bind(this)
    this.importDetail = this.importDetail.bind(this)
    this.addPowerSuccess = this.addPowerSuccess.bind(this)
    this.exportData = this.exportData.bind(this)
    this.deleteModal = this.deleteModal.bind(this)
    this.deleteOk = this.deleteOk.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
    this.reasonChange = this.reasonChange.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }
  // 组件已经加载到dom中
  componentDidMount() { // debugger
    const _self = this
    this.props.dispatch(fetchRelyList({ currentPage: 1, pageSize: 10 }, (res) => {
      if (res) {
        _self.setState({
          counts: res.data.totalCount,
        })
      }
    }))
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '全选',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
        width: '5%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: function (text, record) {
          return (
            <p>
              <span className="left">{text}</span>
              <Link className="right" to={`/pop$/relyDetail/${record.id}`}>详情</Link>
            </p>
          )
        },
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: '6%',
      },
      {
        title: '身份证（证件）号码',
        dataIndex: 'IDcard',
        key: 'IDcard',
        width: '17%',
      },
      {
        title: '政治面貌',
        dataIndex: 'politic',
        key: 'politic',
        width: '6%',
      },
      {
        title: '关注类别',
        dataIndex: 'attentionClass',
        key: 'attentionClass',
        width: '12%',
      },
      {
        title: '电话号码',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: '12%',
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwid',
        key: 'gxdwid',
        width: '12%',
      },
      {
        title: '依靠类别',
        dataIndex: 'type',
        key: 'type',
        width: '17%',
      },

    ]
  }

  // 新增力量
  addPowerModal() {
    this.setState({
      addPower: true,
    });
  }
  addPowerSuccess() {
    this.setState({
      addPower: false,
    });
  }
  importDetail() {
    this.setState({
      addPower: false,
    });
  }
  // 取消新增
  cancleAdd() {
    this.setState({
      addPower: false,
    });
  }

  // 批量删除的调用
  deleteModal() {
    this.setState({
      visible: true,
    });
  }
  // 取消删除
  cancelDelete() {
    // console.log(e);
    this.setState({
      visible: false,
      leaveReasonForm: false,
    });
  }

  // 导出数据
  exportData() {
    // console.log(this.state.counts)
    const urlBase = this.props.config.$ctx// 当前IP
    const token = sessionStorage.getItem('token')
    if (this.state.counts === 0) {
      message.warn('没有查询到数据，无法导出')
      return
    } else if (this.state.counts <= 5000) {
      window.open(`${urlBase}/jcjw/ykll/outputExcel?token=${token}&&type=${1}`)
    } else if (this.state.counts > 5000) {
      message.warn('导出数据不能大于5000条，请先精确筛选条件')
      return
    }
    // const token = sessionStorage.getItem('token')
  }

  // 取消导出数据
  cancelExportData() {
    this.setState({
      exportData: false,
    });
  }

  // 删除依靠力量的title
  deleteTitle() {
    return (
      <p className="leaveFormTitle">
        <span>离职原因</span><Button onClick={this.hasDelete} type="primary" className="leaveFormBt">删除</Button>
      </p>
    )
  }

  // 保存新增并发起请求
  saveRelyPower() {
    this.props.dispatch(fetchAddRelyPower())
    this.setState({
      addPower: false,
      saveSuccess: true,
    });
  }

  // 添加依靠力量的title
  addPowerTitle() {
    return (
      <p className="addPowerTitle">依靠力量</p>
    )
  }

  // 用状态改变选取的项
  select(selectedRows) {
    const arr = [];
    for (const item of Object.keys(selectedRows)) {
      // arr.push(item.id)
      arr.push(selectedRows[item].id)
    }
    this.setState({
      deleteArr: arr.join(','),
    })
  }

  // 是否选中将要删除的条目
  deleteOk() {
    // console.log('Clicked OK');
    if (this.state.deleteArr === '') {
      this.setState({
        visible: false,
        leaveReasonForm: false,
        pleaseChooseOne: true,
      });
    } else {
      this.setState({
        visible: false,
        pleaseChooseOne: false,
        leaveReasonForm: true,
      });
    }
  }

  // 离职原因改变
  reasonChange(e) {
    this.setState({
      deleteReason: e,
    });
  }

  // 获取选中 并赋值给 selectedRowKeys
  selectChange(selectedRowKeys, selectedRows) {
    this.setState({ selectedRowKeys: selectedRowKeys })
    this.select(selectedRows)
  }

  // 确认删除后的调用
  hasDelete() {
    this.setState({
      leaveReasonForm: false,
      deleteSuccess: true,
      defaultChecked: false,
      selectedRowKeys: [],
      deleteArr: '',
    });
    // 删除选取的子项
    this.props.dispatch(fetchDeleteDetail({ idList: this.state.deleteArr, lzyy: 1 }))
  }

  // 成功删除并刷新页面
  deleteSuccessOk() {
    this.setState({
      deleteSuccess: false,
      rowSelection: true,
    });
    this.props.dispatch(fetchRelyList({ currentPage: 1, pageSize: 10 }))
  }
  deleteSuccessFooter() {
    return (<Button type="primary" onClick={this.deleteSuccessOk}>确定</Button>)
  }

  // 确定导出数据
  exportDataOk() {
    this.setState({
      exportData: false,
    });
    window.open(`http://10.118.164.198:8080/jcjw/ykll/outputExcel?type=${1}`)
    this.props.dispatch(fetchExportData({ type: 1 }))
  }
  exportDataFooter() {
    return (<Button type="primary" onClick={this.exportDataOk}>确定</Button>)
  }

  // 保存成功
  saveSuccessOk() {
    this.setState({
      saveSuccess: false,
    });
  }

  // 保存成功的title
  saveSuccessFooter() {
    return (<Button type="primary" onClick={this.saveSuccessOk}>确定</Button>)
  }

  // 选取删除的子项
  chooseOneOk() {
    this.setState({
      pleaseChooseOne: false,
    });
  }

  // 选取删除的子项的title
  chooseOneFooter() {
    return (<Button type="primary" onClick={this.chooseOneOk}>确定</Button>)
  }

  // 选取删除的子项的footer
  deleteFooter() {
    return (<Button type="primary" onClick={this.hasDelete}>确定</Button>)
  }

  // 删除后页面重新加载
  relyListReload() {
    this.setState({
      rowSelection: true,
    })
    this.props.dispatch(fetchRelyList({ currentPage: 1, pageSize: 10 }))
  }

  // 分页改变的调用
  pageSizeChange(e, pageSize) {
    // console.log(e)
    // console.log(pageSize)
    this.setState({
      currentPage: 1,
      pageSize: pageSize,
    })
    this.props.dispatch(fetchRelyList({ currentPage: 1, pageSize: pageSize }))
  }

  showTotal(total) {
    // console.log(total)
    return `共 ${total} 条`
  }

  // 页数改变的调用
  pageChange(currentPage) {
    // console.log(currentPage);
    // pageChange(currentPage);
    this.setState({
      currentPage: currentPage,
    })
    this.props.dispatch(fetchRelyList({ currentPage: currentPage, pageSize: 10 }))
  }

  render() {
    // const _self = this
    const { selectedRowKeys } = this.state
    const {
      relyListSearchResult,
      // peopleSituationResult,
      } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: this.selectChange,
      //代码不能整合成下面的方式
      /*onChange (selectedRowKeys,selectedRows){
       this.setState({selectedRowKeys: selectedRowKeys})
       this.select(selectedRows)
       }*/
    }
    const relyList = []
    relyListSearchResult.list.map((item) => {
      // console.log(item.type.split(';'))
      let type = ''
      for (const n of item.type.split(';')) {
        if (n === '1') {
          type += '志愿者;'
        } else if (n === '2') {
          type += '群防群治;'
        } else if (n === '3') {
          type += '治安信息员;'
        } else if (n === '4') {
          type += '社区（村）干部;'
        } else if (n === '5') {
          type += '社会知名人士;'
        }
      }
      let politic = ''
      if (item.zzmm === '01') {
        politic = '中国共产党员;'
      } else if (item.zzmm === '02') {
        politic = '中国共产党预备员;'
      } else if (item.zzmm === '03') {
        politic = '中国共产主义青年团;'
      } else if (item.zzmm === '04') {
        politic = '中国革命委员会委员;'
      } else if (item.zzmm === '05') {
        politic = '中国民主同盟盟员;'
      } else if (item.zzmm === '06') {
        politic = '中国民主建国会会员;'
      } else if (item.zzmm === '07') {
        politic = '中国民主促进会会员;'
      } else if (item.zzmm === '08') {
        politic = '中国农工民主党党员;'
      } else if (item.zzmm === '09') {
        politic = '中国致公党党员;'
      } else if (item.zzmm === '10') {
        politic = '九三学社社员;'
      } else if (item.zzmm === '11') {
        politic = '台湾民主自治同盟盟员;'
      } else if (item.zzmm === '12') {
        politic = '无党派民主人士;'
      } else if (item.zzmm === '13') {
        politic = '群众;'
      } else if (item.zzmm === '14') {
        politic = '民主党派;'
      }
      relyList.push({
        id: item.id,
        name: item.xm,
        sex: item.xb === 1 ? '男' : '女',
        IDcard: item.sfzh,
        politic: politic,
        attentionClass: item.attentionClass,
        phoneNumber: item.phoneNumber,
        gxdwid: item.gxdwid,
        type: type,
      })
    })
    return (
      <div className="detail-content hjt-relyPower">
        <Table
          columns={this.columns()}
          dataSource={relyList}
          pagination={false}
          loading={relyListSearchResult.loading}
          scroll={{ y: true }}
          rowSelection={rowSelection}
          // select={this.select}
          relyListReload={this.relyListReload}
        />

        <div className="ability-button">
          {/* 新增依靠力量-弹窗*/}
          <Button className="addPowerBt" onClick={this.addPowerModal}>新增依靠力量</Button>
          <div className="modalcontent">
            <Modal visible={this.state.addPower} footer=""
              onCancel={this.cancleAdd} title={this.addPowerTitle()}
              className="modal-header modal-body hjt-formModal"
            >
              <SavePowerForm importDetail={this.importDetail} addPowerSuccess={this.addPowerSuccess} />
            </Modal>
          </div>
          {/* 保存成功-弹窗*/}
          <Modal visible={this.state.saveSuccess} title="消息"
            onOk={this.saveSuccessOk} footer={this.saveSuccessFooter()}
            className="ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">保存成功</p>
          </Modal>
          {/* 请选择要删除的子项-弹窗*/}
          <Modal visible={this.state.pleaseChooseOne} title="消息"
            onOk={this.chooseOneOk} footer={this.chooseOneFooter()}
            className="ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">请选择要删除的子项</p>
          </Modal>
          {/* 导出数据-弹窗*/}
          <Button className="exportData" onClick={this.exportData}>导出数据</Button>
          {/* 批量删除-弹窗*/}
          <Button className="deleteBt" onClick={this.deleteModal}>批量删除</Button>
          <Modal visible={this.state.visible} title="提示"
            onOk={this.deleteOk} onCancel={this.cancelDelete}
            className="hjt-ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">是否删除</p>
          </Modal>
          {/* 批量删除内部表单-弹窗*/}
          <Modal visible={this.state.leaveReasonForm} footer=""
            onCancel={this.cancelDelete} title="离职原因"
            className="hjt-isSure modal-header modal-body modal-small"
            footer={this.deleteFooter()}
          >
            <Select size="large" defaultValue="自愿离职" onChange={this.reasonChange} className="reasonSelect">
              <Option value="自愿离职">自愿离职</Option>
              <Option value="清退">清退</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Modal>
          {/* 删除成功-弹窗*/}
          <Modal visible={this.state.deleteSuccess} title="消息"
            onOk={this.deleteSuccessOk} footer={this.deleteSuccessFooter()}
            className="hjt-ifSure modal-header modal-body modal-small"
          >
            <p className="isDelete">删除成功</p>
          </Modal>

          <Pagination
            showSizeChanger // 是否可以改变pageSize
            onShowSizeChange={this.pageSizeChange}
            onChange={this.pageChange}
            totalCount={relyListSearchResult.totalCount || 0}
            currentPage={this.state.currentPage || 1}
            pageSize={this.state.pageSize || 10}
          />
        </div>

      </div>
    )
  }
}
