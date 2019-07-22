import React from 'react';
import styled from 'styled-components';

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

class Pricings01 extends React.Component {
  render() {
		const { settings } = this.props;
    return (
			<PricingContainer
				backgroundColor={settings.backgroundColor}
				color={settings.color}
			>
				<div>
					<h1>Pricing</h1>
				</div>
				<PricingListContainer>
					<PricingRow>
							<h2>Hobby</h2>
							<p><strong>$9 / month</strong></p>
							<p>Even the all-powerful Pointing has no control about.</p>

							<List>
								<ListItem>Item 1</ListItem>
								<ListItem>Item 2</ListItem>
								<ListItem>Item 3</ListItem>
							</List>

							<LinkButton />
					</PricingRow>

					<PricingRow>
							<h2>Professional</h2>
							<p><strong>$19 / month</strong></p>
							<p>Far far away, behind the word mountains, far from.</p>

							<List>
								<ListItem>Item 1</ListItem>
								<ListItem>Item 2</ListItem>
								<ListItem>Item 3</ListItem>
							</List>

							<LinkButton />
							{/* <p><a href="https://www.froala.com" className="btn btn-primary mt-4">Subscribe</a></p> */}
					</PricingRow>

					<PricingRow>
							<h2>Business</h2>
							<p><strong>$49 / month</strong></p>
							<p>Wild Question Marks, but the Little Blind Text didn’t listen.</p>

							<List>
								<ListItem>Item 1</ListItem>
								<ListItem>Item 2</ListItem>
								<ListItem>Item 3</ListItem>
							</List>

							<LinkButton />
					</PricingRow>
				</PricingListContainer>
			</PricingContainer>
		)
	}
}

Pricings01.defaultSettings = {
	title: '',
	list: [
		{
			featureList: [],
			title: '',
			rate: '',
			description: ''
		},
	],
	color: '',
	backgroundColor: '',
};

Pricings01.settings = {
  backgroundColor: 'color',
  color: 'color',
}



export default Pricings01;
