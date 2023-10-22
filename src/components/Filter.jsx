import { useContext, useEffect, useState } from "react";
import "../styles/global.scss";

import { launchContext, loadingContext } from "../App";
import axios from "axios";
import SearchArea from "./SearchArea";
import Pagination from "./Pagination";
import Loading from "./Loading";

import { Route, Routes, useNavigate } from "react-router-dom";

const Filter = () => {
  const [launch, setLaunch] = useContext(launchContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [launchStatus, setLaunchStatus] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useContext(loadingContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
      setLaunch(res.data);
      setIsLoading(true);
    });
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setSelectedValue("");
    setLaunchStatus("");
    navigate("/");
    if (isChecked == true) {
      axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
        setLaunch(res.data);
        setIsLoading(true);
      });
    } else {
      axios
        .get("https://api.spacexdata.com/v3/launches/upcoming")
        .then((res) => {
          setLaunch(res.data);
          setIsLoading(true);
        });
    }
  };

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="form-check mt-5 mb-4 d-xs-none  d-sm-flex gap-2 justify-content-end order-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheckbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="exampleCheckbox">
          Show upcomming only
        </label>
      </div>
      <SearchArea
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        launchStatus={launchStatus}
        setLaunchStatus={setLaunchStatus}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />

      <Routes>
        <Route path="/" element={<Pagination items={launch} />} />
      </Routes>
    </div>
  );
};

export default Filter;
