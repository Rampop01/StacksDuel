import { useState, useEffect } from 'react';

export function useSession() {
  const [data, setData] = useState(null);
  return { data };
}
