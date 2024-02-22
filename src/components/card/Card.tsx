import "./CardStyle.css";

import { charData } from "../../customTypes";

type cardProps = {
  children: charData;
};

function Card({ children }: cardProps) {
  return (
    <div className="card">
      <img src={children?.image.toString()} alt="Picture" loading="lazy" />
      <div className="charBox">
        <table className="infoTable">
          <thead>
            <tr>
              <td colSpan={2}>
                {" "}
                <h1>{children?.name} </h1>
              </td>
            </tr>
          </thead>
          <tr>
            <td>Species:</td>
            <td>{children?.species}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{children?.gender}</td>
          </tr>
          <tr>
            <td>Origin:</td>
            <td> {children?.origin}</td>
          </tr>
          <tr>
            <td>Current location:</td>
            <td>{children?.location}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Card;
