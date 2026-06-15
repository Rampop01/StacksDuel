import { useState, useEffect } from 'react';

export function useWalletBalance() {
  const [data, setData] = useState(null);
  return { data };
}
