/*
 *Create By 韩卿
 */

import React, { Component } from 'react'

export default class tCT extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { rows, dataSource, style, className } = this.props
    return (
      <table style={style} className={className}>
        <tbody>
          {
            rows.map(
              (v, i) => (<tr key={i}><td>
                {
                  typeof (v.title) === 'function' ? v.title() : v.title
                }</td><td>{
                  typeof (v.render) === 'function' ?
                    v.render(dataSource[v.dataIndex], dataSource) : dataSource[v.dataIndex]
                }</td></tr>)
            )
          }
        </tbody>
      </table>
    )
  }
}
