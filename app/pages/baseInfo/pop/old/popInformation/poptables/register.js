import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Select, Form, Row, Col} from 'antd'
import {
    fetchLocalList,
    updateLocalListQuery,
    resetLocalListQuery } from 'actions/local'
import Panel from 'components/panel'

const FormItem = Form.Item
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
                {},
                {
                    id: 1,
                    name: '厉登高',
                    sex: '男',
                    age: '89',
                    cardId: '330102192810200017',
                    ssrk: '双实人口',
                    institutions: '上城分局望江派出所',
                    address: '',
                    mechType: '110',
                    gxdw: '',
                    poptype: '00',


                },
                {
                    id: 2,
                    name: '厉登高',
                    sex: '男',
                    age: '89',
                    cardId: '330102192810200017',
                    ssrk: '双实人口',
                    institutions: '上城分局望江派出所',
                    address: '',
                    mechType: '110',
                    gxdw: '',
                    poptype: '00',
                    description: 'dsadsadsadsaaaaaaaaaaaaaa',


                },
                {
                    id: 3,
                    name: '高月英',
                    sex: '女',
                    age: '50',
                    cardId: '330104196710200029',
                    ssrk: '双实人口',
                    institutions: '上城分局望江派出所',
                    address: '',
                    mechType: '110',
                    gxdw: '',
                    poptype: '00',
                }
            ]
        }
        this._handleSubmit = this._handleSubmit.bind(this)
        this.cacheSearch = this.cacheSearch.bind(this)
        this._clear = this._clear.bind(this)
    }

    // 组件已经加载到dom中
    componentDidMount() {
        this.props.dispatch(fetchLocalList({currentPage: 1}))
    }

    // 点击搜索按钮的回调事件
    _handleSubmit(query, currentPage) {
        this.props.dispatch(fetchLocalList({...query, currentPage: currentPage}))
    }

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
            /*{
                title: '序号',
                key: 'index',
                render: (text, recordId, index) => <span>{index + 1}</span>,
            },*/
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: function (text, record, index) {
                    if(!text){
                        return
                    }
                    return (
                        <span>{text}
                            <Link to={`/pop$/visitDetail/${record.id}`}>详情</Link>
                        </span>
                    )
                },
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
                title: '身份证号码（护照号码）',
                dataIndex: 'cardId',
                key: 'cardId',
                width: 200,
            },
            {
                title: '户籍（国籍）',
                dataIndex: 'ssrk',
                key: 'ssrk',
            },
            {
                title: '登记状态',
                dataIndex: 'institutions',
                key: 'institutions',
            },
            {
                title: '人员状态',
                dataIndex: 'address',
                key: 'address',
                render: function (text, record, index) {
                    if(!text){
                        return
                    }
                    return (
                        <span>{text}
                            <Select
                                id="popInf"
                                size="large"
                                defaultValue=""
                                //onChange={this.handleSelectChange}
                            >
                            <Select.Option value="">人户一致</Select.Option>
                            <Select.Option value="01">人在户不在</Select.Option>
                            <Select.Option value="02">户在人不在</Select.Option>
                            </Select>
                        </span>
                    )
                },
            },
            {
                title: '关注类别',
                dataIndex: 'mechType',
                key: 'mechType',
            },
            {
                title: '操作',
                dataIndex: 'gxdw',
                key: 'gxdw',
                render: function (text, record, index) {
                    if(!record.id){
                        return
                    }
                    return (
                        <span>{text}
                            <Link to={`/pop$/visitDetail/${record.id}`}>访查</Link>
                        </span>
                    )
                },
            },
            {
                title: '访查日期',
                dataIndex: 'poptype',
                key: 'poptype',
            },
        ]
    }



    render() {
        const formItemLayout = {
          labelCol: { span: 2 },
          wrapperCol: { span: 22 },
        }
        return (
            <Panel>
                <div>
                    <Form>
                        <Row gutter={0}>
                            <Col span="24">
                                <FormItem {...formItemLayout} label="常住人口:">
                                    <span>人户一致(<b>1</b>)</span>
                                    <span>人在户不在(<b>1</b>)</span>
                                    <span>户在人不在(<b>1</b>)</span>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem {...formItemLayout} label="暂住人口:">
                                    <span>未登记(<b>1</b>)</span>
                                    <span>即将到期(<b>1</b>)</span>
                                    <span>需变更(<b>1</b>)</span>
                                    <span>已过期(<b>1</b>)</span>
                                    <span>已注销(<b>1</b>)</span>
                                    <span>未访查(<b>1</b>)</span>
                                    <span>逾期未访查(<b>1</b>)</span>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem {...formItemLayout} label="重点人员:">
                                    <span>重点人员(<b>1</b>)</span>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="list-tab list_tab_trf">
                  <Table
                    columns={this.columns()}
                    expandedRowRender={record => <p>{record.cardId}</p>}
                    //dataSource={data}
                    dataSource={this.state.list}
                    //dataSource={houseCheckSearchResult.list}
                    currentPage={1}
                    loading={false}
                    className="table"
                  />
                </div>
                <FormItem >
                    <Button type="primary" onClick={this.handleSubmit}>新增境外人员</Button>
                    <Button type="primary" onClick={this.handleReset}>新增人员</Button>
                    <Button type="primary" onClick={this.handleReset}>批量访查</Button>
                    <Button type="primary" onClick={this.handleReset}>批量关联入户</Button>
                </FormItem>
            </Panel>
        )
        const {
            localListSearchResult,
        } = this.props
        // 暂时用假数据来模拟列表项
    }
}
