import React from 'react';
import styled from 'styled-components';

const variantFontColor = {
	'filled': '#fff',
	'outlined': '#5891FB'
}

const variantBgColor = {
	'filled': '#5891FB',
	'outlined': '#fff'
}

const LinkButtonContainer = styled.div`
	color: ${props => variantFontColor[props.variant || 'outlined']};
	background-color: ${props => variantBgColor[props.variant || 'outlined']};
	border: 2px solid #5891FB;
	padding: 10px 20px;
	border-radius: 3px;
	display: inline-block;
	cursor: pointer;
	&:hover {
		background-color: #4182FB;
		color: #fff;
	}
`;


const Anchor = styled.a`
	text-decoration: none;
	color: inherit;
`;

class LinkButton extends React.Component {
	render() {
		return(
			<LinkButtonContainer variant="filled">
				<Anchor href="#">
					<div>Subscribe</div>
				</Anchor>
			</LinkButtonContainer>
		)
	}
}

export default LinkButton;
