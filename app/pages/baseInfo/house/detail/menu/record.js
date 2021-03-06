import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Clue from 'components/clue'

export default class Record extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢'
     }
  }
  componentDidMount() {
    // debugger
  }


  render() {
    return (
      <div className="detail-content">
        <Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
                <div className="detail-box">
                  <Clue type="address" clueType='recordBld' id={this.props.houseId} locationType='house'/>
                </div>
            </Col>
          }
        </Row>
      </div>
    )
  }
}
