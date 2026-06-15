import { useState, useEffect } from 'react';

export function useOnClickOutside() {
  const [data, setData] = useState(null);
  return { data };
}
