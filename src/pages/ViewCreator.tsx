import { useEffect, useState } from "react";
import { supabase } from "../client.ts";
import type { Creator } from "../types/Creator";
import { Link, useParams } from "react-router";
import { editPath, parseIdFromParam } from "../utils/creatorPath";

const ViewCreator = () => {
  const { idSlug } = useParams();
  const id = parseIdFromParam(idSlug);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreator() {
      if (!id) {
        setCreator(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setCreator(null);
      } else {
        setCreator(data);
      }

      setLoading(false);
    }

    fetchCreator();
  }, [id]);

  if (loading) {
    return <p aria-busy="true">Loading creator...</p>;
  }

  if (!creator) {
    return (
      <section>
        <p>Creator not found.</p>
        <Link to="/">Back to home</Link>
      </section>
    );
  }

  return (
    <article>
      <div className="grid creator-hero">
        {creator.imageURL ? (
          <img
            className="creator-photo"
            src={creator.imageURL}
            alt={creator.name}
          />
        ) : (
          <div className="creator-photo creator-photo-empty" />
        )}
        <div className="creator-info">
          <h2>{creator.name}</h2>
          <p>{creator.description}</p>
          <div className="creator-actions">
            <Link
              to={editPath(creator.id, creator.name)}
              role="button"
              className="secondary"
            >
              Edit
            </Link>
            <a
              href={creator.url}
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              Visit channel
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ViewCreator;
