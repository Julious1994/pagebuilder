import React from 'react';
import styled from 'styled-components';

const IncrementWrapper = styled.div`
	padding: 10px;
	display: flex;
	background-color: #EDEDED;
	border-radius: 20px;
	justify-content: center;
`;

const IncrementIcon = styled.div`
	padding: 0px 5px;
	cursor: pointer;
`;

const IncrementInput = styled.input`
    border: 0px;
    outline: none;
    background-color: transparent;
    text-align: center;
		appearance: none;
		width: 50px;
`;

class Increment extends React.Component {

    handleChange = (number) => {
        const { value, onChange } = this.props;
        let newValue = number;
        if(Array.isArray(value)) {
            const lastElement = value[value.length - 1];
            const length = value.length;
            if (length > number) {
                value.splice(number);
            } else {
                const diff = number - length;
                for(let i = 0; i< diff;i++) {
                    value.push({...lastElement});
                }
            }
            newValue = value;
        }
        onChange(newValue);
    }

    render() {
        const { value } = this.props;
        let number = Array.isArray(value) ? value.length : value;
        return(
            <IncrementWrapper>
                <IncrementIcon
                    onClick={() => this.handleChange(number - 1)}
                >
                    -
                </IncrementIcon>
                <IncrementInput
                    type="number"
                    value={number}
                    onChange={(e) => this.handleChange(Number(e.target.value))}
                />
                <IncrementIcon
                    onClick={() => this.handleChange(number + 1)}
                >
                    +
                </IncrementIcon>
            </IncrementWrapper>
        )
    }
}

export default Increment;
