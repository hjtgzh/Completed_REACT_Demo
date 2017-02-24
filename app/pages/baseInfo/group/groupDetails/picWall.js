/**
 * Deleted by 叶婷婷
 * 无用，系统功能完整后，可删除
 */
//import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { Row, Col, Icon, message, Modal } from 'antd'
//import {
//  fetchGetPicList,
//  fetchDeletePicList
//} from 'actions/groupPicture'
////import { deletePicItem, getPicList, uploadPic } from 'actions/housePic'
////import {housePic} from 'api'
//
//
//@connect(
//  (state, props) => ({
//    groupPicListResult: state.groupPicListResult
//  })
//)
//
//
//export default class PicWall extends Component {
//  constructor(props) {
//    super(props)
//    this.state = {
//      list: [],
//      path:"",
//    }
//    this.regular = {
//      departmentId : this.props.departmentId || this.props.params.departmentId || 1
//    }
//    this.getBase64 = this.getBase64.bind(this)
//  }
//
//  componentWillMount() {
//    const departmentId = this.props.departmentId || this.props.params.departmentId || 1;
//    this.getList(departmentId)
//  }
//
//  componentWillReceiveProps(nextProps) {
//    if (nextProps.departmentId !=this.props.departmentId) {
//      this.regular.departmentId = nextProps.departmentId;
//      this.getList(this.regular.departmentId);
//    }
//  }
//
//  getList(departmentId) {
//    //const departmentId = this.props.departmentId || this.props.params.departmentId || 1;
//    this.props.dispatch(fetchGetPicList({dptid: departmentId}, ()=> {
//      console.log(this.props.groupPicListResult)
//      this.setState({
//        //path:this.props.groupPicListResult.path,
//        list: this.props.groupPicListResult.list
//      })
//    }))
//  }
//
//  // 删除在线图片
//  deleteOnePic(value, index) {
//    var self = this
//    Modal.confirm({
//      title: '',
//      content: '是否确认删除此图片？',
//      onOk(){
//        self.props.dispatch(fetchDeletePicList({id: value.id}, (response)=> {
//          self.state.list.splice(index, 1)
//          self.setState({list: self.state.list})
//        }))
//      },
//      onCancel(){
//        console.log('cancel')
//      },
//    })
//  }
//
//  // 将离线图片从数组中删除
//  removePic(index) {
//    this.setState(this.state.list.splice(index, 1))
//  }
//
//  // 将图片转化为base64的格式,并拼接到img数组后面
//  getBase64(e) {
//    const self = this
//    // console.log(self)
//    // console.log(e.target.files)
//    var file = e.target.files[0]
//    const maxSize = 2 * 1024 * 1024
//    var isImg = /image\/*/.test(file.type),
//      inSize = file.size <= maxSize
//    if (!isImg) {
//      message.error('请上传图片')
//      return
//    }
//    if (!inSize) {
//      message.error('图片大小不要大于2M')
//      return
//    }
//    var oReader = new FileReader();
//    oReader.onload = function (e) {
//      self.state.list.push({
//        tp: e.target.result,
//        tpmc: file.name,
//        tplx: file.type.replace("image/", ""),
//        tjsj: (new Date()).getTime(),
//        dptid: self.props.departmentId,
//        path: e.target.result,
//        offline: true,
//        originFile: file
//      })
//      self.setState({list: self.state.list})
//    }
//    oReader.readAsDataURL(file);
//    e.target.value = ''
//  }
//
//  uploadPic(value, index) {
//    var self = this
//    var url = $GLOBALCONFIG.$ctx + '/jcjw/dpt/picture/insertDepartmentPicture.json'
//    var request = new FormData()
//    request.append('tp', value.originFile)
//    request.append('dptid', value.dptid)
//    request.append('tpmc',value.tpmc)
//    request.append('tplx',value.tplx)
//    request.append('token',sessionStorage.getItem('token'))
//    var xhr = new XMLHttpRequest();
//    xhr.open('post', url, true)
//    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//    xhr.send(request)
//    xhr.onload = function onload() {
//      if (xhr.status < 200 || xhr.status >= 300) {
//        return console.error("xhr.status", xhr.status)
//      }
//      onSuccess(getBody(xhr));
//    };
//    function getBody(xhr) {
//      var text = xhr.responseText || xhr.response;
//      if (!text) {
//        return text;
//      }
//
//      try {
//        return JSON.parse(text);
//      } catch (e) {
//        return text;
//      }
//    }
//
//    function onSuccess(jsonObj) {
//      if (jsonObj.status == 1) {
//        message.success('上传成功', 3)
//        delete self.state.list[index].offline
//        self.state.list[index].id = jsonObj.data.id
//        self.state.list[index].path = jsonObj.data.path
//        self.setState({list: self.state.list})
//      } else {
//        message.error('上传失败', 3)
//      }
//    }
//  }
//
//  render() {
//    const self = this;
//    const {imgHeight='171px'}=this.props
//    return (
//      <div className='c-thumb  detail-content'>
//        <Row gutter={0}>
//          {
//            this.state.list.map((v, i)=> {
//              return (
//                <Col span={6} key={i}>
//                  <div className="c-thumb__div--container">
//                    <div style={{height:imgHeight,position:'relative'}}>
//                      <img className='c-thumb__img' src={v.path} alt={v.tpmc}/>
//                    </div>
//                    <div className="c-thumb__div--userinfo">
//                      <p>{v.tpmc || "noName"}</p>
//                      <p>采集人：{v.tjr}</p>
//                      <p>采集时间：{(new Date(v.tjsj)).toLocaleString()}</p>
//                      {
//                        v.offline ?
//                          <div className='ability-Icon'>
//                            <Icon type='upload' onClick={self.uploadPic.bind(self,v,i)}/>
//                            <Icon type='close' onClick={self.removePic.bind(self,i)}/>
//                          </div>
//                          :
//                          <div className='ability-Icon'><Icon type='close' onClick={self.deleteOnePic.bind(self,v,i)}/>
//                          </div>
//                      }
//                    </div>
//                  </div>
//                </Col>
//              )
//            })
//          }
//          <Col span={6}>
//            <Icon type='plus' className='avatar-uploader-trigger' onClick={(e)=>{this.refs.fileUpload.click()}}
//                  style={{position:'relative'}}/>
//          </Col>
//        </Row>
//        <input type='file' style={{display:'none'}} ref='fileUpload' onChange={this.getBase64}/>
//      </div>
//    )
//  }
//}
