/**
 * Created by 叶婷婷
 * 语法检查：3 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Row, Col, DatePicker, Spin } from 'antd'
import moment from 'moment'
import Panel from 'components/panel'
import {
  updateTabList,
} from 'actions/tabList'
import {
  // 获取从业人员详情接口
  fetchpeopleDetails,
  // 更新从业人员信息
  updatePeopleDetails,
  // 获取从业人员头像
  fetchpeoplePic,
} from 'actions/job'
import DeletePopWindow from './jobModal/deletePopWindow'
import './style.css'

const FormItem = Form.Item;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 从业人员详情
    peopleDetailsSearchResult: state.peopleDetailsSearchResult,
    // 人员头像
    peoplePicSearchResult: state.peoplePicSearchResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {
  },
})

export default class peopleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletePopVisible: false,
    };
    this.regular = {
      jobId: this.props.jobId || this.props.params.jobId || 1,
    };
    // 保存从业人员详情
    this.handleSubmit = this.handleSubmit.bind(this);
    // 隐藏删除从业人员窗口
    this.canceladd = this.canceladd.bind(this);
    // 显示删除从业人员窗口
    this.handleReset = this.handleReset.bind(this);
    // 确定删除从业人员
    this.OkaddData = this.OkaddData.bind(this);
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.jobId != this.props.params.jobId) {
      this.regular.jobId = nextProps.params.jobId;
      this.goodsBasicResult(nextProps.params.jobId);
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
      // 若非嵌套，则执行
      const location = this.props.location.pathname
      this.props.dispatch(updateTabList({
        title: '从业人员详情',
        key: `${location}`,
      }))
    }
    this.goodsBasicResult(this.regular.jobId);
  }

  // 获取从业人员详情
  goodsBasicResult(jobId) {
    this.props.dispatch(fetchpeopleDetails({ id: jobId }, () => {
      const data = this.props.peopleDetailsSearchResult;
      this.getPic(data.sfzh, data.baseid);
      this.props.form.setFieldsValue({
        dwmc: data.dwmc ? data.dwmc : '', // （单位） 公司名称
        zw: data.zw ? data.zw : '', // 职务 zw
        gzbm: data.gzbm ? data.gzbm : '', // 工作部门 gzbm
        bm: data.bm ? data.bm : '', // 别名绰号 bm
        hksx: data.hksx ? data.hksx : '', // 户籍省县 hksx
        hkxz: data.hkxz ? data.hkxz : '', // 户籍详址 hkxz
        bzzw: data.bzzw ? data.bzzw : '', // 备注职务 bzzw
        prsj: (data.prsj ? moment(data.prsj) : null), // 聘任时间 prsj
        jpsj: (data.jpsj ? moment(data.jpsj) : null), // 解聘时间 jpsj
      });
    }));
  }

  // 获取从业人员头像
  getPic(sfzh, baseid) {
    this.props.dispatch(fetchpeoplePic({ sfzh: sfzh, baseid: baseid }))
  }

  // 户籍类别
  hjlxItem() {
    return [
      { code: '1', hjlx: '常住人口' },
      { code: '2', hjlx: '暂住人口' },
      { code: '3', hjlx: '境外人口' },
    ]
  }

  // 保存从业人员详情
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        jpsj: fieldsValue.jpsj ? fieldsValue.jpsj.format('YYYY-MM-DD') : '',
        prsj: fieldsValue.prsj ? fieldsValue.prsj.format('YYYY-MM-DD') : '',
      };
      this.props.dispatch(updatePeopleDetails({ ...values, id: this.regular.jobId }))
    });
  }

  // 显示离职原因弹窗
  handleReset() {
    this.setState({
      deletePopVisible: true,
    });
  }

  // 确定删除从业人员，并关闭页卡
  OkaddData() {
    this.setState({
      deletePopVisible: false,
    });
    document.querySelector('.ant-tabs-tab-active .anticon-close').click();
  }

  // 隐藏删除从业人员窗口
  canceladd() {
    this.setState({
      deletePopVisible: false,
    });
  }

  render() {
    const {
      getFieldDecorator,
      } = this.props.form;
    const {
      peopleDetailsSearchResult,
      peoplePicSearchResult,
      } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    const infItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
    return (
      <Panel>
        <Spin spinning={peopleDetailsSearchResult.loading}>
          <div className="nav-second-nextContent">
            <div className="peopleDetail-info">
              <div className="peopleInfo-basic-trf">
                <div className="imgs-trf">
                  <img src={peoplePicSearchResult.photopath} alt="" />
                </div>
                <div className="basic-trf">
                  <Form>
                    <Row gutter={16}>
                      <Col span="24">
                        <FormItem {...infItemLayout} label="姓名">
                          <span>{peopleDetailsSearchResult.xm}</span>
                        </FormItem>
                      </Col>
                      <Col span="24">
                        <FormItem {...infItemLayout} label="性别">
                          <span>{peopleDetailsSearchResult.xb}</span>
                        </FormItem>
                      </Col>
                      <Col span="24">
                        <FormItem {...infItemLayout} label="身份证号码">
                          <span>{peopleDetailsSearchResult.sfzh}</span>
                        </FormItem>
                      </Col>
                      <Col span="24">
                        <FormItem {...infItemLayout} label="国籍">
                          <span>{peopleDetailsSearchResult.gj}</span>
                        </FormItem>
                      </Col>
                      <Col span="24">
                        <FormItem {...infItemLayout} label="联系方式">
                          <span>{peopleDetailsSearchResult.dhhm}</span>
                        </FormItem>
                      </Col>
                      <Col span="24">
                        <FormItem {...infItemLayout} label="户籍类别">
                          {this.hjlxItem().map((v) => {
                            if (peopleDetailsSearchResult.hjlx == v.code) {
                              return v.hjlx;
                            }
                          })}
                        </FormItem>
                      </Col>
                      <Col span="24">
                        <FormItem {...infItemLayout} label="关注类别">
                          <span>{peopleDetailsSearchResult.gkzdry}</span>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
              <div className="peopleInfo-edit-trf">
                <Form>
                  <Row>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="（单位） 公司名称">
                        {getFieldDecorator('dwmc')(
                          <Input type="text" name="dwmc" maxLength="100" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="职务">
                        {getFieldDecorator('zw')(
                          <Input type="text" name="zw" maxLength="100" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="工作部门">
                        {getFieldDecorator('gzbm')(
                          <Input type="text" name="gzbm" maxLength="100" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="别名绰号">
                        {getFieldDecorator('bm')(
                          <Input type="text" name="bm" maxLength="100" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="户籍省县">
                        {getFieldDecorator('hksx')(
                          <Input type="text" disabled name="hksx" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="户籍详址">
                        {getFieldDecorator('hkxz')(
                          <Input type="text" disabled name="hkxz" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="备注职务">
                        {getFieldDecorator('bzzw')(
                          <Input type="text" name="bzzw" maxLength="100" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="聘任时间">
                        {getFieldDecorator('prsj')(
                          <DatePicker showTime format="YYYY-MM-DD" />
                        )}
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem {...formItemLayout} label="解聘时间">
                        {getFieldDecorator('jpsj')(
                          <DatePicker showTime format="YYYY-MM-DD" />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
            <div className="ability-button">
              <Button onClick={this.handleSubmit}>保存</Button>
              <Button onClick={this.handleReset}>删除</Button>
              {
                this.state.deletePopVisible ?
                  <DeletePopWindow
                    visible={this.state.deletePopVisible}
                    title={"离职原因"}
                    handleOk={this.OkaddData}
                    handleCancel={this.canceladd}
                    popId={this.regular.jobId}
                  />
                  : null
              }
            </div>
          </div>
        </Spin>
      </Panel>
    )
  }
}
