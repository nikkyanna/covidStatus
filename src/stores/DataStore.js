import { action, computed, makeObservable, observable } from "mobx";

class DataStore {
  constructor() {
    makeObservable(this, {
      quick_search: observable,
      data: observable,
      totalCases: observable,
      activeCases: observable,
      recoveredCases: observable,
      death: observable,
      fetchData: observable,
    });
  }
  quick_search = "";
  data = [];
  totalCases = 0;
  activeCases = 0;
  recoveredCases = 0;
  death = 0;
  fetchData= false;
}
export default DataStore;
