import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import {
  fetchResponseAddress,
  fetchDeleteResponseAddress
} from 'actions/houseAddress'
import   '../address.css'
//连接公用常量。后端返回数据。并放置在props里面调用
@connect(
  (state,props) =>({
    config:state.config,
    //查看民警
    responseAddressResult:state.responseAddressResult,
    responseAddressDeleteResult:state.responseAddressDeleteResult
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
    //获取该责任区已关联的地址
    this.props.dispatch(fetchResponseAddress({zrqdm:this.props.curResAreadm},()=>{
      this.setState({
        dataSource:this.props.responseAddressResult.list
      })
    }))
  }
  delContact(id){
    this.props.dispatch(fetchDeleteResponseAddress({id:id},(reply)=>{
      this.props.dispatch(fetchResponseAddress({zrqdm:this.props.curResAreadm},()=>{
        this.setState({
          dataSource:this.props.responseAddressResult.list
        })
      }))
      message.success(reply.msg);
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
      render:text=><span>{text}</span>
    },
     
    {
      title: '操作',
      key: 'operate',
      width: 90,
       render: function (text, record, index) {
        return (
        <Popconfirm title="确认解除关联？" onConfirm={_self.delContact.bind(_self,record.id)}>
            <a className="opera_a_xie">解除关联</a>
        </Popconfirm>
        )
      },
    },     
    
  ]
}
  render() {
    const {
      addContactAddress,
      visible,onCancel
    } = this.props;
    return (
      <Modal
        className="modal-header modal-body"
        visible={visible}
        title="关联地址"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <Button type="primary" size="small" className="add-button" onClick={addContactAddress}>新增</Button>
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
                     /*loading={loading}
                    scroll={scroll}*/
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
