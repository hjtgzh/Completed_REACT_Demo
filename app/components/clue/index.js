/*
* creator: 厉樟瑞 2016-11-10 11:30
* editor: 厉樟瑞 2017-2-15 17:50
*/

import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router'
import WindowSize from 'components/windowSize'
import 'style/clueStyle.css'
import ClueList from './clueDetail/clueList'

export default class clue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      address: '鄂尔多斯东胜区纺织街道23号4幢',
    }
    this.updateState = this.updateState.bind(this)
  }

  updateState() {
    this.setState({})
  }
  render() {
    const location = this.props.locationType || 'clue'
    return (
      <div className="detail-content">
        <div
          className="list-tab"
          style={{ height: `${$GLOBALCONFIG.PAGEHEIGHT - 170}px`, overflowY: 'auto', overflowX: 'hidden' }}
        >
          <WindowSize updateState={this.updateState} />
          <ClueList clueType={this.props.clueType} id={this.props.id} />
        </div>
        <div className="ability-button">
          <Button>
            <Link to={`/${location}$/newClue/${'newClue'}${this.props.type}:${this.props.id}`}>
              新增线索
            </Link>
          </Button>
        </div>
      </div>
    )
  }
}
