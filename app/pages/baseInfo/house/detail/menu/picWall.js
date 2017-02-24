/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Icon, message, Modal } from 'antd'
import { deletePicItem, getPicList } from 'actions/housePic'


@connect(
    (state, props) => ({
      uploadPicResponse: state.uploadPicResponse,
    })
)


export default class PicWall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
    this.getBase64 = this.getBase64.bind(this)
  }

  // 请求全部图片数据
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.isList !== nextProps.isList && nextProps.isList === false) {
      this.props.dispatch(getPicList({ bldid: this.props.buildingcode }, (response) => {
        this.setState({ list: response.data })
      }))
    }
  }

  // 删除在线图片
  deleteOnePic(value, index) {
    const self = this
    Modal.confirm({
      title: '',
      content: '是否确认删除此图片？',
      onOk() {
        console.log('ok->')
        self.props.dispatch(deletePicItem({ id: value.id }, (response) => {
          message.error('删除成功')
          self.state.list.splice(index, 1)
          self.setState({ list: self.state.list })
        }))
      },
      onCancel() { console.log('cancel') },
    })
  }

  // 将离线图片从数组中删除
  removePic(index) {
    this.setState(this.state.list.splice(index, 1))
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
      self.state.list.push({
        tp: _e.target.result,
        tpmc: file.name,
        tplx: file.type.replace('image/', ''),
        cjsj: (new Date()).getTime(),
        bldid: self.props.buildingcode,
        path: _e.target.result,
        offline: true,
        originFile: file,
      })
      self.setState({ list: self.state.list })
    }
    oReader.readAsDataURL(file);
    e.target.value = ''
  }

  uploadPic(value, index) {
    const self = this
    const url = `${$GLOBALCONFIG.$ctx}/jcjw/building/insertPic.json`
    const request = new FormData()
    request.append('tp', value.originFile)
    request.append('tpmc', value.tpmc)
    request.append('bldid', value.bldid)
    request.append('tplx', value.tplx)
    request.append('token', sessionStorage.getItem('token'))
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(request)

    function getBody(_xhr) {
      const text = _xhr.responseText || _xhr.response;
      if (!text) {
        return text;
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    }
    function onSuccess(jsonObj) {
      if (jsonObj.status === 1) {
        message.success('上传成功')
        delete self.state.list[index].offline
        self.state.list[index].id = jsonObj.data.id
        self.state.list[index].path = jsonObj.data.path
        self.setState({ list: self.state.list })
      } else {
        message.error('上传失败')
      }
    }

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return console.error('xhr.status', xhr.status)
      }
      onSuccess(getBody(xhr));
      return ''
    };
    // this.props.dispatch(uploadPic(request,(data)=>{
    //   if(data.status==1){
    //     message.success('上传成功',3)
    //     delete self.state.list[index].offline
    //     self.setState({list:self.state.list})
    //   }
    // }))
  }

  render() {
    const self = this
    const { imgHeight = '171px' } = this.props
    return (
      <div className="c-thumb  detail-content">
        <Row gutter={0}>
        {
          this.state.list.map((v, i) =>
            <Col span={6} key={i}>
              <div className="c-thumb__div--container">
                <div style={{ height: imgHeight, position: 'relative' }}>
                  <img className="c-thumb__img" src={v.path} alt={v.tpmc} />
                </div>
                <div className="c-thumb__div--userinfo">
                  <p>{v.tpmc || 'noName'}</p>
                  <p>采集人：{v.cjr}</p>
                  <p>采集时间：{(new Date(v.cjsj)).toLocaleString()}</p>
                  {
                    v.offline ?
                      <div className="ability-Icon">
                        <Icon type="upload" onClick={() => self.uploadPic(v, i)} />
                        <Icon type="close" onClick={() => self.removePic(i)} />
                      </div>
                      :
                      <div className="ability-Icon">
                        <Icon type="close" onClick={() => self.deleteOnePic(v, i)} />
                      </div>
                  }
                </div>
              </div>
            </Col>
          )
        }
          <Col span={6}>
            <Icon
              type="plus"
              className="avatar-uploader-trigger"
              onClick={(e) => { this.refs.fileUpload.click() }}
              style={{ position: 'relative' }}
            />
          </Col>
        </Row>
        <input type="file" style={{ display: 'none' }} ref="fileUpload" onChange={this.getBase64} />
      </div>
    )
  }
}
