import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.div`
	padding: 10px
	width: ${props => props.center ? '50%' : 'calc(100% - 20px)'};
	${props => props.center ? 'margin: 0px auto;' : ''};
`;

const SectionOuter = styled.section`
	background-color: ${props => props.backgroundColor || 'transparent'};
`;

function Section(props) {
	return (
		<SectionOuter
			backgroundColor={props.backgroundColor}
			color={props.color}
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
