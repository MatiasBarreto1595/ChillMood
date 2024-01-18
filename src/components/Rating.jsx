import React from "react";
import ReactStars from "react-rating-stars-component";

function Rating({ setRating }) {
  const settings = {
    size: 30,
    value: 1,
    edit: true,
    color: "black",
    onChange: (newValue) => {
      setRating(newValue * 2 - 2);
    },
  };
  return (
    <>
      <div className="mb-5">
        <h4 className="rating">Rating</h4>
        <ReactStars {...settings} />
      </div>
    </>
  );
}

export default Rating;
