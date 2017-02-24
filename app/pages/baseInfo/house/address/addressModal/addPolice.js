import React, { Component } from 'react'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import { connect } from 'react-redux'
import {
  //查看民警
  fetchPoliceList,
  fetchAddPolcie
} from 'actions/houseAddress'
//连接公用常量。后端返回数据。并放置在props里面调用
@connect(
  (state,props) =>({
    config:state.config,
    //查看民警
    policeListResult:state.policeListResult,
    policeAddResult:state.policeAddResult
  })
)
export default class typeList extends Component {
  constructor(props) {
    super(props)
    this.state= {
      policeList: []
    }
  }
  componentDidMount() {
    //获取该责任区管辖下可以添加的警员信息
    this.props.dispatch(fetchPoliceList({gxdwdm:this.props.curPcsdm},()=>{
      this.setState({
        policeList:this.props.policeListResult.list
      })
    }))
  }
  addPolice(recordId){
    this.props.dispatch(fetchAddPolcie({userId:recordId,zrqId:this.props.curResAreaId},(reply)=>{
      message.success(reply.msg)
    }))
  }
  footer(){
    return(
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }
  columns() {
  const _self=this
  return [
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '警号',
      dataIndex: 'policenum',
      key: 'policenum',
    },
   
    {
      title: '管辖单位',
      dataIndex: 'gxdwqc',
      key: 'gxdwqc',
    },
    {
      title: '操作',
      key: 'operate',
      width: 70,
      render: function (text, record, index) {
        return (
          <a onClick={_self.addPolice.bind(_self,record.id)}>添加</a>
        )
      },
    },
  ]
}
render() {
  const {
    visible,onCancel
  }=this.props
  return (
    <Modal
      className="modal-header modal-body"
      visible={visible}
      title="新增民警"
      onCancel={onCancel}
      footer={this.footer()}
    >
      <div className="detail-content">
        <Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
              <div className="detail-box">
                <Table
                  columns={this.columns()}
                  dataSource={this.state.policeList}
                  pagination={ false}
                  bordered
                />
              </div>
            </Col>
          }
        </Row>
      </div>
    </Modal>
    )
  }
}
