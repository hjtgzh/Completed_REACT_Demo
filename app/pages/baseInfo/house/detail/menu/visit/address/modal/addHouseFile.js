/**
 * Created by 谢德训 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Form,Input,Button,Row,Col,Modal} from 'antd'
import TableList from 'components/tableList/tableList'
import { fetchSearchHouseFile} from 'actions/houseVisitAddress'

const FormItem = Form.Item

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    searchHouseFileResult: state.searchHouseFileResult,
  })
)

@Form.create({

})

export default class archives extends Component{
  constructor(props){
    super(props)
    this.state = {
      list:[
        {
          id:5,
          name:'John Brown',
          archivesCode:'23333',
          phone:'10086',
          address:'china',
          handle:'绑定'
        }
      ]
    }
    this.bindInsert = this.bindInsert.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  //绑定
  bindInsert(id,e){
    e.preventDefault();
    this.props.handleOk(id)
  }

  //搜索
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.props.dispatch(fetchSearchHouseFile({...values}))
    });
  }

  columns() {
    return [
      {
        title:'姓名',
        dataIndex: 'fdxm',
        key:'fdxm',
        width:70
      },
      {
        title:'档案号',
        dataIndex: 'dah',
        key:'dah',
        width:140
      },
      {
        title:'联系电话',
        dataIndex: 'fddh',
        key:'fddh',
        width:100
      },
      {
        title:'出租房地址	',
        dataIndex: 'hjdxz',
        key:'hjdxz',
        width:120
      },
      {
        title:'操作',
        key:'handle',
        render: (text, record, index) => (
          <a onClick={()=>this.bindInsert(record.dah)}>绑定</a>
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
    const {searchHouseFileResult}=this.props;
    const { getFieldDecorator } = this.props.form;
    const {visible,onCancel}=this.props;
    return(
    <Modal
      title="添加楼幢档案号"
      visible={visible}
      onCancel={onCancel}
      footer={this.footer()}>
      <div>
        <Form horizontal>
          <FormItem>
            <Row gutter={16}>
              <Col span={20}>
                {getFieldDecorator('keyword',{
                  rules: [
                    {required: true, message:'请输入搜索条件'},
                  ]
                })(
                  <Input placeholder="请输入房主姓名或档案号"/>
                )}
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={this.handleSearch}>搜索</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <TableList
          dataSource={searchHouseFileResult.list}
          columns={this.columns()}
          scroll={{y: true}}
          loading={searchHouseFileResult.loading}
        />
      </div>
    </Modal>
    )
  }

}