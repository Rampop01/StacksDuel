import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [data, setData] = useState(null);
  return { data };
}
