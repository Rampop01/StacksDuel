import { useState, useEffect } from 'react';

export function useClaimRewards() {
  const [data, setData] = useState(null);
  return { data };
}
