FROM node:20-alpine
WORKDIR /app
COPY  dist/meter-dashboard-frontend ./dist
RUN npm install -g serve
EXPOSE 4200
CMD ["serve", "-s", "dist", "-l", "4200"]