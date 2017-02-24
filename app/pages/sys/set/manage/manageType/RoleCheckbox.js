/**
 * Created by 江夏云 on 2017/1/5.
 * editor:谢德训 2017-2-15 在头部添加文件修改记录
 */
import { Checkbox } from 'antd';
import React from 'react';

class RoleCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const cid = this.props.cid;
    this.props.onChecked(cid, e.target.checked);
  }

  render() {
    const checked = this.props.checked;
    const title = checked ? '已开通' : '未开通';
    return (
      <div className="table-checkbox">
        <Checkbox checked={checked} onChange={this.onChange}>{title}</Checkbox>
      </div>
    );
  }
}
module.exports = RoleCheckbox;
