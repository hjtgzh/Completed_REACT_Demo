//常用的正则规则
export const regExpConfig={
  IDcard:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,//身份证
  mobile:/^1([3|4|5|7|8|])\d{9}$/,//手机号码
  telephone:/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,//固定电话
  num:/^[0-9]*$/,//数字
  phoneNo:/(^1([3|4|5|7|8|])\d{9}$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$)/,//电话或者手机
  pwd:/^[0-9A-Za-z]{6,16}$/,//密码由6-16位数字或者字母组成
  isNumAlpha:/^[0-9A-Za-z]*$/,//字母或数字
  isAlpha:/^[a-zA-Z]*$/,//是否字母
  isNumAlphaCn:/^[0-9a-zA-Z\u4E00-\uFA29]*$/,//是否数字或字母或汉字
  isPostCode:/^[\d\-]*$/i,//是否邮编
  isNumAlphaUline:/^[0-9a-zA-Z_]*$/,//是否数字、字母或下划线
  isNumAndThanZero:/^([1-9]\d*(\.\d+)?|0)$/, //是否为整数且大于0/^[1-9]\d*(\.\d+)?$/
  isNormalEncode:/^(\w||[\u4e00-\u9fa5]){0,}$/,//是否为非特殊字符（包括数字字母下划线中文）
}

export const menuIcon = {
  勤务管理: 'calendar',
  基础信息: 'inbox',
  基础应用: 'tablet',
  系统: 'setting'
}

// 实有房屋的子菜单
export const houseSubmenu = [
  { name: '实有房屋(地址)', url: 'houseAddrList' },
  { name: '实有房屋(房间)', url: 'houseRoomList' },
  { name: '地址管理', url: 'addressList' },
]

// 建筑物地址详情的子菜单
export const house_detail_menu = [
  { name: '房屋地址', url: 'location' },
  { name: '房屋照片', url: 'pic' },
  { name: '房屋工作', url: 'floor' },
  { name: '访查工作', url: 'visit' },
  { name: '线索记录', url: 'record' },
  { name: '访查日志', url: 'log' }
]

// 某个房间的子菜单
export const room_menu = [
  { name: '地址信息', url: 'address' },
  { name: '人口信息', url: 'pop' },
  { name: '单位信息', url: 'company' },
  { name: '发案情况', url: 'cases' },
  { name: '线索记录', url: 'record' },
  { name: '访查日志', url: 'log' }
]

// 实有房屋的地址管理的子菜单
export const address_list_submenu = [
  { name: '地址统计', url: 'count' },
  { name: '区划管理', url: 'divisionManage' },
  { name: '申报管理', url: 'declarManage' },
]

// 实有人口的子菜单
export const pop_submenu = [
  { name: '三实访查人口', url: 'visit' },
  { name: '依靠力量', url: 'rely' },
  { name: '人员访查提醒', url: 'tip' },
  { name: '常住登记人口', url: 'local' },
  { name: '流动登记人口', url: 'flow' },
  { name: '境外登记人员', url: 'abroad' },
  { name: '社会数据', url: 'data' },
  { name: '从业人员', url: 'job' },
  { name: '历史人员', url: 'old' }
]

// 依靠力量的子菜单
export const RELY_SUB_MENUS = [
  { name: '基本信息', url: 'basic' },
  { name: '奖惩信息', url: 'rewardInfo' }
]

// 人员详情信息tab项
export const VISIT_SUB_MENUS = [
  { name: '人员信息', url: 'people' },
  { name: '处罚记录', url: 'punish' },
  { name: '线索记录', url: 'clue' },
  { name: '访查日志', url: 'log' },
  { name: '人员档案', url: 'archives' }
]
// 人员详情下方的表单
export const PEOPLE_SUB_MENUS = [
  { name: '基本信息', url: 'basic', key:"jbxx" },
  { name: '流浪乞讨人员', url: 'stray',key:"R04" },
  { name: '大型群众性活动人员', url: 'masses', key:"R05" },
  { name: '巡逻盘查人员', url: 'patrol',key:"R06" },
  { name: '其他人员', url: 'other',key:"R19" },
  { name: '低慢小持有人', url: 'small',key:"dmxbgy" },

]

// 权限设置子菜单
export const set_submenu = [
  { name: '用户管理', url: 'user' },
  { name: '角色管理', url: 'role' },
  { name: '模块管理', url: 'module' },
]

// 依靠力量详情下政治面貌
export const relyZzmm = [
  { value:  "",  content: "请选择",},
  { value: "01", content: "中国共产党党员",},
  { value: "02", content: "中国共产党预备党员",},
  { value: "03", content: "中国共产主义青年团团员",},
  { value: "04", content: "中国国民党革命委员会会员",},
  { value: "05", content: "中国民主同盟盟员",},
  { value: "06", content: "中国民主建国会会员",},
  { value: "07", content: "中国民主促进会会员",},
  { value: "08", content: "中国农工民主党党员",},
  { value: "09", content: "中国致公党党员",},
  { value: "10", content: "九三学社社员",},
  { value: "11", content: "台湾民主自治同盟盟员",},
  { value: "12", content: "无党派民主人士",},
  { value: "13", content: "群众", },
  { value: "98", content: "民主党派",},
]

// 依靠力量详情下文化程度
export const relyWhcd = [
  { value:  "",  content: "请选择",},
  { value: "10", content: "研究生教育",},
  { value: "11", content: "搏士研究生毕业",},
  { value: "12", content: "搏士研究生结业",},
  { value: "13", content: "搏士研究生肆业",},
  { value: "14", content: "硕士研究生毕业",},
  { value: "15", content: "硕士研究生结业",},
  { value: "16", content: "硕士研究生肆业",},
  { value: "17", content: "研究生班毕业",},
  { value: "18", content: "研究生班结业",},
  { value: "19", content: "研究生班肆业",},
  { value: "20", content: "大学本科",},
  { value: "30", content: "专科教育",},
  { value: "21", content: "大学本科毕业", },
  { value: "22", content: "大学本科结业",},
  { value: "23", content: "大学本科肆业",},
  { value: "28", content: "大学普通班毕业",},
  { value: "31", content: "大学专科毕业",},
  { value: "32", content: "大学专科结业",},
  { value: "33", content: "大学专科肆业",},
  { value: "40", content: "中等职业教育",},
  { value: "41", content: "中等专科毕业",},
  { value: "42", content: "中等专科结业",},
  { value: "43", content: "中等专科肆业",},
  { value: "44", content: "职业商中毕业",},
  { value: "45", content: "职业高中结业",},
  { value: "46", content: "职业高中肆业",},
  { value: "47", content: "技工学校毕业",},
  { value: "48", content: "技工学校结业",},
  { value: "49", content: "技工学校肆业",},
  { value: "60", content: "普通高级中学教育",},
  { value: "61", content: "普通高中毕业",},
  { value: "62", content: "普通高中结业",},
  { value: "63", content: "普通高中肆业",},
  { value: "70", content: "初级中学教育",},
  { value: "71", content: "初中毕业",},
  { value: "72", content: "初中肆业",},
  { value: "80", content: "小学教育",},
  { value: "81", content: "小学毕业",},
  { value: "82", content: "小学肆业",},
  { value: "90", content: "其他",},
  { value: "00", content: "博士",},
  { value: "50", content: "技工学校",},
  { value: "99", content: "未说明",},
]
// 依靠力量详情下身份类型
export const relySflx = [
  { value: "", content: "请选择",},
  { value: "20", content: "全国政协委员",},
  { value: "30", content: "民主党派",},
  { value: "40", content: "省级政协委员",},
  { value: "50", content: "市级政协委员",},
  { value: "60", content: "区、县(市)级政协委员",},
  { value: "70", content: "街道(乡村)人大代表",},
  { value: "80", content: "街道(乡村)政协委员",},
  { value: "90", content: "其他、区、县(市)级人大代表",},
  { value: "100", content: "市级人大代表",},
  { value: "110", content: "省级人大代表",},
  { value: "120", content: "全国人大代表",},
]
//统计的子菜单
export const count_submenu = [
  {name:'警卫安保',url:'securityGuard'},
  {name:'统计报表',url:'countForms'},
  {name:'物品',url:'goods'},
]
//单位详情菜单
export const groupSubmenu = [
  {name:'基本信息',url:'groupInformation',key:'jbxx'},
  {name:'从业人员',url:'groupEmployee',key:'cyry'},
  {name:'安全防范',url:'groupSafeKeep',key:'aqff'},
  {name:'消防信息',url:'groupFireMessage',key:'xfxx'},
  {name:'检查记录',url:'groupCheckRecord',key:'jcjl'},
  {name:'处罚记录',url:'groupPunishRecord',key:'cfjl'},
  {name:'发案情况',url:'groupIncidenceCondition',key:'faqk'},
  {name:'单位照片',url:'groupPicture',key:'dwzp'},
  {name:'线索记录',url:'groupCueRecord',key:'jsjl'},
  {name:'访查日志',url:'groupVisitRecord',key:'fcrz'},
  {name:'寄递业',url:'groupDeliveryIndustry',key:'999902'},
  {name:'管制刀具生产销',url:'groupControlledKnife',key:'071512'},
  {name:'爆破单位',url:'groupBlastingUnit',key:'071508'},
  {name:'枪支单位',url:'groupGunUnit',key:'071511'},
  {name:'剧毒化学品从业',url:'groupHighlyToxic',key:'S035'},
  {name:'汽车租赁业',url:'groupCarRentalBusiness',key:'030819'},
  {name:'物流托运业',url:'groupLogisticsIndustry',key:'071403'},
  {name:'旅馆信息',url:'groupHotalInformation',key:'S004'},
  {name:'建筑工地',url:'groupBuildingSites',key:'S014'},
  {name:'酒店式公寓',url:'groupServicedApartment',key:'S005'},
  {name:'烟花爆竹从业单位',url:'groupFireworksUnit',key:'S017'},
  {name:'三资单位',url:'groupForeignFundedUnits',key:'szqy'},
  {name:'特业场所',url:'groupUnemployed',key:'tzhy'},
  {name:'内保单位',url:'groupInternalProtectionUnit',key:'nbdw'},
  {name:'易受暴恐犯罪侵袭场所',url:'groupInvasionSite',key:'ysbkqxcs'},
  {name:'大型群众性活动',url:'groupLargeActivity',key:'dxqzxhd'},
  {name:'经侦单位',url:'groupEconomicUnit',key:'jzdw'},
  {name:'行业单位',url:'groupIndustryUnit',key:'hydw'},
  {name:'低慢小持有单位',url:'groupSlowlySmallUnit',key:'dmxbgdw'},

]
// 人口信息tab项
export const POPINFORMATION_SUB_MENUS = [
  { name: '登记、居住', url: 'register'},
  { name: '曾登记、居住', url: 'onceRegister'},
  { name: '系统登记人口', url: 'styleRegister'},
  { name: '门禁卡持有人', url: 'cardHolder'},
  { name: '社会申报', url: 'socialDeclaration'}
]

// 物品管理tab项
export const GOODS_SUB_MENUS = [
  { name: '基础信息', url: 'goodsBasic'},
  { name: '物品照片', url: 'goodsPhoto'},
]

// 物品管理tab项
export const HOUSEHOLD_SUB_MENUS = [
  { name: '户号管理', url: 'householdManagement'},
  { name: '户号统计', url: 'householdStatistics'},
]

// 治安情况详情tab项
export const SECURITY_SUB_MENUS = [
  { name: '案件回访', url: 'caseReview'},
  { name: '案件记录', url: 'caseRecord'},
  { name: '案件日志', url: 'caseLog'},
]

// 二维码tab项
export const QRCODE_SUB_MENUS = [
  { name: '二维码管理', url: 'qrcodeManagement'},
  { name: '二维码统计', url: 'qrcodeStatistics'},
]

// 勤务管理-社会申报tab项
export const DECLARE_SUB_MENUS = [
  { name: '社会申报', url: 'declareManagement'},
  { name: '申报统计', url: 'declareCount'},
]

// 勤务管理-档案号tab项
export const FILE_SUB_MENUS = [
  { name: '档案号管理', url: 'fileManagement'},
  { name: '档案号统计', url: 'fileCount'},
]

//人员访查的的子菜单
export const tip_submenu = [
  { name: '重点人员', url: 'focalTypeList' ,keys:'1'},
  { name: '流口登记变化', url: 'floatTypeList',keys:'2' },
  { name: '实口登记变化', url: 'residentTypeList' ,keys:'3'},
]

//人员档案 信息tab项
export const ARCHIVES_SUB_MENUS = [
  { name: '现住地址', url: 'liveAddress'},
  { name: '历史信息', url: 'historyInformation'},
  { name: '从业情况', url: 'employmentSituation'},
  { name: '历史信息', url: 'practitionerHistory'},
]
