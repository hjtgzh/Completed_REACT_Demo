/*
 *Create By 韩卿
 */
import React, { Component } from 'react'
import { Input, Button, Row, Col } from 'antd'
// import classNames from 'classnames'

export default class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      focus: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }

  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    const { style, size, placeholder } = this.props;
    // const btnCls = classNames({
    //   'ant-search-btn': true,
    //   'ant-search-btn-noempty': !!this.state.value.trim(),
    // })
    // const searchCls = classNames({
    //   'ant-search-input': true,
    //   'ant-search-input-focus': this.state.focus,
    // })
    return (
      <div style={style}>
        <Row gutter={16}>
          <Col span={4}>
            <label style={{ lineHeight: '32px', height: '32px' }} htmlFor="_">身份证号码:</label>
          </Col>
          <Col span={8}>
            <Input placeholder={placeholder} value={this.state.value} onChange={this.handleInputChange}
              onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur}
            />
          </Col>
          <Col span={8}>
            <Button type="primary" size={size} onClick={this.handleSearch} loading={this.props.loading}>查询</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
