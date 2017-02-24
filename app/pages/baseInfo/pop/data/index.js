import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Table, Button, Tabs} from 'antd'
import {
  fetchLocalList,
  updateLocalListQuery,
  resetLocalListQuery
} from 'actions/local'
import Panel from 'components/panel'
import TypeList from '../../house/common/typeList'
import TypeMap from '../../house/common/typeMap'
import Gform from 'components/gForm'
import './style.css'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    localListSearchResult: state.localListSearchResult,
    amList: state.amList,
  })
)

// 声明组件  并对外输出
export default class localList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      list: [
        {
          id: 1,
          name: '厉登高',
          sex: '男',
          age: '89',
          cardId: '330102192810200017',
          ssrk: '双实人口',
          institutions: '上城分局望江派出所',
          address: '宿迁市拱墅区上塘镇拱宸桥村台州路185号2幢',
          mechType: '110',
          gxdw: '001',
          poptype: '00',


        },
        {
          id: 2,
          name: '高月英',
          sex: '女',
          age: '50',
          cardId: '330104196710200029',
          ssrk: '双实人口',
          institutions: '上城分局望江派出所',
          address: '宿迁市拱墅区上塘镇拱宸桥村台州路185号2幢',
          mechType: '110',
          gxdw: '001',
          poptype: '00',
        }
      ]
    }
    this._handleSubmit = this._handleSubmit.bind(this)
    this.cacheSearch = this.cacheSearch.bind(this)
    this._clear = this._clear.bind(this)
    this._typeChange = this._typeChange.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchLocalList({currentPage: 1}))
  }

  // 点击搜索按钮的回调事件
  _handleSubmit(query, currentPage) {
    this.props.dispatch(fetchLocalList({...query, currentPage: currentPage}))
  }

  /* gFormConfig() {
   const { config } = this.props
   return [
   {
   sort: 'division',
   label: '管辖单位',
   items: config.DIVISION
   }
   ]
   }

   gFormSubmit(query) {
   console.log(query)
   }
   */
  // 重置搜索条件
  _clear() {
    this.props.dispatch(resetLocalListQuery())
  }

  // 缓存更新
  cacheSearch(item) {
    this.props.dispatch(updateLocalListQuery(item))
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '身份证号码',
        dataIndex: 'cardId',
        key: 'cardId',
      },
      {
        title: '双实人口',
        dataIndex: 'ssrk',
        key: 'ssrk',
      },
      {
        title: '机构名称',
        dataIndex: 'institutions',
        key: 'institutions',
      },
      {
        title: '机构地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '机构类别',
        dataIndex: 'mechType',
        key: 'mechType',
      },
      {
        title: '管辖单位',
        dataIndex: 'gxdw',
        key: 'gxdw',
      },
      {
        title: '人员类别',
        dataIndex: 'poptype',
        key: 'poptype',
      },
    ]
  }

  gFormConfig() {
    const {config} = this.props
    return [
      {
        sort: 'division',
        label: '行政区划',
        items: config.DIVISION
      },
      {
        sort: 'pop',
        label: '户籍类别',
        items: config.POP
      }
    ]
  }

  gFormSubmit(query) {
    console.log(query)
  }

  returnContent(key) {
    switch (key) {
      case 'list':
        const {
          localListSearchResult
        } = this.props
        return (
          <div className="detail-content">
            <TypeList
              columns={this.columns()}
              dataSource={this.state.list}
              expandedRowRender={()=> {
                <div>12312</div>
              }}
              // dataSource={houseCheckSearchResult.list}
              currentPage={localListSearchResult.currentPage}
              loading={localListSearchResult.loading}
            />
          </div>
        )
      case 'map':
        return 'map'
    }
  }

  _typeChange(key) {
    this.setState({activeTab: key})
  }

  render() {
    const {
      localListSearchResult,
    } = this.props
    // 暂时用假数据来模拟列表项
    return (
      <div className="nav-second-nextContent">
        <Gform gFormConfig={this.gFormConfig()} gFormSubmit={this.gFormSubmit} nums={{}}/>
        <div className="gform-next-div">
          <Tabs tabPosition="top" onChange={this._typeChange} className="list-map-tabs">
            <TabPane tab="列表" key="list">
            </TabPane>
            <TabPane tab="地图" key="map">
            </TabPane>
          </Tabs>
          {this.returnContent(this.state.activeTab)}

        </div>
      </div>
      /* <Panel>
       <Gform gFormConfig={this.gFormConfig()} gFormSubmit={this.gFormSubmit} nums={{}}/>
       <div className="list-tab list_tab_trf">
       <Tabs tabPosition="top" >
       <TabPane tab="列表" key="list">
       <TypeList
       columns={this.columns()}
       dataSource={this.state.list}
       expandedRowRender={()=>{<div>12312</div>}}
       // dataSource={houseCheckSearchResult.list}
       currentPage={localListSearchResult.currentPage}
       loading={localListSearchResult.loading}
       />
       </TabPane>
       <TabPane tab="地图" key="map">
       <TypeMap
       jobId={1}
       //dataSource={jobListSearchResult.list}
       //currentPage={jobListSearchResult.currentPage}
       //loading={jobListSearchResult.loading}
       />
       </TabPane>
       </Tabs>
       </div>
       </Panel>*/
    )
  }
}
