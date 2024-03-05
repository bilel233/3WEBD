import { useQuery } from "react-query";
import { ChangeData, SimplifiedChangeData } from "../components/elements";

const baseEndpoint = "http://openlibrary.org/";

const fetchChangesByType = async (
  changeType: string,
  limit: number = 10
): Promise<ChangeData[]> => {
  const response = await fetch(
    `${baseEndpoint}recentchanges/${changeType}.json?limit=${limit}`
  );
  return response.json();
};

export const fetchBookById = async (bookId: string) => {
  const response = await fetch(`${baseEndpoint}books/${bookId}.json`);
  return response.json();
};

const simplifyChange = (change: ChangeData): SimplifiedChangeData => {
  const bookRef = change.changes.find((e) => e.key.startsWith("/books/"));
  if (!bookRef) {
    throw new Error("No book reference found.");
  }
  return {
    type: change.type,
    timestamp: new Date(change.timestamp).getTime(),
    bookId: bookRef.key.slice("/books/".length),
  };
};

export const useRecentChanges = (limit: number) => {
  return useQuery({
    queryKey: ["bookChanges"],
    queryFn: async () => {
      const changesByType = await Promise.all(
        ["add-cover", "edit-book", "add-book"].map((type) =>
          fetchChangesByType(type, limit)
        )
      );
      const allChanges = changesByType.flat();
      console.log(allChanges);
      const filteredChanges = allChanges.filter((change) => {
        return change.changes.find((e) => e.key.startsWith("/books/"));
      });
      const simplifiedChanges = filteredChanges.map(simplifyChange);
      const sortedChanges = simplifiedChanges.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      const recentChanges = sortedChanges.slice(0, limit);
      const changesWithBooks = recentChanges.map(async (change) => {
        return {
          ...change,
          book: await fetchBookById(change.bookId),
        };
      });
      return Promise.all(changesWithBooks);
    },
  });
};
