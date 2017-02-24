import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select, Tabs, Row, Col, DatePicker, Modal, Tag} from 'antd'
//import { App } from '../oldLabel'
import enUS from 'antd/lib/date-picker/locale/en_US'
import '../style.css'
import '../style_trf.css'
import { fetchOldDetails } from 'actions/old'
import {
    fetchHouseCheckList,
    updateHouseCheckListQuery,
    resetHouseCheckListQuery } from 'actions/house'
//import moment from 'moment-timezone/moment-timezone'

//const log = console.log().bind(console);

const Option = Select.Option
const createForm = Form.create
const FormItem = Form.Item
const InputGroup = Input.Group;

function noop() {
    return false;
}

@Form.create({
    onFieldsChange(props, items) {
        console.log(props)
        console.log(items)
        // props.cacheSearch(items);
    },
})
//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
        config: state.config,
        houseCheckSearchQuery: state.houseCheckSearchQuery,
        houseCheckSearchResult: state.houseCheckSearchResult,
        amList: state.amList,
    })
    /*function(state, props){
     console.log(state)
     console.log(props)
     return {
     config: state.config,
     houseCheckSearchQuery: state.houseCheckSearchQuery,
     houseCheckSearchResult: state.houseCheckSearchResult,

     }
     }*/
)

// 声明组件  并对外输出
export default class Index extends Component {

    // 组件已经加载到dom中
    componentDidMount() {
        this.props.dispatch(fetchOldDetails({ currentPage: 1 }))
    }

    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleColor = this.handleColor.bind(this)
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    }


    render() {
        //定义Modal组件
        const App = React.createClass({
            getInitialState() {
                return { visible: false };
            },
            showModal() {
                this.setState({
                    visible: true,
                });
            },
            handleOk() {
                console.log('Clicked OK');
                this.setState({
                    visible: false,
                });
            },
            handleCancel(e) {
                console.log(e);
                this.setState({
                    visible: false,
                });
            },
            render() {
                return (
                    <div>
                        <Button type="primary" onClick={this.showModal}>标签</Button>
                        <Modal title="类别标签" visible={this.state.visible}
                               onOk={this.handleOk} onCancel={this.handleCancel}
                        >
                            <p>管理类人员</p>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>流浪乞讨人员</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>大型群众性活动人员</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>巡逻盘查人员</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>涉疆人员</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>低慢小持有人</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>信鸽持有人</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>烈性犬持有人</Button>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>境外重点关注人员</Button>
                                </FormItem>
                            </Col>
                            <p>其他人员</p>
                            <Col span="24">
                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                    <Button type={this.state.type ? 'ghost':'primary'}>其他人员</Button>
                                </FormItem>
                            </Col>
                        </Modal>
                    </div>
                );
            },
        });

        //const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        // debugger
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        };
        const infItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const log = console.log.bind(console);

        return (
            <div>
                <div className="content">
                    <div className="box">
                        <div className="box-right">
                            <div className="menu_tab">
                                <Col span="24">
                                    <FormItem
                                        labelCol={{span: 1}}
                                        wrapperCol={{span: 23}}
                                        label="奥巴马">
                                        <span>1245784574444</span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="de_top">
                                <Row>
                                    <Col span="3" >
                                        <div className="imgs">
                                            <img src="" alt=""/>
                                        </div>
                                    </Col>
                                    <Col span="21">
                                        <div className="infTable">
                                            <Row>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="姓名">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="性别">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="身份证号码">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="户籍类别">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="出生日期">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="民族">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="人员状态">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="关注信息">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="是否在逃">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="关注类别">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="前科劣迹">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="暂住地址">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="户籍地址">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="现住地址">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="核录日期">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                                <Col span="12">
                                                    <FormItem {...infItemLayout} label="核录人">
                                                        <span>ss</span>
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="downtable">
                                <div className="downtable-info">
                                    <Row>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="单位">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="职务">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="工作部门">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="别名绰号">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="现住省县">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="现住派出所">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="现住社区">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="现住街巷">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="现住地址">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="户籍省县">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="户籍派出所">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="户籍社区">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="户籍街巷">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="户籍祥地">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="备注职务">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="聘任时间">
                                                <DatePicker
                                                    //defaultValue={moment().locale('en').utcOffset(0)}
                                                    locale={enUS}
                                                    showTime
                                                    onChange={log}
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="解聘时间">
                                                <DatePicker
                                                    //defaultValue={moment().locale('en').utcOffset(0)}
                                                    locale={enUS}
                                                    showTime
                                                    onChange={log}
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem {...infItemLayout} label="备注">
                                                <Input type="text"/>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <App>
                                                <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                                    <App />
                                                </FormItem>
                                            </App>
                                        </Col>
                                        <Col span="12">
                                            <FormItem wrapperCol={{ span: 12, offset: 10 }}>
                                                <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Button type="ghost" onClick={this.handleDelete}>删除从业人员</Button>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
