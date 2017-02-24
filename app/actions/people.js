import {
  createAction,
} from 'redux-actions'
import {
  people,
} from 'api'
import {
  createAjaxAction,
} from 'utils'

// 存储请求参数
// export const changeRequestParam = createAction('change request param');

// 获取三实人口列表的action
export const requestPeopleCheckList = createAction('request peopleCheck list');
export const receviePeopleCheckList = createAction('receive peopleCheck list');
export const fetchPeopleCheckList = createAjaxAction(
	people.peopleCheckList, 
	requestPeopleCheckList, 
	receviePeopleCheckList
)
// 新增三实访查人口
export const requestVisitablePeople=createAction('request visitablePeople')
export const recevieVisitablePeople=createAction('receive visitablePeople')
export const insertVisitablePeople = createAjaxAction(
	people.addVisitablePeople, 
	requestVisitablePeople,
	recevieVisitablePeople
)
// 新增三实境外人员
export const requestAddForeigner=createAction('request add foreigner')
export const recevieAddForeigner=createAction('receive add foreigner')
export const insertForeigner = createAjaxAction(
	people.addForeigner, 
	requestAddForeigner,
	recevieAddForeigner
)

// 模糊查询标准地址----Building
export const requestSearchBuilding=createAction('request search building');
export const receiveSearchBuilding=createAction('receive search building');
export const fetchBuildingResult = createAjaxAction(
	people.searchBuilding,
	requestSearchBuilding, 
	receiveSearchBuilding
);
// 模糊查询标准地址----Room
export const requestSearchRoom=createAction('request search room')
export const receiveSearchRoom=createAction('receive search room')
export const fetchRoomResult = createAjaxAction(
	people.searchRoom, 
	requestSearchRoom, 
	receiveSearchRoom
);
// 模糊查询国籍
export const requestSearchCountry=createAction('request search country')
export const receiveSearchCountry=createAction('receive search country')
export const fetchSearchCountryResult = createAjaxAction(
	people.searchCountry, 
	requestSearchCountry, 
	receiveSearchCountry
);
// 查询境外人员信息
export const requestGetForeigner=createAction('request get foreigner')
export const receiveGetForeigner=createAction('receive get foreigner')
export const fetchForeignerResult = createAjaxAction(
	people.getForeignerBySearch, 
	requestGetForeigner, 
	receiveGetForeigner
);
// 查询访查人员信息
export const requestGetVisitPeople=createAction('request get visitPeople')
export const receiveGetVisitPeople=createAction('receive get visitPeople')
export const fetchVisitPeopleResult = createAjaxAction(
	people.getVisitablePeopleBySearch, 
	requestGetVisitPeople, 
	receiveGetVisitPeople
);

// 关联入户
export const requestInsertAddress=createAction('request insert address')
export const receiveInsertAddress=createAction('receive insert address')
export const insertAddressForOne = createAjaxAction(
	people.insertAddressForOne, 
	requestInsertAddress, 
	receiveInsertAddress
);


// 获取每一个筛选项后面跟的数值
export const requestPeopleItemNums=createAction('request people item nums')
export const receivePeopleItemNums=createAction('receive people item nums')
export const getAllRetrievalNum = createAjaxAction(
	people.getAllRetrievalNum, 
	requestPeopleItemNums, 
	receivePeopleItemNums
);

// 获取访查人员照片
export const requestVisitPic = createAction('request visit pic')
export const recevieVisitPic = createAction('receive visit pic')
export const getVisitPic = createAjaxAction(people.getVisitablePeoplePic, requestVisitPic, recevieVisitPic)

// 获取境外人员照片
export const requestForeignerPic = createAction('request foreigner pic')
export const recevieForeignerPic = createAction('receive foreigner pic')
export const getForeignerPic = createAjaxAction(people.getForeignerPeoplePic, requestForeignerPic, recevieForeignerPic)


// =================================================
// 余金彪
//获取人员详情的action
export const requestPeopleDetail =  createAction('request people detail')
export const receviePeopleDetail = createAction('receive people detail')
export const fetchPeopleDetail = createAjaxAction(people.peopleDetail, requestPeopleDetail, receviePeopleDetail)

//保存人员详情的action
export const requestSavePeopleDetail =  createAction('request savePeople detail')
export const recevieSavePeopleDetail = createAction('receive savePeople detail')
export const fetchSavePeopleDetail = createAjaxAction(people.savePeopleDetail, requestSavePeopleDetail, recevieSavePeopleDetail)

//点击低慢小详情action
export const requestDeteSmallDetail =  createAction('request people deteSmall')
export const recevieDeteSmallDetail = createAction('receive people deteSmall')
export const fetchDeteSmallDetail = createAjaxAction( people.deteSmall,requestDeteSmallDetail, recevieDeteSmallDetail)

//人员档案action
export const requestArchivesDetail =  createAction('request people archives')
export const recevieArchivesDetail = createAction('receive people archives')
export const fetchArchivesDetail = createAjaxAction( people.archives,requestDeteSmallDetail, recevieDeteSmallDetail)


//人员详情-处罚记录获取列表action
export const requestPeoplePunishList = createAction("request peoplePunish list");
export const receviePeoplePunishList = createAction("receive peoplePunish list");
export const fetchPeoplePunishList = createAjaxAction(
	people.peoplePunishList,
	requestPeoplePunishList,
	receviePeoplePunishList
);
//人员详情-处罚记录删除action
export const requestDeletePunishItem = createAction("request deletePunish item");
export const recevieDeletePunishItem = createAction("receive deletePunish item");
export const deletePeoplePunishItem = createAjaxAction(
	people.deletePunishItem,
	requestDeletePunishItem,
	recevieDeletePunishItem
);
//人员详情-处罚记录更新action
export const requestUpdataPunishItem = createAction("request updataPunish item");
export const recevieUpdataPunishItem = createAction("receive updataPunish item");
export const updataPeoplePunishItem = createAjaxAction(
	people.updataPunishItem,
	requestUpdataPunishItem,
	recevieUpdataPunishItem
);
//人员详情-处罚记录新增action
export const requestAddPunishItem = createAction("request addPunish item");
export const recevieAddPunishItem = createAction("receive addPunish item");
export const addPeoplePunishItem = createAjaxAction(
	people.addPunishItem,
	requestAddPunishItem,
	recevieAddPunishItem
);

//人员详情-获取处罚记录action
export const requestgetPunishItem = createAction("request getPunish item");
export const receviegetPunishItem = createAction("receive getPunish item");
export const getPeoplePunishItem = createAjaxAction(
	people.getPunishItem,
	requestgetPunishItem,
	receviegetPunishItem
);

//人员详情-访查日志action
export const requestVisitLog = createAction("request visitLog");
export const recevieVisitLog = createAction("receive visitLog");
export const fetchVisitLog = createAjaxAction(
	people.fetchVisitLog,
	requestVisitLog,
	recevieVisitLog
);



// 厉樟瑞

//获取线索记录总列表（分页）
export const requestClueList = createAction('request clue list');
export const recevieClueList = createAction('receive clue list');
export const fetchClueList = createAjaxAction(
	people.peopleClueList,
	requestClueList,
	recevieClueList
)
//获取线索记录详情
export const requestClueDetail = createAction('request clue detail');
export const recevieClueDetail = createAction('receive clue detail');
export const fetchClueDetail = createAjaxAction(
	people.peopleClueDetail,
	requestClueDetail,
	recevieClueDetail
)
//获取线索记录人员信息
export const requestCluePeopleMesg = createAction('request clue people message');
export const recevieCluePeopleMesg = createAction('receive clue people message');
export const fetchCluePeopleMesg = createAjaxAction(
	people.peopleCluePeopleMesg,
	requestCluePeopleMesg,
	recevieCluePeopleMesg
)
//获取线索记录案件信息
export const requestClueLawMesg = createAction('request clue law message');
export const recevieClueLawMesg = createAction('receive clue law message');
export const fetchClueLawMesg = createAjaxAction(
	people.peopleClueLawMesg,
	requestClueLawMesg,
	recevieClueLawMesg
)
//获取线索记录警情信息
export const requestClueAlarmMesg = createAction('request clue alarm message');
export const recevieClueAlarmMesg = createAction('receive clue alarm message');
export const fetchClueAlarmMesg = createAjaxAction(
	people.peopleClueAlarmMesg,
	requestClueAlarmMesg,
	recevieClueAlarmMesg
)
//获取线索记录电动车信息
export const requestClueBikeMesg = createAction('request clue bike message');
export const recevieClueBikeMesg = createAction('receive clue bike message');
export const fetchClueBikeMesg = createAjaxAction(
	people.peopleClueBikeMesg,
	requestClueBikeMesg,
	recevieClueBikeMesg
)
//获取线索记录机动车信息
export const requestClueCarMesg = createAction('request clue car message');
export const recevieClueCarMesg = createAction('receive clue car message');
export const fetchClueCarMesg = createAjaxAction(
	people.peopleClueCarMesg,
	requestClueCarMesg,
	recevieClueCarMesg
)
//获取线索记录单位信息
export const requestClueUnitMesg = createAction('request clue unit message');
export const recevieClueUnitMesg = createAction('receive clue unit message');
export const fetchClueUnitMesg = createAjaxAction(
	people.peopleClueUnitMesg,
	requestClueUnitMesg,
	recevieClueUnitMesg
)
//获取线索记录照片
export const requestCluePhotoMesg = createAction('request clue photo message');
export const recevieCluePhotoMesg = createAction('receive clue photo message');
export const fetchCluePhotoMesg = createAjaxAction(
	people.peopleCluePhotoMesg,
	requestCluePhotoMesg,
	recevieCluePhotoMesg
)

//查询关联人员（通用）
export const requestCluePeople = createAction('request clue people');
export const recevieCluePeople = createAction('receive clue people');
export const fetchCluePeople = createAjaxAction(
	people.peopleCluePeople,
	requestCluePeople,
	recevieCluePeople
)
//查询关联机动车（通用）
export const requestClueCar = createAction('request clue car');
export const recevieClueCar = createAction('receive clue car');
export const fetchClueCar = createAjaxAction(
	people.peopleClueCar,
	requestClueCar,
	recevieClueCar
)
//查询关联电动车（通用）
export const requestClueBike = createAction('request clue bike');
export const recevieClueBike = createAction('receive clue bike');
export const fetchClueBike = createAjaxAction(
	people.peopleClueBike,
	requestClueBike,
	recevieClueBike
)
//查询关联单位（通用）
export const requestClueUnit = createAction('request clue unit');
export const recevieClueUnit = createAction('receive clue unit');
export const fetchClueUnit = createAjaxAction(
	people.peopleClueUnit,
	requestClueUnit,
	recevieClueUnit
)
//查询关联案件（通用）
export const requestClueLaw = createAction('request clue law');
export const recevieClueLaw = createAction('receive clue law');
export const fetchClueLaw = createAjaxAction(
	people.peopleClueLaw,
	requestClueLaw,
	recevieClueLaw
)
//查询关联警情（通用）
export const requestClueAlarm = createAction('request clue alarm');
export const recevieClueAlarm = createAction('receive clue alarm');
export const fetchClueAlarm = createAjaxAction(
	people.peopleClueAlarm,
	requestClueAlarm,
	recevieClueAlarm
)

//新增检索记录的标签保存（通用）
export const requestClueLabel = createAction('request clue label');
export const recevieClueLabel = createAction('receive clue label');
export const fetchClueLabel = createAjaxAction(
	people.peopleClueLabel,
	requestClueLabel,
	recevieClueLabel
)
//保存新增的检索记录（通用）
export const requestClueSave = createAction('request clue save');
export const recevieClueSave = createAction('receive clue save');
export const fetchClueSave = createAjaxAction(
	people.peopleClueSave,
	requestClueSave,
	recevieClueSave
)
//修改检索记录（通用）
export const requestUpadteAllRecord = createAction('request upadte all record');
export const recevieUpadteAllRecord = createAction('receive upadte all record');
export const fetchUpadteAllRecord = createAjaxAction(
	people.peopleUpadteAllRecord,
	requestUpadteAllRecord,
	recevieUpadteAllRecord
)
//获取地址关联线索记录列表
export const requestRecordListFromBld = createAction('request record list fromBld');
export const recevieRecordListFromBld = createAction('receive record list fromBld');
export const fetchRecordListFromBld = createAjaxAction(
	people.peopleRecordListFromBld,
	requestRecordListFromBld,
	recevieRecordListFromBld
)
//获取房间关联线索记录列表
export const requestRecordListFromFj = createAction('request record list fromFj');
export const recevieRecordListFromFj = createAction('receive record list fromFj');
export const fetchRecordListFromFj = createAjaxAction(
	people.peopleRecordListFromFj,
	requestRecordListFromFj,
	recevieRecordListFromFj
)
//获取人员关联线索记录列表
export const requestRecordListFromRy = createAction('request record list fromRy');
export const recevieRecordListFromRy = createAction('receive record list fromRy');
export const fetchRecordListFromRy = createAjaxAction(
	people.peopleRecordListFromRy,
	requestRecordListFromRy,
	recevieRecordListFromRy
)
//获取单位关联线索记录列表
export const requestRecordListFromDw = createAction('request record list fromDw');
export const recevieRecordListFromDw = createAction('receive record list fromDw');
export const fetchRecordListFromDw = createAjaxAction(
	people.peopleRecordListFromDw,
	requestRecordListFromDw,
	recevieRecordListFromDw
)
//获取案件关联线索记录列表
export const requestRecordListFromAj = createAction('request record list fromAj');
export const recevieRecordListFromAj = createAction('receive record list fromAj');
export const fetchRecordListFromAj = createAjaxAction(
	people.peopleRecordListFromAj,
	requestRecordListFromAj,
	recevieRecordListFromAj
)
//删除线索关联机动车
export const requestDeleteLinkJdc = createAction('request delete link jdc');
export const recevieDeleteLinkJdc = createAction('receive delete link jdc');
export const fetchDeleteLinkJdc = createAjaxAction(
	people.peopleRecordDeleteLinkJdc,
	requestDeleteLinkJdc,
	recevieDeleteLinkJdc
)
//删除线索关联电动车
export const requestDeleteLinkDdc = createAction('request delete link ddc');
export const recevieDeleteLinkDdc = createAction('receive delete link ddc');
export const fetchDeleteLinkDdc = createAjaxAction(
	people.peopleRecordDeleteLinkDdc,
	requestDeleteLinkDdc,
	recevieDeleteLinkDdc
)
//删除线索关联单位
export const requestDeleteLinkDw = createAction('request delete link dw');
export const recevieDeleteLinkDw = createAction('receive delete link dw');
export const fetchDeleteLinkDw = createAjaxAction(
	people.peopleRecordDeleteLinkDw,
	requestDeleteLinkDw,
	recevieDeleteLinkDw
)
//删除线索关联人员
export const requestDeleteLinkRy = createAction('request delete link ry');
export const recevieDeleteLinkRy = createAction('receive delete link ry');
export const fetchDeleteLinkRy = createAjaxAction(
	people.peopleRecordDeleteLinkRy,
	requestDeleteLinkRy,
	recevieDeleteLinkRy
)
//删除线索关联案件
export const requestDeleteLinkAj = createAction('request delete link aj');
export const recevieDeleteLinkAj = createAction('receive delete link aj');
export const fetchDeleteLinkAj = createAjaxAction(
	people.peopleRecordDeleteLinkAj,
	requestDeleteLinkAj,
	recevieDeleteLinkAj
)
//删除线索关联警情
export const requestDeleteLinkJq = createAction('request delete link jq');
export const recevieDeleteLinkJq = createAction('receive delete link jq');
export const fetchDeleteLinkJq = createAjaxAction(
	people.peopleRecordDeleteLinkJq,
	requestDeleteLinkJq,
	recevieDeleteLinkJq
)

//人员详情调档照
export const requestGetPicBySfzh = createAction('request getPicBySfzh');
export const recevieGetPicBySfzh = createAction('receive getPicBySfzh');
export const fetchGetPicBySfzh = createAjaxAction(
	people.getPicBySfzh,
	requestGetPicBySfzh,
	recevieGetPicBySfzh
)

//保存人员标签
export const requestUpdateResidentState = createAction('request updateResidentState');
export const recevieUpdateResidentState = createAction('receive updateResidentState');
export const fetchUpdateResidentState = createAjaxAction(
	people.updateResidentState,
	requestUpdateResidentState,
	recevieUpdateResidentState
)

//人员详情保存
export const requestResidentUpdate = createAction('request residentUpdate');
export const recevieResidentUpdate = createAction('receive residentUpdate');
export const fetchResidentUpdate = createAjaxAction(
	people.residentUpdate,
	requestResidentUpdate,
	recevieResidentUpdate
)

//人员详情转为历史、
export const requestResidentHistory = createAction('request residentHistory');
export const recevieResidentHistory = createAction('receive residentHistory');
export const fetchResidentHistory = createAjaxAction(
	people.residentHistory,
	requestResidentHistory,
	recevieResidentHistory
)

//获取低慢小持有人信息：
export const requestDetail = createAction('request detail');
export const recevieDetail = createAction('receive detail');
export const fetchDetail = createAjaxAction(
	people.detail,
	requestDetail,
	recevieDetail
)

//保存低慢小持有人信息：
export const requestSave = createAction('request save');
export const receveieSave = createAction('receive save');
export const fetchSave = createAjaxAction(
	people.save,
	requestSave,
	receveieSave
)

//新增物品：
export const requestInsert = createAction('request insert');
export const receveieInsert = createAction('receive insert');
export const fetchInsert = createAjaxAction(
	people.insert,
	requestSave,
	receveieSave
)

//低慢小绑定查询
export const requestGetBindArticle= createAction('request getBindArticle');
export const receveieGetBindArticle = createAction('receive getBindArticle');
export const fetchGetBindArticle = createAjaxAction(
	people.getBindArticle,
	requestGetBindArticle,
	receveieGetBindArticle
)

//物品解绑
export const requestUnBind= createAction('request unBind');
export const receveieUnBind = createAction('receive unBind');
export const fetchUnBind = createAjaxAction(
	people.unBind,
	requestUnBind,
	receveieUnBind
)

//新增W物品操作人
export const requestSaveOperator= createAction('request saveOperator');
export const receveieSaveOperator = createAction('receive saveOperator');
export const fetchSaveOperator = createAjaxAction(
	people.saveOperator,
	requestSaveOperator,
	receveieSaveOperator
)

//查出物品操作人
export const requestGetOperator= createAction('request getOperator');
export const receveieGetOperator = createAction('receive getOperator');
export const fetchGetOperator = createAjaxAction(
	people.getOperator,
	requestGetOperator,
	receveieGetOperator
)

//根据身份证号查询低慢小：
export const requestSearchBySfz= createAction('request searchBySfz');
export const receveieSearchBySfz = createAction('receive searchBySfz');
export const fetchSearchBySfz = createAjaxAction(
	people.searchBySfz,
	requestSearchBySfz,
	receveieSearchBySfz
)

//绑定物品：
export const requestBind= createAction('request bind');
export const receveieBind = createAction('receive bind');
export const fetchBind= createAjaxAction(
	people.bind,
	requestBind,
	receveieBind
)

//巡逻盘查人员查询
export const requestGetByBaseId= createAction('request getByBaseId');
export const receveieGetByBaseId = createAction('receive getByBaseId');
export const fetchGetByBaseId= createAjaxAction(
	people.getByBaseId,
	requestGetByBaseId,
	receveieGetByBaseId
)

//巡逻盘查人员保存
export const requestUpdate =createAction('request update');
export const receveieUpdate = createAction('receive update');
export const fetchUpdate= createAjaxAction(
	people.update,
	requestUpdate,
	receveieUpdate
)

//其他人员信息查询
export const requestQtryByBaseId =createAction('request qtryByBaseId');
export const receveieQtryByBaseId= createAction('receive qtryByBaseId');
export const fetchQtryByBaseId= createAjaxAction(
	people.qtryByBaseId,
	requestQtryByBaseId,
	receveieQtryByBaseId
)

//其他人员信息保存
export const requestQtryUpdate=createAction('request qtryUpdate');
export const receveieQtryUpdate= createAction('receive qtryUpdate');
export const fetchQtryUpdate= createAjaxAction(
	people.qtryUpdate,
	requestQtryUpdate,
	receveieQtryUpdate
)

//人员上传照片查询
export const requestGetPicUpload=createAction('request getPicUpload');
export const receveieGetPicUpload= createAction('receive getPicUpload');
export const fetchGetPicUpload= createAjaxAction(
	people.getPicUpload,
	requestQtryUpdate,
	receveieQtryUpdate
)

//人员档案
export const requestGetRyda=createAction('request getRyda');
export const receveieGetRyda= createAction('receive getRyda');
export const fetchGetRyda= createAjaxAction(
	people.getRyda,
	requestGetRyda,
	receveieGetRyda
)

//获取流浪乞讨人员信息
export const requestGetLlqtryxx=createAction('request getLlqtryxx');
export const receveieGetLlqtryxx= createAction('receive getLlqtryxx');
export const fetchGetLlqtryxx= createAjaxAction(
	people.getLlqtryxx,
	requestGetLlqtryxx,
	receveieGetLlqtryxx
)

//保存流浪乞讨人员信息
export const requestSaveLlqtryxx=createAction('request saveLlqtryxx');
export const receveieSaveLlqtryxx= createAction('receive saveLlqtryxx');
export const fetchSaveLlqtryxx= createAjaxAction(
	people.saveLlqtryxx,
	requestSaveLlqtryxx,
	receveieSaveLlqtryxx
)

////获取大型群众性活动人员信息
export const requestGetDxqzxhdry=createAction('request getDxqzxhdry');
export const receveieGetDxqzxhdry= createAction('receive getDxqzxhdry');
export const fetchGetDxqzxhdry= createAjaxAction(
	people.getDxqzxhdry,
	requestGetDxqzxhdry,
	receveieGetDxqzxhdry
)

//保存大型群众性活动人员信息
export const requestSaveDxqzxhdry=createAction('request saveDxqzxhdry');
export const receveieSaveDxqzxhdry= createAction('receive saveDxqzxhdry');
export const fetchSaveDxqzxhdry= createAjaxAction(
	people.saveDxqzxhdry,
	requestSaveDxqzxhdry,
	receveieSaveDxqzxhdry
)
//获取人员姓名 证件号
export const requestPeopleName=createAction('request people name');
export const receveiePeopleName= createAction('receive people name');
export const fetchPeopleName= createAjaxAction(
	people.fetchPeopleName,
	requestPeopleName,
	receveiePeopleName
)
