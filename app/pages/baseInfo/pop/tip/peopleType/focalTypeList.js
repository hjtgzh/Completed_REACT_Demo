import React, { Component } from 'react'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import { connect } from 'react-redux'
import RelateAddrModal from 'components/relateAddrModal/relateAddrModal'
import TableList from 'components/tableList/tableList'
import { fetchTipList,intoHouse} from 'actions/popTip'

//连接公用常量、后端返回的数据方法  并放置在props里面调用S
@connect(
  (state, props) => ({
    config: state.config,
    tipListSearchResult: state.tipListSearchResult,
    intoHouseState:state.intoHouseState,
    })   
)
  export default class typeList extends Component {
    constructor(props) {
      super(props)
      this.state = {
        id:'',//入户的id
        householdVisible:false,
        currentPage: 1,
        pageSize:10,
      }
    this.handleCancelHosehold=this.handleCancelHosehold.bind(this)
    this.handleOkHosehold=this.handleOkHosehold.bind(this)
    this.handleCancelHosehold=this.handleCancelHosehold.bind(this)
    this.handleShowHosehold=this.handleShowHosehold.bind(this)
  }

  componentDidMount() {
  
  }
   //重点人员登记变化的表格展示项的配置
  focalColumns() {
     const _self=this
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
         width:60,
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
         width:60,
      },
      {
        title: '性别',
        dataIndex: 'xbLable',
        key: 'xbLable',
        width:60,
      },
      {
        title: '身份证号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width:'15%'
      },
      {
        title: '户籍类别',
        dataIndex: 'rylb',
        key: 'rylb',
        width:60,
        render:(text,record,index)=>{
          if(record.rylb==1){
            return record.rylb =='重点人员'
          }else if(record.rylb==2){
            return record.rylb =='流动人员'
           }else{
            return record.rylb =='常住人口'
           }
        }
      },
      {
        title: '登记地址',
        dataIndex: 'djdz',
        key: 'djdz',
        width:60,
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwName',
        key: 'gxdwName',
         width:60,
      },
      {
        title: '管控时间',
        dataIndex: 'gksj',
        key: 'gksj',
         width:60,
      },
      {
        title: '关注类别',
        dataIndex: 'lb',
        key: 'lb',
        width:60,
        render:(text,record,index)=>{
          return record.lb ==1 ?'常口':'暂口'
        }
      },

       {
        title: '操作',
        key: 'operate',
        //fixed: 'right',
         width:70,
        render: function (text, record, index) {
          return (<a onClick={_self.handleShowHosehold.bind(_self,record.id)}>入户</a>)
        }
     },
    ]
  }
  //点击弹框的一系列操作
  handleShowHosehold(id){
    this.state.id=id
    //console.log(this.state.id)
    this.setState({householdVisible:true}) 
  }
 //点击确定回调函数
  handleOkHosehold(param){
    const id=this.state.id
    const postParam={
      id:id,
      dzbm:param.buildingcode,
      fjbm:param.roomcode
    }
     this.setState({householdVisible:false})
    this.props.dispatch(intoHouse(postParam,(reply)=>{
      message.success('入户成功')
    this.props.dispatch(fetchTipList({ currentPage: 1 ,rylb: 1}))
    }))
  }
 //点击取消或遮罩层回调函数
  handleCancelHosehold(){
    this.setState({householdVisible:false})
  }
  //点击每页返回函数
   pageChange(newPage) {
    this.setState({
      currentPage: newPage
    })
    // this只想改变需要bind一下
    this.props.dispatch(fetchTipList({currentPage: newPage, pageSize: this.state.pageSize,rylb:1}))
  }
  //改变每页显示条数回调函数
   pageSizeChange(currentPage,pageSize) {
    console.log(pageSize)
    this.setState({
      pageSize: pageSize,
      currentPage:1,
    })
    this.props.dispatch(fetchTipList({currentPage: 1, pageSize: pageSize,rylb:1}))
  }
  render() {
    const {
          dataSource,
          currentPage,
          totalCount,
          loading,
          scroll,
          pageChange,
          tipListSearchResult
      } = this.props
  return (
    <div className="detail-content">
      <TableList
        columns={this.focalColumns()}
        dataSource={tipListSearchResult.list}
        currentPage={this.state.currentPage}
        pageSize={this.state.pageSize}
        loading={tipListSearchResult.loading}
        scroll={{x:true,y: true}}
        onChange={this.pageChange.bind(this)}
        onShowSizeChange={this.pageSizeChange.bind(this)}
        totalCount={tipListSearchResult.totalCount}
      /> 
      {
        this.state.householdVisible?
          <RelateAddrModal
            onCancel={this.handleCancelHosehold}
            onOk={this.handleOkHosehold}
            visible={true}
            title="关联入户"
          />:null
      }
    </div>
  )
    }
}
