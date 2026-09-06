FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund
COPY tsconfig.json vite.playground.config.mts tailwind.config.js index.html ./
COPY src ./src
COPY public ./public
COPY docs ./docs
COPY site ./site
COPY scripts ./scripts
RUN npm run test:ai && npm run build && npm run check-site

FROM node:24-bookworm-slim AS ai
WORKDIR /app
COPY scripts/ai-service.mjs ./scripts/ai-service.mjs
USER node
ENV AI_HOST=0.0.0.0 AI_PORT=5180 NODE_ENV=production
EXPOSE 5180
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:5180/api/ai/status').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "scripts/ai-service.mjs"]

FROM nginx:stable-alpine AS web
COPY deploy/container.nginx /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
