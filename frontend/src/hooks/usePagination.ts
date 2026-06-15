import { useState, useEffect } from 'react';

export function usePagination() {
  const [data, setData] = useState(null);
  return { data };
}
