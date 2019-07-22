import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
	width: ${props => props.width || '100%'};
	background-color: ${props => props.backgroundColor || 'transparent'};
	${props => props.center ? 'margin: 0px auto;' : ''}
`;

export default Section;
