import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as mapper from './templateMapper';
import {
	openSetting,
	onSettingChange,
	openComponentSetting,
	closeComponentSetting,
	moveUp,
	moveDown,
} from './../store/actions';
import { level } from './../constant';
import Expand from './../components/Expand';

import ComponentSettingTab from './SettingPanel/ComponentSettingTab';

const dropProps = {
	drop(props, monitor) {
		const { onDrop } = props;
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
	constructor(props) {
		super(props);
		this.state = {
			collapse: [],
		};
	}

	renderHeader(header) {
		const { onChange } = this.props;
		const Component = mapper.headers[header.id].component;
		return <Component settings={header.state} onChange={onChange} />
	}

	renderComponent(block, mapping, index, type) {
		const { openSetting, componentSetting, openComponentSetting, moveUp, moveDown, editable, closeComponentSetting } = this.props;
		const mappedBlock = mapping[block.component] || {};
		const Component = mappedBlock.component;
		const showSetting = componentSetting.type === type && componentSetting.templateIndex === index;
		if(!Component) {
			return null;
		}
		return (
			<ComponentWrapper
				onDoubleClick={() => {
					editable && openComponentSetting(index, type)
				}}
			>
				<Component
					settings={block.state}
					onChange={(field, value) => this.handleChange(field, value, block, level.COMPONENT, index, type)}
					key={index}
					editable={editable}
				/>
				{
					showSetting &&
					<ComponentSettingTab
						openSetting={() => openSetting(level.COMPONENT, block, index, type)}
						moveUp={() => moveUp(index)}
						moveDown={() => moveDown(index)}
						type={type}
						closeComponentSetting={closeComponentSetting}
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

	onToggle(index) {
		const { collapse = [] } = this.state;
		const _index = collapse.indexOf(index);
		if(_index !== -1) {
			collapse.splice(_index, 1);
		} else {
			collapse.push(index);
		}
		this.setState({ collapse });
	}

	isExpanded(index) {
		const {collapse = []} = this.state;
		if(collapse.indexOf(index) !== -1) {
			return false;
		}
		return true;
	}

	render() {
		const { connectDropTarget, header, content, footer, editable } = this.props;
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
									this.renderComponent(block, mapper.contents, i, 'content')
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
	editable: state.sites.editable,
})

const mapDispatchToProps = (dispatch) => ({
	openSetting: (level, block, index, type) => dispatch(openSetting(level, block, index, type)),
	onSettingChange: (block, level, index, type) => dispatch(onSettingChange(block, level, index, type)),
	openComponentSetting: (index, type) => dispatch(openComponentSetting(index, type)),
	moveUp: (index) => dispatch(moveUp(index, dispatch)),
	moveDown: (index) => dispatch(moveDown(index)),
	closeComponentSetting: () => dispatch(closeComponentSetting()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('CARD',dropProps, dropCollect)(Editor));
