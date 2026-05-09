# Render Build & Start for the backend
# Root directory in Render must be set to: backend

[build]
  command = "npm install && npx prisma generate && npm run build"

[deploy]
  startCommand = "npm start"
