import {
    createAction,
} from 'redux-actions'
import {
    job,
} from 'api'
import {
    createAjaxAction,
} from 'utils'

//从业人员列表
export const requestJobListList = createAction('request jobList list');
export const recevieJobListList = createAction('receive jobList list');
export const fetchJobListList = createAjaxAction(
    job.jobListList,
    requestJobListList,
    recevieJobListList
);

// 从业人员详情
export const requestpeopleDetails = createAction('request job detail')
export const receviepeopleDetails = createAction('receive job detail')
export const fetchpeopleDetails = createAjaxAction(
  job.peopleDetails,
  requestpeopleDetails,
  receviepeopleDetails
)

// 更新从业人员信息
export const updateJobListListQuery  = createAction('request jobList update');
export const resetJobListListQuery = createAction('receive jobList update');
export const updatePeopleDetails = createAjaxAction(
  job.updatePeople,
  updateJobListListQuery,
  resetJobListListQuery
)

// 删除从业人员信息
export const requestDeletepeopleDetails = createAction('request job delete')
export const recevieDeletepeopleDetails = createAction('receive job delete')
export const deleteDeopleDetails = createAjaxAction(
  job.deletePeople,
  requestDeletepeopleDetails,
  recevieDeletepeopleDetails
)

// 删除从业人员信息
export const requestPeoplePic = createAction('request job pic')
export const receviePeoplePic = createAction('receive job pic')
export const fetchpeoplePic = createAjaxAction(
  job.peoplePic,
  requestPeoplePic,
  receviePeoplePic
)