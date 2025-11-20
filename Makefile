
.PHONY: db/migrate
db/migrate:
	npx prisma migrate dev

db/studio:
	npx prisma studio

db/reset:
	npx prisma migrate reset