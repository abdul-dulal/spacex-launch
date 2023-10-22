import { Link } from "react-router-dom";
import { convertDate } from "../utils/convertDate";
import PaginatedList from "./Paginatedlist";

function Pagination({ items }) {
  const page =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
  const itemsPerPage = 9;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = items.slice(startIndex, endIndex);

  return (
    <div>
      <div className="row">
        {itemsToShow.length > 0 &&
          itemsToShow.map((item, index) => (
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

      <PaginationLinks
        currentPage={page}
        itemsPerPage={itemsPerPage}
        itemCount={items.length}
      />
    </div>
  );
}

function PaginationLinks({ currentPage, itemsPerPage, itemCount }) {
  const numPages = Math.ceil(itemCount / itemsPerPage);

  return (
    <div className="d-flex justify-content-center my-3">
      {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
        <Link to={`?page=${page}`} key={page}>
          <nav aria-label="...">
            <p className="pagination text ">
              <span
                className={`page-item text ${
                  currentPage === page ? "active" : ""
                }`}
              >
                <a className="page-link" href="#">
                  {page}
                </a>
              </span>
            </p>
          </nav>
        </Link>
      ))}
    </div>
  );
}

export default Pagination;
