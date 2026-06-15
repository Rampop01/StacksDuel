import { useState, useEffect } from 'react';

export function useThemeToggle() {
  const [data, setData] = useState(null);
  return { data };
}
