/*
* creator: 汤俊 2016-11-10 11:30
* editor: 汤俊 2017-2-10 14:05
*/

// 获取地址冒泡弹窗
export function getBuildingMapPopContent(buildingObj) {
  return `<ul class='mapPop-Content'>
             <li>管辖单位：${buildingObj.fjmc || ''}</li>
             <li>常住:${buildingObj.czCount || 0}; 
                 暂住:${buildingObj.zzCount || 0}; 
                 境外:${buildingObj.jwCount || 0};
                 单位:${buildingObj.dwCount || 0};
                 重点:${buildingObj.zdCount || 0}
             </li>
             ${buildingObj.barcodeinfo ?
              `<li>二维码编码:${buildingObj.barcodeinfo} </li>` : ''
             }
             ${buildingObj.bz && buildingObj.bz.length ?
              `<li>备注:
                ${buildingObj.bz.map(bz => `
                    ${bz.standardaddress}
                  `).join(';')
                }
               </li>` : ''
             }
             ${buildingObj.gldz && buildingObj.gldz.length ?
              `<li>关联地址:
                ${buildingObj.gldz.map(gldz => `
                    ${gldz.standardaddress}
                  `).join(';')
                }
               </li>` : ''
             }
          </ul>
          <ul class='mapPop-footer'>
            <a href='../../#/house$Detail/${buildingObj.bldId || 0}' target='_parent'>地址详情</a>
          </ul>`
}

// 获取房间冒泡弹窗
export function getRoomMapPopContent(roomObj) {
  return `<ul class='mapPop-Content'>
            <li>管辖单位:${roomObj.fjmc || ''}</li>
            <li>常住:${roomObj.czCount || 0};
                暂住:${roomObj.zzCount || 0};
                境外:${roomObj.jwCount || 0};
                单位:${roomObj.dwCount || 0};
                重点:${roomObj.zdCount || 0}
            </li>
          </ul>
          <ul class='mapPop-footer'>
            <a href='../../#/house$Detail/${roomObj.roomId || 1}' target='_parent'>地址详情</a>
            <a href='../../#/house$/room/${roomObj.roomId || 1}/${roomObj.bldId || 1}' target='_parent'>房间详情</a>
          </ul>`
}

// 获取人员冒泡弹窗
export function getPeopleMapPopContent(peopleObj) {
  return `<ul class='mapPop-Content'>
            <li>性别:${peopleObj.xbstr};电话:${peopleObj.dhhm || '无'}</li>
            <li>身份证号:${peopleObj.base.sfzh}</li>
            <li>人员类别:${peopleObj.hjlb}</li>
            <li>现住地址:${(peopleObj.dzmc || '') + (peopleObj.fjmc || '')}</li>
          </ul>
          <ul class='mapPop-footer'>
            ${peopleObj.dzbm ?
              `<a href='../../#/house$Detail/${peopleObj.dzbm}' target='_parent'>地址详情</a>` : ''
            }
            ${peopleObj.dzbm && peopleObj.fjbm ?
              `<a href='../../#/house$/room/${peopleObj.dzbm}/${peopleObj.fjbm}' target='_parent'>房间详情</a>` : ''
            }
            <a href='../../#/pop$/visitDetail/${peopleObj.id}:${peopleObj.baseid}' target='_parent'>人员详情</a>
          </ul>`
}

// 获取单位冒泡弹窗
export function getDeptMapPopContent(departmentObj) {
  return `<ul class='mapPop-Content'>
            <li>管辖单位:${(departmentObj.fjmc || '') + (departmentObj.gxdw || '')}</li>
            <li>法人代表:${departmentObj.frdb || '无'};法人电话:${departmentObj.frlxdh || '无'}</li>
            <li>实际地址:${departmentObj.bzdz || '无'}</li>
            <li>从业人员数:${departmentObj.dwrs || 0}</li>
          </ul>
          <ul class='mapPop-footer'>
            ${departmentObj.bldid ?
              `<a href='../../#/house$Detail/${departmentObj.bldid}' target='_parent'>地址详情</a>` : ''
            }
            ${departmentObj.bldid && departmentObj.fjid ?
              `<a href='../../#/house$/room/${departmentObj.bldid}/${departmentObj.fjid}' target='_parent'>房间详情</a>` : ''
            }
            <a href='../../#/group$/departmentDetail/${departmentObj.id}' target='_parent'>单位详情</a>
          </ul>`
}

// 获取治安详情冒泡弹窗
export function getSecurityMapPopContent(securityObj) {
  return `<ul class='mapPop-Content'>
            <li>案件详情:${securityObj.jyaq || ''}</li>
          </ul>
          <ul class='mapPop-footer'>
            ${securityObj.bldid ?
              `<a href='../../#/house$Detail/${securityObj.bldId}' target='_parent'>地址详情</a>` : ''
            }
          </ul>`
}

// 获取警力冒泡弹窗
export function getPoliceMapPopContent(peopleObj) {
  return ''
}

