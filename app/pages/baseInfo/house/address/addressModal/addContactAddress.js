import React, { Component } from 'react'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import { connect } from 'react-redux'
import {
  fetchCognateAddressList,
  fetchAddAddress
} from 'actions/houseAddress'
//连接公用常量。后端返回数据。并放置在props里面调用
@connect(
  (state,props) =>({
    config:state.config,
    //查看民警
    addAddressResult:state.addAddressResult,
    cognateAddressListResult:state.cognateAddressListResult
  })
)
export default class typeList extends Component {
  constructor(props) {
    super(props)
    this.state={
      dataSource:[]
    }
  }
  componentDidMount() {
      //获取该责任区管辖下可以关联的地址
      this.props.dispatch(fetchCognateAddressList({pcsdm:this.props.curPcsdm},()=>{
          this.setState({
              dataSource:this.props.cognateAddressListResult.list
          })
      }))
  }
  addContact(recordId){
      this.props.dispatch(fetchAddAddress({id:recordId,zrqdm:this.props.curResAreadm},(reply)=>{
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
      title: '地址',
      dataIndex: 'bzdz',
      key: 'bzdz',
    },
    {
      title: '操作',
      key: 'operate',
      width: 70,
       render: function (text, record, index) {
        return (
          <a onClick={_self.addContact.bind(_self,record.id)}>关联</a>
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
      title="新增关联地址"
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
                  dataSource={this.state.dataSource}
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
