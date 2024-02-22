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
          <div>
            <p>Gender:</p> <p> {children?.gender}</p>
          </div>
          <div>
            <p>Origin:</p> <p> {children?.origin}</p>
          </div>
          <div>
            <p>Current location:</p> <p> {children?.location}</p>
          </div>
          {/* <tr>
              <td>
                <p>In episode:</p>
              </td>
              <td>
                <p>{episoden}</p>
              </td>
            </tr> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
