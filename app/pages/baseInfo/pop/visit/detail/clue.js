import React, { Component } from 'react'
import { Row, Col,Tabs} from 'antd'
//import ClueList from './clueDetail/clueList'
//import NewClue from './clueDetail/newClue'
import '../visitStyle.css'

const TabPane = Tabs.TabPane;

export default class Clue extends Component {
  constructor(props) {
    super(props)
    this.state = {
        address: '翁沛洋 330106200308152112'
    }
  }
  componentDidMount() {
    // debugger
  }


  render() {
    return (
      <div className="nav-second-nextContent">
      </div>

    )
  }
}
