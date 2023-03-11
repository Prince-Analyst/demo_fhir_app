FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN NPM install  tailwindcss autoprefixer
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
RUN npm install magic-string
RUN npx tailwindcss init -p
COPY . .
EXPOSE 5173
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run" "dev"]
