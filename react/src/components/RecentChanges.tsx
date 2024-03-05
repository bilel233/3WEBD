import { useEffect, useState } from "react";
import "../styles/RecentChanges.css";

interface RecentChange {
  title: string;
  author_name?: string[];
  timestamp: string;
}

const RecentChanges = () => {
  const [recentChanges, setRecentChanges] = useState<RecentChange[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Ajout d'un état pour le chargement
  const [error, setError] = useState<string | null>(null); // Ajout d'un état pour gérer les erreurs

  useEffect(() => {
    const fetchRecentChanges = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/recentchanges.json?limit=10`
        );
        const data = await response.json();
        console.log(data);

        if (data && Array.isArray(data)) {
          setRecentChanges(
            data.map((change) => ({
              title: change.title,
              author_name: change.author_name,
              timestamp: change.timestamp,
            }))
          );
        } else {
          setError(
            "La structure de la réponse de l'API ne correspond pas aux attentes."
          );
        }
      } catch (err) {
        setError(
          "Une erreur est survenue lors de la récupération des données."
        );
      }
      setIsLoading(false);
    };

    fetchRecentChanges();
  }, []);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <h2>Modifications Récentes</h2>
      <ul>
        {recentChanges.map((change, index) => (
          <li key={index}>{change.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChanges;
