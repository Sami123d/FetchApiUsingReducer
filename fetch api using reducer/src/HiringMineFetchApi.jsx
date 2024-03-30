import { useReducer, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file for styling

const initialState = {
  jobs: [],
  categories: [],
  error: null,
};

const reducer = (state, action) => {
  if (action.type === "jobs") {
    return { ...state, jobs: action.payload };
  } else if (action.type === "categories") {
    return { ...state, categories: action.payload };
  } else {
    return {
      ...state,
      error: "Error occurred",
    };
  }
};

const HiringMineFetchApi = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCategory = async () => {
    const response = await axios.get(
      "https://backend-prod.app.hiringmine.com/api/categories/all"
    );
    dispatch({ type: "categories", payload: response.data.data });
  };

  const getJob = async () => {
    const response = await axios.get(
      "https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&keyWord=&category="
    );
    dispatch({ type: "jobs", payload: response.data.data });
  };

  useEffect(() => {
    getCategory();
    getJob();
  }, []);

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <img
            src="https://hiringmine.com/assets/Hiring%20Mine%20Logo-453a72d3.png"
            alt="Hiring Mine Logo"
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#jobs">Jobs</a>
          </li>
          <li>
            <a href="#categories">Categories</a>
          </li>
        </ul>
      </div>

      <div className="category-section">
        <h1 style={{textAlign: "center"}}>Categories</h1>
        <div className="card-container">
          {state.categories?.slice(0, 6).map((category, index) => (
            <div className="category-card" key={index}>
              <h3>{category.name}</h3>
              <p>{category.postCounts} Posts</p>
            </div>
          ))}
        </div>
      </div>

      <div className="job-section">
        <h1  style={{textAlign: "center"}}>Jobs</h1>
        <div className="card-container">
          {state.jobs?.map((job, index) => (
            <div className="job-card" key={index}>
              <h3>{job.companyName || "Anonymous"}</h3>
              <h2>{job.designation || "Anonymous"}</h2>
              
              <p>
                {job.payRangeStart || "No Salary Mentioned"} {job.payRangeEnd}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiringMineFetchApi;
