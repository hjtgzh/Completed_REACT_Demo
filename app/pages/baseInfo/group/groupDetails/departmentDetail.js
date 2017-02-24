/**
 * Created by 余金彪 on 2016/12/12.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Spin } from 'antd'
import Panel from 'components/panel'
import { updateTabList } from 'actions/tabList'
import { getDepartmentName } from 'actions/department'
import { groupSubmenu } from 'utils/config'
import {
  fetchDetailDepartment,
} from 'actions/groupInformation'
import GroupInformation from './groupInformation'
import GroupIncidenceCondition from './groupIncidenceCondition'
import GroupGunUnit from './groupGunUnit'
import GroupBlastingUnit from './groupBlastingUnit'
import GroupServicedApartment from './groupServicedApartment'
import GroupCarRentalBusiness from './groupCarRentalBusiness'
import GroupLogisticsIndustry from './groupLogisticsIndustry'
import GroupHotalInformation from './groupHotalInformation'
import GroupFireworksUnit from './groupFireworksUnit'
import GroupBuildingSites from './groupBuildingSites'
import GroupSafeKeep from './groupSafeKeep'
import GroupCueRecord from './groupCueRecord'
import GroupVisitRecord from './groupVisitRecord'
import GroupPicture from './groupPicture'
import GroupDeliveryIndustry from './groupDeliveryIndustry'
import GroupHighlyToxic from './groupHighlyToxic'
import GroupControlledKnife from './groupControlledKnife'
import GroupEmployee from './groupEmployee'
import GroupFireMessage from './groupFireMessage'
import GroupPunishRecord from './groupPunishRecord'
import GroupCheckRecord from './groupCheckRecord'
import GroupSlowlySmallUnit from './groupSlowlySmallUnit'
import GroupForeignFundedUnits from './groupForeignFundedUnits' // 三资单位

const TabPane = Tabs.TabPane;
// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    fetchDepartmentNameResult: state.fetchDepartmentNameResult,
  })
)
export default class departmentDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'groupInformation',
      labels: {
        jbxx: '1',
        cyry: '1',
        aqff: '1',
        xfxx: '1',
        jcjl: '1',
        cfjl: '1',
        faqk: '1',
        dwzp: '1',
        jsjl: '1',
        fcrz: '1',
        999902: '0',
        '071512': '0',
        '071508': '0',
        '071511': '0',
        S035: '0',
        '030819': '0',
        '071403': '0',
        S004: '0',
        S014: '0',
        S005: '0',
        S017: '0',
        dmxbgdw: '0',
      },
    }
    this.changeType = this.changeType.bind(this)
    this.getDeptName = this.getDeptName.bind(this)
  }

  componentDidMount() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: '基本信息',
        key: `/group$/departmentDetail/${departmentId}`,
      }))
      this.getDeptName(departmentId)
    }
  }

  componentWillMount() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    if ($GLOBALCONFIG.tabCache[`/departmentDetail/${departmentId}`]) {
      this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/departmentDetail/${departmentId}`].val })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.departmentId != nextProps.params.departmentId) {
      const departmentId = nextProps.departmentId || nextProps.params.departmentId || 1
      this.props.dispatch(fetchDetailDepartment({ id: departmentId }, (result) => {
        this.changeType(result.data.dpt)
      }))
      if (nextProps.params) {
        // 若非嵌套，则执行
        this.props.dispatch(updateTabList({
          title: '基本信息',
          key: `/group$/departmentDetail/${departmentId}`,
        }))
      }
      if ($GLOBALCONFIG.tabCache[`/departmentDetail/${departmentId}`]) {
        this.setState({ activeSub: $GLOBALCONFIG.tabCache[`/departmentDetail/${departmentId}`].val })
      } else {
        this.setState({ activeSub: 'groupInformation' })
      }
      this.getDeptName(departmentId)
    }
  }

  getDeptName(departmentId) {
    this.props.dispatch(getDepartmentName({ id: departmentId }))
  }

  _getTabMenus() {
    const menu = []
    // 这里没有遍历整个菜单列表是考虑到可能的权限
    menu.push(groupSubmenu[0])
    menu.push(groupSubmenu[1])
    menu.push(groupSubmenu[2])
    menu.push(groupSubmenu[3])
    menu.push(groupSubmenu[4])
    menu.push(groupSubmenu[5])
    menu.push(groupSubmenu[6])
    menu.push(groupSubmenu[7])
    menu.push(groupSubmenu[8])
    menu.push(groupSubmenu[9])
    menu.push(groupSubmenu[10])
    menu.push(groupSubmenu[11])
    menu.push(groupSubmenu[12])
    menu.push(groupSubmenu[13])
    menu.push(groupSubmenu[14])
    menu.push(groupSubmenu[15])
    menu.push(groupSubmenu[16])
    menu.push(groupSubmenu[17])
    menu.push(groupSubmenu[18])
    menu.push(groupSubmenu[19])
    menu.push(groupSubmenu[20])
    menu.push(groupSubmenu[21])
    menu.push(groupSubmenu[22])
    menu.push(groupSubmenu[23])
    menu.push(groupSubmenu[24])
    menu.push(groupSubmenu[25])
    menu.push(groupSubmenu[26])
    menu.push(groupSubmenu[27])
    menu.push(groupSubmenu[28])
    return menu
  }

  //改变标签状态
  changeType(values) {
    const labels = this.state.labels
    labels['999902'] = 0
    labels['071512'] = 0
    labels['071508'] = 0
    labels['071511'] = 0
    labels.S035 = 0
    labels['030819'] = 0
    labels['071403'] = 0
    labels.S004 = 0
    labels.S014 = 0
    labels.S005 = 0
    labels.S017 = 0
    labels.dmxbgdw = 0
    if (values.dwlb != undefined && values.dwlb != '') {
      values.dwlb.split(';').map((item) => {
        labels[item] = 1
      })
    }
    labels.szqy = values.szqy
    labels.tzhy = values.tzhy
    labels.nbdw = values.nbdw
    labels.ysbkqxcs = values.ysbkqxcs
    labels.dxqzxhd = values.dxqzxhd
    labels.jzdw = values.jzdw
    labels.hydw = values.hydw
    this.setState({ labels: labels })
  }

  _tabChange = (key) => {
    this.setState({ activeSub: key })
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const tab = { key: `/departmentDetail/${departmentId}`, val: key }
    $GLOBALCONFIG.tabCache[`/departmentDetail/${departmentId}`] = tab
  }


  render() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const { fetchDepartmentNameResult } = this.props
    const templateConfig = {
      groupIncidenceCondition: (<GroupIncidenceCondition departmentId={departmentId} />),
      groupGunUnit: (<GroupGunUnit departmentId={departmentId} />),
      groupBlastingUnit: (<GroupBlastingUnit departmentId={departmentId} />),
      groupInformation: (
        <GroupInformation
          departmentId={departmentId}
          value={this.state.value}
          changeType={this.changeType}
        />
      ),
      groupServicedApartment: (<GroupServicedApartment departmentId={departmentId} />),
      groupCarRentalBusiness: (<GroupCarRentalBusiness departmentId={departmentId} />),
      groupLogisticsIndustry: (<GroupLogisticsIndustry departmentId={departmentId} />),
      groupHotalInformation: (<GroupHotalInformation departmentId={departmentId} />),
      groupFireworksUnit: (<GroupFireworksUnit departmentId={departmentId} />),
      groupBuildingSites: (<GroupBuildingSites departmentId={departmentId} />),
      groupPicture: (<GroupPicture departmentId={departmentId} />),
      groupSafeKeep: (<GroupSafeKeep departmentId={departmentId} />),
      groupCueRecord: (<GroupCueRecord departmentId={departmentId} />),
      groupVisitRecord: (<GroupVisitRecord departmentId={departmentId} />),
      groupDeliveryIndustry: (<GroupDeliveryIndustry departmentId={departmentId} />),
      groupHighlyToxic: (<GroupHighlyToxic departmentId={departmentId} />),
      groupControlledKnife: (<GroupControlledKnife departmentId={departmentId} />),
      groupEmployee: (<GroupEmployee departmentId={departmentId} />),
      groupFireMessage: (<GroupFireMessage departmentId={departmentId} />),
      groupPunishRecord: (<GroupPunishRecord departmentId={departmentId} />),
      groupCheckRecord: (<GroupCheckRecord departmentId={departmentId} />),
      groupSlowlySmallUnit: (<GroupSlowlySmallUnit departmentId={departmentId} />),
      groupForeignFundedUnits: (<GroupForeignFundedUnits departmentId={departmentId} />), // 三资单位
    }
    const changeType = this.state.labels
    return (
      <Panel>
        <Spin spinning={false}>
          <Tabs
            defaultActiveKey={this.state.activeSub}
            activeKey={this.state.activeSub}
            tabPosition="top"
            className="right-nav-second list-map-tabs "
            onChange={this._tabChange}
          >
            {
              this._getTabMenus().map((sub) => (
                changeType[sub.key] == '1' ?
                  <TabPane tab={sub.name} key={sub.url} /> : null
              ))

            }
          </Tabs>
          <div className="tab-main">
            <div className="title-wrap">
              {fetchDepartmentNameResult.dwmc}
            </div>
            {templateConfig[this.state.activeSub]}
          </div>
        </Spin>
      </Panel>
    )
  }
}