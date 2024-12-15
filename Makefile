lint-frontend:
	make -C frontend lint

install:
	npm ci

build:
	make -C frontend start

start:
	npx start-server

deploy:
	git push heroku main

