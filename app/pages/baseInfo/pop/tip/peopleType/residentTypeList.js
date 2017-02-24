import React, { Component } from 'react'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import { connect } from 'react-redux'
import RelateAddrModal from 'components/relateAddrModal/relateAddrModal'
import TableList from 'components/tableList/tableList'
import { fetchTipList,intoHouse} from 'actions/popTip'

//连接公用常量、后端返回的数据方法  并放置在props里面调用S
/*@connect(
  (state, props) => ({
    config: state.config,
    tipListSearchResult: state.tipListSearchResult,
    intoHouseState:state.intoHouseState,
    })   
)*/
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
    }
  componentDidMount() {
  
  }
  //常口登记变化的表格展示项的配置
  residentColumns() {
     const _self=this
    return [
      {
        title: '序号',
        key: 'index',
        width:'5%',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
       width:'5%',
      },
      {
        title: '性别',
        dataIndex: 'xbLable',
        key: 'xbLable',
       width:'5%',
      },
      {
        title: '年龄',
        dataIndex: 'nl',
        key: 'nl',
        width:'5%',
      },
      {
        title: '身份证号码',
        dataIndex: 'sfzh',
        key: 'sfzh',
        width:'15%',
      },
      {
        title: '登记地址',
        dataIndex: 'djdz',
        key: 'djdz',
        width:'15%',
      },
      {
        title: '上次访查时间',
        dataIndex: 'scfcsj',
        key: 'scfcsj',
        width:'15%',
      },
      {
        title: '系统登录修改时间',
        dataIndex: 'djxtxgsj',
        key: 'djxtxgsj',
        width:'15%',
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdwName',
        key: 'gxdwName',
        width:'10%',
      },
       {
        title: '操作',
        key: 'operate',
        //fixed: 'right',
        width:'10%',
       /* render: function (text, record, index) {
          return (<a onClick={_self.handleShowHosehold.bind(_self,record.id)}>入户</a>)
        }*/
      },     
    ]
  }
   //点击弹框的一系列操作
  handleShowHosehold(id){
     this.state.id=id
    console.log(this.state.id)
    this.setState({householdVisible:true}) 
  }
 //点击确定回调函数
  handleOkHosehold(param){
    debugger
   const id=this.state.id
   const postParam={
      id:id,
       dzbm:param.buildingcode,
      fjbm:param.roomcode
    }
    this.setState({householdVisible:false})
    console.log(postParam)
    debugger
     this.props.dispatch(intoHouse(postParam))
   /* this.props.dispatch(intoHouse(postParam,(reply)=>{
      debugger
    if (reply.status==1){
        message.success("入户成功")
           this.props.dispatch(fetchTipList({ currentPage: 1 ,rylb: 3}))
      }
    }))*/
  }
 //点击取消或遮罩层回调函数
  handleCancelHosehold(){
    this.setState({householdVisible:false})
  }
   pageChange(newPage) {
    this.setState({
      currentPage: newPage
    })
    // this只想改变需要bind一下
    console.log(newPage)
    this.props.dispatch(fetchTipList({currentPage: newPage, pageSize: this.state.pageSize}))
  }
   pageSizeChange(pageSize) {
    this.setState({
      pageSize: pageSize,
      currentPage:1,
    })
    this.props.dispatch(fetchFlowList({currentPage: 1, pageSize: pageSize}))
  }



  render() {
     const {
          dataSource,
          currentPage,
          totalCount,
          loading,
          scroll,
          pageChange,
          tipListSearchResult,

      } = this.props
    //分页器
  const pagination = {
    total: totalCount ,
    current: currentPage ,
    showSizeChanger: true,
    showTotal(count) {
      return `共 ${count} 条`
    },
    onChange(current) {
      pageChange(current)
    },
  }
  return (
    <div className="detail-content">
      <TableList
        columns={this.residentColumns()}
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
            title="关联入户"
          />:null
      }
    </div>
  )
    }
}
