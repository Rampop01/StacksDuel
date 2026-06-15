import { useState, useEffect } from 'react';

export function useMediaQuery() {
  const [data, setData] = useState(null);
  return { data };
}
