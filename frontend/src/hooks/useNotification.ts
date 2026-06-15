import { useState, useEffect } from 'react';

export function useNotification() {
  const [data, setData] = useState(null);
  return { data };
}
