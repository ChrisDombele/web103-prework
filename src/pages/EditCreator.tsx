import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { supabase } from "../client.ts";
import { creatorPath, parseIdFromParam } from "../utils/creatorPath";

const EditCreator = () => {
  const { idSlug } = useParams();
  const id = parseIdFromParam(idSlug);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCreator() {
      if (!id) {
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
      } else if (data) {
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL ?? "");
      }

      setLoading(false);
    }

    fetchCreator();
  }, [id]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!id) {
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("creators")
      .update({
        name,
        url,
        description,
        imageURL: imageURL || null,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      setSaving(false);
      return;
    }

    navigate(creatorPath(id, name));
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this creator?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    navigate("/");
  }

  if (loading) {
    return <p aria-busy="true">Loading creator...</p>;
  }

  return (
    <section>
      <h2>Edit Creator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          URL
          <input
            type="url"
            name="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label>
          Image URL (optional)
          <input
            type="url"
            name="imageURL"
            value={imageURL}
            onChange={(event) => setImageURL(event.target.value)}
          />
        </label>

        <footer className="edit-actions">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="secondary" onClick={handleDelete}>
            Delete Creator
          </button>
          <Link
            to={id ? creatorPath(id, name) : "/"}
            role="button"
            className="contrast"
          >
            Cancel
          </Link>
        </footer>
      </form>
    </section>
  );
};

export default EditCreator;
