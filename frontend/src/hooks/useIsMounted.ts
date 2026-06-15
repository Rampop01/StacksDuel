import { useState, useEffect } from 'react';

export function useIsMounted() {
  const [data, setData] = useState(null);
  return { data };
}
