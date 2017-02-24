/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Select, Table, Upload, Icon, Button, message, Popconfirm } from 'antd'
import { savePicItem, deletePicItem, getPicList, uploadPic } from 'actions/housePic'
import 'style/pic.css'
import PicWall from './picWall'

const FormItem = Form.Item
const Option = Select.Option

@connect(
    (state, props) => ({
      // config: state.config,
      picListResult: state.picListResult,
      savePicItemResponse: state.savePicItemResponse,
      deletePicItemResponse: state.deletePicItemResponse,
      uploadPicResponse: state.uploadPicResponse,
    })
)

class Pic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isList: true,
    }
    // this.saveRow=this.saveRow.bind(this)
    // this.deleteRow=this.deleteRow.bind(this)
    this.uploadPic = this.uploadPic.bind(this)
    this.changeView = this.changeView.bind(this)
    // this.updateState=this.updateState.bind(this)
    this.getBase64 = this.getBase64.bind(this)
    this.getList = this.getList.bind(this)
  }
  componentDidMount() {
    this.getList()
  }

  // 获取图片列表
  getList() {
    const bldid = this.props.houseId
    this.props.dispatch(getPicList({ bldid }))
  }

  // 图片类型的配置项
  _getPicTypeOptions() {
    return [
      { code: '', name: '请选择图片类型' },
      { code: '40', name: '俯览图片' },
      { code: '50', name: '建筑物结构图片' },
      { code: '60', name: '楼层平面图片' },
      { code: '10', name: '地址图片' },
      { code: '20', name: '人员图片' },
      { code: '30', name: '单位图片' },
    ]
  }

  // table列配置项
  columns() {
    const self = this
    const { getFieldDecorator } = this.props.form
    return [
      {
        title: '序号',
        width: '6%',
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '图片名称',
        width: '15%',
        dataIndex: 'tpmc',
        render: (text, record, index) => {
          const name = this.state[`picturename${index}`] || text
          if (this.state[`isEditName${index}`]) {
            return (
              <FormItem>
                {
                  getFieldDecorator(`picturename${index}`, {
                    rules: [{ required: true, message: '' }],
                    initialValue: name,
                  })(
                    <Input placeholder="请输入图片名称" autoFocus onBlur={() => this.closeEdit(index)} />
                  )
                }
              </FormItem>
            )
          }
          return (
            <span title={name} className="ellipsis" onClick={() => this.openEdit(index)}>{name}</span>
          )
        },
      },
      {
        title: '上传时间',
        width: '20%',
        dataIndex: 'cjsj',
        render: (text, record, index) => {
          const time=(new Date(text))
          return `${time.toLocaleDateString()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        },
      },
      {
        title: '上传人',
        width: '15%',
        dataIndex: 'cjr',
      },
      // {
      //   title: '排序',
      //   width: '15%',
      //   dataIndex: 'px',
      //   render: (text, record, index) =>
      //     <FormItem>
      //       {
      //         getFieldDecorator(`num${index}`, {
      //           rules: [{ required: true, message: '' }],
      //           initialValue: text,
      //         })(
      //           <Input placeholder="请输入排序号" />
      //         )
      //       }
      //     </FormItem>,
      // },
      {
        title: '图片类型',
        width: '14%',
        dataIndex: 'tpfl',
        render: (text, record, index) =>
          <FormItem>
            {
              getFieldDecorator(`tpfl${index}`, {
                initialValue: String(text || ''),
              })(
                <Select placeholder="请选择图片类型" size="large">
                {
                  self._getPicTypeOptions().map((item) =>
                    <Option key={item.code} value={item.code}>{item.name}</Option>)
                }
                </Select>
              )
            }
          </FormItem>,
      },
      {
        title: '操作',
        width: '20%',
        render: (text, record, index) =>
          <div className="c-table__div--operation">
            <span onClick={() => self.saveRow(record, index)}>保存</span>
            <Popconfirm title="确认删除？" onConfirm={() => self.deleteRow(record)}>
              <span>删除</span>
            </Popconfirm>
          </div>,
      },
    ]
  }
  // changeSelect(index,value){
  //   this.props.picListResult.data[index].tpfl=value
  //   this.setState({})
  // }

  openEdit(index) {
    this.setState({
      [`isEditName${index}`]: !this.state[`isEditName${index}`],
    })
  }

  closeEdit(index) {
    this.setState({
      [`picturename${index}`]: this.props.form.getFieldValue(`picturename${index}`),
      [`isEditName${index}`]: !this.state[`isEditName${index}`],
    })
  }

  // 保存一行的信息
  saveRow(record, index) {
    this.props.form.validateFields([/* `num${index}`, `picturename${index}`*/], (err, values) => {
      if (err) {
        console.error('error', err)
        return
      }
      const tpmc = this.state[`picturename${index}`] || record.tpmc
      if (!tpmc) {
        message.error('请输入图片名称')
        return
      }
      this.props.dispatch(savePicItem({
        id: record.id,
        tpfl: this.props.form.getFieldValue(`tpfl${index}`),
        // px: this.props.form.getFieldValue(`num${index}`),
        tpmc: tpmc,
      }, (response) => {
        if (response.status === 1) {
          message.success('修改成功', 4)
          this.getList()
        }
      }))
    })
  }

  // 删除一行
  deleteRow(record) {
    this.props.dispatch(deletePicItem({ id: record.id }, (response) => {
      if (response.status === 1) {
        message.success(response.msg, 3)
        this.props.dispatch(getPicList({ bldid: this.props.houseId }))
      }
    }))
  }

  // 上传照片
  uploadPic() {
    const avater = ''
    this.props.dispatch(uploadPic(avater))
  }

  // 切换视图
  changeView() {
    this.setState({ isList: !this.state.isList })
    if (!this.state.isList) {
      this.props.dispatch(getPicList({ bldid: this.props.houseId }))
    }
  }

  // 将图片转化为base64的格式,并拼接到img数组后面
  getBase64(e) {
    const self = this
    console.log(e.target.files)
    const file = e.target.files[0]
    const maxSize = 2 * 1024 * 1024
    const isImg = /image\/*/.test(file.type)
    const inSize = file.size <= maxSize
    if (!isImg) {
      message.error('请上传图片')
      return
    }
    if (!inSize) {
      message.error('图片大小不要大于2M')
      return
    }
    const oReader = new FileReader();
    oReader.onload = function (_e) {
      const request = {
        tp: _e.target.result.split(',')[1],
        // tp:_e.target.result,
        tpmc: file.name,
        bldid: self.props.houseId,
        tplx: file.type.replace('image/', ''),
      }
      self.props.dispatch(uploadPic(request, (data) => {
        self.props.dispatch(getPicList({ buildingcode: self.props.houseId }))
      }))
    }
    oReader.readAsDataURL(file);
    e.target.value = ''
  }

  render() {
    const self = this
    const uploadProps = {
      name: 'tp',
      action: `${$GLOBALCONFIG.$ctx}/jcjw/building/insertPic.json`,
      data: (file) => {
        const tplx = file.type.split('/')[1]
        const bldid = this.props.houseId
        const tpmc = file.name
        const token = sessionStorage.getItem('token')
        return { tplx, bldid, tpmc, token }
      },
      headers: {
        // ['Content-Type']:'application/x-www-form-urlencoded; charset=UTF-8',
        // ['X-MicrosoftAjax']:'Delta=true',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': null,
      },
      showUploadList: false,
      onChange(info) {
        console.log(info.file.status)
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name}上传成功`)
          self.props.dispatch(getPicList({ bldid: self.props.houseId }))
        }
        if (info.file.status === 'error') {
          message.error(`${info.file.name}上传失败`)
        }
      },
      beforeUpload(file) {
        const maxSize = 2 * 1024 * 1024
        const isImg = /image\/*/.test(file.type)
        const inSize = file.size <= maxSize
        if (!isImg) {
          message.error('请上传图片')
        }
        if (!inSize) {
          message.error('图片大小不要大于2M')
        }
        return isImg && inSize
      },
    }
    return (
      <div className="detail-content">
        <Row gutter={16} className="detail-content">
          {
            <Col sm={24} md={24} lg={24} className="detail-content">
              <section className="c-pic detail-content">
                <div className="detail-content" style={this.state.isList ? { display: 'flex' } : { display: 'none' }}>
                  <Table
                    dataSource={this.props.picListResult.data}
                    columns={this.columns()}
                    className="c-pic__table"
                    loading={this.props.picListResult.loading}
                    pagination={false}
                    bordered
                    scroll={{ x: 1000, y: true }}
                    pageSize={40}
                  />
                  <div className="ability-button">
                    <Upload {...uploadProps}>
                      <Button type="ghost">
                        <Icon type="upload" />上传图片
                      </Button>
                    </Upload>
                    {/* <input type='file' style={{display:'none'}} ref='imgUpload' onChange={this.getBase64}/>*/}
                    <Button type="ghost" onClick={this.changeView} style={{ margin: '0 10px' }}>浏览模式</Button>
                  </div>
                </div>
                <div className="detail-content" style={this.state.isList ? { display: 'none' } : { display: 'flex' }} >
                  <PicWall buildingcode={this.props.houseId} isList={this.state.isList} />
                  <div className="ability-button">
                    <Button type="ghost" onClick={this.changeView} style={{ margin: '0 10px' }}>列表模式</Button>
                  </div>
                </div>
              </section>
            </Col>
          }
        </Row>
      </div>
    )
  }
}


export default Form.create()(Pic)
