import React, { Component } from 'react'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'
import './style.css'
const {Column ,ColumnGroup,Rows,RowGroup } = Table
export default class typeList extends Component {
    constructor(props) {
      super(props)
      this.state={ 
      targetVisible:{
        display:'block'
      },
      aircraftVisible:{
        display:'none'
      },    
     }
     this.aircraftClick=this.aircraftClick.bind(this)
     this.targetClick=this.targetClick.bind(this)
       
    }
    componentDidMount() {
        // debugger
    }
    //点击目标
    targetClick(){
      this.setState({
        targetVisible:{display:'block'},
        aircraftVisible:{display:'none'}
      })
    }
    //点击飞行器
    aircraftClick(){
      this.setState({
        aircraftVisible: { display:'block' },
        targetVisible:{display:'none'}
        })

    }
     render() {
        return (
          <div className="detail-content">
            <div>
              <ul>
                <li>
                  <div className="goods-title-cpp">
                    <a >低慢小</a>
                   </div>
                </li>
                <li >
                  <div className="goods-title-cpp">
                    <a  onClick={this.targetClick}>目标</a>
                    <a  onClick={this.aircraftClick}>飞行器</a>
                   </div>
                </li>
              </ul>
            </div>
            <div className="goods-table-cpp">
              <table style={{display:this.state.targetVisible.display}}>
                <thead>
                  <tr>
                    <th rowSpan="3">单位名称(分局、派出所)</th>
                    <th colSpan="3">无人机</th>
                    <th colSpan="3">滑翔机</th>
                    <th colSpan="3">三角翼</th>
                    <th colSpan="3">滑翔伞</th>
                    <th colSpan="3">动力伞</th>
                    <th colSpan="3">热气球</th>
                  {/*  <th colSpan="3">飞艇</th>
                    <th colSpan="3">航空模型</th>
                    <th colSpan="3">空飘气球</th>
                    <th colSpan="3">其他"低慢小"飞行器</th>
                    <th colSpan="3">总数(架)</th>*/}
                   </tr>
                  <tr>
                    <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>
                    {/*<th colSpan="3">发现排查数</th>*/}
                   {/* <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>
                    <th colSpan="3">发现排查数</th>*/}
                  </tr>
                  <tr>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                 {/*   <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>*/}
                    {/*<th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>
                    <th>总数(架)</th>
                    <th>个人持有(架)</th>
                    <th>单位持有(架)</th>*/}
                  </tr>
                </thead>
                <tbody>
        
                </tbody>              
              </table>
              <table style={{display:this.state.aircraftVisible.display}}>
                <thead>
                  <tr>
                    <th rowSpan="3">单位名称(分局、派出所)</th>
                    <th colSpan="2">无人机</th>
                    <th colSpan="2">滑翔机</th>
                    <th colSpan="2">三角翼</th>
                    <th colSpan="2">滑翔伞</th>
                    <th colSpan="2">动力伞</th>
                    <th colSpan="2">热气球</th>
                    <th colSpan="2">飞艇</th>
                    <th colSpan="2">航空模型</th>
                    <th colSpan="2">空飘气球</th>
                    <th colSpan="2">其他"低慢小"飞行器</th>
                    {/*<th colSpan="8">持有人、所有单位情况</th>*/}
                    </tr>
                  <tr>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                    <th colSpan="2">持有人、所有单位情况</th>
                   <th colSpan="2">持有人、所有单位情况</th>
                   {/* <th colSpan="4">(人)个人</th>
                    <th colSpan="4">(家)单位</th>*/}
                  </tr>
                  <tr>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                    <th>(人)个人</th>
                    <th>(家)单位</th>
                   {/* <th>总数</th>*/}
                   {/* <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>总数</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>*/}
                  </tr>
                </thead>
                <tbody>
              
                </tbody>              
              </table>
            </div>
        </div>
        )
    }
}
