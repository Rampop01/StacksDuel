import { useState, useEffect } from 'react';

export function useAuth() {
  const [data, setData] = useState(null);
  return { data };
}
