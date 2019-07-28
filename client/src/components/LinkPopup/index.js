import React from 'react';
import styled from 'styled-components';
import Popover from 'react-tiny-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Input from './../PropertyInput';

const PopupWrapper = styled.div`
	background-color: white;
	border: 1px solid #AFAFAF;
	padding: 10px;
	border-radius: 3px;
	position: relative;
`;

const Row = styled.div`
	padding: 5px;
	min-width: 50px;
	display: flex;
`;

const SelectWrapper = styled.select`
	width: 99%;
	height: 35px;
	background-color: #949CA9;
	color: white;
`;

const Label = styled.div``;

const Col = styled.div`
	display: flex;
	flex: 1;
`;

const RadioText = styled.span`
	line-height: 2;
`;

const Icon = styled(FontAwesomeIcon)`
	position: absolute;
	right: 7px;
	top: 4px;
	cursor: pointer;
`;

class LinkPopup extends React.Component {
	state = {
		option: '1',
	}

	onOptionChange = (option) => {
		this.setState({ option });
	}

	onHrefChange = (value) => {
		const { onChange } = this.props;
		onChange(value);
	}

	render() {
		const { isOpen, onClickOutside, href } = this.props;
		const { option } = this.state;
		return (
			<Popover
					isOpen={isOpen}
					onClickOutside={onClickOutside}
					position={['top', 'bottom']} // preferred position
					content={(
						<PopupWrapper>
							<Icon icon={faTimes} onClick={onClickOutside} />
							<Row>
								<Col>
									<Input
										width="25px"
										type="radio"
										name="linkOption"
										value="1"
										checked={option === "1"}
										onChange={this.onOptionChange}
									/>
									<RadioText>URL</RadioText>
								</Col>
								<Col>
									<Input
										width="25px"
										type="radio"
										name="linkOption"
										value={2}
										checked={option === "2"}
										onChange={this.onOptionChange}
									/>
									<RadioText>Page</RadioText>
								</Col>
								<Col>
									<Input
										width="25px"
										type="radio"
										name="linkOption"
										value={3}
										checked={option === "3"}
										onChange={this.onOptionChange}
									/>
									<RadioText>Content</RadioText>
								</Col>
							</Row>
							{
								option === '1' &&
								<Row>
									<Input
										value={href}
										onChange={this.onHrefChange}
									/>
								</Row>
							}
							{
								option === '2' &&
								<Row>
									<SelectWrapper onChange={(e) => this.onHrefChange(e.target.value)}>
										<option value={1}>Page 1</option>
										<option value={2}>Page 2</option>
										<option value={3}>Page 3</option>
										<option value={4}>Page 4</option>
									</SelectWrapper>
								</Row>
							}
							{
								option === '3' &&
								<Row>
									<SelectWrapper onChange={(e) => this.onHrefChange(e.target.value)}>
										<option>Page 1</option>
										<option>Page 2</option>
										<option>Page 3</option>
										<option>Page 4</option>
									</SelectWrapper>
								</Row>
							}
						</PopupWrapper>
					)}
			>
				{
					this.props.children
				}
			</Popover>
		)
	}
}

export default LinkPopup;
