import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config'


const Home = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows')

    const isShowSearch = searchOption === 'shows';
  
    const onSearch = () => {
      apiGet(`/search/${searchOption}?q=${input}`).then(result => {
        setResults(result);
      });
    };
  
    const onInputChange = ev => {
      setInput(ev.target.value);
    };
  
    const onKeyDown = ev => {
      if (ev.keyCode === 13) {
        onSearch();
      }
    };

    const onRadioChange = ev => {
        setSearchOption(ev.target.value);
        // console.log(setSearchOption);
    }
  
    const renderResults = () => {
      if (results && results.length === 0) {
        return <div>No results</div>;
      }
  
      if (results && results.length > 0) {
        return (
          results[0].show ? results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          )) : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ))
        );
      }
  
      return null;
    };
  
    return (
      <MainPageLayout>
        <input
          type="text"
          placeholder="search for something"
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          value={input}
        />

        <div>
            <label htmlFor="show-search">
                Show
                <input type="radio" id ="show-search" value="shows" onChange={onRadioChange} checked={isShowSearch}/>
            </label>
            <label htmlFor="people-search">
                People
                <input type="radio" id ="people-search" value="people" onChange={onRadioChange}  checked={!isShowSearch} />
            </label>
        </div>

        <button type="button" onClick={onSearch}>
          Search
        </button>
        {renderResults()}
      </MainPageLayout>
    );
  };
  
  export default Home;