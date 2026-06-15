import { useState, useEffect } from 'react';

export function useAnalytics() {
  const [data, setData] = useState(null);
  return { data };
}
