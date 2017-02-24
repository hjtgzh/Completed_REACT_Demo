/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, checkbox, Modal } from 'antd';
import { fetchCheckboxListHighlyToxic } from 'actions/groupHighlyToxic'

const FormItem = Form.Item
const CheckboxGroup = checkbox.Group
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    checkboxListHighlyToxicResult: state.checkboxListHighlyToxicResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {},
})

export default class chemistry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: [],
      checkedValues: [],
    }
    this.onSearch = this.onSearch.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchCheckboxListHighlyToxic({}, () => {
      this.setState({
        showList: this.props.checkboxListHighlyToxicResult.list,
      })
    }))
    this.setState({
      ifReset: false,
      checkedValues: this.props.checkedValue,
    })
  }

  onSearch(e) {
    const filtervalue = this.props.checkboxListHighlyToxicResult.list
    const searchvalue = e.target.value
    let showList = []
    // filter 过滤 ，code 或 name 中包含改字符即返回
    if (searchvalue) {
      showList = filtervalue.filter(item => (
        item.dicContent.indexOf(searchvalue) !== -1) || (item.dicKey.indexOf(searchvalue) !== -1)
      )
      this.setState({
        showList: showList,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onOk(this.state.checkedValues)
  }

  onChangeSelect(checkedValues) {
    this.setState({
      checkedValues: checkedValues,
    })
  }

  footer() {
    return (
      <div>
        <Button size={'large'} onClick={this.handleSubmit}>保存</Button>
      </div>
    )
  }

  render() {
    const {
      checkedValue,
      visible,
      onCancel,
    } = this.props
    let checkOptions = [];
    if (this.state.showList.length > 0) {
      this.state.showList.map((item, index) => {
        const obj = {
          label: item.dicContent,
          value: item.dicContent,
        }
        checkOptions.push(obj)
      })
    }
    return (
      <Modal
        className="modal-header modal-body"
        visible={visible}
        title="许可证类型"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <div className="modalcontent checklist-jxy">
          <FormItem>
            <Input placeholder="请输入搜索条件" name="keyword" onChange={this.onSearch} />
          </FormItem>
          <div>
            <CheckboxGroup
              options={checkOptions}
              defaultValue={checkedValue}
              onChange={this.onChangeSelect}
            />
          </div>
        </div>
      </Modal>
    )
  }
}
