import React, { useState } from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';

import Popover from './../../components/LinkPopup';

const LinkText = styled(EditableDiv)`
	outline: none;
	color: ${props => props.color || '#4E4E4E'};
`;

const LinkAnchor = styled.a`
	text-decoration: none;
	line-height: 2em;
	color: #4E4E4E;
`;

function Link({ link = {}, color, editable, linkSetting, ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const togglePopover = (open) => {
		setIsOpen(open);
	}
	return(
		<Popover
			isOpen={isOpen}
			onClickOutside={() => togglePopover(false)}
			onChange={(href) => {
				link.href = href;
				props.onSettingChange(link);
			}}
			href={link.href}
			{...props}
		>
		<LinkAnchor
			{...(!editable && {href: link.href})}
			onClick={() => editable && togglePopover(true)}
		>
			<LinkText
				color={color}
				html={link.title}
				disabled={!editable}
				onChange={(e) => {
					link.title = e.target.value;
					props.onSettingChange(link);
				}}
			/>
		</LinkAnchor>
		</Popover>
	)
};

export default Link;
