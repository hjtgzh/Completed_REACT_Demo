import { handleActions } from 'redux-actions'
// import { hasResponseError } from 'utils'

const tabList = JSON.parse(sessionStorage.getItem('tabList'));

const initialState = {
  list: tabList ? tabList.list : [],
  activeKey: tabList ? tabList.activeKey : '',
}

const tabListResult = handleActions({
  'request tab list'(state, action) {
    return { ...state, loading: false }
  },
  'update tab list'(state, action) {
    // debugger
    const data = action.payload
    let list
    // const findList = state.list.find((tab) => tab.key === data.key)
    // let list = findList === undefined ? [...state.list, data] : state.list
    /*
    ** 下面的判断 是在用户点击左侧菜单切换不同菜单的时候去除不是同个菜单的判断 start
    */
    if(state.list[0]){
      const newList = []
      state.list.map(function(item){
        if(`${data.key.split("$")[0]}$` === `${item.key.split("$")[0]}$`){
          newList.push(item)
        }
      })
      const findList = state.list.find((tab) => tab.key === data.key)
      list = findList === undefined ? [...newList, data] : newList
    } else {
      list = [data]
    }
    /*
    ** end
    */
    sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey: data.key, loading: false }))
    return { list, activeKey: data.key, loading: false }
  },
  'update tab checked'(state, action) {
    const activeKey = action.payload.activeKey;
    sessionStorage.setItem('tabList', JSON.stringify({ ...state, activeKey, loading: false }));
    return { ...state, activeKey, loading: false }
  },
  'delete tab from list'(state, action) {
    const targetKey = action.payload.targetKey
    const list = []
    let delIndex = 0
    let activeKey
    state.list.map((tab, index) => {
      tab.key === targetKey ? delIndex = index : list.push(tab);
    });
    activeKey = state.activeKey;
    if (state.activeKey === targetKey) {
      // eslint-disable-next-line no-nested-ternary
      activeKey = list[delIndex] ? list[delIndex].key :
        (list[delIndex - 1] ? list[delIndex - 1].key : '');
    }
    sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey, loading: false }));
    return { list, activeKey, loading: false }
  },
}, initialState)

export { tabListResult as default }
