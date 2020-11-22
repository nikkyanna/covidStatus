import "./CardContainer.css";

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Card } from "antd";
import { autorun } from "mobx";
import { splitNumberWithCommas } from "../../utilis/general";

class CardContainer extends Component {
  state = {
    containerBoxes: [
      {
        id: 1,
        name: "Total Cases",
        data: splitNumberWithCommas(this.props.dataStore.totalCases),
      },
      {
        id: 2,
        name: "Active Cases",
        data: splitNumberWithCommas(this.props.dataStore.activeCases),
      },

      {
        id: 3,
        name: "Recovered Cases",
        data: splitNumberWithCommas(this.props.dataStore.recoveredCases),
      },
      {
        id: 4,
        name: "Death",
        data: splitNumberWithCommas(this.props.dataStore.death),
      },
    ],
  };

  getContainerBoxes = () => {
    const { containerBoxes } = this.state;
    return containerBoxes.map((box) => (
      <Card className="item" id={box.id}>
        <p className="title">{box.name}</p>
        <p className="content">{box.data}</p>
      </Card>
    ));
  };

  componentDidMount() {
    this.autoUpdateDisposer = autorun(() => {
      if (this.props.dataStore.fetchData) {
        var containerBoxes = [...this.state.containerBoxes];
        containerBoxes[0].data = splitNumberWithCommas(
          this.props.dataStore.totalCases
        );
        containerBoxes[1].data = splitNumberWithCommas(
          this.props.dataStore.activeCases
        );
        containerBoxes[2].data = splitNumberWithCommas(
          this.props.dataStore.recoveredCases
        );
        containerBoxes[3].data = splitNumberWithCommas(
          this.props.dataStore.death
        );
        this.setState({ containerBoxes });

        this.props.dataStore.fetchData = false;
      }
    });
  }

  componentWillUnmount() {
    this.autoUpdateDisposer();
  }

  render() {
    return (
      <div className="cardContainer">
        <div className="cardBoxes">{this.getContainerBoxes()}</div>
      </div>
    );
  }
}

export default inject("dataStore")(observer(CardContainer));
