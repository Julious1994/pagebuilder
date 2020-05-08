import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Popover from './../../components/LinkPopup';

const LinkAnchor = styled.a`
	position: relative;
	text-decoration: none;
	line-height: 2em;
	color: #4E4E4E;
	& > .react-tiny-popover-container {
		${props => props.editable && props.popupStyle}
	}
`;

function SocialLink({ link = {}, editable, linkSetting, ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const linkRef = useRef();
	const togglePopover = (open) => {
		console.log('clic');
		setIsOpen(open);
	}
	console.log(props);
	return(
		<Popover
			isOpen={isOpen}
			onClickOutside={() => togglePopover(false)}
			onChange={(href) => {
				link.href = href;
				props.onSettingChange(link);
			}}
			href={link.href}
			contentDestination={linkRef.current}
		>
		<LinkAnchor
			className="nav-link"
			ref={e => linkRef.current = e}
			editable={editable}
			popupStyle={props.popupStyle}
			{...(!editable && {href: link.href})}
			onMouseEnter={(e) => editable && togglePopover(true)}
			onMouseLeave={(e) => {
				if(!linkRef.current.contains(e.relatedTarget)) {
					editable && togglePopover(false)
				}
			}}
		>
			{props.children}
		</LinkAnchor>
		</Popover>
	)
};

export default SocialLink;
