import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';

const LinkText = styled(EditableDiv)`
	outline: none;
	color: ${props => props.color || '#4E4E4E'};
`;

const LinkAnchor = styled.a`
	text-decoration: none;
	line-height: 2em;
	color: #4E4E4E;
`;

const Link = ({ linkText, href = "#", color }) => (
	<LinkAnchor href={href}>
		<LinkText
			color={color}
			html={linkText}
		/>
	</LinkAnchor>
);

export default Link;
