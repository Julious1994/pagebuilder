import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';

import Section from '../../components/Section';
import LinkButton from './../../components/LinkButton';

const PricingContainer = styled.section`
	padding: 0px 20px;
	background-color: ${props => props.backgroundColor || 'transparent'}
	color: ${props => props.color || 'initial'}
`;

const PricingListContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
`;

const PricingRow = styled.div`
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	width: 275px;
	margin: 7px;
	padding: 30px 20px;
	border-radius: 5px;
	background-color: #fff;
`;

const List = styled.ul`
	padding: 25px;
`;

const ListItem = styled.li`
	text-align: left;
	line-height: 1.5;
`;

const Title = styled(EditableDiv)`
	outline: none;
`;

class Pricings01 extends React.Component {

	handlePricingListChange = (item, index) => {
		const { settings, onChange } = this.props;
		const { list } = settings;
		if(list[index]) {
			list[index] = {...item}
		}
		onChange && onChange('list', list);
	}

	getUpdatedFeatureList = (field, value, list, index) => {
		let feature = list[index];
		if(feature) {
			feature[field] = value;
		} else {
			feature = { [field]: value }
		}
		list[index] = {...feature};
		return list;
	}

	getUpdatedListItem = (field, value, item) => {
		item[field] = value;
		return item;
	}

  render() {
		const { settings, editable, onChange } = this.props;
    return (
			<Section
				center={settings.centerSection}
				backgroundColor={settings.sectionBackground}
			>
				<PricingContainer
					backgroundColor={settings.backgroundColor}
					color={settings.color}
				>
					<div>
						<h1>
							<Title
								html={settings.title}
								disabled={!editable}
								onChange={(e) => onChange('title', e.target.value)}
							/>
						</h1>
					</div>
					<PricingListContainer>
						{
							settings.list.map((item, i) => (
								<PricingRow key={i}>
										<h2>
											<Title
												html={item.title}
												disabled={!editable}
												onChange={(e) =>
													this.handlePricingListChange(
														this.getUpdatedListItem('title', e.target.value, item), i
													)
												}
											/>
										</h2>
										<strong>
											<Title
												html={item.rate}
												disabled={!editable}
												onChange={(e) =>
													this.handlePricingListChange(
														this.getUpdatedListItem('rate', e.target.value, item), i
													)
												}
											/>
										</strong>
											<Title
												html={item.description}
												disabled={!editable}
												onChange={(e) =>
													this.handlePricingListChange(
														this.getUpdatedListItem('description', e.target.value, item), i
													)
												}
											/>

										<List>
											{
												item.featureList.map((feature, j) => (
													<ListItem key={j}>
														<Title
															html={feature.title}
															disabled={!editable}
															onChange={(e) =>
																this.handlePricingListChange(
																	this.getUpdatedListItem(
																		'featureList',
																		this.getUpdatedFeatureList('title', e.target.value, item.featureList, j),
																		item
																	), i
																)
															}
														/>
													</ListItem>
												))
											}
										</List>

										<LinkButton />
								</PricingRow>
							))
						}
					</PricingListContainer>
				</PricingContainer>
			</Section>
		)
	}
}

Pricings01.defaultSettings = {
	title: 'Pricing',
	list: [
		{
			featureList: [
				{ title: 'Item 1'},
				{ title: 'Item 2'},
				{ title: 'Item 3'},
			],
			title: 'Professional',
			rate: '$19 / month',
			description: 'Far far away, behind the word mountains, far from.'
		},
		{
			featureList: [
				{ title: 'Item 1'},
				{ title: 'Item 2'},
				{ title: 'Item 3'},
			],
			title: 'Business',
			rate: '$49 / month',
			description: 'Far far away, behind the word mountains, far from.'
		},
		{
			featureList: [
				{ title: 'Item 1'},
				{ title: 'Item 2'},
				{ title: 'Item 3'},
			],
			title: 'Ultimate',
			rate: '$89 / month',
			description: 'Far far away, behind the word mountains, far from.'
		},
	],
	color: '',
	backgroundColor: '',
	centerSection: false,
	sectionBackground: 'transparent',
};

Pricings01.settings = {
  backgroundColor: 'color',
	color: 'color',
	list: 'increment',
	centerSection: 'boolean',
	sectionBackground: 'color',
}



export default Pricings01;
