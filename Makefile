# include .env
# export

.PHONY: db/migrate
db/migrate:
	npx prisma migrate dev

.PHONY: db/studio
db/studio:
	npx prisma studio

.PHONY: db/reset
db/reset:
	npx prisma migrate reset

.PHONY: inngest/dev
inngest/dev:
	npx inngest-cli@latest dev

.PHONY: ngrok/start
ngrok/start:
	ngrok http --url=jeanna-oxidational-bronchoscopically.ngrok-free.dev 3000
# -include .env
# export