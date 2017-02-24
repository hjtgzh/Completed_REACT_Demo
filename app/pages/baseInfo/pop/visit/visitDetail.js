/**
 * Created by 余金彪 on 2016/11/21.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, Tabs } from 'antd'
import Panel from 'components/panel'
import { fetchPeopleName } from 'actions/people'
import { updateTabList } from 'actions/tabList'
import { VISIT_SUB_MENUS } from 'utils/config'
import Clue from 'components/clue'
import Archives from './detail/archives'
import Log from './detail/Log'
import People from './detail/people'
import Punish from './detail/punish'


const TabPane = Tabs.TabPane

@connect(
  (state) => ({
    config: state.config,
    fetchPeopleNameResult: state.fetchPeopleNameResult,
  })
)
export default class visitDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { activeSub: 'people' }
    this.getVisitName = this.getVisitName.bind(this)
  }

  componentDidMount() {
    const baseId = this.props.params.visitId.split(':')[1]
    const totalId = this.props.visitId || this.props.params.visitId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '人员',
        key: `/pop$/visitDetail/${totalId}`,
      }))
    }
    this.getVisitName(baseId)
  }

  componentWillMount() {
    const totalId = this.props.visitId || this.props.params.visitId || 1
    if ($GLOBALCONFIG.tabCache[`/visitDetail/${totalId}`]) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/visitDetail/${totalId}`].val })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.visitId !== nextProps.params.visitId) {
      const totalId = nextProps.visitId || nextProps.params.visitId || 1
      const baseId = nextProps.params.visitId.split(':')[1]
      if (nextProps.params) {
        // 若非嵌套，则执行
        this.props.dispatch(updateTabList({
          title: '人员',
          key: `/pop$/visitDetail/${totalId}`,
        }))
      }
      if ($GLOBALCONFIG.tabCache[`/visitDetail/${totalId}`]) {
        this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/visitDetail/${totalId}`].val })
      } else {
        this.setState({ activeSub: 'people' })
      }
      this.getVisitName(baseId)
    }
  }

  getVisitName(baseId) {
    this.props.dispatch(fetchPeopleName({ baseId: baseId }))
  }

  _getTabMenus() {
    const CURRENT_SUB_MENU = []
    CURRENT_SUB_MENU.push(VISIT_SUB_MENUS[0])

    CURRENT_SUB_MENU.push(VISIT_SUB_MENUS[1]);
    CURRENT_SUB_MENU.push(VISIT_SUB_MENUS[2]);
    CURRENT_SUB_MENU.push(VISIT_SUB_MENUS[3]);
    CURRENT_SUB_MENU.push(VISIT_SUB_MENUS[4]);
    // console.log('CURRENT_SUB_MENU', CURRENT_SUB_MENU)
    return CURRENT_SUB_MENU
  }

  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const totalId = this.props.visitId || this.props.params.visitId || 1
    const tab = { key: `/visitDetail/${totalId}`, val: key }
    $GLOBALCONFIG.tabCache[`/visitDetail/${totalId}`] = tab
  }

  render() {
    const visitId = this.props.visitId || this.props.params.visitId.split(':')[0] || 1
    const peopleId = this.props.params.visitId.split(':')[1] || visitId
    const { fetchPeopleNameResult } = this.props
    const templateConfig = {
      archives: (<Archives visitId={visitId} />),
      clue: (<Clue type="people" id={peopleId} clueType="recordRy" locationType="pop" />),
      log: (<Log visitId={visitId} />),
      people: (<People visitId={visitId} />),
      punish: (<Punish visitId={visitId} baseId={peopleId} />),
    }

    return (
      <Panel>
        <Spin spinning={false}>
          <div className="detail-tab">
            <Tabs
              defaultActiveKey={this.state.activeSub}
              activeKey={this.state.activeSub}
              tabPosition="top"
              onChange={this._tabChange}
              className="right-nav-second"
            >
              {
                this._getTabMenus().map((sub) => (
                  <TabPane tab={sub.name} key={sub.url} />
                ))
              }
            </Tabs>
          </div>
          <div className="tab-main">
            <div className="title-wrap">
              <span className="detail-box-name">{ fetchPeopleNameResult.xm }</span>
              <span className="idnumber">{ fetchPeopleNameResult.sfzh }</span>
            </div>
            { templateConfig[this.state.activeSub]}
          </div>
        </Spin>
      </Panel>
    )
  }
}
