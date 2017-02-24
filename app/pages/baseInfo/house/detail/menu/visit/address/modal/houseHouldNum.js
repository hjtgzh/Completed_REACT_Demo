/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Form,Input,Button,Row,Col,Modal} from 'antd'
import TableList from 'components/tableList/tableList'
import { fetchsearchHouldNum } from 'actions/houseVisitAddress'

const FormItem = Form.Item

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    searchHouldNumResult: state.searchHouldNumResult,
  })
)

@Form.create({

})

export default class houseNumber extends Component{
  constructor(props){
    super(props)
    this.state = {
      list:[]
    }
    this.bindInsert = this.bindInsert.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  //绑定
  bindInsert(values){
    this.props.handleOk(values)
  }

  //搜索
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.props.dispatch(fetchsearchHouldNum({...values}))
    });
  }

  columns() {
    return [
      {
        title:'姓名',
        dataIndex: 'hzxm',
        key:'hzxm',
        width:70
      },
      {
        title:'身份证号	',
        dataIndex: 'sfzh',
        key:'sfzh',
        width:120
      },
      {
        title:'户号		',
        dataIndex: 'hh',
        key:'hh',
        width:120
      },
      {
        title:'参考地址		',
        dataIndex: 'ckdz',
        key:'ckdz',
        width:90
      },
      {
        title:'操作',
        key:'handle',
        render: (text, record, index) => (
          <a onClick={()=>this.bindInsert(record)}>绑定</a>
        ),
      },
    ]
  }

  footer(){
    return(
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }
  render(){
    const {searchHouldNumResult}=this.props;
    const { getFieldDecorator } = this.props.form;
    const {visible,onCancel}=this.props;
    return(
    <Modal
      title="添加户号"
      visible={visible}
      onCancel={onCancel}
      footer={this.footer()}>
      <div>
        <Form horizontal>
          <FormItem>
            <Row gutter={16}>
              <Col span={20}>
                {getFieldDecorator('key',{
                  rules: [
                    {required: true, message:'请输入姓名或身份证'}
                  ]
                })(
                  <Input placeholder="请输入姓名或身份证"/>
                )}
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={this.handleSearch}>搜索</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <TableList
          dataSource={searchHouldNumResult.list}
          columns={this.columns()}
          scroll={{y: true}}
          loading={searchHouldNumResult.loading}
        />
      </div>
    </Modal>
    )
  }
}