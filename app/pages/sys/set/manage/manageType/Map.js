class Map {
  constructor() {
    this.container = new Object()
  }

  put(key, value) {
    this.container[key] = value;
  }

  get(key) {
    return this.container[key];
  }

  keySet() {
    const keyset = new Array();
    let count = 0;
    for (const key in this.container) {
      // 跳过object的extend函数
      if (key == 'extend') {
        continue
      }
      keyset[count] = key;
      count++;
    }
    return keyset;
  }

  size() {
    let count = 0;
    for (const key in this.container) {
      // 跳过object的extend函数
      if (key == 'extend') {
        continue;
      }
      count++;
    }
    return count;
  }

  remove(key) {
    delete this.container[key];
  }

  toString() {
    let str = '';
    for (let i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
      str = str + keys[i] + '=' + this.container[keys[i]] + ';\n';
    }
    return str;
  }
}

module.exports = Map;
