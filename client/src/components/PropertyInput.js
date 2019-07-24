import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.input`
	width: 99%;
	background-color: #949CA9;
	border: none;
	height: 30px;
	color: white;
`;

function Input({ value, onChange, name, type }) {
	return (
		<InputWrapper
			value={value}
			type={type}
			name={name}
			onChange={(e) => onChange && onChange(e.target.value)}
		/>
	)
}

export default Input;
