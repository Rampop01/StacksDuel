import { useState, useEffect } from 'react';

export function useStxPrice() {
  const [data, setData] = useState(null);
  return { data };
}
