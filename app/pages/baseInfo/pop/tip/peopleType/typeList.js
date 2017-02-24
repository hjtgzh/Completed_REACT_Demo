import React, { Component } from 'react'
import { Popconfirm, message, Table, Row, Col, Button, Modal ,Select} from 'antd'

export default class typeList extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    componentDidMount() {
        // debugger
    }
     render() {
    const _self = this
    const {
            columns,
            dataSource,
            currentPage,
            totalCount,
            loading,
            scroll,
            pageChange,
        } = this.props
      
    //分页器
    const pagination = {
      total: totalCount ,
      current: currentPage ,
      showSizeChanger: true,
      showTotal(count) {
        return `共 ${count} 条`
      },
      onChange(current) {
        /*const query = _self.getFormValue();
        _self.onSubmit(query, current)*/
        pageChange(current)
      },
    }
       // console.log(this.props.totalCount)
        return (
            <div className="detail-content">
                <Row gutter={16}>
                    {
                        <Col sm={24} md={24} lg={24}>
                            <div className="detail-box">
                              <Table
                                 columns={columns} 
                                  dataSource={dataSource}
                                  pagination={currentPage ? pagination : false}
                                  loading={loading}
                                  scroll={scroll}
                                /> 
                            </div>
                        </Col>
                    }
                </Row>
            </div>
        )
    }
}
