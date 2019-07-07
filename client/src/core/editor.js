import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as mapper from './templateMapper';
import { openSetting, onSettingChange } from './../store/actions';
import { level } from './../constant';

const dropProps = {
	drop(props, monitor) {
		const { onDrop } = props;
		console.log(monitor.getItem());
		onDrop && onDrop(monitor.getItem());
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
	overflow: auto;
`;

class Editor extends Component {

	renderHeader(header) {
		const { onChange } = this.props;
		const Component = mapper.headers[header.id].component;
		return <Component settings={header.state} onChange={onChange} />
	}

	renderComponent(block, mapping, index, type) {
		const { openSetting } = this.props;
		const mappedBlock = mapping[block.component] || {};
		const Component = mappedBlock.component;
		if(!Component) {
			return null;
		}
		console.log(index, block);
		return (
			<div onClick={() => {
				openSetting(block, level.COMPONENT, index, type)
			}}>
				<Component
					settings={block.state}
					onChange={(field, value) => this.handleChange(field, value, block, level.COMPONENT, index, type)}
					key={index}
				/>
			</div>
		)
	}

	handleChange = (field, value, block, level, index, type) => {
		const { onSettingChange } = this.props;
		const newBlock = {...block};
		newBlock.state[field] = value;
		onSettingChange(newBlock, level, index, type);
	}

	render() {
		const { connectDropTarget, header, content, footer } = this.props;
		return (
			<EditorWrapper
				ref={instance => connectDropTarget(findDOMNode(instance))}
			>
				{
					header !== null
					?
						this.renderComponent(header, mapper.headers, undefined, 'header')
					:
						<EmptyHeaderFooter>
							<TextLabel>Header</TextLabel>
							<TextLabel>Drag-Drop header content. Will be shown on all pages.</TextLabel>
						</EmptyHeaderFooter>
				}
				{
					content.length !== 0
					?
						<React.Fragment>
							{
								content.map((block, i) => (
									<React.Fragment key={i}>
										{this.renderComponent(block, mapper.contents, i, 'content')}
									</React.Fragment>
								))
							}
						</React.Fragment>
					:
						<EmptyContent>
							<TextLabel>Content</TextLabel>
							<TextLabel>Drag-Drop page blocks. Visible on this page only.</TextLabel>
						</EmptyContent>
				}
				{
					footer !== null
					?
						this.renderComponent(footer, mapper.footers, undefined, 'footer')
					:
						<EmptyHeaderFooter>
							<TextLabel>Footer</TextLabel>
							<TextLabel>Drag-Drop footer content. Will be shown on all pages.</TextLabel>
						</EmptyHeaderFooter>
				}
			</EditorWrapper>
		);
	}
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
	openSetting: (block, level, index, type) => dispatch(openSetting(block,level, index, type)),
	onSettingChange: (block, level, index, type) => dispatch(onSettingChange(block, level, index, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('CARD',dropProps, dropCollect)(Editor));
