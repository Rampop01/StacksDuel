import { useState, useEffect } from 'react';

export function useHover() {
  const [data, setData] = useState(null);
  return { data };
}
