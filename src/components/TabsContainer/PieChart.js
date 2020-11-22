import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Plot from "react-plotly.js";
import { autorun } from 'mobx';

//this component displays the pie chart using plotly chart library.
//the chart data is filtered based on the search
class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          values: [0, 0, 0],
          labels: ["Active Cases", "Recovered Cases", "Death"],
          type: "pie",
        },
      ],
      layout: {
        height: 400,
        width: 500,
        title: "Pie chart",
      },
    };
  }

  //autorun -> when ever something is searched, need to filter the chart also,
  //as when the fetchData variable is true it enters this component and renders.
  componentDidMount() {
    this.updateDataOfChart();
    this.autoUpdateDisposer = autorun(() => {
      if (this.props.dataStore.fetchData) {
        this.updateDataOfChart();
        this.props.dataStore.fetchData = false;
      }
    });
  }
  
  //the autorun need to be disposed.
  componentWillUnmount() {
    this.autoUpdateDisposer();
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    this.updateDataOfChart();
  }

  //this method is for calculating the percentage to be displayed
  updateDataOfChart = () => {
    var activeCount = 0;
    var recoveredCount = 0;
    var death = 0;
    var valuesArray = [];

    activeCount =
      (this.props.dataStore.activeCases /
        this.props.dataStore.totalCases) *
      100;
    valuesArray.push(Math.trunc(activeCount));
    recoveredCount =
      (this.props.dataStore.recoveredCases /
        this.props.dataStore.totalCases) *
      100;
    valuesArray.push(Math.trunc(recoveredCount));
    death =
      (this.props.dataStore.death /
        this.props.dataStore.totalCases) *
      100;
    valuesArray.push(Math.trunc(death));

    var data = [...this.state.data];
    data[0].values = valuesArray;
    this.setState({ data });

  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}
export default inject("dataStore")(observer(PieChart));
