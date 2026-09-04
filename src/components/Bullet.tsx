import styles from './Bullet.module.scss';

interface BulletProps {
  readonly size?: 'small' | 'medium' | 'large';
}

export function Bullet({ size = 'medium' }: BulletProps) {
  return (
    <span className={`${styles.bullet} ${styles[size]}`} aria-hidden="true">
      ✓
    </span>
  );
};
