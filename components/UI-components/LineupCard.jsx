import React from "react";

function LineupCard(props) {
  return (
    <article className="lineup-card">
      <div className="lineup-card-titles">
        <h3>{props.bandName}</h3>
        <h4>Day {props.day + 1}</h4>
      </div>
      <h5>{props.genre}</h5>
      <p>{props.description}</p>
    </article>
  );
}

export default LineupCard;
