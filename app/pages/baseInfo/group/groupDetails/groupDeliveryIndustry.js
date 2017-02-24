/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Checkbox, Button, message } from 'antd';
import {
  fetchBaseInfoDelivery,
  fetchBussinessDelivery,
  fetchOtherDelivery,
  fetchOtherSaveDelivery,
  fetchBussinessSaveDelivery,
  fetchBoxListDelivery,
  fetchBoxDelDelivery,
  fetchBoxAddDelivery,
  fetchBoxGetOneDeliveryInfo,
  fetchBoxUpdateDelivery,
} from 'actions/groupDeliveryIndustry'
import BaseInfo from './jxyType/baseInfo'
import BusinessNode from './jxyType/businessNode'
import Other from './jxyType/other'
import IntelligentBox from './jxyType/intelligentBox'
import BoxInfo from './jxyModal/boxInfo'


// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    baseInfoDeliveryResult: state.baseInfoDeliveryResult,
    businessDeliveryResult: state.businessDeliveryResult,
    otherDeliveryResult: state.otherDeliveryResult,
    businessSaveDeliveryResult: state.businessSaveDeliveryResult,
    otherSaveDeliveryResult: state.otherSaveDeliveryResult,
    boxListDeliveryResult: state.boxListDeliveryResult,
    boxDelDeliveryResult: state.boxDelDeliveryResult,
    boxOneInfoDeliveryResult: state.boxOneInfoDeliveryResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {},
})

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    console.log("11",props)
    this.state = {
      loading: false,
      Visible: false,
      boxId: '',
      type: '',
      BaseInfo: false,
      BusinessNode: false,
      Other: false,
      IntelligentBox: false,
      Sorting: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addBox = this.addBox.bind(this)
    this.updateBox = this.updateBox.bind(this)
    this.deleteInfo = this.deleteInfo.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.cacheOther = this.cacheOther.bind(this)
    this.cacheBusinessNode = this.cacheBusinessNode.bind(this)
    this.otherValue = {}
    this.businessNodeValue = {}
    this.deptId=props.departmentId
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchBaseInfoDelivery({ dptId: this.deptId }))
    this.props.dispatch(fetchBussinessDelivery({ dptId: this.deptId }, () => {
      this.businessNodeValue = this.props.businessDeliveryResult;
    }))
    this.props.dispatch(fetchBoxListDelivery({ dptId:this.deptId }))
    this.props.dispatch(fetchOtherDelivery({ dptId: this.deptId }, () => {
      this.otherValue = this.props.otherDeliveryResult;
    }))
  }

  // 组件接收新的东西
  componentWillReceiveProps(nextProps) {
    if (this.deptId != nextProps.departmentId) {
      this.deptId= nextProps.departmentId
      this.props.dispatch(fetchBaseInfoDelivery({ dptId: this.deptId }))
      this.props.dispatch(fetchBussinessDelivery({ dptId: this.deptId }, () => {
        this.businessNodeValue = this.props.businessDeliveryResult;
      }))
      this.props.dispatch(fetchBoxListDelivery({ dptId:this.deptId }))
      this.props.dispatch(fetchOtherDelivery({ dptId: this.deptId }, () => {
        this.otherValue = this.props.otherDeliveryResult;
      }))
      this.forceUpdate();
    }
  }

  onChange(e) {
    switch (e.target.id) {
    case 'BaseInfo' :
      this.setState({ BaseInfo: e.target.checked })
      break;
    case 'BusinessNode' :
      this.setState({ BusinessNode: e.target.checked })
      break;
    case 'Sorting' :
      this.setState({ Sorting: e.target.checked })
      break;
    case 'IntelligentBox' :
      this.setState({ IntelligentBox: e.target.checked })
      break;
    case 'Other' :
      this.setState({ Other: e.target.checked })
      break;
    default:
      break;
    }
  }

  // 存营业网点数据
  cacheBusinessNode(items) {
    for (const key in items) {
      if (items.hasOwnProperty(key) === true) {
        this.businessNodeValue[key] = items[key].value
      }
    }
  }

  // 存其他数据
  cacheOther(items, checkedValues) {
    for (const key in items) {
      if (items.hasOwnProperty(key) === true) {
        if (key === 'sspp') {
          this.otherValue[key] = items[key].value.join(';')
        } else {
          this.otherValue[key] = items[key].value
        }
      }
    }
  }

  // 保存营业数据和其他数据
  handleSubmit(e) {
    e.preventDefault();
    const otherValue = this.otherValue
    const businessNodeValue = this.businessNodeValue
    if (this.state.BusinessNode) {
      this.props.dispatch(fetchBussinessSaveDelivery({ ...businessNodeValue,dptId: this.deptId }, (result) => {
        message.success(result.msg)
        this.props.dispatch(fetchBussinessDelivery({ dptId: this.deptId }))
      }))
    }
    if (this.state.Other) {
      this.props.dispatch(fetchOtherSaveDelivery({ ...otherValue }, (result) => {
        message.success(result.msg)
        this.props.dispatch(fetchOtherDelivery({ dptId: this.deptId }))
      }))
    }
  }

  addBox() {
    this.setState({ Visible: true, type: 'add' })
  }

  updateBox(id) {
    this.props.dispatch(fetchBoxGetOneDeliveryInfo({ id: id }, () => {
      this.setState({
        Visible: true,
        type: 'modify',
        boxId: id,
      })
    }))
  }

  deleteInfo(id) {
    this.props.dispatch(fetchBoxDelDelivery({ id: id }, () => {
      this.props.dispatch(fetchBoxListDelivery({ dptId: this.deptId }))
    }))
  }

  // form 表单保存后调用
  handleOk(values) {
    if (this.state.type === 'modify') {
      this.props.dispatch(fetchBoxUpdateDelivery({
        ...values,
        dptId: this.deptId,
        id: this.state.boxId,
      }, () => {
        this.props.dispatch(fetchBoxListDelivery({ dptId: this.deptId }))
        this.setState({ Visible: false })
      }))
    } else {
      this.props.dispatch(fetchBoxAddDelivery({ ...values, dptId: this.deptId }, () => {
        this.props.dispatch(fetchBoxListDelivery({ dptId: this.deptId }))
        this.setState({ Visible: false })
      }))
    }
  }

  handleCancel() {
    this.setState({ Visible: false })
  }

  render() {
    const {
      baseInfoDeliveryResult,
      businessDeliveryResult,
      otherDeliveryResult,
      boxListDeliveryResult,
      boxOneInfoDeliveryResult,
    } = this.props
    console.log("12",boxOneInfoDeliveryResult);
    return (
      <div className="nav-second-nextContent">
        <div className="detail-content  group-jxy ">
          <table>
            <tbody>
              <tr>
                <td colSpan="1">寄递业类别</td>
                <td colSpan="4" style={{ textAlign: 'left', padding: '0 5px' }}>
                  <Checkbox onChange={this.onChange} id="BaseInfo">公司行政总部(浙江、宿迁分公司)</Checkbox>
                  <Checkbox onChange={this.onChange} id="BusinessNode">营业网点</Checkbox>
                  <Checkbox onChange={this.onChange} id="Sorting">分拣中心</Checkbox>
                  <Checkbox onChange={this.onChange} id="IntelligentBox">智能快件箱</Checkbox>
                  <Checkbox onChange={this.onChange} id="Other">其他</Checkbox>
                </td>
              </tr>
            </tbody>
          </table>
          {
            this.state.BaseInfo ?
              <BaseInfo title="公司行政总部(浙江、宿迁分公司)" defaVal={baseInfoDeliveryResult} />
            : null
          }
          {
            this.state.BusinessNode ?
              <BusinessNode defaVal={businessDeliveryResult} cacheBusinessNode={this.cacheBusinessNode} />
            : null
          }
          {
            this.state.Sorting ?
              <BaseInfo title="分拣中心" defaVal={baseInfoDeliveryResult} />
            : null
          }
          {
            this.state.IntelligentBox ?
              <IntelligentBox
                dataSource={boxListDeliveryResult}
                updateBox={this.updateBox}
                deleteInfo={this.deleteInfo}
                deptId={this.deptId}
              />
            : null
          }
          {
            this.state.Other ? <Other defaVal={otherDeliveryResult} cacheOther={this.cacheOther} />
            : null
          }
          {
            this.state.Visible ?
              <BoxInfo
                visible={this.state.Visible}
                title={this.state.type === 'add' ? '新增智能快件箱' : '修改智能快件箱'}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                values={boxOneInfoDeliveryResult}
              />
            : null
          }
        </div>
        <div className="ability-button ">
          {
            this.state.IntelligentBox ? <Button type="button" onClick={this.addBox}>新增智能快件箱</Button> : null
          }
          <Button type="button" onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
