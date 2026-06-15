import { useState, useEffect } from 'react';

export function useOracleAdmin() {
  const [data, setData] = useState(null);
  return { data };
}
