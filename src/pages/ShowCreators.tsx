import { useEffect, useState } from "react";
import Card from "../components/Card";
import type { Creator } from "../types/Creator";
import { supabase } from "../client.ts";
import { Link } from "react-router";

interface ShowCreatorsProps {
  creators: Creator[];
}

const ShowCreators = ({
  creators: initialCreators = [],
}: ShowCreatorsProps) => {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from("creators").select();

      if (error) {
        console.error(error);
        setCreators([]);
      } else {
        setCreators(data ?? []);
      }

      setLoading(false);
    }
    fetchCreators();
  }, []);

  if (loading) {
    return <p aria-busy="true">Loading creators...</p>;
  }

  return (
    <section>
      <Link to="/add" role="button">
        Add Creator
      </Link>

      {creators.length === 0 ? (
        <p>No content creators yet. Add one to get started!</p>
      ) : (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ShowCreators;
