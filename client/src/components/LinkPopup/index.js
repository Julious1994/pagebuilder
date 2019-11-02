import React from 'react';
import styled from 'styled-components';
import Popover from 'react-tiny-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash, faPlus, faLink, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import Input from './../PropertyInput';

const PopupWrapper = styled.div`
	background-color: white;
	border: 1px solid #AFAFAF;
	padding: 10px 0px;
	border-radius: 3px;
	position: relative;
`;

const Row = styled.div`
	padding: 5px;
	min-width: 50px;
	display: flex;
	justify-content: ${props => props.justify || 'center'}
`;

const SelectWrapper = styled.select`
	width: 99%;
	height: 35px;
	background-color: #949CA9;
	color: white;
`;

const Col = styled.div`
	display: flex;
	flex: 1;
`;

const RadioText = styled.span`
	line-height: 2;
`;

const IconL = styled(FontAwesomeIcon)`
	width: 3em !important;
	height: 1.1em;
	cursor: pointer;
`;

class LinkPopup extends React.Component {
	state = {
		option: '1',
		linkToggle: false,
	}

	onOptionChange = (option) => {
		this.setState({ option });
	}

	onHrefChange = (value) => {
		const { onChange } = this.props;
		onChange(value);
	}

	handleToogleLink = () => {
		this.setState({ linkToggle: !this.state.linkToggle });
	}

	render() {
		const { isOpen, onClickOutside, href, onAddLink, onRemoveLink, onAddChildLink } = this.props;
		const { option, linkToggle } = this.state;
		return (
			<Popover
					isOpen={isOpen}
					onClickOutside={onClickOutside}
					// position={['top', 'bottom']} // preferred position
					contentDestination={this.props.contentDestination}
					content={(
						<PopupWrapper>
							<Row justify="flex-end">
								<IconL icon={faLink} onClick={this.handleToogleLink}/>
								<IconL icon={faPlus} onClick={onAddLink}/>
								<IconL icon={faTrash} onClick={onRemoveLink}/>
								{
									onAddChildLink &&
									<IconL icon={faFolderPlus} onClick={onAddChildLink}/>
								}
								<IconL icon={faTimes} onClick={onClickOutside} />
							</Row>

							{
								linkToggle &&
									<React.Fragment>
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
									</React.Fragment>
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
