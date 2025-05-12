#bazowy obraz
FROM node:18-alpine AS builder
#informacja nt autora
LABEL org.opencontainers.image.authors="Krzysztof Ksiezki"

#ustawienie katalogu roboczego
WORKDIR /app

#kopiowanie package.json
COPY package.json package-lock.json* ./
#instalacja zależności
RUN npm ci --only=production

# Kopiowanie aplikacji do katalogu roboczego
COPY . .


FROM node:18-alpine AS runtime

LABEL org.opencontainers.image.authors="Krzysztof Ksiezki"

WORKDIR /app

#kopiowanie zbudowanych modułów, pliku server.js, frontendu i package.json z 1 etapu
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# Zmienna środowiskowa PORT
ENV PORT=3000
#klucz API jest wpisany na stałe w kodzie server.js
# Deklaracja portu na ktorym aplikacja ma nasluchiwac
EXPOSE 3000

# Healthcheck - sprawdzenie czy aplikacja odpowiada
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Uruchomienie aplikacji
CMD ["node", "server.js"]