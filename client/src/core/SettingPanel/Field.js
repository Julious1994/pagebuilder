import React from 'react';
import styled from 'styled-components';

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

const Field = ({title, children}) => (
	<FieldWrapper>
		<Title>{title} :</Title>
		<Content>
			{children}
		</Content>
	</FieldWrapper>
);

export default Field;
