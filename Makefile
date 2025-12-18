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

.PHONY: stripe/start/webhook
stripe/start/webhook:
	stripe listen --forward-to "localhost:3000/api/webhooks/stripe?workflowId=cmjblky8f00016i8o42m0z0gy"

.PHONY: stripe/trigger-event
stripe/trigger/event:
	stripe trigger payment_intent.succeeded
