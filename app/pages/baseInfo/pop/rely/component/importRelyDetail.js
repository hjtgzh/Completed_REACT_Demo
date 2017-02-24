/**
 * Created by 黄建停---依靠力量--导入依靠力量
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Form, Select, Button, Upload, Icon, message,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      exportRelyPowerResult: state.exportRelyPowerResult,
    })
)
@Form.create({
  onFieldsChange(props, items) {
        // console.log(props)
        // console.log(items)
        // props.cacheSearch(items);
  },
})

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      isShowUploadList: true,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.oneSaveRelyPowerForm && this.props.saveRelyPowerForm !== nextProps.saveRelyPowerForm) {
      this.props.tabSave()
      this.setState({
        fileList: [],
        isShowUploadList: false,
      })
    }
  }
  componentDidMount() {
    // console.dir(this.state.list[0])
  }
  handleSubmit(e) {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        // console.log('Errors in form!!!');
        return;
      }
    });
  }

  //上传依靠力量
  uploadFile(value) {
    const file = value.file
    const url = `${global.$GLOBALCONFIG.$ctx}/jcjw/ykll/insertExcel.json`
    const request = new FormData()
    request.append('file', file)
    request.append('type', 1)
    request.append('token', sessionStorage.getItem('token'))
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    xhr.send(request)
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        message.error('导入依靠力量失败！')
        return
      }
      if (xhr.status === 200) {
        message.info('导入依靠力量成功！')
      }
    }
    //必须return
    return { abort: () => 111 }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const self = this
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      hasFeedback: true,
    };
    const uploadProps = {
      name: 'logo',
      action: `${global.$GLOBALCONFIG.$ctx}/jcjw/ykll/insertExcel.json`,
      customRequest: this.uploadFile,
      fileList: this.state.fileList,
      beforeUpload(file) {
        const isXLS = file.type === 'application/vnd.ms-excel';
        if (!isXLS) {
          message.error('请选择xls格式的文件！')
        }
        return isXLS
      },
      onChange(info) {
        const fileArr = info.fileList
        self.setState({ fileList: fileArr })
      },
      showUploadList: this.state.isShowUploadList,
    }
    return (
      <Form horizontal onSubmit={this.handleSubmit} encType="multipart/form-data">
        <FormItem
          {...formItemLayout}
          label="身份证号："
        >
          {
            getFieldDecorator('relyClass', {
              initialValue: '志愿者',
            })(
              <Select>
                <Option value="志愿者">志愿者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="选择文件："
        >
          {
            getFieldDecorator('chooseFile')(
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload" />上传
                </Button>
              </Upload>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

