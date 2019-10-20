import React from 'react';
import styled from 'styled-components'

const ItemWrapper = styled.div`
	padding: 1px;
	color: white;
	cursor: pointer;
	${props => props.active ? `height: calc(100% - 80px)` : ``};
`;

const ItemLabel = styled.div`
	padding: 10px 15px;
	background-color: #373F4D;
`;

const ItemChildren = styled.div`
	background-color: #37444E;
	padding: 10px;
	overflow: overlay;
	height: calc(100% - 60px);
	&::-webkit-scrollbar {
		width: 6px;
	}
	&::-webkit-scrollbar-thumb {
    background-color: #000000;
	}
	&::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
	}
`;

const AccordianWrapper = styled.div`
	padding: 5px;
	background-color: #5A6678;
	height: calc(100% - 10px);
`;

export const AccordianItem = ({children, label, active, onClick}) => (
	<ItemWrapper onClick={onClick} active={active}>
		<ItemLabel>{label}</ItemLabel>
		{
			active &&
			<ItemChildren>{children}</ItemChildren>
		}
	</ItemWrapper>
)

class Accordian extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: props.defaultActive || 0,
		}
	}

	handleActive = (i) => {
		this.setState({ activeItem: i });
	}

	render() {
		const { activeItem } = this.state;
		return(
			<AccordianWrapper>
				{
					React.Children.map(this.props.children,(item, i) => (
						React.cloneElement(item, {
							key: i,
							active: activeItem === i,
							onClick: () => this.handleActive(i),
						})
					))
				}
			</AccordianWrapper>
		)
	}
}

export default Accordian;
