import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Table, Button, Tabs} from 'antd'
import {
  fetchAbroadList,
  updateAbroadListQuery,
  resetAbroadListQuery
} from 'actions/abroad'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import TypeList from './abroadType/typeList'
import TypeMap from './abroadType/typeMap'
import './style.css'


const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    abroadListSearchResult: state.abroadListSearchResult,
    amList: state.amList,
  })
)

// 声明组件  并对外输出
export default class abroadList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'list',
      list: [
        {
          id: 1,
          name: '刘星星',
          sex: '男',
          age: 54,
          cardId: '410105196301181070',
          country: '美国',
          address: '宿迁市拱墅区上塘镇拱宸桥村台州路185号2幢',
          roomName: '1单元独户',
          institutions: '',
          peopleSort: ''
        },
        {
          id: 5,
          name: '刘星星2',
          sex: '男',
          age: 20,
          cardId: '410105196301181070',
          country: '美国',
          address: '宿迁市拱墅区上塘镇拱宸桥村台州路185号2幢',
          roomName: '1单元独户',
          institutions: '',
          peopleSort: ''
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
    this.props.dispatch(fetchAbroadList({currentPage: 1}))
  }

  // 点击搜索按钮的回调事件
  _handleSubmit(query, currentPage) {
    this.props.dispatch(fetchAbroadList({...query, currentPage: currentPage}))
  }


  // 重置搜索条件
  _clear() {
    this.props.dispatch(resetAbroadListQuery())
  }

  // 缓存更新
  cacheSearch(item) {
    this.props.dispatch(updateAbroadListQuery(item))
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
        sort: 'division',
        label: '管辖单位',
        items: config.DIVISION
      }
    ]
  }

  gFormSubmit(query) {
    console.log(query)
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
        render: (text, record, index) => (
          <span>
            {text}
            <Link to={`/abroadDetail/${record.id}`} className="btn-detail-jxy">详情</Link>
          </span>
        ),
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
        title: '证件号码',
        dataIndex: 'cardId',
        key: 'cardId',
      },
      {
        title: '国籍',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: '现住地址',
        dataIndex: 'address',
        key: 'address',
        render: (text, recordId, index) => (
          <span>
            {text}
            <Link to={`/userManage`} className="btn-detail-jxy">详情</Link>
          </span>
        ),
      },
      {
        title: '房间名',
        dataIndex: 'roomName',
        key: 'roomName',
        render: (text, recordId, index) => (
          <span>{text}<a href={`#/house$Detail/${text.id}`} className="btn-detail-jxy">详情</a></span>
        ),
      },
      {
        title: '管辖单位',
        dataIndex: 'institutions',
        key: 'institutions',
      },

      {
        title: '人员类别',
        dataIndex: 'peopleSort',
        key: 'peopleSort',
      },
    ];
  }

  // 列表与地图模式切换的回调函数
  _typeChange(key) {
    this.setState({activeTab: key})
  }

  returnContent(key) {
    switch (key) {
      case 'list':
        const {
          abroadListSearchResult
        } = this.props
        return (
          <div className="detail-content">
            <TypeList
              columns={this.columns()}
              dataSource={this.state.list}
              currentPage={abroadListSearchResult.currentPage}
              // scroll={{x: 1100}}
              loading={abroadListSearchResult.loading}
              scroll={{x: 1000, y: true}}
            />
          </div>
        )
      case 'map':
        return 'map'
    }
  }

  render() {
    const {
      abroadListSearchResult,
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
          {/*            <TabPane tab="地图" key="map">
           <TypeMap
           houseId={1}
           dataSource={abroadListSearchResult.list}
           currentPage={abroadListSearchResult.currentPage}
           loading={abroadListSearchResult.loading}
           />
           </TabPane>*/}

        </div>
      </div>
    )
  }
}
