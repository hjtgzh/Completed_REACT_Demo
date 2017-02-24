import { ajax } from 'utils'

export const peopleCheckList = ajax.fetchJSONByPost('/jcjw/resident/residentList')

export const searchBuilding = ajax.fetchJSONByPost('/jcjw/building/getAddressByName')
export const searchRoom = ajax.fetchJSONByPost('/jcjw/room/getRoomsByBldIdAndSearchName')

export const getVisitablePeopleBySearch = ajax.fetchJSONByPost('/jcjw/resident/getBaseBySfzh')
export const getVisitablePeoplePic = ajax.fetchJSONByPost('/jcjw/resident/getPicBySfzh')
export const addVisitablePeople = ajax.fetchJSONByPost('/jcjw/resident/residentSave')

export const searchCountry = ajax.fetchJSONByPost('/jcjw/resident/findGjByGjmc')
export const getForeignerBySearch = ajax.fetchJSONByPost('/jcjw/resident/getBaseFromJw')
export const addForeigner = ajax.fetchJSONByPost('/jcjw/resident/residentSave')
export const getForeignerPeoplePic = ajax.fetchJSONByPost('/jcjw/resident/getJwryPicBySfzh')

export const insertAddressForOne = ajax.fetchJSONByPost('/jcjw/resident/changeAddress')

export const outputExcel = ajax.fetchJSONByPost('/jcjw/resident/outputSsrkExcel')

export const getAllRetrievalNum = ajax.fetchJSONByPost('/jcjw/search/residentCounts')

// =================================================
// 余金彪
export const peopleDetail = ajax.fetchJSONByPost('/jcjw/resident/residentDetail')
export const savePeopleDetail = ajax.fetchJSONByPost('/people/updatePeopleDetail')
export const deteSmall = ajax.fetchJSONByPost('/people/deteSmall')
export const archives = ajax.fetchJSONByPost('/people/archives')
//处罚记录
export const peoplePunishList = ajax.fetchJSONByPost('/jcjw/resident/queryRcfjl')
export const deletePunishItem = ajax.fetchJSONByPost('/jcjw/resident/deleteRcfjl')
export const updataPunishItem = ajax.fetchJSONByPost('/jcjw/resident/updateRcfjl')
export const addPunishItem = ajax.fetchJSONByPost('/jcjw/resident/insertRcfjl')
export const getPunishItem = ajax.fetchJSONByPost('/jcjw/resident/queryRcfjlDetail')

//访查日志
export const fetchVisitLog = ajax.fetchJSONByPost('/jcjw/sys/log/getResidentCzList') 

// 厉樟瑞

//获取线索记录列表（分页）
export const peopleClueList = ajax.fetchJSONByPost('/jcjw/record/getRecordListFromClue')

//获取线索记录详情
export const peopleClueDetail = ajax.fetchJSONByPost('/jcjw/record/getRecordDetail')

//获取线索记录人员信息
export const peopleCluePeopleMesg = ajax.fetchJSONByPost('/jcjw/record/getRyListByClue')

//获取线索记录案件信息
export const peopleClueLawMesg = ajax.fetchJSONByPost('/jcjw/record/getAjListByClue')

//获取线索记录警情信息
export const peopleClueAlarmMesg = ajax.fetchJSONByPost('/jcjw/record/getAjListByClue')

//获取线索记录电动车信息
export const peopleClueBikeMesg = ajax.fetchJSONByPost('/jcjw/record/getDdcListByClue')

//获取线索记录机动车信息
export const peopleClueCarMesg = ajax.fetchJSONByPost('/jcjw/record/getJdcListByClue')

//获取线索记录单位信息
export const peopleClueUnitMesg = ajax.fetchJSONByPost('/jcjw/record/getDwListByClue')

//获取线索记录照片
export const peopleCluePhotoMesg = ajax.fetchJSONByPost('/jcjw/record/getTpListByClue')

//查询关联人员（通用）
export const peopleCluePeople = ajax.fetchJSONByPost('/jcjw/resident/getBaseBySfzh')

//查询关联机动车（通用）
export const peopleClueCar = ajax.fetchJSONByPost('/jcjw/record/getJdcByClph')

//查询关联电动车（通用）
export const peopleClueBike = ajax.fetchJSONByPost('/jcjw/record/getDdcByClph')

//查询关联单位（通用）
export const peopleClueUnit = ajax.fetchJSONByPost('/jcjw/record/getDepartmentByGszzhm')

//查询关联案件（通用）
export const peopleClueLaw = ajax.fetchJSONByPost('/jcjw/record/getCaseByAjbh')

//查询关联警情（通用）
export const peopleClueAlarm = ajax.fetchJSONByPost('/jcjw/record/getJqByJjdbh')

//新增检索记录的标签保存（通用）
export const peopleClueLabel = ajax.fetchJSONByPost('/people/peopleCheck')

//保存新增的检索记录（通用）
export const peopleClueSave = ajax.fetchJSONByPost('/jcjw/record/saveAllRecord')

//修改线索记录（通用）
export const peopleUpadteAllRecord = ajax.fetchJSONByPost('/jcjw/record/updateAllRecord')

//获取地址关联线索记录列表
export const peopleRecordListFromBld = ajax.fetchJSONByPost('/jcjw/record/getRecordListFromBld')

//获取房间关联线索记录列表
export const peopleRecordListFromFj = ajax.fetchJSONByPost('/jcjw/record/getRecordListFromFj')

//获取人员关联线索记录列表
export const peopleRecordListFromRy = ajax.fetchJSONByPost('/jcjw/record/getRecordListFromRy')

//获取单位关联线索记录列表
export const peopleRecordListFromDw = ajax.fetchJSONByPost('/jcjw/record/getRecordListFromDw')

//获取案件关联线索记录列表
export const peopleRecordListFromAj = ajax.fetchJSONByPost('/jcjw/record/getRecordListFromAj')

//删除线索关联机动车
export const peopleRecordDeleteLinkJdc = ajax.fetchJSONByPost('/jcjw/record/deleteLinkJdc')

//删除线索关联电动车
export const peopleRecordDeleteLinkDdc = ajax.fetchJSONByPost('/jcjw/record/deleteLinkDdc')

//删除线索关联单位
export const peopleRecordDeleteLinkDw = ajax.fetchJSONByPost('/jcjw/record/deleteLinkdw')

//删除线索关联人员
export const peopleRecordDeleteLinkRy = ajax.fetchJSONByPost('/jcjw/record/deleteLinkry')

//删除线索关联案件
export const peopleRecordDeleteLinkAj = ajax.fetchJSONByPost('/jcjw/record/deleteLinkaj')

//删除线索关联警情
export const peopleRecordDeleteLinkJq = ajax.fetchJSONByPost('/jcjw/record/deleteLinkjq')

//人员详情调档照
export const getPicBySfzh = ajax.fetchJSONByPost('/jcjw/resident/getPicBySfzh')

//人员详情保存
export const residentUpdate = ajax.fetchJSONByPost('/jcjw/resident/residentUpdate')

//人员详情转为历史
export const residentHistory = ajax.fetchJSONByPost('/jcjw/resident/residentHistory')

//获取低慢小持有人信息：
export const detail = ajax.fetchJSONByPost('/jcjw/resident/article/detail')

//保存低慢小持有人信息：
export const save = ajax.fetchJSONByPost('/jcjw/resident/article/save')

//新增物品：
export const insert = ajax.fetchJSONByPost('/jcjw/article/insert')

//低慢小绑定查询：
export const getBindArticle = ajax.fetchJSONByPost('/jcjw/article/getBindArticle')

//物品解绑：
export const unBind = ajax.fetchJSONByPost('/jcjw/article/unBind')

//新增W物品操作人
export const saveOperator = ajax.fetchJSONByPost('/jcjw/article/saveOperator')

//查询物品操作人
export const getOperator = ajax.fetchJSONByPost('/jcjw/article/getOperator')

//根据身份证号查询低慢小：
export const searchBySfz = ajax.fetchJSONByPost('/jcjw/article/searchBySfz')

//绑定物品：
export const bind = ajax.fetchJSONByPost('/jcjw/article/bind')

//巡逻盘查人员查询
export const getByBaseId = ajax.fetchJSONByPost('/jcjw/xlpcry/getByBaseId')

//修改或者添加巡逻盘查人员信息
export const update = ajax.fetchJSONByPost('/jcjw/xlpcry/update')

//其他人员
export const qtryByBaseId = ajax.fetchJSONByPost('/jcjw/qtry/getByBaseId')

//其他人员保存
export const qtryUpdate = ajax.fetchJSONByPost('/jcjw/qtry/update')

//人员上传照片查询
export const getPicUpload = ajax.fetchJSONByPost('/jcjw/resident/getPicUpload')


export const updateResidentState = ajax.fetchJSONByPost('/jcjw/resident/updateResidentState')

//人员档案
export const getRyda = ajax.fetchJSONByPost('/jcjw/resident/getRyda')

//获取流浪乞讨人员信息
export const getLlqtryxx = ajax.fetchJSONByPost('/jcjw/resident/getLlqtryxx')

//保存流浪乞讨人员信息
export const saveLlqtryxx = ajax.fetchJSONByPost('/jcjw/resident/saveLlqtryxx')

//获取大型群众性活动人员信息
export const getDxqzxhdry = ajax.fetchJSONByPost('/jcjw/resident/getDxqzxhdry')

//保存大型群众性活动人员信息
export const saveDxqzxhdry = ajax.fetchJSONByPost('/jcjw/resident/saveDxqzxhdry')
//获取人员姓名 证件号
export const fetchPeopleName = ajax.fetchJSONByPost('/jcjw/resident/getXmByBaseId')

