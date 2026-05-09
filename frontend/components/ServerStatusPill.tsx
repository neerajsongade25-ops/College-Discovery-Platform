'use client';
import { useKeepAlive } from '@/context/KeepAliveContext';

const STATUS_CONFIG = {
  connecting: {
    dot: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    text: '#f59e0b',
    label: 'Connecting…',
    pulse: true,
  },
  online: {
    dot: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    text: '#10b981',
    label: 'Server Online',
    pulse: false,
  },
  offline: {
    dot: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    text: '#ef4444',
    label: 'Reconnecting…',
    pulse: true,
  },
};

export default function ServerStatusPill() {
  const { status, latency } = useKeepAlive();
  const cfg = STATUS_CONFIG[status];

  return (
    <>
      <style>{`
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .status-dot-pulse { animation: status-pulse 1.2s ease-in-out infinite; }
      `}</style>
      <div
        title={latency !== null ? `Latency: ${latency}ms` : 'Real-time connection status'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          borderRadius: 999,
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          fontSize: 12,
          fontWeight: 600,
          color: cfg.text,
          whiteSpace: 'nowrap',
          transition: 'all 0.4s ease',
          cursor: 'default',
        }}
      >
        {/* Pulsing dot */}
        <span
          className={cfg.pulse ? 'status-dot-pulse' : ''}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: cfg.dot,
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        {cfg.label}
        {status === 'online' && latency !== null && (
          <span style={{ opacity: 0.7, fontWeight: 400 }}>{latency}ms</span>
        )}
      </div>
    </>
  );
}
