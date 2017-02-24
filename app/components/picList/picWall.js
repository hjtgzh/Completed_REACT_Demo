/**
 * Created by 叶婷婷 on 2017/2/10.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Icon, message, Modal } from 'antd'
// 组织结构-单位照片
import {
  fetchGetPicList,  // 获取照片列表
  fetchDeletePicList,  // 删除照片
} from 'actions/groupPicture'
// 物品管理-物品照片
import {
  fetchGoodsPhotoList,  // 获取照片列表
  fetchDeleteGoodsPhoto,  // 删除照片
} from 'actions/goods'
import './pic.css'

@connect(
  (state, props) => ({
    groupPicListResult: state.groupPicListResult,  // 组织结构-单位照片
    goodsPhotoListSearchResult: state.goodsPhotoListSearchResult, // 物品管理-物品照片
  })
)

export default class PicWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
    this.regular = {
      thispicStype: this.props.thispicStype || this.props.params.thispicStype || 1,
      thispicId: this.props.thispicId || this.props.params.thispicId || 1,
    }
    this.getBase64 = this.getBase64.bind(this)
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.thispicId != this.props.thispicId) {
      this.regular.thispicId = nextProps.thispicId;
      this.getList();
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.getList()
  }

  // 获取图片数据
  getList() {
    if (this.regular.thispicStype == 'groupPicture') {  // 组织结构-单位照片
      this.props.dispatch(fetchGetPicList({ dptid: this.regular.thispicId }, () => {
        this.setState({
          list: this.props.groupPicListResult.list,
        })
      }))
    } else if (this.regular.thispicStype == 'goods') {  // 物品管理-物品照片
      this.props.dispatch(fetchGoodsPhotoList({ wpId: this.regular.thispicId }, () => {
        this.setState({
          list: this.props.goodsPhotoListSearchResult.list,
        })
      }))
    }
  }

  // 删除在线图片
  deleteOnePic(value, index) {
    const self = this;
    Modal.confirm({
      title: '',
      content: '是否确认删除此图片？',
      onOk() {
        if (self.regular.thispicStype == 'groupPicture') {  // 组织结构-单位照片
          self.props.dispatch(fetchDeletePicList({ id: value.id }, () => {
            self.state.list.splice(index, 1);
            self.setState({ list: self.state.list })
          }))
        } else if (self.regular.thispicStype == 'goods') {  // 物品管理-物品照片
          self.props.dispatch(fetchDeleteGoodsPhoto({ id: value.id }, () => {
            self.state.list.splice(index, 1);
            self.setState({ list: self.state.list })
          }))
        }
      },
      onCancel() {
      },
    })
  }

  // 将离线图片从数组中删除
  removePic(index) {
    this.setState(this.state.list.splice(index, 1))
  }

  // 将图片转化为base64的格式,并拼接到img数组后面
  getBase64(e) {
    const self = this
    const file = e.target.files[0]
    const maxSize = 2 * 1024 * 1024
    const isImg = /image\/*/.test(file.type),
      inSize = file.size <= maxSize
    if (!isImg) {
      message.error('请上传图片')
      return
    }
    if (!inSize) {
      message.error('图片大小不要大于2M')
      return
    }
    const oReader = new FileReader();
    oReader.onload = function (eg) {
      let value;
      if (self.regular.thispicStype == 'groupPicture') {  // 组织结构-单位照片
        value = {
          dptid: self.regular.thispicId,
        }
      } else if (self.regular.thispicStype == 'goods') {  // 物品管理-物品照片
        value = {
          wpId: self.regular.thispicId,
        }
      }
      self.state.list.push({
        ...value,
        tp: eg.target.result,
        tpmc: file.name,
        tplx: file.type.replace('image/', ''),
        tjsj: (new Date()).getTime(),
        path: eg.target.result,
        offline: true,
        originFile: file,
      })
      self.setState({ list: self.state.list })
    }
    oReader.readAsDataURL(file);
    e.target.value = ''
  }

  // 上传照片
  uploadPic(value, index) {
    const self = this;
    const request = new FormData()
    request.append('tp', value.originFile)
    request.append('tpmc', value.tpmc)
    request.append('tplx', value.tplx)
    request.append('token', sessionStorage.getItem('token'))
    let url = '';
    if (self.regular.thispicStype == 'groupPicture') {  // 组织结构-单位照片
      request.append('dptid', value.dptid);
      url = $GLOBALCONFIG.$ctx + '/jcjw/dpt/picture/insertDepartmentPicture.json';
    } else if (self.regular.thispicStype == 'goods') {  // 物品管理-物品照片
      request.append('wpId', value.wpId);
      url = $GLOBALCONFIG.$ctx + '/jcjw/article/addPicture.json';
    }
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    xhr.send(request)
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return console.error('xhr.status', xhr.status)
      }
      onSuccess(getBody(xhr));
    };
    function getBody(xhr) {
      const text = xhr.responseText || xhr.response;
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
      if (jsonObj.status == 1) {
        message.success('上传成功', 3)
        delete self.state.list[index].offline
        self.state.list[index].id = jsonObj.data.id
        self.state.list[index].path = jsonObj.data.path
        self.setState({ list: self.state.list })
      } else {
        message.error('上传失败', 3)
      }
    }
  }

  render() {
    const self = this;
    const { imgHeight = '171px' } = this.props;
    return (
      <div className="c-thumb  detail-content">
        <Row gutter={0}>
          {
            this.state.list.map((v, i) => {
              return (
                <Col span={6} key={i}>
                  <div className="c-thumb__div--container">
                    <div style={{ height: imgHeight, position: 'relative' }}>
                      <img className="c-thumb__img" src={v.path} alt={v.tpmc} />
                    </div>
                    <div className="c-thumb__div--userinfo">
                      <p>{v.tpmc || 'noName'}</p>
                      <p>采集人：{v.tjr ? v.tjr : v.tjrmc}</p>
                      <p>采集时间：{(new Date(v.tjsj)).toLocaleString()}</p>
                      {
                        v.offline ?
                          <div className="ability-Icon">
                            <Icon type="upload" onClick={self.uploadPic.bind(self, v, i)} />
                            <Icon type="close" onClick={self.removePic.bind(self, i)} />
                          </div>
                          :
                          <div className="ability-Icon">
                            <Icon type="close" onClick={self.deleteOnePic.bind(self, v, i)} />
                          </div>
                      }
                    </div>
                  </div>
                </Col>
              )
            })
          }
          <Col span={6}>
            <Icon type="plus" className="avatar-uploader-trigger" onClick={(e) => { this.refs.fileUpload.click() }}
              style={{ position: 'relative' }}
            />
          </Col>
        </Row>
        <input type="file" style={{ display: 'none' }} ref="fileUpload" onChange={this.getBase64} />
      </div>
    )
  }
}
