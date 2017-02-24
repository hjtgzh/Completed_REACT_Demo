import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import   '../address.css'
import {
    //查看民警
    fetchResponseAreaPolice,
    fetchDeleteResponsePolice,
} from 'actions/houseAddress'
//连接公用常量。后端返回数据。并放置在props里面调用
@connect(
    (state,props) =>({
      config:state.config,
      //查看民警
      responseAreaPoliceResult:state.responseAreaPoliceResult,
      responsePoliceDeleteResult:state.responsePoliceDeleteResult
    })
)
export default class typeList extends Component {
    constructor(props) {
      super(props)
      this.state={
        resAreaPoliceList:[]
      } 
    }
    componentDidMount() {
      //获取该责任区已添加的警员信息
      this.props.dispatch(fetchResponseAreaPolice({zrqId:this.props.curResAreaId},()=>{
        this.setState({
          resAreaPoliceList:this.props.responseAreaPoliceResult.list
        })
      }))
    }
    delPolice(recordId){
      this.props.dispatch(fetchDeleteResponsePolice({id:recordId},(reply)=>{
        this.props.dispatch(fetchResponseAreaPolice({zrqId:this.props.curResAreaId},()=>{
          this.setState({
            resAreaPoliceList:this.props.responseAreaPoliceResult.list
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
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
        render:text=><span>{text}</span>
      },
        {
        title: '警号',
        dataIndex: 'policenum',
        key: 'policenum',
      },
     
      {
        title: '管辖单位',
        dataIndex: 'gxdwMc',
        key: 'gxdwMc',
      },
      {
        title: '操作',
        key: 'operate',
        width: 70,
        render: function (text, record, index) {
          return (
            <Popconfirm title="确认删除？" onConfirm={_self.delPolice.bind(_self,record.id)}>
              <a className="opera_a_xie">删除</a>
            </Popconfirm>
          )
        },
      
      },     
      
    ]
  }
   render() {
    const {
      addPolice,
      visible,onCancel
    }=this.props
    return (
      <Modal
        className="modal-header modal-body"
        visible={visible}
        title="责任区民警"
        onCancel={onCancel}
        footer={this.footer()}
      >
        <Button type="primary" size="small" className="add-button" onClick={addPolice}>添加</Button>
        <div className="detail-content">
          <Row gutter={16}>
            {
              <Col sm={24} md={24} lg={24}>
                <div className="detail-box">
                  <Table
                      columns={this.columns()}
                      dataSource={this.state.resAreaPoliceList}
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
