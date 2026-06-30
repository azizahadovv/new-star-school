# ─────────────────────────────────────────────────────────────
# Frontend — ko'p bosqichli (multi-stage) build
#  1) Node bilan React (CRA) build qilinadi
#  2) Statik fayllar nginx orqali tarqatiladi, /api backend'ga proxy
# ─────────────────────────────────────────────────────────────

# 1-bosqich: build
FROM node:20-alpine AS build
WORKDIR /app

# Bog'liqliklar (kesh uchun avval lock fayllar)
# Eslatma: lock fayl package.json bilan to'liq sinxron emas (typescript versiyasi),
# shuning uchun qat'iy `npm ci` emas, bardoshli `npm install` ishlatamiz.
COPY package*.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

# Manba va build
COPY . .
# CRA: ogohlantirishlar build'ni to'xtatmasin
ENV CI=false
# API manzili — nginx /api proxy qiladi (production'da relative)
ARG REACT_APP_API_URL=/api/
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# 2-bosqich: nginx bilan tarqatish
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
