import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "./styles/global.scss";
const Filter = () => {
  const [meal, setMeal] = useState([]);
  const [data, setData] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/launches")
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.slice(0, 20));
      });
  }, []);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const convertDate = (date) => {
    const utcDate = new Date(date);
    const localDate = utcDate.toLocaleString(undefined, options);
    return localDate;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setData("");
  };
  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches?${selectedValue}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.slice(0, 20));
      });
  }, [selectedValue]);
  return (
    <div>
      <div className="form-check margin-auto">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheckbox"
        />
        <label className="form-check-label" htmlFor="exampleCheckbox">
          Show upcomming only
        </label>
      </div>
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
                value={data}
                onChange={(e) => setData(e.target.value)}
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
            >
              <option selected>By Lunch Status</option>
              <option value="1">Failure</option>
              <option value="2">Success</option>
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
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option selected className="d-none date">
                By Lunch Date
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
      <div className="row">
        {meal.length > 0 &&
          meal.map((item, index) => (
            <div key={index} className="col-md-4 rounded-3">
              <div className="card mb-3">
                <img
                  className="m-auto mt-5 mb-5"
                  src={item.links.mission_patch}
                  style={{ width: "124px", height: "124px" }}
                  alt="..."
                ></img>
                <div className="card-body text-center">
                  <p className="date">
                    Launch Date:{convertDate(item.launch_date_utc)}
                  </p>
                  <h5 className="card-title title">{item.mission_name}</h5>
                  <p className="falcon">{item.rocket.rocket_id}</p>
                  <div className="mt-4 mb-4">
                    <h6 className="lunch">Lunch Status</h6>
                    <span>{}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
