import { createContext, useState } from "react";
import Filter from "./components/Filter";
import Header from "./components/Header";
// eslint-disable-next-line react-refresh/only-export-components
export const launchContext = createContext();
export const loadingContext = createContext();

const App = () => {
  const [launch, setLaunch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container">
      <launchContext.Provider value={[launch, setLaunch]}>
        <loadingContext.Provider value={[isLoading, setIsLoading]}>
          <Header />
          <Filter />
        </loadingContext.Provider>
      </launchContext.Provider>
    </div>
  );
};

export default App;
//last year
// https://api.spacexdata.com/v3/launches?2023

//last month
//https://api.spacexdata.com/v2/launches?start=2017-01-01&final=2017-01-25
//last week
