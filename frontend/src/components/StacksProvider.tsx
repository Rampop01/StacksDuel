'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { connect, disconnect, isConnected, getLocalStorage } from '@stacks/connect';

interface StacksContextType {
  userData: any;
  authenticate: () => void;
  logout: () => void;
  connected: boolean;
}

const StacksContext = createContext<StacksContextType | undefined>(undefined);

export function StacksProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<any>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if user is already connected from a previous session
    if (isConnected()) {
      setConnected(true);
      try {
        const stored: any = getLocalStorage();
        if (stored && stored.addresses) {
          const stxAddrs = Array.isArray(stored.addresses) ? stored.addresses : (stored.addresses.stx || []);
          setUserData({
            profile: {
              stxAddress: {
                mainnet: stxAddrs.find((a: any) => ['mainnet', 'mainnet', undefined].includes(a.network))?.address || stxAddrs[0]?.address || '',
                testnet: stxAddrs.find((a: any) => a.network === 'testnet')?.address || '',
              }
            }
          });
        }
      } catch (e) {
        console.error('Error loading stored data:', e);
      }
    }
  }, []);

  const authenticate = async () => {
    try {
      const response = await connect({
        forceWalletSelect: true,
      });
      
      if (response && response.addresses) {
        setConnected(true);
        const mainnetAddr = response.addresses.find((a: any) => a.network === 'mainnet')?.address || '';
        const testnetAddr = response.addresses.find((a: any) => a.network === 'testnet')?.address || '';
        setUserData({
          profile: {
            stxAddress: {
              mainnet: mainnetAddr,
              testnet: testnetAddr,
            }
          }
        });
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleLogout = () => {
    disconnect();
    setUserData(null);
    setConnected(false);
  };

  return (
    <StacksContext.Provider value={{ userData, authenticate, logout: handleLogout, connected }}>
      {children}
    </StacksContext.Provider>
  );
}

export function useStacks() {
  const context = useContext(StacksContext);
  if (context === undefined) {
    throw new Error('useStacks must be used within a StacksProvider');
  }
  return context;
}
