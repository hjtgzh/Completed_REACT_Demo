/**
 * Created by 叶婷婷
 * 语法检查: 2 errors
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form } from 'antd'
import PicWall from 'components/picList/picWall'

@connect(
  (state, props) => ({})
)

class Pic extends Component {
  constructor(props) {
    super(props);
    this.regular = {
      goodsId: this.props.goodsId || this.props.params.goodsId || 1,
    }
  }

  // 父级页面传参发生变化时进行比较查询数据
  componentWillReceiveProps(nextProps) {
    if (nextProps.goodsId != this.props.goodsId) {
      this.regular.goodsId = nextProps.goodsId;
      this.setState({});
    }
  }

  render() {
    return (
      <div className="detail-content">
        <Row gutter={16} className="detail-content">
          {
            <Col sm={24} md={24} lg={24} className="detail-content">
              <section className="c-pic detail-content">
                <div className="detail-content">
                  <PicWall thispicStype={"goods"} thispicId={this.regular.goodsId} />
                </div>
              </section>
            </Col>
          }
        </Row>
      </div>
    )
  }
}

export default Pic = Form.create()(Pic)
