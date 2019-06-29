import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';

const dropProps = {
	drop(props, monitor) {
		// console.log(monitor.getItem());
		props.onDrop(monitor.getItem());
	}
}

function dropCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
	}
}

const EmptyHeaderFooter = styled.div`
	padding: 20px;
	border-top: 1px solid grey;
	border-bottom: 1px solid grey;
`;
const EmptyContent = styled.div`
	height: calc(100% - 156px);
`;
const TextLabel = styled.div`
	color: grey;
`;
const EditorWrapper = styled.div`
	height: 100%;
	overflow: overlay;
`;

class Editor extends Component {
	render() {
		return (
			<EditorWrapper>
				<EmptyHeaderFooter>
					<TextLabel>Header</TextLabel>
					<TextLabel>Drag-Drop header content. Will be shown on all pages.</TextLabel>
				</EmptyHeaderFooter>
				<EmptyContent>
					<TextLabel>Content</TextLabel>
					<TextLabel>Drag-Drop page blocks. Visible on this page only.</TextLabel>
				</EmptyContent>
				<EmptyHeaderFooter>
					<TextLabel>Footer</TextLabel>
					<TextLabel>Drag-Drop footer content. Will be shown on all pages.</TextLabel>
				</EmptyHeaderFooter>
			</EditorWrapper>
		);
	}
}

export default DropTarget('CARD',dropProps, dropCollect)(Editor);
