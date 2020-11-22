import "./QuickSearch.css";

import React, { Component } from "react";
import { inject, observer } from 'mobx-react'

import { Input } from "antd";

const { Search } = Input;
class QuickSearch extends Component {

  onSearch = (value) =>{
    this.props.search(value);
    this.props.dataStore.fetchData = true;
    // this.props.dataStore.quick_search= value
    // console.log('ddddddddddddddd',value,this.props.dataStore.quick_search)
  }

  onChange = (e) =>{
    this.props.search(e.target.value);
    this.props.dataStore.fetchData = true;
    // this.props.dataStore.quick_search= e.target.value
  }

  render() {
    return (
      <div className="quickSearchContainer">
        <Search
          className="quickSearch"
          placeholder="input search text"
          enterButton
          onSearch={this.onSearch}
          onChange={this.onChange}
        />
        {/* {this.props.dataStore.quick_search !== '' &&(
        <div>Clear Filter</div>
        )
    } */}
      </div>
    );
  }
}

export default inject('dataStore')(observer(QuickSearch));
