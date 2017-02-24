/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import {
  fetchInfoHighlyToxic,
  fetchUpdateHighlyToxic,
} from 'actions/groupHighlyToxic'
import Chemistry from './jxyModal/chemistry'

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    infoHighlyToxicResult: state.infoHighlyToxicResult,
  })
)


export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Visible: false,
      dateTime: '', // 发证日期
      category: '', // 许可证使用种类
      checkedValues: [],
      list: [
        {
          id: 1,
          ssppgs: '速易递',
          kjxdz: '3333',
          fzdgldw: '22',
          fzdfzr: '11',
          fzdfzrlxfs: '55',
          ppglfzr: '66',
          ppglfzrlxfs: '77',
          cwgsl: '88',
          kjxgn: '2',
        },
      ],

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchInfoHighlyToxic({ dptId: this.props.departmentId }, () => {
      this.setState({
        dateTime: this.props.infoHighlyToxicResult.fzrq || '',
        category: this.props.infoHighlyToxicResult.xkzsyzl || '',
      })
    }))// this.props.departmentId
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.props.dispatch(fetchInfoHighlyToxic({ dptId: nextProps.departmentId }, () => {
        this.setState({
          dateTime: this.props.infoHighlyToxicResult.fzrq || '',
          category: this.props.infoHighlyToxicResult.xkzsyzl || '',
        })
      }))// this.props.departmentId
    }
  }

  showModal() {
    this.setState({ Visible: true })
  }

  onChangeDate(date, dateString) {
    this.setState({
      dateTime: dateString,
    })
  }

  handleOk(checkedValues) {
    this.setState({
      Visible: false,
      category: checkedValues.join(';'),
    })
  }

  handleCancel() {
    this.setState({ Visible: false })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(fetchUpdateHighlyToxic({
      dptId: this.props.departmentId,
      xkzsyzl: encodeURI(this.state.category),
      fzrq: this.state.dateTime,
    }, () => {
      this.props.dispatch(fetchInfoHighlyToxic({ dptId: this.props.departmentId }))
    }))
  }
  disabledDate(value) {
    if (!value) {
      return false
    }
    return value.valueOf() > moment(new Date()).valueOf()
  }
  render() {
    let checkedValue = [];
    this.state.category.split(';').map((item, index) => {
      if (item !== '') {
        checkedValue.push(item)
      }
    })

    return (
      <div className=" nav-second-nextContent">
        <div className=" group-jxy detail-content">
          <table>
            <tbody>
              <tr>
                <td>许可证使用种类</td>
                <td>
                  <Input onClick={this.showModal} value={this.state.category} readOnly />
                </td>
              </tr>
              <tr>
                <td>发证日期</td>
                <td>
                  <DatePicker
                    disabledDate={this.disabledDate}
                    value={this.state.dateTime ? moment(this.state.dateTime) : null}
                    onChange={this.onChangeDate}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {
          this.state.Visible ?
            <Chemistry
              visible={this.state.Visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              checkedValue={checkedValue}
            />
          : null
        }
        <div className="ability-button">
          <Button type="button" onClick={this.handleSubmit}>保存</Button>
        </div>
      </div>

    )
  }
}
