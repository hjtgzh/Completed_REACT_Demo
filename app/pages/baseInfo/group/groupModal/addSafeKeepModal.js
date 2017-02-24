/**
 * Created by 叶婷婷
 * 语法检查： 3 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Select, Modal, Input, Form, Row, Col, DatePicker } from 'antd'
import { regExpConfig } from 'utils/config'
import {
  // 获取安全防范详情
  fetchSafeKeepDetail,
  // 新增安全防范数据
  fetchAddSafeKeep,
  // 修改安全防范数据信息
  fetchUpdateSafeKeep,
} from 'actions/houseVisitPop'
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create({
  onFieldsChange(props, items) {},
})

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取安全防范详情
    safeKeepDetailSearchResult: state.safeKeepDetailSearchResult,
  })
)
export default class index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    };

    // 取消新增/修改安全防范数据
    this.handleCancel = this.handleCancel.bind(this);
    // 提交新增/修改数据
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // 处于编辑状态时，将数据赋予编辑框内
    if (this.props.state != 'add') {
      this.props.dispatch(fetchSafeKeepDetail({ id: this.props.updateId }, () => {
        const data = this.props.safeKeepDetailSearchResult;
        this.props.form.setFieldsValue({
          ssmc: data.ssmc ? data.ssmc : '',
          sszl: data.sszl ? data.sszl : '',
          tzze: data.tzze ? data.tzze : '',
          azbw: data.azbw ? data.azbw : '',
          lwqk: data.lwqk != undefined ? data.lwqk.toString() : '',
          azsj: (data.azsjStr ? moment(data.azsjStr) : null),
          sl: data.sl ? data.sl : '',
          xh: data.xh ? data.xh : '',
          jxqk: data.jxqk ? data.jxqk : '',
          bz: data.bz ? data.bz : '',
        })
      }))
    }
  }

  // 设施种类下拉配置
  sszlItem() {
    return [
      { code: '1', sszl: '视频监控' },
      { code: '2', sszl: '入侵报警' },
      { code: '3', sszl: '紧急报警' },
      { code: '4', sszl: '实时录音' },
      { code: '5', sszl: '物防设施' },
      { code: '9', sszl: '其他' },
    ]
  }

  // 联网情况下拉配置
  lwqkItem() {
    return [
      { code: '1', lwqk: '本地监控' },
      { code: '2', lwqk: '110报警联网' },
      { code: '3', lwqk: '其他联网' },
      { code: '4', lwqk: '无联网' },
    ]
  }

  // 取消新增/修改安全防范数据
  handleCancel(e) {
    this.props.cancle();
  }

  // 保存
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.setState({ loading: true });
      const values = {
        ...fieldsValue,
        azsj: fieldsValue.azsj ? fieldsValue.azsj.format('YYYY-MM-DD') : '',
      };
      if (this.props.state != 'add') {
        this.props.dispatch(fetchUpdateSafeKeep({ ...values, dptId: this.props.dptId, id: this.props.updateId }, () => {
          this.commonhandle();
        }))
      } else {
        this.props.dispatch(fetchAddSafeKeep({ ...values, dptId: this.props.dptId }, (result) => {
          this.commonhandle();
        }))
      }
    });
  }

  // 新增/修改成功后公共操作
  commonhandle() {
    this.setState({ loading: false });
    this.props.form.resetFields();
    this.props.handleOk();
  }

  // 底部按钮
  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>保存</Button>
        <Button onClick={this.handleCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const {
      getFieldDecorator,
      } = this.props.form;

    const infItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    return (
      <Modal
        className="modal-body modal-header "
        footer={this.footer()}
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.handleCancel}
      >
        <Form>
          <Row>
            <Col span="24">
              <FormItem {...infItemLayout} label="设施名称" hasFeedback>
                {getFieldDecorator('ssmc',
                  {
                    rules: [{ required: true, message: '请输入设施名称!' }],
                  }
                )(
                  <Input type="text" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="设施种类">
                {getFieldDecorator('sszl', { initialValue: '1' })(
                  <Select>
                    {this.sszlItem().map((v, i) => <Option value={v.code} key={v.code}>{v.sszl}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="投资总额" hasFeedback>
                {getFieldDecorator('tzze', {
                  rules: [
                    { pattern: regExpConfig.num, message: '投资总额格式不正确' },
                  ],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="安装部位" hasFeedback>
                {getFieldDecorator('azbw', {})(
                  <Input type="text" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="联网情况">
                {getFieldDecorator('lwqk', { initialValue: '1' })(
                  <Select>
                    {this.lwqkItem().map((v, i) => <Option value={v.code} key={v.code}>{v.lwqk}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="安装时间">
                {getFieldDecorator('azsj', {})(
                  <DatePicker showTime format="YYYY-MM-DD" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="数量" hasFeedback>
                {getFieldDecorator('sl', {
                  rules: [
                    { pattern: regExpConfig.isNumAndThanZero, message: '数量格式不正确' },
                  ],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="型号" hasFeedback>
                {getFieldDecorator('xh', {})(
                  <Input type="text" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="检修情况" hasFeedback>
                {getFieldDecorator('jxqk', {})(
                  <Input type="text" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...infItemLayout} label="备注" hasFeedback>
                {getFieldDecorator('bz', {})(
                  <Input type="text" maxLength="200" />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}
