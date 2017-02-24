import React from 'react'

import {
  Route,
  hashHistory,
  IndexRoute,
} from 'react-router'

import App from './containers/App'
import Login from './containers/App/login'
import Welcome from './pages/welcome'



/*勤务管理 开始*/
  import {
    police,
  } from './pages/serviceManagement/police'

  import policeDetail from './pages/serviceManagement/police/policeDetail'
  
  import {
    task,
  } from './pages/serviceManagement/task'

  import taskDetail from './pages/serviceManagement/task/taskDetail'

  import {
    work,
  } from './pages/serviceManagement/work'

  import {
    qrcode,
  } from './pages/serviceManagement/qrcode'

  import {
    declare,
  } from './pages/serviceManagement/declare'

  import {
    file,
  } from './pages/serviceManagement/file'

  import {
    household,
  } from './pages/serviceManagement/household'
/*勤务管理 结束*/

/*基础信息 开始*/
  import {
    house,
  } from './pages/baseInfo/house'

  import houseDetail from './pages/baseInfo/house/detail/houseDetail'

  import room from './pages/baseInfo/house/detail/menu/visit/room'
  //黄建停--新建地址路由
  import newAddress from './pages/baseInfo/house/newAddress/newAddress'
  // 基础人口
  import {
    pop,
    visitDetail,
    detailSmall
  } from './pages/baseInfo/pop'

  //从业人员
  import {
      job,
  } from './pages/baseInfo/pop/job'

  import peopleDetails from './pages/baseInfo/pop/job/peopleDetails'
  import popInformation from './pages/baseInfo/pop/old/popInformation/popInformation'//人口信息


  import {
    group,
    departmentDetail
  } from './pages/baseInfo/group'
  import groupSafeKeepDetail from './pages/baseInfo/group/groupDetails/groupSafeKeepDetail'//安全防范详情

  import {
    security,
  } from './pages/baseInfo/security'
  import securityTabs from './pages/baseInfo/security/securityTabs'

  import {
    cue,
  } from './pages/baseInfo/cue'

  import newClue from './components/clue/clueDetail/newClue'
  
  import {
    goods,
  } from './pages/baseInfo/goods'
  import goodsTabs from './pages/baseInfo/goods/goodsTabs'

  import {
    count,
  } from './pages/baseInfo/count'

  //依靠力量
  import rely from './pages/baseInfo/pop/rely/rely'
  import relyDetail from './pages/baseInfo/pop/rely/relyDetail'
/*基础信息 结束*/

/*基础应用 开始*/
  import {
    apphouse,
  } from './pages/appBase/apphouse'

  import {
    apppop,
  } from './pages/appBase/apppop'

  import jobDetail from './pages/appBase/apppop/detail/jobDetail'
/*基础应用 结束*/

/*系统设置 开始*/
  import {
    card,
  } from './pages/sys/card'

  import {
    set,
  } from './pages/sys/set'
  
/*系统设置 结束*/

import notfound from 'components/notfound'


/*进入路由的判断*/
function isLogin(nextState, replaceState){
  const token = sessionStorage.getItem('token')
  if(!token){
    replaceState('/login')
    // hashHistory.push('/login')
    return false
  }
}

const routes = (
  <Route>
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute component={Welcome}/>

      {/***勤务管理 开始*/}
      <Route path="/police$" component={police} />
      <Route path="/police$Detail/:policeId" component={policeDetail} />

      <Route path="/task$" component={task} />
      <Route path="/task$Detail/:taskId" component={taskDetail} />

      <Route path="/work$" component={work} />

      <Route path="/qrcode$" component={qrcode} />

      <Route path="/declare$" component={declare} />

      <Route path="/file$" component={file} />

      <Route path="/household$" component={household} />
      {/***勤务管理 结束*/}

      {/***基础信息 开始*/}
      <Route path="/house$" component={house} />
      <Route path="/house$/newAddress" component={newAddress} />
      <Route path="/house$Detail/:houseId" component={houseDetail} />
      <Route path="/house$/room/:houseId/:roomId" component={room} />
      <Route path="/house$/newClue/:clueId" component={newClue}/>

      <Route path="/rely$" component={rely} />
      <Route path="/pop$/relyDetail/:peopleID" component={relyDetail} />

      <Route path="/pop$" component={pop} />
      <Route path="/pop$/visitDetail/:visitId" component={visitDetail} />
      <Route path="/pop$/newClue/:clueId" component={newClue}/>
      <Route path="/detailSmall/:peopleId" component={detailSmall} />
      <Route path="/popInformation/:jobId" component={popInformation} />
      <Route path="/pop$/peopleDetails/:jobId" component={peopleDetails} />

      <Route path="/group$" component={group} />
      <Route path="/group$/goodsTabs/:goodsId" component={goodsTabs} />
      <Route path="/group$/departmentDetail/:departmentId" component={departmentDetail} />
      <Route path="/group$/peopleDetails/:jobId" component={peopleDetails} />
      <Route path="/group$/newClue/:clueId" component={newClue}/>

      <Route path="/cue$" component={cue} />
      <Route path="/cue$/newClue/:clueId" component={newClue}/>

      <Route path="/goods$" component={goods} />
      <Route path="/goods$Tabs/:goodsId" component={goodsTabs} />

      <Route path="/security$" component={security} />
      <Route path="/security$Tabs/:securityId" component={securityTabs} />
      <Route path="/security$/newClue/:clueId" component={newClue}/>

      <Route path="/count$" component={count} />

      {/***基础信息 结束*/}

      {/***基础应用 开始*/}
      <Route path="/apphouse$" component={apphouse} />
      <Route path="/apppop$" component={apppop} />
      <Route path="/apppop$/jobDetail/:jobId" component={jobDetail} />
      {/***基础应用 结束*/}

      {/***系统设置 开始*/}
      <Route path="/card$" component={card} />
      <Route path="/set$" component={set} />
      {/***系统设置 结束*/}


    </Route>

    <Route path="/login" component={Login} />
    <Route path="*" component={notfound} />
  </Route>
);

export default routes;
