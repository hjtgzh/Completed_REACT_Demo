/**
 * Created by 叶婷婷
 * 语法检查: 20 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Row, Col, Input, Select, DatePicker, message } from 'antd'
import moment from 'moment'
import { regExpConfig } from 'utils/config'
import {
  // 获取数据详情
  fetchGoodsBasic,
  // 解除绑定
  fetchUnbundlingGoodsdetail,
  // 修改数据
  fetchEditGoodsDetail,
  // 删除数据
  fetchDeleteGoodsDetail,
} from 'actions/goods'
import '../style.css'
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create({
  onFieldsChange(props, items) {
  },
})

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    // 获取数据
    goodsBasicSearchResult: state.goodsBasicSearchResult,
  })
)

// 声明组件  并对外输出
export default class index extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      isUnbunding: true,
    };
    this.regular = {
      goodsId: this.props.goodsId || this.props.params.goodsId || 1,
    }

    // 解绑
    this.handleUnbundling = this.handleUnbundling.bind(this);
    // 修改物品信息
    this.handleModify = this.handleModify.bind(this);
    // 删除物品信息
    this.handleDelete = this.handleDelete.bind(this)
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.goodsId != this.props.goodsId) {
      this.regular.goodsId = nextProps.goodsId;
      this.goodsBasicResult();
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.goodsBasicResult();
  }

  // 物品类型下拉配置项
  wplxItem() {
    return [
      { code: '1', wplx: '低慢小' },
      { code: '2', wplx: '刀具' },
      { code: '3', wplx: '易制爆' },
    ]
  }

  // 物品来源下拉配置项
  wplyItem() {
    return [
      { code: '1', wply: '自制' },
      { code: '2', wply: '购买' },
      { code: '3', wply: '租用' },
    ]
  }

  // 物品种类下拉配置项
  wpzlItem() {
    return [
      { code: '0', wpzl: '无人机' },
      { code: '1', wpzl: '滑翔机' },
      { code: '2', wpzl: '三角翼' },
      { code: '3', wpzl: '滑翔伞' },
      { code: '4', wpzl: '动力伞' },
      { code: '5', wpzl: '热气球' },
      { code: '6', wpzl: '飞艇' },
      { code: '7', wpzl: '航空模型' },
    ]
  }

  // 是否排查下拉配置项
  sfpcItem() {
    return [
      { code: '0', sfpc: '否' },
      { code: '1', sfpc: '是' },
    ]
  }

  // 物品状态下拉配置项
  wpztItem() {
    return [
      { code: '0', wpzt: '正常使用' },
      { code: '1', wpzt: '已报废' },
      { code: '2', wpzt: '已转让' },
    ]
  }

  // 临时封存下拉配置项
  lsfcItem() {
    return [
      { code: '0', lsfc: '否' },
      { code: '1', lsfc: '是' },
    ]
  }

  // 关联情况下拉配置
  glqkItem() {
    return [
      { code: '1', glqk: '未关联' },
      { code: '2', glqk: '关联到人' },
      { code: '3', glqk: '关联到单位' },
    ]
  }

  // 获取物品数据详情
  goodsBasicResult() {
    this.props.dispatch(fetchGoodsBasic({ id: this.regular.goodsId }, () => {
      const data = this.props.goodsBasicSearchResult;
      this.props.form.setFieldsValue({
        wpmc: data.wpmc ? data.wpmc : '', // 物品名称
        wplx: data.wplx != undefined ? data.wplx.toString() : '', // 物品类型
        wppp: data.wppp ? data.wppp : '', // 物品品牌
        wpbgr: data.wpbgr ? data.wpbgr : '', // 物品保管人
        bgrsfz: data.bgrsfz ? data.bgrsfz : '', // 保管人身份证
        bgrdh: data.bgrdh ? data.bgrdh : '', // 保管人电话
        wpzrr: data.wpzrr ? data.wpzrr : '', // 物品责任人
        zrrsfz: data.zrrsfz ? data.zrrsfz : '', // 责任人身份证
        zrrdh: data.zrrdh ? data.zrrdh : '', // 责任人电话
        wpssdw: data.wpssdw ? data.wpssdw : '', // 物品所属单位
        wpcfd: data.wpcfd ? data.wpcfd : '', // 物品存放(封存)地
        wpsl: data.wpsl ? data.wpsl : '', // 物品数量
        wpyt: data.wpyt ? data.wpyt : '', // 物品用途
        tjsj: (data.tjsj ? moment(data.tjsj) : null), // 添加时间
        tjrxm: data.tjrxm ? data.tjrxm : '', // 添加人姓名
        bz: data.bz ? data.bz : '', // 备注
        wply: data.wply ? data.wply : '', // 物品来源
        wpzl: data.wply != undefined ? data.wpzl.toString() : '', // 物品种类
        glqk: data.glqk ? data.glqk : '', // 关联情况
        sfpc: data.sfpc != undefined ? data.sfpc.toString() : '', // 是否排查
        pcsj: (data.pcsj ? moment(data.pcsj) : null), // 排查时间
        wpcyr: data.wpcyr ? data.wpcyr : '', // 持有人
        cyrsfz: data.cyrsfz ? data.cyrsfz : '', // 持有人身份证
        cyrdh: data.cyrdh ? data.cyrdh : '', // 持有人电话
        wpzt: data.wpzt != undefined ? data.wpzt.toString() : '', // 物品状态
        lsfc: data.lsfc != undefined ? data.lsfc.toString() : '', // 临时封存
      });
      // 判断是否有解绑按钮
      if (data.glqk == '1') {
        this.setState({
          isUnbunding: false,
        })
      }
    }))
  }

  // 删除物品信息
  handleDelete(id) {
    this.props.dispatch(fetchDeleteGoodsDetail({ id: id }, () => {
      document.querySelector('.ant-tabs-tab-active .anticon-close').click();
    }))
  }

  // 解绑
  handleUnbundling(e) {
    e.preventDefault();
    this.props.dispatch(fetchUnbundlingGoodsdetail({ id: this.regular.goodsId }, () => {
      this.goodsBasicResult();
    }))
  }

  // 修改物品信息
  handleModify(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, fieldsValue) => {
      if (errors) {
        return;
      }
      if (fieldsValue.bgrsfz != '') {
        if (!(regExpConfig.IDcard.test(fieldsValue.bgrsfz))) {
          message.error('保管人身份证格式错误(X为大写)！');
          return;
        }
      }
      if (fieldsValue.bgrdh != '') {
        if (!(regExpConfig.phoneNo.test(fieldsValue.bgrdh))) {
          message.error('保管人电话格式错误！');
          return;
        }
      }
      if (fieldsValue.wpzrr == '') {
        message.error('请填写物品责任人信息！');
        return;
      } else if (fieldsValue.wpzrr != '') {
        if (fieldsValue.wpzrr.length > 100) {
          message.error('物品责任人数据太长！');
          return;
        }
      }
      if (fieldsValue.zrrsfz == '') {
        message.error('请填写责任人身份证信息！');
        return;
      }
      if (!(regExpConfig.IDcard.test(fieldsValue.zrrsfz))) {
        message.error('责任人身份证格式错误(X为大写)！');
        return;
      }
      if (fieldsValue.zrrdh == '') {
        message.error('责任人电话不为空！');
        return;
      }
      if (!(regExpConfig.phoneNo.test(fieldsValue.zrrdh))) {
        message.error('责任人电话格式错误！');
        return;
      }
      if (fieldsValue.wpcfd == '') {
        message.error('请填写物品存放(封存)地信息！');
        return;
      } else if (fieldsValue.wpcfd != '') {
        if (fieldsValue.wpcfd.length > 100) {
          message.error('物品存放(封存)地数据太长！');
          return;
        }
      }
      if (fieldsValue.wpsl != '') {
        if (!(regExpConfig.num.test(fieldsValue.wpsl))) {
          message.error('物品数量错误！');
          return;
        }
      }
      if (fieldsValue.wpzl == '') {
        message.error('请选择物品种类！');
        return;
      }
      if (fieldsValue.cyrdh != '') {
        if (!(regExpConfig.phoneNo.test(fieldsValue.cyrdh))) {
          message.error('持有人电话格式错误！');
          return;
        }
      }
      if (fieldsValue.lsfc == '') {
        message.error('是否临时封存！');
        return;
      }
      const values = {
        ...fieldsValue,
        pcsj: fieldsValue.pcsj ? fieldsValue.pcsj.format('YYYY-MM-DD') : '',
        tjsj: fieldsValue.tjsj ? fieldsValue.tjsj.format('YYYY-MM-DD') : '',
      };
      this.props.dispatch(fetchEditGoodsDetail({ ...values, id: this.regular.goodsId }))
    });
  }

  render() {
    const {
      getFieldDecorator,
      } = this.props.form;

    const infItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
    };

    return (
      <div className="nav-second-nextContent">
        <br />
        <Form horizontal style={{ overflowY: 'auto' }}>
          <Row>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品名称">
                {getFieldDecorator('wpmc')(
                  <Input type="text" name="wpmc" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品类型">
                {getFieldDecorator('wplx')(
                  <Select name="wplx">
                    {this.wplxItem().map((v, i) => <Option value={v.code} key={v.code}>{v.wplx}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品品牌">
                {getFieldDecorator('wppp')(
                  <Input type="text" name="wppp" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品保管人">
                {getFieldDecorator('wpbgr')(
                  <Input type="text" name="wpbgr" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="保管人身份证">
                {getFieldDecorator('bgrsfz')(
                  <Input type="text" name="bgrsfz" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="保管人电话">
                {getFieldDecorator('bgrdh')(
                  <Input type="text" name="bgrdh" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} className="importantField" label="* 物品责任人">
                {getFieldDecorator('wpzrr')(
                  <Input type="text" name="wpzrr" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} className="importantField" label="* 责任人身份证">
                {getFieldDecorator('zrrsfz')(
                  <Input type="text" name="zrrsfz" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} className="importantField" label="* 责任人电话">
                {getFieldDecorator('zrrdh')(
                  <Input type="text" name="zrrdh" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品所属单位">
                {getFieldDecorator('wpssdw')(
                  <Input type="text" name="wpssdw" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} className="importantField" label="* 物品存放(封存)地">
                {getFieldDecorator('wpcfd')(
                  <Input type="text" name="wpcfd" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品数量">
                {getFieldDecorator('wpsl')(
                  <Input type="text" name="wpsl" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品用途">
                {getFieldDecorator('wpyt')(
                  <Input type="text" name="wpyt" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="添加时间">
                {getFieldDecorator('tjsj'
                )(
                  <DatePicker disabled showTime format="YYYY-MM-DD" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="添加人">
                {getFieldDecorator('tjrxm')(
                  <Input type="text" disabled name="tjrxm" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="备注">
                {getFieldDecorator('bz')(
                  <Input type="text" name="bz" maxLength="200" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品来源">
                {getFieldDecorator('wply')(
                  <Select name="wply">
                    {this.wplyItem().map((v, i) => <Option value={v.code} key={v.code}>{v.wply}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} className="importantField" label="* 物品种类">
                {getFieldDecorator('wpzl')(
                  <Select name="wpzl">
                    {this.wpzlItem().map((v, i) => <Option value={v.code} key={v.code}>{v.wpzl}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="关联情况">
                {getFieldDecorator('glqk')(
                  <Select name="sfpc" disabled>
                    {this.glqkItem().map((v, i) => <Option value={v.code} key={v.code}>{v.glqk}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="是否排查">
                {getFieldDecorator('sfpc')(
                  <Select name="sfpc">
                    {this.sfpcItem().map((v, i) => <Option value={v.code} key={v.code}>{v.sfpc}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="排查时间">
                {getFieldDecorator('pcsj'
                )(
                  <DatePicker showTime format="YYYY-MM-DD" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="持有人">
                {getFieldDecorator('wpcyr')(
                  <Input type="text" disabled name="wpcyr" maxLength="100" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="持有人身份证">
                {getFieldDecorator('cyrsfz')(
                  <Input type="text" disabled name="cyrsfz" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="持有人电话">
                {getFieldDecorator('cyrdh')(
                  <Input type="text" name="cyrdh" />
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} label="物品状态">
                {getFieldDecorator('wpzt')(
                  <Select name="wpzt">
                    {this.wpztItem().map((v, i) => <Option value={v.code} key={v.code}>{v.wpzt}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...infItemLayout} className="importantField" label="* 临时封存">
                {getFieldDecorator('lsfc')(
                  <Select name="lsfc">
                    {this.lsfcItem().map((v, i) => <Option value={v.code} key={v.code}>{v.lsfc}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="ability-button">
          <Button className={this.state.isUnbunding ? '' : 'button-hidden'}
            onClick={this.handleUnbundling}
          >解绑</Button>
          <Button onClick={this.handleModify}>修改物品信息</Button>
          <Button onClick={() => this.handleDelete(this.props.goodsId)}>删除物品信息</Button>
        </div>
      </div>
    )
  }
}
