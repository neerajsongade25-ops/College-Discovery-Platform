'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type ServerStatus = 'connecting' | 'online' | 'offline';

interface KeepAliveContextType {
  status: ServerStatus;
  latency: number | null;
  lastPong: Date | null;
}

const KeepAliveContext = createContext<KeepAliveContextType>({
  status: 'connecting',
  latency: null,
  lastPong: null,
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// HTTP fallback ping interval (ms) — runs alongside WebSocket
const HTTP_PING_INTERVAL = 4 * 60 * 1000; // 4 minutes

export function KeepAliveProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServerStatus>('connecting');
  const [latency, setLatency] = useState<number | null>(null);
  const [lastPong, setLastPong] = useState<Date | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const pingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const httpTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // ── WebSocket connection ───────────────────────────────────────────────
    const socket = io(API_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[KeepAlive] Socket.IO connected:', socket.id);
      setStatus('online');
    });

    socket.on('connected', (data) => {
      console.log('[KeepAlive] Server confirmed:', data.message);
    });

    socket.on('pong', (data) => {
      setLastPong(new Date(data.timestamp));
    });

    socket.on('disconnect', (reason) => {
      console.warn('[KeepAlive] Socket.IO disconnected:', reason);
      setStatus('offline');
    });

    socket.on('connect_error', (err) => {
      console.warn('[KeepAlive] Connection error:', err.message);
      setStatus('offline');
    });

    // ── WebSocket heartbeat: send ping every 30s ──────────────────────────
    pingTimerRef.current = setInterval(() => {
      if (socket.connected) {
        const t0 = Date.now();
        socket.emit('ping');
        // Measure round-trip once per minute
        socket.once('pong', () => {
          setLatency(Date.now() - t0);
          setLastPong(new Date());
        });
      }
    }, 30_000);

    // ── HTTP fallback ping every 4 min (belt + suspenders) ────────────────
    const httpPing = () => {
      fetch(`${API_URL}/api/ping`, { method: 'GET', cache: 'no-store' })
        .then(() => {
          if (status !== 'online') setStatus('online');
        })
        .catch(() => {/* silent — WebSocket already shows status */});
    };

    // Immediate HTTP ping on mount (fastest way to wake a sleeping server)
    httpPing();
    httpTimerRef.current = setInterval(httpPing, HTTP_PING_INTERVAL);

    return () => {
      socket.disconnect();
      if (pingTimerRef.current) clearInterval(pingTimerRef.current);
      if (httpTimerRef.current) clearInterval(httpTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeepAliveContext.Provider value={{ status, latency, lastPong }}>
      {children}
    </KeepAliveContext.Provider>
  );
}

export const useKeepAlive = () => useContext(KeepAliveContext);
