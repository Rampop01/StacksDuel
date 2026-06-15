import { useState, useEffect } from 'react';

export function useDuelFilters() {
  const [data, setData] = useState(null);
  return { data };
}
