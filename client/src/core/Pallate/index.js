import React, { Component } from 'react';
import Accordian, { AccordianItem } from './../../components/Accordian';
import { headers, footers, contents } from './../templateMapper';
import PallateElement from './PallateElement';

class Pallate extends Component {
	render() {
		return (
			<Accordian defaultActive={2}>
				<AccordianItem label="Header">
					{
						Object.keys(headers).map(key => (
							<PallateElement key={key} id={key} {...headers[key]} />
						))
					}
				</AccordianItem>
				<AccordianItem label="Footer">
					{
						Object.keys(footers).map(key => (
							<PallateElement key={key} id={key} {...footers[key]} />
						))
					}
				</AccordianItem>
				<AccordianItem label="Content">
					{
						Object.keys(contents).map(key => (
							<PallateElement key={key} id={key} {...contents[key]} />
						))
					}
				</AccordianItem>
			</Accordian>
		);
	}
}

export default Pallate;
