import { useState, useEffect } from 'react';

export function useTransactionStatus() {
  const [data, setData] = useState(null);
  return { data };
}
