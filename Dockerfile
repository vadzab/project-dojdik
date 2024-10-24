FROM node:18-alpine AS builder
WORKDIR /app
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=1024

COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /my-space
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]