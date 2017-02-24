/**
 * Created by 余金彪 on 2016/12/13.
 * editor:余金彪 2017-2-14 在头部添加文件修改记录
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Button, Table, Form, Modal, Select, Popconfirm, message} from 'antd'
import {
  fetchQueryAllCyry,
  fetchImportCyry,
  fetchDeleteByIdList,
} from 'actions/groupEmployee'
import AddPeoModal from './groupEmployeeModal/AddPeoModal'
import AddForeignModal from './groupEmployeeModal/AddForeignModal'

const FormItem = Form.Item
const Option = Select.Option

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
@Form.create({})
@connect(
  (state, props) => ({
    config: state.config,
  })
)
export default class groupEmployee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkID: '',
      visibleAddPeoModal: false,
      visibleAddForeignModal: false,
      deleteId: '',
      resionModal: false,
      list: [],
      loading: true,
      selectedRowKeys:[],
      select:[]
    }
    this.showAddPeoModal = this.showAddPeoModal.bind(this)
    this.hideAddPeoModal = this.hideAddPeoModal.bind(this)
    this.hideAddForeignModal = this.hideAddForeignModal.bind(this)
    this.showAddForeignModal = this.showAddForeignModal.bind(this)
    this.inportExcel = this.inportExcel.bind(this)
    this.deletEmployee = this.deletEmployee.bind(this)
    this.resionCancel = this.resionCancel.bind(this)
    this.resionDelete = this.resionDelete.bind(this)
    this.outEmployee = this.outEmployee.bind(this)
    this.addPeoModal = this.addPeoModal.bind(this)
    this.AddForeignModal = this.AddForeignModal.bind(this)
    this.onSelectchange = this.onSelectchange.bind(this)
  }

  componentDidMount() {
    this.searchQueryAllCyry()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.departmentId !== this.props.departmentId) {
      this.searchQueryAllCyry(nextProps.departmentId)
    }
  }

  // 从业人员查询
  searchQueryAllCyry(id) {
    const departmentId = id || this.props.departmentId || this.props.params.departmentId || 1
    this.props.dispatch(fetchQueryAllCyry({dptId: departmentId}, (result) => {
      if (result.data) {
        this.setState({
          list: result.data,
          loading: false,
        })
      }
    }))
  }

  // 新增境内从业人员打开
  showAddPeoModal() {
    this.setState({
      visibleAddPeoModal: true,
    })
  }

// 新增境内从业人员关闭
  hideAddPeoModal() {
    this.setState({
      visibleAddPeoModal: false,
    })
  }

  // 新增境内从业人员确定按钮点击
  addPeoModal() {
    this.setState({
      visibleAddPeoModal: false,
    })
    this.searchQueryAllCyry()
  }

  // 新增境外从业人员show
  showAddForeignModal() {
    this.setState({
      visibleAddForeignModal: true,
    })
  }

  // 新增境外从业人员hide
  hideAddForeignModal() {
    this.setState({
      visibleAddForeignModal: false,
    })
  }

  // 删除从业人员
  deletEmployee() {
    if (this.state.deleteId == '') {
      message.error('请选择需要删除人员')
    } else {
      this.setState({
        resionModal: true,
      })
    }
  }

  // 境外从业人员确定
  AddForeignModal() {
    this.setState({
      visibleAddForeignModal: false,
    })
    this.searchQueryAllCyry()
  }

  // 离职原因取消
  resionCancel() {
    this.setState({
      resionModal: false,
    })
  }

  // 离职原因删除
  resionDelete(e) {
    const self = this
    e.preventDefault();
    self.props.form.validateFields((errors, fieldsValue) => {
      if (errors) {
        return;
      }
      const values = {
        ...fieldsValue,
        idList: this.state.deleteId,
      };
      self.setState({loading: true})
      self.props.dispatch(fetchDeleteByIdList({...values}, (result) => {
        self.state.selectedRowKeys = []
        self.state.deleteId = ""
        self.resionCancel()
        message.success(result.msg)
        self.setState({loading: false})
        self.searchQueryAllCyry()
      }))
    });
  }

  // 导出模板
  outEmployee() {
    const token = sessionStorage.getItem('token')
    window.open(`http://10.118.164.206:8080/jcjw/cyry/exportTemplate.json?token=${token}`)
  }

  // 导入境内人员
  inportExcel(e) {
    const self = this
    const file = e.target.files[0]
    if (file.name.indexOf('.xlsx') == -1) {
      message.error('请选择正确xlsx文件')
      return
    }
    const oReader = new FileReader();
    oReader.onload = function () {
      const temp = {
        data: file,
      }
      self.setState(temp, () => self.upload(temp))
    }
    oReader.readAsDataURL(file);
    e.target.value = ''
    /*reader.onload = function() {
     console.log(reader);
     self.props.dispatch(fetchImportCyry({ dptId: departmentId, excel: reader.result.split(",")[1]}, (result) => {

     }))
     }*/
  }

  upload(value) {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const self = this
    function getBody(response) {
      const text = response.responseText || response.response;
      if (!text) {
        return text;
      }

      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    }

    function onSuccess(jsonObj) {
      if (jsonObj.status == 1) {
        message.success('上传成功')
        self.searchQueryAllCyry()
      } else {
        message.error('上传失败')
      }
    }

    //const url = `${$GLOBALCONFIG.$ctx}/jcjw/cyry/importCyry.json`
    var url = $GLOBALCONFIG.$ctx + '/jcjw/cyry/importCyry.json'
    const request = new FormData()
    request.append('dptId', departmentId)
    request.append('excel', value.data)
    request.append('token', sessionStorage.getItem('token'))
    const xhr = new XMLHttpRequest();
    xhr.open('post', url, true)
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(request)
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return;
      }
      onSuccess(getBody(xhr));
    };
  }

  //多选选中项
  onSelectchange(selectedRowKeys,selectedRows){
    this.setState({selectedRowKeys: selectedRowKeys})
    this.selctdId(selectedRows)
  }

  //删除项id
  selctdId(selectedRows){
    let arr=[];
    for(let item in selectedRows){
      arr.push(selectedRows[item].id)
    }
    this.setState({
      deleteId: arr.join(','),
    })
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.resionDelete}>删除</Button>
        <Button type="" onClick={this.resionCancel}>取消</Button>
    </div>
    )
  }

  render() {
    const departmentId = this.props.departmentId || this.props.params.departmentId || 1
    const {getFieldDecorator} = this.props.form
    const {selectedRowKeys} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange:this.onSelectchange
    }
    const columns = [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '从业人员姓名',
        dataIndex: 'xm',
        key: 'xm',
      },
      {
        title: '性别',
        dataIndex: 'xbLable',
        key: 'xbLable',
      },
      {
        title: '身份证号',
        dataIndex: 'sfzh',
        key: 'sfzh',
      },
      {
        title: '联系方式',
        dataIndex: 'dhhm',
        key: 'dhhm',
      },
      {
        title: '工作部门',
        dataIndex: 'gzbm，',
        key: 'gzbm',
      },
      {
        title: '关注类别',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '详细内容',
        dataIndex: 'xxnr',
        key: 'xxnr',
        render: function (text, record) {
          return (
            <Link className="" to={`/group$/peopleDetails/${record.id}`}>详情</Link>
          )
        },
      },
    ];
    return (
      <div className="nav-second-nextContent maTop-jxy ">
        <div className="detail-content ">
          <Form encType='multipart/form-data'>
            <Table
              columns={columns}
              bordered
              dataSource={this.state.list}
              pagination={false}
              rowSelection={rowSelection}
              loading={this.state.loading}
            />
          </Form>
        </div>
        <div className="ability-button">
          <Popconfirm title="是否删除" placement="top" onConfirm={() => this.deletEmployee()}>
            <Button type="button">全部删除</Button>
          </Popconfirm>
          <input type="file" style={{display: 'none'}} ref="fileUpload" onChange={this.inportExcel}/>
          <Button type="button" onClick={() => this.outEmployee()}>导出模板</Button>
          <Button type="button" onClick={(e) => {
            this.refs.fileUpload.click()
          }}>导入境内人员</Button>
          <Button type="button" onClick={() => this.showAddPeoModal()}>新增境内从业人员</Button>
          <Button type="button" onClick={() => this.showAddForeignModal()}>新增境外从业人员</Button>
        </div>

        {
          <AddPeoModal
            visible={this.state.visibleAddPeoModal}
            onOk={this.addPeoModal}
            onCancel={this.hideAddPeoModal}
            dptId={departmentId}
          />
        }
        {
          <AddForeignModal
            visible={this.state.visibleAddForeignModal}
            onCancel={this.hideAddForeignModal}
            dptId={departmentId}
            onOk={this.AddForeignModal}
          />
        }
        {
          this.state.resionModal ?
            <Modal
              className="modal-body modal-header "
              visible={this.state.resionModal}
              title="离职原因"
              footer={this.footer()}
              onCancel={this.resionCancel}
            >
              <Form onSubmit={this.resionDelete}>
                <FormItem>
                  {
                    getFieldDecorator('lzyy', {rules: [{required: true, message: '请选择离职原因'}]})(
                      <Select placeholder="请选择离职原因">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                      </Select>
                    )
                  }
                </FormItem>
              </Form>
            </Modal> : null
        }
      </div>
    )
  }
}
