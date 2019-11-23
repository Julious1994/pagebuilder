import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faNewspaper, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


import Input from './PropertyInput';

const SelectWrapper = styled.select`
	width: 99%;
	height: 35px;
	background-color: #949CA9;
	color: white;
`;

const Icon = styled(FontAwesomeIcon)`
	cursor: pointer;
	position: absolute;
	right: 2px;
	top: 0px;
	color: #fff;
	padding: 10px;
`;

const InputWrapper = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	input {
		padding-right: 30px;
	}
`;


function Select(props) {
	const [addNew, setAddNew] = useState(false);
	const [inputValue, setInputValue] = useState('');

	function onChange(value) {
		if(value === 'new') {
			setAddNew(true);
		} else {
			props.onChange(value);
		}
	}

	function cancelText() {
		setAddNew(false);
		setInputValue('');
		props.onNew('');
	}

	function onTextChange(value) {
		setInputValue(value)
	}

	function onTextBlur(e) {
		props.onNew(e.target.value);
	}

	return(
			addNew ?
				<InputWrapper>
					<Input value={inputValue} onChange={onTextChange} onBlur={onTextBlur}/>
					<Icon icon={faTimes} onClick={cancelText}/>
				</InputWrapper>
			:
				<SelectWrapper onChange={(e) => onChange(e.target.value)}>
					<option value={1}>Page 1</option>
					<option value={2}>Page 2</option>
					<option value={3}>Page 3</option>
					<option value='new'>Add New Category...</option>
				</SelectWrapper>

	);
}

export default Select;
