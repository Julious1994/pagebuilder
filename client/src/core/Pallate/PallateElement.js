import React from 'react';
import { DragSource } from 'react-dnd'

import styled from 'styled-components';

const ControlWrapper = styled.div`
	padding: 30px;
	font-weight: bolder;
	border: 1px solid gray;
`;

const dragSource = {
	beginDrag(props) {
		return {
			component: props.id,
			title: props.title,
			type: props.type,
		}
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

class Element extends React.Component {
	render() {
		const { title, connectDragSource } = this.props;

		return connectDragSource(
			<div>
				<ControlWrapper>
					<span>{title}</span>
				</ControlWrapper>
			</div>
		);
	}
}

export default DragSource('CARD', dragSource, collect)(Element);
