import './TabsContainer.css'

import React,{Component} from 'react'

import MapView from './MapView'
import PieChart from './PieChart'
import {Tabs} from 'antd'

//this component loads the two components chart and map
const { TabPane } = Tabs;
class TabsContainer extends Component {
  render() {
    return (
      <>
        <Tabs className="tabContainer">
          <TabPane tab="Charts" key="1">
           <PieChart />
          </TabPane>
          <TabPane tab="MapView" key="2">
          <MapView/>
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default TabsContainer;