/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Upload, Icon, Modal, message } from 'antd'

@connect(
    (state) => ({
      config: state.config,
    })
)

export default class imgView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      nowImg: {},
    }
    this.handlePreview = this.handlePreview.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.source.toString() !== nextProps.source.toString()) {
      this.state.fileList = nextProps.source
    }
  }

  // 取消弹窗
  handleCancel = () => this.setState({ previewVisible: false })

  // 图片预览
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  // 上传图片
  uploadImage(value) {
    const self = this
    const file = value.file
    const type = file.type.slice(0,5)
    if(type!=='image'){
      message.error('错误的文件类型')
      return { abort: () => 111 }
    }
    const url = `${$GLOBALCONFIG.$ctx}/jcjw/record/uploadPicture.json`
    const request = new FormData()
    request.append('picname', file.name)
    request.append('tpfile', file)
    request.append('token', sessionStorage.getItem('token'))
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(request)
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        const length = self.state.fileList.length
        for (let i = 0; i < length; i++) {
          if (self.state.fileList[i].status !== 'done') {
            self.state.fileList.splice(i, 1)
          }
        }
      }
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.response).data;
        const length = self.state.fileList.length
        let arr = ''
        for (let i = 0; i < length; i++) {
          if (self.state.fileList[i].name === self.state.nowImg.name) {
            self.state.fileList[i].status = 'done'
            self.state.fileList[i].realName = result.realName
          }
          arr += `${self.state.fileList[i].name}:${self.state.fileList[i].realName},`
        }
        if (arr.length > 0) {
          arr = arr.substr(0, arr.length - 1)
        }
        self.props.saveImages(arr)
        self.setState({})
      }
    }
    return { abort: () => 111 }
  }

  // 图片列表发生改变
  handleChange(info) {
    // const status = info.file.status
    const type = info.file.type.slice(0,5)
    if(type!=='image'){
      return
    }
    const fileArr = info.fileList
    this.state.nowImg = info.file
    const length = fileArr.length
    let arr = ''
    for (let i = 0; i < length; i++) {
      if (fileArr[i].realName) {
        arr += `${fileArr[i].name}:${fileArr[i].realName},`
      }
    }
    if (arr.length > 0) {
      arr = arr.substr(0, arr.length - 1)
    }
    this.props.saveImages(arr)
    this.setState({ fileList: fileArr })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    // console.log('fileList:'+this.state.fileList)
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action={`${$GLOBALCONFIG.$ctx}/jcjw/record/uploadPicture.json`}
          listType="picture-card"
          customRequest={this.uploadImage}
          accept='image/png,image/jpg,image/gif,image/jpeg,'
          fileList={fileList} // 图片的列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 7 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
