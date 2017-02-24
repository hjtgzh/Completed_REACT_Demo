/*旅馆信息*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col } from 'antd'
import {fetchHotalMessage} from 'actions/groupHotalInformation'
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    hotalResult:state.hotalResult,
  })
)
export default class groupInfo extends Component {
  constructor(props) {
    super(props)
  }
  //旅馆信息的查询
  componentDidMount() {
    const departmentId = this.props.departmentId 
   this.props.dispatch(fetchHotalMessage({ dptId: departmentId}))
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.departmentId!==this.props.departmentId){
      this.props.dispatch(fetchHotalMessage({ dptId: nextProps.departmentId}))
    }
  }
  render() {
    const {hotalResult}=this.props
    return (
      <div  className="nav-second-nextContent">
        <Row gutter={16} className="detail-content">
          {
            <Col sm={24} md={24} lg={24}>
              <div className="hotal-table-cpp content-cpp">
                <table >
                 <tbody>
                    <tr>
                      <td >旅馆代码</td>
                      <td ><span>{hotalResult.lgdm}</span></td>
                      <td >法定代表人</td>
                      <td ><span >{hotalResult.fddbr}</span></td>
                    </tr>
                    <tr>
                      <td >旅馆名称</td>
                      <td ><span>{hotalResult.lgmc}</span></td>
                      <td >负责人</td>
                      <td ><span >{hotalResult.fzr}</span></td>
                    </tr>
                     <tr>
                      <td >旅馆曾用名</td>
                      <td ><span>{hotalResult.lgcym}</span></td>
                      <td >治安负责人</td>
                      <td ><span >{hotalResult.zafzr}</span></td>
                    </tr>
                    <tr>
                      <td >联系电话</td>
                      <td ><span>{hotalResult.lxdh}</span></td>
                      <td >安保部电话</td>
                      <td ><span >{hotalResult.babdh}</span></td>
                    </tr>
                    <tr>
                      <td >地址</td>
                      <td ><span>{hotalResult.dz}</span></td>
                      <td >星级 </td>
                      <td ><span>{hotalResult.xj}</span></td>
                    </tr>
                    <tr>
                      <td >旅馆状态</td>
                      <td ><span>{hotalResult.lgzt}</span></td>
                      <td >状态改变日期  </td>
                      <td ><span>{hotalResult.ztgbrq}</span></td>
                    </tr>
                    <tr>
                      <td >类型</td>
                      <td ><span>{hotalResult.lx}</span></td>
                      <td >床位数</td>
                      <td ><span>{hotalResult.cws}</span></td>
                    </tr>
                    <tr>
                      <td >所属辖区(派出所) </td>
                      <td ><span>{hotalResult.ssxq}</span></td>
                      <td >等级</td>
                      <td ><span >{hotalResult.dj}</span></td>
                    </tr>
                    <tr>
                      <td >信息申报地点 </td>
                      <td ><span>{hotalResult.xxsbdd}</span></td>
                      <td >等级</td>
                      <td ><span>{hotalResult.dj}</span></td>
                    </tr>
                    <tr>
                      <td >旅馆治安星级 </td>
                      <td ><span>{hotalResult.lgzaxj}</span></td>
                      <td >评定时间</td>
                      <td ><span>{hotalResult.pdsj}</span></td>
                    </tr>
                     <tr>
                      <td >旅馆编号</td>
                      <td ><span>{hotalResult.lgbh} </span></td>
                      <td >旅馆房价1</td>
                      <td ><span>{hotalResult.lgfj1}</span></td>
                    </tr>
                     <tr>
                      <td >维护到期日期 </td>
                      <td ><span>{hotalResult.whdq}</span></td>
                      <td >旅馆房价2</td>
                      <td ><span>{hotalResult.lgfj2}</span></td>
                    </tr>
                     <tr>
                      <td >最后一次申报时间 </td>
                      <td ><span>{hotalResult.zhycsbsj}</span></td>
                      <td >旅馆房价3</td>
                      <td ><span>{hotalResult.lgfj3}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          }
        </Row>
      </div>
    )
  }
}
