import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.div`
	width: ${props => props.center ? '50%' : '100%'};
	${props => props.center ? 'margin: 0px auto;' : ''}
`;

const SectionOuter = styled.div`
	background-color: ${props => props.backgroundColor || 'transparent'};
`;

function Section(props) {
	return (
		<SectionOuter
			backgroundColor={props.backgroundColor}
		>
			<SectionWrapper
				center={props.center}
			>
				{props.children}
			</SectionWrapper>
		</SectionOuter>
	)
}

export default Section;
