import { Link } from "react-router";
import type { Creator } from "../types/Creator";
import { creatorPath, editPath } from "../utils/creatorPath";

interface CardProps {
  creator: Creator;
}

const Card = ({ creator }: CardProps) => {
  const { id, name, url, description, imageURL } = creator;

  return (
    <div className="card">
      {imageURL ? (
        <img src={imageURL} alt={name} />
      ) : (
        <div className="card-fallback" aria-hidden="true" />
      )}
      <div className="card-content">
        <h2>{name}</h2>
        <p>{description}</p>
        <a className="card-link" href={url} target="_blank" rel="noreferrer">
          Visit channel
        </a>
        <Link className="card-link" to={editPath(id, name)}>
          Edit
        </Link>
        <Link className="button" to={creatorPath(id, name)}>
          Find out more
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
