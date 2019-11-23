import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Icon = styled(FontAwesomeIcon)`
	right: 20px;
	top: 20px;
	cursor: pointer;
`;

const ExpandWrapper = styled.div`
	border: 1px solid black;
	border-radius: 5px;
	margin-top: 10px;
	padding: 3px;
	display: flex;
	margin: 10px 5px 0px;
	justify-content: space-between;
`;

const IconWrapper = styled.div`
	border: 1px solid black;
	padding: 7px 9px;
	border-radius: 100%;
	background-color: #ddd;
	width: 15px;
`;

const Title = styled.span`
	font-weight: bold;
	line-height: 2;
`;

const Editable = styled.div``;

function Expand({isExpand, onToggle, ...props}) {
	const title = `Content ${props.index + 1}`;
	const iconName = isExpand ? faChevronDown : faChevronUp;
	return (
		<React.Fragment>
			{
				props.editable ?
				<Editable>
					<ExpandWrapper>
						<Title>{title}</Title>
						<IconWrapper onClick={onToggle}>
								<Icon icon={iconName} />
						</IconWrapper>
					</ExpandWrapper>
					{isExpand && props.children}
				</Editable>
				:
					isExpand && props.children
			}
		</React.Fragment>
	)
}

export default Expand;
