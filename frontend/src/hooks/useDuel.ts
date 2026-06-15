import { useState, useEffect } from 'react';

export function useDuel() {
  const [data, setData] = useState(null);
  return { data };
}
