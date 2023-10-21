import { useContext, useEffect, useState } from "react";
import "../styles/global.scss";
import { convertDate } from "../utils/convertDate";
import { launchContext } from "../App";
import axios from "axios";
import SearchArea from "./SearchArea";

const Filter = () => {
  const [launch, setLaunch] = useContext(launchContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [launchStatus, setLaunchStatus] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
      setLaunch(res.data);
    });
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setSelectedValue("");
    setLaunchStatus("");
    if (isChecked == true) {
      axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
        setLaunch(res.data);
      });
    } else {
      axios
        .get("https://api.spacexdata.com/v3/launches/upcoming")
        .then((res) => {
          setLaunch(res.data);
        });
    }
  };

  return (
    <div>
      <div className="form-check margin-auto">
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
      <div className="row">
        {launch.length > 0 &&
          launch.map((item, index) => (
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
                    <h6 className="lunch">Lunch Status :</h6>
                    <span className="mt-3">
                      {item?.launch_success ? (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                        >
                          Success
                        </button>
                      ) : (
                        <button type="button" className="btn btn-danger btn-sm">
                          Failded
                        </button>
                      )}
                    </span>
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
