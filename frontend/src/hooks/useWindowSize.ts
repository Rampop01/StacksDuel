import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [data, setData] = useState(null);
  return { data };
}
