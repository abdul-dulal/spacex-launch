import { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { launchContext } from "../App";
import axios from "axios";

const SearchArea = ({
  selectedValue,
  setSelectedValue,
  launchStatus,
  setLaunchStatus,
}) => {
  const [launch, setLaunch] = useContext(launchContext);

  const [searchItem, setSearchItem] = useState();
  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`https://api.spacexdata.com/v3/launches?rocket_id=${searchItem}`)
      .then((res) => res.json())
      .then((data) => {
        setLaunch(data.slice(0, 20));
      });
    setSearchItem("");
  };
  const handleLaunchStatus = (e) => {
    setLaunchStatus(e.target.value);
    setSelectedValue("");
  };
  const handleLaunchDate = (e) => {
    setSelectedValue(e.target.value);
    setLaunchStatus("");
  };

  //fulter by date status
  useEffect(() => {
    if (selectedValue !== "") {
      axios
        .get(`https://api.spacexdata.com/v3/launches?${selectedValue}`)
        .then((res) => setLaunch(res.data));
    }
  }, [selectedValue]);

  // filter by launch status
  useEffect(() => {
    if (launchStatus !== "") {
      axios
        .get(
          `https://api.spacexdata.com/v3/launches?launch_success=${launchStatus}`
        )
        .then((res) => setLaunch(res.data));
    }
  }, [launchStatus]);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={searchItem}
                onChange={(e) =>
                  setSearchItem(e.target.value.toLocaleLowerCase())
                }
              />
              <div className="input-group-append ">
                <span className="input-group-text" id="basic-addon2">
                  <button type="submit" onClick={handleSearch}>
                    <BsSearch />
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex gap-5">
          <div className="" style={{ width: "256px" }}>
            <select
              className="form-select rounded-1 "
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
          <div
            className=""
            style={{
              width: "256px",
              height: "38px",
              border: "2px solid #9747ff",
            }}
          >
            <select
              className="form-select w-100 h-100 rounded-1 "
              value={selectedValue}
              onChange={handleLaunchDate}
            >
              <option selected className="d-none date">
                By Launch Date
              </option>
              <option value="1">Last Week</option>
              <option value="start=2017-01-01&final=2017-01-25">
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
