import React from 'react';
import { Shield } from 'lucide-react';
import styles from './SelfClawBadge.module.css';

interface SelfClawBadgeProps {
  level?: string;
  size?: 'sm' | 'md';
}

const SelfClawBadge: React.FC<SelfClawBadgeProps> = ({ level = 'Verified', size = 'md' }) => {
  return (
    <div className={`${styles.badge} ${styles[size]}`}>
      <Shield size={size === 'sm' ? 10 : 12} className={styles.icon} />
      <span>{level.toUpperCase()}</span>
    </div>
  );
};

export default SelfClawBadge;
