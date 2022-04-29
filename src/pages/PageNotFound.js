import { Link } from "react-router-dom";
import noVideo from "toolkit/assets/search.svg";

export const PageNotFound = () => {
  return (
    <div className="full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
      <div className="grid-ctr m-v-5">
        <img className="w-60p no-video" src={noVideo} alt="no video" />
        <p className="m-t-3">No page found!</p>
        <p className="m-t-3">
          Go back to <Link to="/" className="colored-text">Home</Link>
        </p>
      </div>
    </div>
  );
};
