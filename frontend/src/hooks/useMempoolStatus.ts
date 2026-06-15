import { useState, useEffect } from 'react';

export function useMempoolStatus() {
  const [data, setData] = useState(null);
  return { data };
}
