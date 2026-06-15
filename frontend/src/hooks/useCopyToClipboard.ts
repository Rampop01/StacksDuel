import { useState, useEffect } from 'react';

export function useCopyToClipboard() {
  const [data, setData] = useState(null);
  return { data };
}
