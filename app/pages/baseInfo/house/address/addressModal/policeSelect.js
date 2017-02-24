import React, { Component } from 'react'
import { Form, Checkbox, Button ,Modal} from 'antd';
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

@Form.create({
})

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      selectedDivisionIds: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount(){
    this.setState({selectedDivisionIds: this.props.selectedDivisionIds})
  }

  onChange(selectArrs){
    this.setState({selectedDivisionIds: selectArrs})
  }

  handleSubmit(e) {
      e.preventDefault();
      this.setState({loading: true})
      setTimeout(() => {
          this.setState({loading: false})
          this.props.handleOkEditRaleteDivision(this.state.selectedDivisionIds.join(","))
      }, 1000)
  }
  footer(){
    return(
      <div>
         <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
         <Button type="primary" size={'large'} onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
      </div>
    )
  }
  render() {
    const {
      defaultDivisions,
      selectedDivisionIds,
      divisionSelectTitle
    } = this.props
    return (
      <Modal
          className="modal-header modal-body"
          visible={this.props.visible}
          title={divisionSelectTitle}
          onCancel={this.props.onCancel}
          footer={this.footer()}
      >
        <Form horizontal className="CheckboxGroup-cpp">
          <CheckboxGroup options={defaultDivisions} defaultValue={selectedDivisionIds} onChange={this.onChange}/>
        </Form>
      </Modal>
    )
  }
}
