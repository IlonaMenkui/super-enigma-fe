import React, { useState } from 'react';
import SearchIcon from '../Icons/SearchIcon';
import moviesAPI from '../../api/movies';
import List from './List';
import { LIST_PAGE, LIST_PER_PAGE } from '../../constants';
import {
  SearchWrapper, SearchInput, IconContainer, InputContainer,
} from './styles';

const Search = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const onHandleChange = async (e) => {
    const currentValue = e.target.value;
    setValue(currentValue);
    if (!currentValue.length) {
      setData([]);
    }
    if (currentValue.trim().length > 0) {
      const { movies } = await moviesAPI.get({
        title: e.target.value,
        page: LIST_PAGE,
        perPage: LIST_PER_PAGE,
      });
      setData(movies);
    }
  };

  return (
    <SearchWrapper>
      <InputContainer>
        <SearchInput
          placeholder="Search…"
          onChange={onHandleChange}
          value={value}
        />
        <IconContainer>
          <SearchIcon />
        </IconContainer>
      </InputContainer>
      {value.length > 0 ? <List movies={data} /> : <div />}
    </SearchWrapper>
  );
};

export default Search;
