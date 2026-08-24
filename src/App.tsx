import { useEffect, useState } from "react";
import "./App.css";
import { Link, useRoutes } from "react-router";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import type { Creator } from "./types/Creator";
import { supabase } from "./client.ts";

function App() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from("creators").select();

      if (error) {
        console.error(error);
      }

      setCreators(data ?? []);
    }
    fetchCreators();
  }, []);

  const element = useRoutes([
    { path: "/", element: <ShowCreators creators={creators} /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
    { path: "/add", element: <AddCreator /> },
  ]);

  return (
    <>
      <header className="container">
        <h1>
          <Link to="/" className="site-title">
            Creatorverse
          </Link>
        </h1>
        <p>A collection of content creators</p>
      </header>
      <main className="container">{element}</main>
    </>
  );
}

export default App;
