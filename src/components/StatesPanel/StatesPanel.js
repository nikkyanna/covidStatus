import "./StatesPanel.css";

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Collapse } from "antd";
import { splitNumberWithCommas } from "../../utilis/general";

const { Panel } = Collapse;

class StatesPanel extends Component {
  render() {
    const items = this.props.dataStore.data.map((data) => {
      return (
        <Collapse>
          <Panel header={data.State}>
            <div className="titleHeading">
              Total Cases: <span className="count">{splitNumberWithCommas(data.Confirmed)}</span>
            </div>
            <div className="titleHeading">
              Active Cases: <span className="count">{splitNumberWithCommas(data.Active)}</span>
            </div>
            <div className="titleHeading">
              Recovered Cases:{" "}
              <span className="count">{splitNumberWithCommas(data.Recovered)}</span>
            </div>
            <div className="titleHeading">
              Death:<span className="count"> {splitNumberWithCommas(data.Death)}</span>
            </div>
          </Panel>
        </Collapse>
      );
    });

    return (
      <div className="statesPanelContainer">
        <div className="statesPanelHeader">Indian States & UT's</div>
        <div>{items}</div>
      </div>
    );
  }
}

export default inject("dataStore")(observer(StatesPanel));
