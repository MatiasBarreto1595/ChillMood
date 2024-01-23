import React from "react";

const TruncateText = ({ text, wordLimit, className }) => {
  const words = text.split(" ");

  if (words.length <= wordLimit) {
    return <p>{text}</p>;
  }

  const truncatedText = words.slice(0, wordLimit).join(" ");
  return <p className={className}>{truncatedText}...</p>;
};

export default TruncateText;
