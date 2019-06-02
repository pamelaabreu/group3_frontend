import React from "react";

export default ({ total }) => {
  return (
    <div className="col-10">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped bg-info"
          role="progressbar"
          style={{ width: `${total}%` }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {total}%
        </div>
      </div>
    </div>
  );
};
