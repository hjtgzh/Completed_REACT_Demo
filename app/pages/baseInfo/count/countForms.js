import React, { Component } from 'react'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select,DatePicker,Collapse} from 'antd'
import './style.css'

const {Column ,ColumnGroup } = Table
const Panel=Collapse.Panel

export default class typeList extends Component {
    constructor(props) {
        super(props)
         this.state={ 
            startValue:null,
            endValue:null,
            endOpen:false,
        
    } 
     this.callback=this.callback.bind(this)
     this.disabledStartDate=this.disabledStartDate.bind(this)
     this.onStartChange=this.onStartChange.bind(this)
     this.handleStartOpenChange=this.handleStartOpenChange.bind(this)
     this.disabledEndDate=this.disabledEndDate.bind(this)
     this.onEndChange=this.onEndChange.bind(this)
     this.handleEndOpenChange=this.handleEndOpenChange.bind(this)
  }
     
    disabledStartDate=(startValue)=>{
      const endValue=this.state.endValue;
      if(!startValue || !endValue){
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    }
    disabledEndDate = (endValue)=>{
      const startValue=this.state.startValue
      if(!endValue ||!startValue){
        return false
      }
      return endValue.valueOf() <= startValue.valueOf()
    }
    onChange=(field ,value)=>{
      this.setState({
        [field]:value
      })
    }
     callback(key){
      console.log(key)
    }
    onStartChange=(value)=>{
      this.onChange('startValue',value)
    }
    onEndChange=(value)=>{
      this.onChange('endValue',value)
    }
    handleStartOpenChange =(open)=>{
      if(!open){
        this.setState({endOpen:true})
      }
    }
    handleEndOpenChange =(open)=>{
      this.setState({endOpen:open})
    }
    

    columns() {
    const _self=this
    return [
    /*  {
        title: '',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },*/
      {
        title: '地址',
        dataIndex: 'addressName',
        key: 'addressName',
        render:text=><span>{text}</span>
      },
       
      {
        title: '操作',
        key: 'operate',
        fixed: 'right',
        width: 70,
         render: function (text, record, index) {
          return (
            <Button type="primary" size="small" >添加</Button>
          )
        },
      
      },     
      
    ]
  }
     render() {
        const {startValue,endValue,endOpen}=this.state
        return (
          <div>
            <div  className="searchTime-cpp">
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  value={startValue}
                  placeholder="请输入开始时间"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                <DatePicker
                   disabledDate={this.disabledEndDate}
                   showTime
                   format="YYYY-MM-DD HH:mm:ss"
                   value={endValue}
                   placeholder="请输入结束时间"
                   onChange={this.onEndChange}
                   open={endOpen}
                   onOpenChange={this.handleEndOpenChange}
                />  
              </div>          
              <div className="month-div-cpp">
                <Collapse onChange={this.callback}>
                  <Panel header={'2016统计报表'} key="1">
                    <Collapse defalutActiveKey="1">
                      <Panel header={'11月统计报表'} key="1">
                        <ul className='month-list-cpp'>
                          <li>
                            <span>2016年11月“派出所基础信息采集”单位信息采集情况统计表</span>
                            <a>点击下载</a>
                          </li>
                          <li>
                            <span>2016年11月“派出所基础信息采集”人员信息采集情况统计表</span>
                            <a >点击下载</a>
                          </li>
                       </ul>
                      </Panel>
                      <Panel header={'10月统计报表'} key="2">
                        <ul className='month-list-cpp'>
                          <li>
                            <span>2016年11月“派出所基础信息采集”单位信息采集情况统计表</span>
                            <a>点击下载</a>
                          </li>
                          <li>
                            <span>2016年11月“派出所基础信息采集”人员信息采集情况统计表</span>
                            <a >点击下载</a>
                          </li>
                           <li>
                            <span>2016年11月“派出所基础信息采集”房屋信息采集情况统计表</span>
                            <a >点击下载</a>
                          </li>
                       </ul>
                      </Panel> 
                      <Panel header={'9月统计报表'} key="3">
                        <ul className='month-list-cpp'>
                          <li>
                            <span>2016年9月“派出所基础信息采集”单位信息采集情况统计表</span>
                            <a>点击下载</a>
                          </li>
                          <li>
                            <span>2016年9月“派出所基础信息采集”人员信息采集情况统计表</span>
                            <a >点击下载</a>
                          </li>
                           <li>
                            <span>2016年9月“派出所基础信息采集”房屋信息采集情况统计表</span>
                            <a >点击下载</a>
                          </li>
                       </ul>
                      </Panel>     
                    </Collapse>
                   </Panel>
                </Collapse>
              </div> 
            </div>
         
        )
    }
}
