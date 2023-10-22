import { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { launchContext, loadingContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchArea = ({
  selectedValue,
  setSelectedValue,
  launchStatus,
  setLaunchStatus,
  setIsChecked,
  isChecked,
}) => {
  const [launch, setLaunch] = useContext(launchContext);
  const [searchItem, setSearchItem] = useState();
  const [isLoading, setIsLoading] = useContext(loadingContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
    fetch(`https://api.spacexdata.com/v3/launches?rocket_name=${searchItem}`)
      .then((res) => res.json())
      .then((data) => {
        setLaunch(data);
        setIsLoading(true);
      });
    setSearchItem("");
  };
  const handleLaunchStatus = (e) => {
    setLaunchStatus(e.target.value);
    setIsChecked(false);
    setSelectedValue("");
    navigate("/");
  };
  const handleLaunchDate = (e) => {
    setSelectedValue(e.target.value);
    setIsChecked(false);
    setLaunchStatus("");
    navigate("/");
  };

  //fulter by date status
  useEffect(() => {
    if (selectedValue !== "") {
      axios
        .get(`https://api.spacexdata.com/v3/launches?${selectedValue}`)
        .then((res) => {
          setLaunch(res.data);
          setIsLoading(true);
        });
    }
  }, [selectedValue]);

  // filter by launch status
  useEffect(() => {
    if (launchStatus !== "") {
      axios
        .get(
          `https://api.spacexdata.com/v3/launches?launch_success=${launchStatus}`
        )
        .then((res) => {
          setLaunch(res.data);
          setIsLoading(true);
        });
    }
  }, [launchStatus]);
  return (
    <div>
      <div className="d-lg-flex d-sm-flex  justify-content-between mb-5 w-100 ">
        <div>
          <form onClick={handleSearch}>
            <div className="d-flex">
              <input
                type="text"
                className="form"
                placeholder="Search..."
                aria-describedby="basic-addon2"
                required
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />

              <button
                id="basic-addon2"
                style={{ height: "38px", padding: "3px" }}
                className="bg-primary border-primary"
                type="submit"
              >
                <BsSearch style={{ color: "white" }} />
              </button>
            </div>
          </form>
        </div>
        <div className="d-lg-flex d-sm-flex  gap-3">
          <div className="select">
            <select
              className="form-select rounded-1 select"
              aria-label="Default select example"
              value={launchStatus}
              onChange={handleLaunchStatus}
            >
              <option selected className="d-none date">
                By Launch Status
              </option>
              <option value="false">Failure</option>
              <option value="true">Success</option>
            </select>
          </div>
          <div className="select">
            <select
              className="form-select  "
              value={selectedValue}
              onChange={handleLaunchDate}
            >
              <option selected className="d-none date">
                By Launch Date
              </option>
              <option value="start=2021-08-022&final=2021-08-30">
                Last Week
              </option>
              <option value="start=2020-08-01&final=2020-08-30">
                Last Month
              </option>
              <option value="launch_year=2020">Last Year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
