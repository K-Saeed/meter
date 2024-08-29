FROM node:20-alpine
WORKDIR /app
COPY  dist/meter-dashboard-frontend ./dist
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80", "--proxy-config", "proxy.conf.json"]