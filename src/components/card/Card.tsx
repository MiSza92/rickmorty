import "./CardStyle.css";

import { charData } from "../../customTypes";

type cardProps = {
  children: charData;
};

function Card({ children }: cardProps) {
  return (
    <div className="card">
      <img src={children?.image.toString()} alt="Picture" />
      <div className="charBox">
        <h1>{children?.name} </h1>
        <div className="cardTextContainer">
          <div>
            <p>Species:</p> <p> {children?.species}</p>
          </div>
          <hr />
          <div>
            <p>Gender:</p> <p> {children?.gender}</p>
          </div>
          <hr />
          <div>
            <p>Origin:</p> <p> {children?.origin}</p>
          </div>
          <hr />
          <div>
            <p>Current location:</p> <p> {children?.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
