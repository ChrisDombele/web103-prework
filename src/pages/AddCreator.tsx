import React, { useState } from "react";
import { supabase } from "../client.ts";
import { Link, useNavigate } from "react-router";

const AddCreator = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const { error } = await supabase.from("creators").insert({
      name,
      url,
      description,
      imageURL: imageURL || null,
    });

    if (error) {
      console.error(error);
      setSaving(false);
      return;
    }

    navigate("/");
  }

  return (
    <section>
      <h2>Add a Creator</h2>
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

        <footer>
          <button type="submit" disabled={saving}>
            {saving ? "Adding..." : "Add Creator"}
          </button>
          <Link to="/" role="button" className="secondary">
            Cancel
          </Link>
        </footer>
      </form>
    </section>
  );
};

export default AddCreator;
