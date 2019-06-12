import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "./ProgressBar.css";

export default ({ total }) => {
  return (
    <CircularProgressbar
      value={total}
      text={`${total}%`}
      strokeWidth={10}
      background={false}
      className={"col-7 progress--style"}
      styles={{
        // Customize the root svg element
        root: {
          maxHeight: "100px"
        },
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          // stroke: '#ffffff',
          stroke: "var(--safeGreen)",
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "round"
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // stroke: "#4996c9",
          stroke: "#ffffff",
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "round",
          // Rotate the trail
          transform: "rotate(0.0turn)"
          // transformOrigin: 'center center',
        },
        // Customize the text
        text: {
          fill: "#ffffff",
          fontWeight: "700",
          fontSize: "3rem",
          dominantBaseline: "middle",
          textAnchor: "middle"
        },
        background: {
          fill: "#ffffff"
        }
      }}
    />
  );
  // return (
  //   <div className="col-10">
  //     <div className="progress">
  //       <div
  //         className="progress-bar progress-bar-striped bg-info"
  //         role="progressbar"
  //         style={{ width: `${total}%` }}
  //         aria-valuenow={total}
  //         aria-valuemin="0"
  //         aria-valuemax="100"
  //       >
  //         {total}%
  //       </div>
  //     </div>
  //   </div>
  // );
};
