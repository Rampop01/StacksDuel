import { useState, useEffect } from 'react';

export function usePrevious() {
  const [data, setData] = useState(null);
  return { data };
}
