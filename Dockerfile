# Imagen de una de las apps del monorepo.
#   docker build --build-arg APP=landing  -t sami-landing  .
#   docker build --build-arg APP=platform -t sami-platform .
# Las variables NEXT_PUBLIC_* se fijan en tiempo de build.

FROM node:22-alpine AS build
ARG APP
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_EMERGENCY_PHONE
ARG NEXT_PUBLIC_GTM_ID
WORKDIR /repo
COPY . .
RUN npm install --no-audit --no-fund && npm run build -w @sami/${APP}

FROM node:22-alpine
ARG APP
ENV APP=${APP} NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build /repo/apps/${APP}/.next/standalone ./
COPY --from=build /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
COPY --from=build /repo/apps/${APP}/public ./apps/${APP}/public
USER node
EXPOSE 3000
CMD ["sh", "-c", "node apps/${APP}/server.js"]
