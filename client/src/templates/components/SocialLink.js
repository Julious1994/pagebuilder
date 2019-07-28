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

function SocialLink({ link = {}, editable, linkSetting, ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const togglePopover = (open) => {
		console.log('clic');
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
		>
		<LinkAnchor
			{...(!editable && {href: link.href})}
			onClick={() => editable && togglePopover(true)}
		>
			{props.children}
		</LinkAnchor>
		</Popover>
	)
};

export default SocialLink;
