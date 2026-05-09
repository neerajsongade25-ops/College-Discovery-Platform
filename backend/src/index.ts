import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import fetch from 'node:http'; // native, no install needed

import collegesRouter from './routes/colleges';
import compareRouter from './routes/compare';
import predictRouter from './routes/predict';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// ─── CORS origin list ─────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: (origin: string | undefined, cb: (e: Error | null, ok?: boolean) => void) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// ─── Socket.IO ────────────────────────────────────────────────────────────────
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Keep connections alive
  pingInterval: 25000,   // server pings client every 25s
  pingTimeout: 60000,    // wait 60s for pong before disconnect
});

let connectedClients = 0;

io.on('connection', (socket) => {
  connectedClients++;
  console.log(`[Socket.IO] Client connected: ${socket.id} | Total: ${connectedClients}`);

  // Immediately confirm connection to client
  socket.emit('connected', {
    message: 'CollegeCompass server is online',
    timestamp: new Date().toISOString(),
    serverId: process.env.RENDER_SERVICE_ID || 'local',
  });

  // Respond to client heartbeat pings
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: new Date().toISOString() });
  });

  socket.on('disconnect', (reason) => {
    connectedClients--;
    console.log(`[Socket.IO] Client disconnected: ${socket.id} (${reason}) | Total: ${connectedClients}`);
  });
});

// ─── Self-ping keep-alive (prevents Render free tier from sleeping) ───────────
// Render provides RENDER_EXTERNAL_URL automatically in production
const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
const PING_INTERVAL_MS = 10 * 60 * 1000; // every 10 minutes

function selfPing() {
  const url = `${SELF_URL}/health`;
  const protocol = url.startsWith('https') ? require('https') : require('http');

  const req = protocol.get(url, (res: any) => {
    console.log(`[KeepAlive] Self-ping → ${url} | Status: ${res.statusCode} | ${new Date().toISOString()}`);
  });

  req.on('error', (err: Error) => {
    console.warn(`[KeepAlive] Self-ping failed: ${err.message}`);
  });

  req.end();
}

// Start self-ping only in production (Render sets NODE_ENV=production)
if (process.env.NODE_ENV === 'production') {
  // Initial ping after 30s (let server fully boot first)
  setTimeout(selfPing, 30 * 1000);
  // Then every 10 minutes
  setInterval(selfPing, PING_INTERVAL_MS);
  console.log(`[KeepAlive] Self-ping enabled → ${SELF_URL}/health every 10 min`);
}

// ─── Express Middleware ───────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const predictLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many prediction requests, slow down.' },
});

app.use(globalLimiter);

// ─── Health & Status endpoints ────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    connectedClients,
    uptime: Math.floor(process.uptime()),
  });
});

// Lightweight ping endpoint (used by frontend as HTTP fallback)
app.get('/api/ping', (_req, res) => {
  res.json({ pong: true, ts: Date.now() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/colleges', collegesRouter);
app.use('/api/compare', compareRouter);
app.use('/api/predict', predictLimiter, predictRouter);

// ─── 404 / Error handlers ─────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// ─── Start ────────────────────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`🚀 College Discovery API running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO WebSocket server ready`);
});

export default app;
