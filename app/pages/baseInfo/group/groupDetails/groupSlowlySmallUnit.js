/**
 * Created by 余金彪 on 2016/12/15.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Button, Table, Form, Input, Select, Popconfirm, Checkbox, message} from 'antd'
import moment from 'moment'
import returnIconBy from 'utils/transformToIcon'
import GroupSlowlySmallAddModal from './groupSlowlySmallUnitModal/groupSlowlySmallAddModal'
import GroupSlowlySmallAddPeo from './groupSlowlySmallUnitModal/groupSlowlySmallAddPeo'
import GroupSlowlySmallRelated from './groupSlowlySmallUnitModal/groupSlowlySmallRelated'
import {
  fetchSlowlySmallUnitInfo,//详情查询
  fetchSlowly,//详情保存
  fetchBindSlowlyIdnumberSearch,//低慢小绑定查询
  fetchUnBindSlowly,//低慢小解绑
  fetchSlowlyDetail,//低慢小物品详情
} from 'actions/groupSlowlySmallUnit'
import {
  fetchDetailDepartment,
} from 'actions/groupInformation'

const CheckboxGroup = Checkbox.Group
const Option = Select.Option
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    getBindSmalByIdnumber: state.getBindSmalByIdnumber, //低慢小绑定查询
    searchSmalDetail: state.searchSmalDetail, //低慢小新增物品详情
  })
)
class groupSlowlySmallUnit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addModal: false,
      related: false,
      openPeoModal: false,
      openRelated: false,
      dmxId: '',
      dptDetail: {},
      czrwpId: "",
      jglb: ''
    }
    this.showModal = this.showModal.bind(this)
    this.relatedArticles = this.relatedArticles.bind(this)
    this.onAddCancel = this.onAddCancel.bind(this)
    this.openModal = this.openModal.bind(this)
    this.showAddPeoModal = this.showAddPeoModal.bind(this)
    this.hideAddPeoModal = this.hideAddPeoModal.bind(this)
    this.clearPeople = this.clearPeople.bind(this)
    this.showRelatedModal = this.showRelatedModal.bind(this)
    this.hideRelatedModal = this.hideRelatedModal.bind(this)
    this.saveDetail = this.saveDetail.bind(this)
    this.showPeople = this.showPeople.bind(this)
    this.searchTabsList = this.searchTabsList.bind(this)
    this.addOk = this.addOk.bind(this)
    this.relatedOk = this.relatedOk.bind(this)
  }

  componentDidMount() {
    this.seacrBindSlowly()
    this.seerchIdnumber()
    this.searchDepartment()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.departmentId != this.props.departmentId) {
      this.seacrBindSlowly(nextProps.departmentId)
      this.seerchIdnumber(nextProps.departmentId)
      this.searchDepartment(nextProps.departmentId)
    }
  }

  //查询低慢小
  seacrBindSlowly(id) {
    const dptId = id || this.props.departmentId;
    this.props.dispatch(fetchSlowlySmallUnitInfo({dptId: dptId}, (data)=> {
      if (data.data != undefined) {
        if (data.data.lx != undefined) {
          data.data.lx = data.data.lx.split(";")
        }
        if (data.data.zrsqd != undefined) {
          data.data.zrsqd = data.data.zrsqd.toString()
        }
        if (data.data.gkdj != undefined) {
          data.data.gkdj = data.data.gkdj.toString()
        }
        /*   var date = new Date(data.data.pcsj);
         var Y = date.getFullYear() + "-"
         var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
         var D = date.getDate() + " "
         var h = date.getHours() + ':'
         var m = date.getMinutes() + ":"
         var s = date.getSeconds();
         if (data.data.pcsj != undefined) {
         data.data.pcsj = Y + M + D + h + m + s
         }*/
        data.data.pcsj = moment(data.data.pcsj)
        this.props.form.setFieldsValue(data.data)
        this.setState({
          dmxId: data.data.id,
        })
      }
    }))
  }

  //查询物品绑定人
  seerchIdnumber(id) {
    const dptId = id || this.props.departmentId;
    this.props.dispatch(fetchBindSlowlyIdnumberSearch({bddwId: dptId}))
  }

  //查询单位信息
  searchDepartment(id) {
    const dptId = id || this.props.departmentId;
    this.props.dispatch(fetchDetailDepartment({id: dptId}, (result)=> {
      result.data.dpt.dwzt = result.data.dpt.dwzt.toString()
      this.setState({
        dptDetail: result.data.dpt,
        jglb: result.data.dpt.jglb
      })
    }))
  }

//低慢小解绑
  clearPeople(id) {
    const self = this
    return function () {
      self.props.dispatch(fetchUnBindSlowly({"id": id}, (result)=> {
        message.success(result.msg)
        self.seerchIdnumber()
      }))
    }
  }

  showRelatedModal() {
    this.setState({
      openRelated: true
    })
  }

  hideRelatedModal() {
    this.props.form.resetFields()
    this.setState({
      openRelated: false
    })
  }

  relatedOk() {
    this.props.form.resetFields()
    this.setState({
      openRelated: false
    })
    this.seerchIdnumber()
  }

  openModal(id) {
    const self = this
    return function () {
      self.setState({
        czrwpId: id,
        openPeoModal: true
      })
    }
  }

  showModal() {
    this.setState({
      addModal: true
    })
  }

  showAddPeoModal() {
    this.setState({
      openPeoModal: true
    })
  }

  hideAddPeoModal() {
    this.setState({
      openPeoModal: false
    })
  }

  onAddCancel() {
    this.setState({
      addModal: false
    })
  }

  relatedArticles() {
    this.setState({
      related: true
    })
  }

  addOk() {
    this.setState({
      addModal: false
    })
    this.seerchIdnumber()
  }

  showPeople(id) {//显示操作人
    const self = this
    return function () {
      self.props.dispatch(fetchSlowlyDetail({wpId: id}))
    }
  }


  saveDetail(e) {//保存
    e.preventDefault();
    this.props.form.validateFields((errors, fieldsValue) => {
      if (errors) {
        return;
      }
      const values = {
        ...fieldsValue,
        'lx': fieldsValue['lx'] ? fieldsValue['lx'].join(";") : '',
      };
      const id = this.state.dmxId;
      const dptId = this.props.departmentId;
      if (id == '') {
        this.props.dispatch(fetchSlowly({...values, dptId: dptId}, (result) => {
          if (result.status == 1) {
            message.success(result.msg)
            this.seacrBindSlowly()
          }
        }))
      } else {
        this.props.dispatch(fetchSlowly({...values, dptId: dptId, id: id}, (result) => {
          if (result.status == 1) {
            message.success(result.msg)
            this.seacrBindSlowly()
          }
        }))
      }
    });
  }

  searchTabsList() {
    this.seerchIdnumber()
  }

  render() {
    const {
      getBindSmalByIdnumber,
      searchSmalDetail,
    }=this.props
    const self = this
    const columns = [
      {
        title: '低慢小序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '低慢小名称',
        dataIndex: 'wpmc',
        key: 'wpmc',
      },
      {
        title: '持有人',
        dataIndex: 'wpcyr',
        key: 'wpcyr',
      },
      {
        title: '持有人身份证',
        dataIndex: 'cyrsfz',
        key: 'cyrsfz',
      },
      {
        title: '操作',
        dataIndex: 'dmxcz',
        key: 'dmxcz',
        render: function (text, record, index) {
          return (
            <span>
              <Popconfirm title="是否解绑?" onConfirm={self.clearPeople(record.wpId)}>
              <a className="left">解绑</a>
            </Popconfirm>
              <a className="right" onClick={ self.openModal(record.wpId) }>增加操作人</a>
            </span>
          );
        }
      },
      {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail',
        render: function (text, record, index) {
          return (
            <span>
              <a className="left" onClick={self.showPeople(record.wpId)}>操作人</a>
                  <Link className="right" to={`/group$/goodsTabs/${record.wpId}`}>详情</Link>
            </span>
          );
        }
      }
    ];
    const articles = [
      {
        title: '操作人序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'czrxm',
        key: 'czrxm',
      },
      {
        title: '身份证',
        dataIndex: 'czrsfz',
        key: 'czrsfz',
      },
      {
        title: '电话',
        dataIndex: 'czrlxdh',
        key: 'czrlxdh',
      },
      {
        title: '工作单位',
        dataIndex: 'czrgzdw',
        key: 'czrgzdw',
      },
      {
        title: '操作时间',
        dataIndex: 'czsj',
        key: 'czsj',
      },
      {
        title: '有无航空器驾驶执照',
        dataIndex: 'ywzz',
        key: 'ywzz',
      },
      {
        title: '执照号',
        dataIndex: 'zzhm',
        key: 'zzhm',
      },

    ];
    const {getFieldDecorator}=this.props.form
    const dptId = this.props.departmentId;
    const options = [
      {label: '销售低慢小网店', value: '1'},
      {label: '销售低慢小实体店', value: '2'},
      {label: '低慢小持有单位	', value: '3'},
      {label: '低慢小生产厂家', value: '4'},
    ]
    return (
      <div className="nav-second-nextContent">
        <div className="groupContent ">
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
                  <span>{this.state.dptDetail.dwmc}</span>
                </td>
                <td colSpan="1" className="groupLabel">实际名称</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.sjmc}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="1" className="groupLabel">机构代码</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.dwbm}</span>
                </td>
                <td colSpan="1" className="groupLabel">工商执照代码</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.gszzhm}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="1" className="groupLabel">开设地址</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.ksdz}</span>
                </td>
                <td colSpan="1" className="groupLabel">实际地址</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.sjdz}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="1" className="groupLabel">法人代表</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.frdb}</span>
                </td>
                <td colSpan="1" className="groupLabel">法人电话</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.frlxdh}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="1" className="groupLabel">单位状态</td>
                <td colSpan="4">
                  <Select disabled placeholder="选择单位状态" value={this.state.dptDetail.dwzt}>
                    <Option value="0">开业</Option>
                    <Option value="1">歇业</Option>
                    <Option value="2">停业</Option>
                    <Option value="3">取缔</Option>
                  </Select>
                </td>
                <td colSpan="1" className="groupLabel">机构类别</td>
                <td colSpan="4">
                  <span>{returnIconBy('department', this.state.jglb)}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="1" className="groupLabel">实际承包人</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.sjcbr}</span>
                </td>
                <td colSpan="1" className="groupLabel">承包人联系电话</td>
                <td colSpan="4">
                  <span>{this.state.dptDetail.cbrlxdh}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="groupBaseInfo">
            <Form onSubmit={this.saveDetail}>
              <table className="baseinfo">
                <thead>
                <tr>
                  <th colSpan="10">低慢小单位信息</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td colSpan="1" className="groupLabel">种类</td>
                  <td colSpan="4">
                    {getFieldDecorator('lx')(<CheckboxGroup
                      onChange={this.onChange}
                      options={options}
                    />)}
                  </td>
                  <td colSpan="1" className="groupLabel">低慢小管理员</td>
                  <td colSpan="4">
                    {getFieldDecorator('gly')(<Input size="small"/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">身份证号</td>
                  <td colSpan="4">
                    {
                      getFieldDecorator('glysfz', {})(
                        <Input placeholder="" disabled={true}/>
                      )
                    }
                  </td>
                  <td colSpan="1" className="groupLabel">联系电话</td>
                  <td colSpan="4">
                    {getFieldDecorator('glylxdh')(<Input size="small"/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">现住地</td>
                  <td colSpan="4">
                    {getFieldDecorator('xzd')(<Input size="small"/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">责任书签订情况</td>
                  <td colSpan="4">
                    {getFieldDecorator('zrsqd')(
                      <Select placeholder="">
                        <Option value="0">否</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">排查单位</td>
                  <td colSpan="4">
                    {getFieldDecorator('pcdw')(<Input size="small" disabled={true}/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">排查民警</td>
                  <td colSpan="4">
                    {getFieldDecorator('pcmj')(<Input size="small" disabled={true}/>)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="1" className="groupLabel">排查时间</td>
                  <td colSpan="4">
                    {getFieldDecorator('pcsj')(<Input size="small" disabled={true}/>)}
                  </td>
                  <td colSpan="1" className="groupLabel">管控等级</td>
                  <td colSpan="4">
                    {getFieldDecorator('gkdj')(
                      <Select placeholder="">
                        <Option value="1">一级</Option>
                        <Option value="2">二级</Option>
                        <Option value="3">三级</Option>
                      </Select>
                    )}
                  </td>
                </tr>
                </tbody>
              </table>
            </Form>
          </div>
          <Table
            columns={columns}
            bordered
            dataSource={getBindSmalByIdnumber.data}
            pagination={false}
          />
          <Table
            columns={articles}
            bordered
            dataSource={searchSmalDetail.data}
            pagination={false}
          />
          {
            <GroupSlowlySmallAddModal
              visible={this.state.addModal}
              showModal={this.showModal}
              onCancel={this.onAddCancel}
              onOk={this.addOk}
              dptId={dptId}
            />
          }
          {
            <GroupSlowlySmallAddPeo
              visible={this.state.openPeoModal}
              showAddPeoModal={this.showAddPeoModal}
              onCancel={this.hideAddPeoModal}
              dptId={dptId}
              czrwpId={this.state.czrwpId}
            />
          }
          {
            <GroupSlowlySmallRelated
              visible={this.state.openRelated}
              showAddPeoModal={this.showRelatedModal}
              onCancel={this.hideRelatedModal}
              dptId={dptId}
              onOk={this.relatedOk}
            />
          }
        </div>
        <div className="ability-button">
          <Button onClick={this.showModal}>新增物品</Button>
          <Button onClick={this.showRelatedModal}>关联物品</Button>
          <Button onClick={this.saveDetail}>保存</Button>
        </div>
      </div>
    )
  }
}
export default  groupSlowlySmallUnit = Form.create({})(groupSlowlySmallUnit)

