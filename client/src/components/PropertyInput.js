import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.input`
	width: ${props => props.width ? props.width : '99%'};
	background-color: #949CA9;
	border: none;
	height: 30px;
	color: white;
`;

function Input({ value, onChange, name, type, width, ...props }) {
	return (
		<InputWrapper
			width={width}
			value={value}
			type={type}
			name={name}
			onChange={(e) => onChange && onChange(e.target.value)}
			{...props}
		/>
	)
}

export default Input;
