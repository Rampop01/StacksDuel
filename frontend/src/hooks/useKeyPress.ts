import { useState, useEffect } from 'react';

export function useKeyPress() {
  const [data, setData] = useState(null);
  return { data };
}
