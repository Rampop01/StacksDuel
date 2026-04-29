'use client';

import { useEffect, useState } from 'react';
import { useStacks } from '@/components/StacksProvider';
import { fetchLastDuelId, fetchDuelDetails } from '@/lib/stacks';

export function useUserStats() {
  const { userData, connected } = useStacks();
  const [stats, setStats] = useState({
    level: 1,
    victories: 0,
    totalBattles: 0,
    progress: 0,
    rank: 'Recruit',
    loading: true
  });

  useEffect(() => {
    async function calculateStats() {
      if (!userData || !connected) {
        setStats(prev => ({ ...prev, loading: false }));
        return;
      }

      const userAddress = userData.profile?.stxAddress?.mainnet || userData.profile?.stxAddress?.testnet;
      if (!userAddress) return;

      try {
        const latestId = await fetchLastDuelId();
        const scanLimit = Math.min(latestId, 30);
        const startId = Math.max(1, latestId - scanLimit + 1);
        
        let forges = 0;
        let wins = 0;
        
        for (let i = latestId; i >= startId; i--) {
          const duel = await fetchDuelDetails(i);
          if (duel && duel.creator === userAddress) {
            forges++;
            if (!duel.active && duel.winner !== null) {
              wins++;
            }
          }
        }

        // Gamification Logic
        const totalActivity = forges + (wins * 2);
        const level = Math.max(1, Math.floor(Math.sqrt(totalActivity * 2)) + 1);
        const progress = Math.min(100, Math.floor(((totalActivity % 5) / 5) * 100));
        
        const ranks = ['Recruit', 'Squire', 'Duelist', 'Commander', 'Elite', 'Legend', 'Grandmaster'];
        const rankIndex = Math.min(ranks.length - 1, Math.floor(level / 2));

        setStats({
          level,
          victories: wins,
          totalBattles: forges,
          progress,
          rank: ranks[rankIndex],
          loading: false
        });
      } catch (err) {
        console.error('Error calculating user stats:', err);
        setStats(prev => ({ ...prev, loading: false }));
      }
    }

    calculateStats();
  }, [userData, connected]);

  return stats;
}
