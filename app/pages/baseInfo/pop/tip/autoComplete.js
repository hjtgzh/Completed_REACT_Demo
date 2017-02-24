import {autoComplete} from 'antd'
import React from 'react';
import ReactDOM from 'react-dom';
function onSelect(value){
	console.log('onSelect',value);
}

const Complete =React.createClass({
	getInitialState(){
		return {
			dataSource:[],
		};
	},
	handleChange(value){
		this.setState({
			dataSource:!value ?[]:[
			value,
			value+value,
			],
		});
	},
	render(){
		const {dataSource}=this.state;
		return (
			<AutoComplete 
			 dataSource={dataSource}
			 style={{width:200}}
			 onSelect={onSelect}
			 onChange={this.handleChange}
			/>
		);
	},
})
export default Complete;
