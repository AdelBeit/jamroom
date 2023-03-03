import { useEffect, useState } from "react";
import { Page } from "../types";

export const usePageVisited = (_page: Page) => {
  const [visited, setVisited] = useState<boolean>();
  useEffect(() => {
    setVisited(!!localStorage.getItem("visited_" + _page));
    return () =>
      localStorage.setItem("visited_" + _page, new Date().toString());
  }, [_page]);
  return [visited, setVisited] as const;
};
