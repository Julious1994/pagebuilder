import React from 'react';
import { DragSource } from 'react-dnd'

import styled from 'styled-components';

const ControlWrapper = styled.div`
	${props => props.isImage ? `height: 75px;` : `padding: 30px;`}
	font-weight: bolder;
	border: 1px solid gray;
	margin-bottom: 10px;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
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
		const { title, connectDragSource, thumbnail } = this.props;
		return connectDragSource(
			<div>
				<ControlWrapper isImage={!!thumbnail}>
					{
						thumbnail ?
							<Image src={`./images/${thumbnail}`} />
						:
						<span>{title}</span>
					}
				</ControlWrapper>
			</div>
		);
	}
}

export default DragSource('CARD', dragSource, collect)(Element);
