/**
 * Created by 叶婷婷
 * 语法检查： 1 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, message } from 'antd'
import moment from 'moment'
import {
  fetchSecurityDetail,
  fetchSecurityAdd,
} from 'actions/security'
import '../style.css'

const FormItem = Form.Item

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    securityDetailSearchResult: state.securityDetailSearchResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {
  },
})

// 声明组件  并对外输出
export default class caseReview extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {}
    this.regular = {
      securityId: this.props.securityId || this.props.params.securityId || 1,
    }
    // 保存
    this.handlesubmit = this.handlesubmit.bind(this)
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.securityId != this.props.securityId) {
      this.regular.securityId = nextProps.securityId;
      this.props.dispatch(fetchSecurityDetail({id: this.regular.securityId}))
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchSecurityDetail({id: this.regular.securityId}))
  }

  // 保存
  handlesubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, Values) => {
      this.props.dispatch(fetchSecurityAdd({...Values, caseId: this.regular.securityId}, () => {
        this.props.form.resetFields()
      }))
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      securityDetailSearchResult,
      } = this.props
    return (
      <div className="nav-second-nextContent">
        <div className="peopleDetail-info">
          <Form>
            <FormItem>
              <table className="table-review-trf">
                <tbody>
                <tr>
                  <td colSpan="2" className="table-review-title-ytt">
                    {securityDetailSearchResult.ajlb}
                  </td>
                </tr>
                <tr>
                  <td>案件编号：</td>
                  <td>{securityDetailSearchResult.ajbh}</td>
                </tr>
                <tr>
                  <td>案发时间：</td>
                  <td>{moment(securityDetailSearchResult.fssj).format('YYYY-MM-DD')}</td>
                </tr>
                <tr>
                  <td>案发地点：</td>
                  <td>{securityDetailSearchResult.afdz}</td>
                </tr>
                <tr>
                  <td>简要案情：</td>
                  <td>{securityDetailSearchResult.jyaq}</td>
                </tr>
                <tr>
                  <td>回访记录：</td>
                  <td>
                    {getFieldDecorator('hfnr')(
                      <Input type="textarea" name="hfnr" autosize={{ minRows: 10, maxRows: 14 }}/>
                    )}
                  </td>
                </tr>
                </tbody>
              </table>
            </FormItem>
          </Form>
        </div>
        <div className="ability-button">
          <Button onClick={this.handlesubmit}>保存</Button>
        </div>
      </div>
    )
  }
}
