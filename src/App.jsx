import Filter from "./components/Filter";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Filter />
    </div>
  );
};

export default App;
//last year
// https://api.spacexdata.com/v3/launches?2023

//last month
//https://api.spacexdata.com/v2/launches?start=2017-01-01&final=2017-01-25
//last week
