import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as mapper from './templateMapper';
import { openSetting, onSettingChange, openComponentSetting, closeComponentSetting } from './../store/actions';
import { level } from './../constant';

import ComponentSettingTab from './SettingPanel/ComponentSettingTab';

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

const ComponentWrapper = styled.div`
	position: relative;
`;

class Editor extends Component {

	renderHeader(header) {
		const { onChange } = this.props;
		const Component = mapper.headers[header.id].component;
		return <Component settings={header.state} onChange={onChange} />
	}

	renderComponent(block, mapping, index, type) {
		const { openSetting, componentSetting, openComponentSetting } = this.props;
		const mappedBlock = mapping[block.component] || {};
		const Component = mappedBlock.component;
		const showSetting = componentSetting.type === type && componentSetting.templateIndex === index;
		if(!Component) {
			return null;
		}
		console.log(componentSetting, type, index);
		return (
			<ComponentWrapper
				onClick={() => {
					openComponentSetting(index, type)
					// openSetting(block, level.COMPONENT, index, type)
				}}
				onMouseOver={() => console.log('hover')}
			>
				<Component
					settings={block.state}
					onChange={(field, value) => this.handleChange(field, value, block, level.COMPONENT, index, type)}
					key={index}
				/>
				{
					showSetting &&
					<ComponentSettingTab
						openSetting={() => openSetting(block, level.COMPONENT, index, type)}
					/>
				}
			</ComponentWrapper>
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

const mapStateToProps = (state) => ({
	componentSetting: state.setting.componentSetting,
})

const mapDispatchToProps = (dispatch) => ({
	openSetting: (block, level, index, type) => dispatch(openSetting(block,level, index, type)),
	onSettingChange: (block, level, index, type) => dispatch(onSettingChange(block, level, index, type)),
	openComponentSetting: (index, type) => dispatch(openComponentSetting(index, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('CARD',dropProps, dropCollect)(Editor));
