import { useState, useEffect } from 'react';

export function useVotes() {
  const [data, setData] = useState(null);
  return { data };
}
