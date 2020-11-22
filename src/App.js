import "./App.css";

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import CardContainer from "./components/CardContainer/CardContainer";
import Header from "./components/Header/Header";
import QuickSearch from "./components/QuickSearch/QuickSearch";
import StatesPanel from "./components/StatesPanel/StatesPanel";
import TabsContainer from "./components/TabsContainer/TabsContainer";
import data from "./components/data/data.json";

class App extends Component {
  state = {
    orangeIcon: {
      lat: 35.77279,
      lng: -78.652305,
    },
    zoom: 13,
  };

  componentDidMount() {
    this.renderListData();
  }

  renderListData = () => {
    var dataToDsiplay = [];
    var totalCases = 0;
    var activeCases = 0;
    var recoveredCases = 0;
    var death = 0;
    data
      .filter((data) => {
        if (this.props.dataStore.quick_search == null) return data;
        else if (
          data.State.toLowerCase().includes(
            this.props.dataStore.quick_search.toLowerCase()
          )
        ) {
          return data;
        }
      })
      .map((data) => {
        dataToDsiplay.push(data);
        totalCases = totalCases + data.Confirmed;
        activeCases = activeCases + data.Active;
        recoveredCases = recoveredCases + data.Recovered;
        death = death + data.Death;
      });

    this.props.dataStore.data = dataToDsiplay;
    this.props.dataStore.totalCases = totalCases;
    this.props.dataStore.activeCases = activeCases;
    this.props.dataStore.recoveredCases = recoveredCases;
    this.props.dataStore.death = death;
    this.props.dataStore.fetchData = true;
  };

  onSearch = (value) => {
    this.props.dataStore.quick_search = value;
    this.renderListData();
    
  };

  render() {
    return (
      <div>
        <Header />
        <div className="appContainer">
          <StatesPanel />
          <div className="rightContainer">
            <QuickSearch search={this.onSearch} />
            <CardContainer />
            <TabsContainer data={this.props.dataStore.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default inject("dataStore")(observer(App));
