import { useState } from "react";
import TileCountrieDetail from "./TileCountrieDetail";

const TileCountrie = ({ countrie }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div>
      <p key={countrie.id}>
        {countrie.name.common}
        <button onClick={handleShowDetail}>{!showDetail ? "show": "hide"}</button>
      </p>
      {showDetail?<TileCountrieDetail countrie={countrie} />:null}
    </div>
  );
};

export default TileCountrie;
