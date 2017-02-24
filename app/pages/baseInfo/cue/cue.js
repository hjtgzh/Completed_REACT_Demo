import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link ,hashHistory} from 'react-router'
import { Table, Button, Tabs } from 'antd'
import Panel from 'components/panel'
import Gform from 'components/gForm'
import { updateTabList } from 'actions/tabList'
import Clue from 'components/clue'
import NewClue from 'components/clue/clueDetail/newClue'
import ClueForm from 'components/clue/clueDetail/clueForm'

const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
    })
)

// 声明组件  并对外输出
export default class cue extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {}
  }

  // 组件已经加载到dom中
  componentDidMount() {
    if (this.props.params) {
     // 若非嵌套，则执行
     this.props.dispatch(updateTabList({
       title: `线索记录`,
       key: `/cue$`,
     }))
    }
  }
  gFormConfig(){
    const { config } = this.props
    return [
      {
        sort: 'division',
        label: '定位状态',
        items: config.DIVISION
      }
    ]
  }

  gFormSubmit(query){
    console.log(query)
  }

  newClue(){
    // const nextLocation = hashHistory.createLocation({pathname:`/cue$/newClue/${'newClue'}`,state:{type:111}})
    // hashHistory.push(nextLocation)
  }

  render() {
    return (
      <Panel>
        {/*<Gform gFormConfig={this.gFormConfig()} gFormSubmit={this.gFormSubmit} nums={{}}/>*/}
        <div className="gform-next-div">
            <ClueForm/>
            <div className="ability-button">
              <Button>
                <Link to={`/cue$/newClue/${'newClue'}`}>新增线索</Link>
              </Button>
            </div>
        </div>
      </Panel>
    )
  }
}
