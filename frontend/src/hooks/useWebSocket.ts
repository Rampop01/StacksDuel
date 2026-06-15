import { useState, useEffect } from 'react';

export function useWebSocket() {
  const [data, setData] = useState(null);
  return { data };
}
