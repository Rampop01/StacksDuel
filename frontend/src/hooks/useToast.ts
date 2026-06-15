import { useState, useEffect } from 'react';

export function useToast() {
  const [data, setData] = useState(null);
  return { data };
}
