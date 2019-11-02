import React, { useState, useRef } from 'react';
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
	& > .react-tiny-popover-container {
		${props => props.editable && props.popupStyle}
	}
`;

function Link({ link = {}, color, editable, linkSetting, ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const linkRef = useRef();
	const togglePopover = (e, open) => {
		open && props.onMenuClick && props.onMenuClick(link);
		setIsOpen(open);
	}
	return(
		<Popover
			isOpen={isOpen}
			onClickOutside={() => togglePopover(null, false)}
			onChange={(href) => {
				link.href = href;
				props.onSettingChange(link);
			}}
			href={link.href}
			contentDestination={linkRef.current}
			{...props}
		>
		<LinkAnchor
			ref={e => linkRef.current = e}
			{...(!editable && {href: link.href})}
			editable={editable}
			popupStyle={props.popupStyle}
			onMouseEnter={(e) => editable && togglePopover(e, true)}
			onMouseLeave={(e) => {
				if(!linkRef.current.contains(e.relatedTarget)) {
					editable && togglePopover(e, false)
				}
			}}
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
