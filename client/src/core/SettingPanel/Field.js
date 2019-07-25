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
		boolean: Switch,
		number: PropertyInput
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

const getType = (object) => {
	console.log('objec', object);
	return fieldControlMapper[object.type];
}



export const convertCamleToDashedString = (text) => {
	const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return text.split(/(?=[A-Z])/)
	.map((t, i) => i === 0 ? capitalize(t) : t.toLowerCase())
	.join(' ');
};

const Field = ({...props}) => {
	const { type, name, value, onChange } = props;
	const Control = typeof type === 'object' ? getType(type): fieldControlMapper[type];
	const controlType = typeof type === 'object' ? type.type : type;
	if(!Control) {
		return null;
	}
	return (
		<FieldWrapper>
			<Title>{convertCamleToDashedString(name)} :</Title>
			<Content>
				<Control
					name={name}
					value={value}
					onChange={onChange}
					type={controlType}
				/>
			</Content>
		</FieldWrapper>
	)
};

export default Field;
