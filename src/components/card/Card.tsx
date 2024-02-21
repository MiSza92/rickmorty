import "./CardStyle.css";

type cardProps = {
  name: String;
  image: String;
  gender: String;
  location: String;
  origin: String;
  species: String;
};

function Card({ name, image, gender, location, origin, species }: cardProps) {
  console.log("Props in Card:", {
    name,
    image,
    gender,
    location,
    origin,
    species,
  });
  return (
    <div className="card">
      <img src={image?.toString()} alt="Picture" />
      <div className="charBox">
        <h1>{name} </h1>
        <table>
          <tbody>
            <tr>
              <td>
                <p>Species:</p>
              </td>
              <td>
                <p>{species}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Gender:</p>
              </td>
              <td>
                <p>{gender}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Origin:</p>
              </td>
              <td>
                <p>{origin}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Current location:</p>
              </td>
              <td>
                <p>{location}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Card;
