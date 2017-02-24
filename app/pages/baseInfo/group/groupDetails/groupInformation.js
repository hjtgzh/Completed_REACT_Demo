/**
 * Created by 余金彪 on 2016/12/12.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Form, Input, Popconfirm, message, Select, Button, Table, Modal, Spin} from 'antd'
import {regExpConfig} from 'utils/config'
import returnIconBy from 'utils/transformToIcon'
import {
  fetchDetailDepartment,
  fetchDeleteDepartment,
  fetchGetDepartLeader, // 单位管理人员
  fetchDeleteDepartmentLeader, // 删除单位管理人员
  fetchGetLeaderDetail,
  fetchSaveDpt,
  fetchQueryAllRetrieval,
  fetchChangeDptDwlb,
  fetchGetDepartmentByName,
} from 'actions/groupInformation'
import 'style/groupInformation.css'
import AddLabels from './groupInfo/addLabels'
import AddLeaderModal from './groupInfo/addLeaderModal'
import LookLeaderModal from './groupInfo/LookLeaderModal'

const Option = Select.Option;
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
  })
)

export default class groupInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddLeaderModal: false,
      showLookLeaderModal: false,
      visible: false,
      detailModal: false,
      Location: '',
      list: [],
      detailValue: {},
      savaBtn: {},
      dwlb: '',
      selBtn: {},
      searchState: [],
      getUnit: [],
      disabled: true,
      isShowDepatment: false,
      zdwid: '',
      bldid: '',
      csdwDetail: false,
      csdwName: '',
      csdwId: '',
      zdptDetail: false,
      zdptName: '',
      zdptId: '',
      jglb: '',
      loading: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addDeptLeader = this.addDeptLeader.bind(this)// 新增管理人员
    this.onAddLeaderCancle = this.onAddLeaderCancle.bind(this)
    this.onAddLeaderOk = this.onAddLeaderOk.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.showDetailModal = this.showDetailModal.bind(this)
    this.hideDetailModal = this.hideDetailModal.bind(this)
    this.setBtnArr = this.setBtnArr.bind(this)
    this.saveBtn = this.saveBtn.bind(this)
    this.deleteDepartment = this.deleteDepartment.bind(this)
    this.confirm = this.confirm.bind(this)
    this.showDetailModal = this.showDetailModal.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this._selectUnitItem = this._selectUnitItem.bind(this)
    this.departmentList = this.departmentList.bind(this)
  }

  componentDidMount() {
    this.searchDetailDepartment()
    this.getDepartLeader()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.departmentId !== this.props.departmentId) {
      this.searchDetailDepartment(nextProps.departmentId)
    }
  }

  // 查询单位详情
  searchDetailDepartment(id) {
    this.setState({
      loading: true,
    })
    const departmentId = id || this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchDetailDepartment({id: departmentId}, (result) => {
      this.setState({
        bldid: result.data.dpt.bldid,
        loading: false,
      })
      if (result.data.csdw != '' && result.data.csdw != undefined) {
        this.setState({
          csdwDetail: true,
          csdwName: result.data.csdw[0].dwmc,
          csdwId: result.data.csdw[0].id,
          zdptDetail: false,
        })
        this.props.form.setFieldsValue({gldw: result.data.csdw[0].dwmc})
      }
      if (result.data.zdpt != '' && result.data.zdpt != undefined) {
        this.setState({
          zdptDetail: true,
          zdptName: result.data.zdpt.dwmc,
          zdptId: result.data.zdpt.id,
          csdwDetail: false,
        })
        this.props.form.setFieldsValue({gldw: result.data.zdpt.dwmc})
      }
      if (result.data.dpt.dwlb != undefined) {
        this.setState({
          dwlb: result.data.dpt.dwlb,
          jglb: result.data.dpt.jglb,
        })
      } else {
        // this.props.form.setFieldsValue({"dwlb": ""})
        this.setState({
          jglb: '',
          dwlb: '',
        })
      }
      for (const i in result.data.dpt) {
        result.data.dpt[i] = result.data.dpt[i].toString()
      }
      if (result.data.dpt.dwlb != undefined) {
        if (result.data.dpt.dwlb.split(';').indexOf('999902') != -1) {
          sessionStorage.setItem('jdybq', '999902')
        }
      } else {
        sessionStorage.removeItem('jdybq')
      }
      this.props.form.setFieldsValue(result.data.dpt)
      sessionStorage.setItem('dwmc', result.data.dpt.dwmc)
      if (result.data.dpt.sjdz == undefined) {
        sessionStorage.setItem('sjdz', '')
      } else {
        sessionStorage.setItem('sjdz', result.data.dpt.sjdz)
      }
      sessionStorage.setItem('sfxfzddw', result.data.dpt.sfxfzddw)
      this.props.changeType(result.data.dpt)
    }))
  }

// 获取管理人员
  getDepartLeader() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchGetDepartLeader({dwid: departmentId}, (result) => {
      if (result.data) {
        this.setState({
          list: result.data.list,
        })
      }
    }))
  }

  // 新增管理人员
  addDeptLeader() {
    this.setState({showAddLeaderModal: true})
  }

  // 新增管理人员modal取消事件
  onAddLeaderCancle() {
    this.setState({showAddLeaderModal: false})
  }

  // 新增管理人员modal确定事件
  onAddLeaderOk() {
    this.setState({showAddLeaderModal: false})
    this.getDepartLeader()
  }

  // 管理人员modal
  showDetailModal(obj) {
    const self = this
    return function () {
      self.props.dispatch(fetchGetLeaderDetail({id: obj.id}, (result) => {
        if (result.data) {
          self.setState({detailModal: true, detailValue: result.data})
        }
      }))
    }
  }

  // 取消管理人员modal
  hideDetailModal() {
    this.setState({detailModal: false})
    this.getDepartLeader()
  }

  setBtnArr(obj) {
    this.state.selBtn[obj.id] = obj
    this.setState({})
  }

  // 存储已选标签
  saveBtn() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const selBtn = this.state.selBtn
    let dwlb = ''
    for (const n in selBtn) {
      selBtn[n].show ? this.state.savaBtn[n] = selBtn[n] : null
      if (selBtn[n].show == true) {
        dwlb += selBtn[n].id + ';'
      }
    }
    this.setState({visible: false})
    this.props.dispatch(fetchChangeDptDwlb({dwlb: dwlb, id: departmentId}, (result) => {
      message.success(result.msg)
      this.props.dispatch(fetchDetailDepartment({id: departmentId}, (response) => {
        this.searchDetailDepartment()
        this.props.changeType(response.data.dpt)
      }))
    }))
  }

  // 是否显示弹窗
  showModal() {
    const args = {DWSX: ''}
    this.props.dispatch(fetchQueryAllRetrieval({args: JSON.stringify(args)}, (result) => {
      if (this.state.dwlb != undefined && this.state.dwlb != '') {
        const dwlbArr = this.state.dwlb.split(';')
        if (result.data) {
          dwlbArr.map((item, i) => {
            result.data.map((v, j) => {
              if (v.id == item) {
                this.state.selBtn[v.id] = v
                this.state.selBtn[v.id].show = true
              }
            })
          })
        }
      }
      this.setState({searchState: result.data, visible: true})
    }))
  }

  // 取消弹窗
  hideModal() {
    this.setState({visible: false})
  }

  // 删除管理人员
  confirm(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchDeleteDepartmentLeader({id: id}, (result) => {
        message.success(result.msg)
        self.onAddLeaderOk()
      }))
    }
  }

// 转为历史
  deleteDepartment() {
    const self = this
    return function () {
      self.props.dispatch(fetchDeleteDepartment({id: self.props.departmentId}, (result) => {
        message.success(result.msg)
        document.querySelector('.ant-tabs-tab-active .anticon-close').click()
      }))
    }
  }

  // 单位信息保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, fieldsValue) => {
      if (errors) {
        return
      }
      if (fieldsValue.jkttsl != undefined) {
        if (fieldsValue.jkttsl != '') {
          if (!(regExpConfig.num.test(fieldsValue.jkttsl))) {
            message.error('请输入正确的监控探头数量');
            return;
          }
        }
      }
      if (fieldsValue.dwmc == "") {
        message.error('单位名称不能为空')
        return;
      }
      if (fieldsValue.frlxdh != undefined) {
        if (fieldsValue.frlxdh != '') {
          if (!(regExpConfig.mobile.test(fieldsValue.frlxdh))) {
            message.error('请输入正确的法人电话电话号码')
            return;
          }
        }
      }
      if (fieldsValue.cbrlxdh != undefined) {
        if (fieldsValue.cbrlxdh != '') {
          if (!(regExpConfig.mobile.test(fieldsValue.cbrlxdh))) {
            message.error('请输入正确的承包人电话号码')
            return;
          }
        }
      }
      for (let name in fieldsValue) {
        name = name.substring(name.indexOf('i') + 1)
      }

      this.props.dispatch(fetchSaveDpt({
        ...fieldsValue,
        zdwid: this.state.zdwid,
        bldid: this.state.bldid,
        id: this.props.departmentId,
      }, (result) => {
        message.success(result.msg)
        this.props.changeType(fieldsValue)
        this.searchDetailDepartment()
      }))
    });
  }

  columns() {
    const self = this
    return [
      {
        title: '序号',
        key: 'No',
        width: '5%',
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '人员姓名',
        key: 'xm',
        dataIndex: 'xm',
        width: '15%',
      },
      {
        title: '身份证号码',
        key: 'sfzh',
        dataIndex: 'sfzh',
        width: '25%',
      },
      {
        title: '联系方式',
        key: 'dhhm',
        dataIndex: 'dhhm',
        width: '20%',
      },
      {
        title: '人员类型',
        key: 'dwrylx',
        dataIndex: 'dwrylx',
        width: '20%',
        /* render: function (text, record, index) {
         return (<span></span>)
         }*/
      },
      {
        title: '操作',
        key: 'operate',
        width: '20%',
        render: function (text, record, index) {
          return (
            <span>
              <a className="left" onClick={self.showDetailModal(record)}>详情</a>
              <Popconfirm
                title="是否确认删除"
                placement="left"
                onConfirm={self.confirm(record.id)}
              >
                <a className="right">删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]
  }

  // 单位类型选择
  onSelect(value, option) {
    if (value == 2) {
      this.setState({
        disabled: false,
      })
    } else {
      this.setState({
        disabled: true,
      })
      this.props.form.setFieldsValue({gldw: ''})
    }
  }

  // 查询单位列表
  departmentList(e) {
    const dwmc = e.target.value
    if (dwmc == '') {
      this.setState({
        isShowDepatment: false,
      })
    } else {
      this.props.dispatch(fetchGetDepartmentByName({dwmc: dwmc}, (result) => {
        this.setState({
          isShowDepatment: true,
          getUnit: result.data,
        })
      }))
    }
  }

  // 选择查询出来的单位
  _selectUnitItem(id, name) {
    const self = this
    return function () {
      self.props.form.setFieldsValue({gldw: name})
      self.setState({
        isShowDepatment: false,
        zdwid: id,
      })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const departmentId = this.props.departmentId
    return (
      <Spin spinning={this.state.loading}>
        <div className="nav-second-nextContent">
          <div className="groupContent">
            <div className="groupBaseInfo">
              <table className="baseinfo">
                <thead>
                <tr>
                  <th colSpan="10">单位基本信息</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td colSpan="1" className="groupLabel">机构名称</td>
                  <td colSpan="4">
                    {getFieldDecorator('dwmc')(<Input size="small"/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">实际名称</td>
                  <td colSpan="4">
                    {getFieldDecorator('sjmc')(<Input size="small"/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">机构代码</td>
                  <td colSpan="4">
                    {getFieldDecorator('dwbm')(<Input size="small" disabled/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">工商执照代码</td>
                  <td colSpan="4">
                    {getFieldDecorator('gszzhm')(<Input size="small" disabled/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">开设地址</td>
                  <td colSpan="4">
                    {getFieldDecorator('ksdz')(<Input size="small" disabled/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">实际地址</td>
                  <td colSpan="4">
                    {getFieldDecorator('bzdz')(<Input size="small" disabled/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">法人代表</td>
                  <td colSpan="4">
                    {getFieldDecorator('frdb')(<Input size="small"/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">法人电话</td>
                  <td colSpan="4">
                    {getFieldDecorator('frlxdh', {})(<Input size="small"/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">单位状态</td>
                  <td colSpan="4">
                    {getFieldDecorator('dwzt')(
                      <Select placeholder="选择单位状态">
                        <Option value="0">开业</Option>
                        <Option value="1">歇业</Option>
                        <Option value="2">停业</Option>
                        <Option value="3">取缔</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">机构类别</td>
                  <td colSpan="4">
                    <span>{returnIconBy('department', this.state.jglb)}</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">实际承包人</td>
                  <td colSpan="4">
                    {getFieldDecorator('sjcbr')(<Input size="small"/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">承包人联系电话</td>
                  <td colSpan="4">
                    {getFieldDecorator('cbrlxdh', {})(
                      <Input size="small"/>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">信用代码</td>
                  <td colSpan="4">
                    {getFieldDecorator('xydm')(<Input size="small"/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">单位性质</td>
                  <td colSpan="4">
                    {getFieldDecorator('dwxz')(
                      <Select placeholder="选择单位性质">
                        <Option value="08">股份合作</Option>
                        <Option value="04">私营</Option>
                        <Option value="05">合资</Option>
                        <Option value="06">独资</Option>
                        <Option value="07">有限责任</Option>
                        <Option value="01">全民</Option>
                        <Option value="11">公有</Option>
                        <Option value="02">集体</Option>
                        <Option value="12">私有</Option>
                        <Option value="03">个体</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">录入日期</td>
                  <td colSpan="4">
                    {getFieldDecorator('yyrq')(<Input size="small" disabled/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">录入人</td>
                  <td colSpan="4">
                    {getFieldDecorator('addusername')(<Input size="small" disabled/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">录入单位</td>
                  <td colSpan="9">
                    {getFieldDecorator('adduserdpt')(<Input size="small" disabled/>)}
                  </td>
                </tr>
                {
                  this.state.zdptDetail ?
                    <tr>
                      <td colSpan="1" className="groupLabel">主单位</td>
                      <td colSpan="9">
                        <Link to={`/group$/departmentDetail/${this.state.zdptId}`}>{this.state.zdptName}</Link>
                      </td>

                    </tr> : null
                }
                {
                  this.state.csdwDetail ?
                    <tr>
                      <td colSpan="1" className="groupLabel">从属单位</td>
                      <td colSpan="9">
                        <Link to={`/group$/departmentDetail/${this.state.csdwId}`}>{this.state.csdwName}</Link>
                      </td>
                    </tr> : null
                }
                </tbody>
              </table>
              <table className="groupType hide">
                <thead>
                <tr>
                  <th colSpan="10">单位类别</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td colSpan="1" className="groupLabel">三资单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('szqy')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">特业场所</td>
                  <td colSpan="4">
                    {getFieldDecorator('tzhy')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">内保单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('nbdw')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">易受暴恐犯罪侵袭场所</td>
                  <td colSpan="4">
                    {getFieldDecorator('ysbkqxcs')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">大型群众性活动</td>
                  <td colSpan="4">
                    {getFieldDecorator('dxqzxhd')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">经侦单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('jzdw')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">行业单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('hydw')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                </tbody>
              </table>
              <table className="groupAttr">
                <thead>
                <tr>
                  <th colSpan="10">单位属性</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td colSpan="1" className="groupLabel">单位类型</td>
                  <td colSpan="4">
                    {getFieldDecorator('dwlx')(
                      <Select placeholder="" onSelect={this.onSelect}>
                        <Option value="1">独立法人资格</Option>
                        <Option value="2">从属单位</Option>
                        <Option value="3">工商未注册</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">关联主单位</td>
                  <td colSpan="4" style={{position: 'relative'}}>
                    {getFieldDecorator('gldw')(
                      <Input size="small" disabled={this.state.disabled} onChange={this.departmentList}/>
                    )}
                    {
                      this.state.isShowDepatment ?
                        <div className="table-downDiv">
                          <ul>
                            {
                              this.state.getUnit.map((v, i) => {
                                return (<li key={v.id}
                                            onClick={this._selectUnitItem(v.id, v.dwmc)}
                                >{v.dwmc}</li>)
                              })
                            }
                          </ul>
                        </div> : null
                    }
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">是否安装报警系统</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfazbjxt')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">是否配备人防力量</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfpbrfll')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">是否"三合一"单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfshydw')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">是否有证</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfyz')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">是否对外安装监控探头</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfdwanzjktt')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">监控探头数量</td>
                  <td colSpan="4">
                    {getFieldDecorator('jkttsl')(
                      <Input size="small"/>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">是否涉疆</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfsj')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">是否涉藏</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfsz')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">是否设恐单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfsk')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">是否涉日</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfsr')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">是否杭钢涉稳相关</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfhgswxg')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">是否消防重点单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfxfzddw')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                </tbody>
              </table>
              <table className="groupImport">
                <thead>
                <tr>
                  <th colSpan="10">重点单位(部位)类型</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td colSpan="1" className="groupLabel">是否阿语、土耳其语教学培训机构</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfyypxjg')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">是否维族人员开办</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfwzrykb')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">是否维族人员频繁出入</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfwzrypfcr')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                  <td colSpan="1" className="groupLabel">是否雇佣大量维族人员</td>
                  <td colSpan="4">
                    {getFieldDecorator('sfgydlwy')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">非正规伊斯兰教活动点</td>
                  <td colSpan="4">
                    {getFieldDecorator('fzgysljhdd')(
                      <Select placeholder="">
                        <Option value="0">不是</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                </tbody>
              </table>

              <div className="groupLeader">
                <Table columns={this.columns()}
                       dataSource={this.state.list}
                       pagination={false}
                  // scroll = { { x: 1100 } }
                />
              </div>

              <div className="modals">
                {/* 新增修改管理人员modal*/}
                <AddLeaderModal
                  visible={this.state.showAddLeaderModal}
                  addLeaderOk={this.onAddLeaderOk}
                  addLeaderCancle={this.onAddLeaderCancle}
                  departmentId={departmentId}
                />
              </div>

              <div className="modals">
                {/* 查看管理人员modal*/}
                {
                  this.state.detailModal ?
                    <LookLeaderModal
                      visible={this.state.detailModal}
                      lookLeaderCancle={this.hideDetailModal}
                      detailValue={this.state.detailValue}
                      departmentId={departmentId}
                    /> : null
                }

              </div>
            </div>
          </div>
          <div className="ability-button">
            <Button type="button" onClick={this.addDeptLeader}>新增管理人员</Button>
            <Button type="button" onClick={this.showModal}>标签</Button>
            {
              this.state.visible ?
                <Modal className="modal-body" title="单位属性" visible={this.state.visible} onCancel={this.hideModal}
                       onOk={this.saveBtn}
                >
                  <AddLabels selBtn={this.state.selBtn} setBtnArr={this.setBtnArr}
                             searchState={this.state.searchState}
                  />
                </Modal> : null
            }
            <Button type="button" onClick={this.handleSubmit}>保存</Button>
            <Popconfirm title="是否转为历史" onConfirm={this.deleteDepartment()}>
              <Button type="button">转为历史</Button>
            </Popconfirm>
          </div>
        </div>
      </Spin>
    )
  }
}

