import React from "react";

function LineupMenu(props) {
  //getting all the band genres
  let genreArray;
  genreArray = props.bandsPlaying.map((band) => {
    return band.genre;
  });
  //making sure there are no duplicates - only unique values
  let genreNoDuplicates = [...new Set(genreArray)];
  return (
    <div className="lineup-menu">
      <h2>Lineup</h2>
      <div className="lineup-menu-actions">
        <label htmlFor="filter">Genre</label>
        <select name="filter" id="filter" onChange={props.filterChanged}>
          <option value="all" defaultValue>
            All
          </option>
          {genreNoDuplicates.map((genre) => {
            return (
              <option value={genre} key={genre}>
                {genre}
              </option>
            );
          })}
        </select>
        <label htmlFor="sort">Order</label>
        <select name="sort" id="sort" onChange={props.sortingChanged}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default LineupMenu;
