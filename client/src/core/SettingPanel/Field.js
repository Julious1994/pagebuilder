import React from 'react';
import styled from 'styled-components';
import ColorPicker from './../../components/ColorPicker';
import Increment from './../../components/Increment';
import PropertyInput from './../../components/PropertyInput';
import Switch from '../../components/Boolean';

const fieldControlMapper = {
    color: ColorPicker,
		increment: Increment,
		string: PropertyInput,
		boolean: Switch
}

const FieldWrapper = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin: 10px 0px;
`;

const Title = styled.div`
	color: white;
	font-size: 13px;
	font-weight: bolder;
	line-height: 1.5;
`;

const Content = styled.div``;

const Field = ({...props}) => {
	const { type, name, value, onChange } = props;
	const Control = fieldControlMapper[type];
	if(!Control) {
		return null;
	}
	return (
		<FieldWrapper>
			<Title>{name} :</Title>
			<Content>
				<Control name={name} value={value} onChange={onChange} />
			</Content>
		</FieldWrapper>
	)
};

export default Field;
