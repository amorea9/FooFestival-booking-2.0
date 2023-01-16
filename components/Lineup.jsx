import React from "react";
import LineupMenu from "./UI-components/LineupMenu";
import LineupCard from "./UI-components/LineupCard";
import { useState } from "react";

function Lineup(props) {
  const [filter, setFilter] = useState({
    genre: "all",
    sort: "asc",
    sortBy: "name",
  });
  const filterChanged = (e) => {
    setFilter({ ...filter, genre: e.target.value });
  };

  const sortingChanged = (e) => {
    setFilter({ ...filter, sort: e.target.value });
  };
  let dir;
  let filteredList = props.bandsPlaying;
  //if genre is not all
  if (filter.genre != "all") {
    filteredList = props.bandsPlaying.filter((band) => band.genre === filter.genre);
    sortBands();
  }
  //if genre is all
  if (filter.genre === "all") {
    filteredList = props.bandsPlaying;
    sortBands();
  }
  //sort bands according to name
  function sortBands() {
    //determing sorting direction
    if (filter.sort === "asc") {
      dir = 1;
    } else {
      dir = -1;
    }
    filteredList = filteredList.sort((a, b) => {
      if (a[filter.sortBy] > b[filter.sortBy]) {
        return 1 * dir;
      } else {
        return -1 * dir;
      }
    });
  }
  return (
    <section className="lineup">
      <LineupMenu bandsPlaying={props.bandsPlaying} filterChanged={filterChanged} sortingChanged={sortingChanged} />
      <section className="lineup-list">
        <div className="lineup-showing">
          <h4>Bands</h4>
          <h5>Showing {filter.genre}</h5>
        </div>
        {filteredList.map((band, i) => {
          return <LineupCard key={i} day={i} bandName={band.name} genre={band.genre} description={band.bio} />;
        })}
      </section>
    </section>
  );
}

export default Lineup;
