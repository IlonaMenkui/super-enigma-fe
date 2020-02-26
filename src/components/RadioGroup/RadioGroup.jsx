import React from 'react';
import PropTypes from 'prop-types';
import {
  RadioContainer,
  RadioInput,
  ItemContainer,
  Label,
  RadioCircle,
  CircleContainer,
} from './styles';

const RadioGroup = ({ data, value, onChange }) => {
  const handleChange = (val) => () => {
    onChange(val);
  };

  return (
    <RadioContainer>
      {data.map((params) => (
        <ItemContainer>
          <Label>{params.title}</Label>
          <CircleContainer>
            <RadioInput
              type="radio"
              name="filter"
              onChange={handleChange(params.value)}
              checked={params.value === value}
            />
            {params.value === value && <RadioCircle />}
          </CircleContainer>
        </ItemContainer>
      ))}
    </RadioContainer>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RadioGroup;
