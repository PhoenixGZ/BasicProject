# BasicService
A simple Express + TypeScript server setup.

## 🚀 Getting Started

### Install dependencies

```bash
npm install
npm run dev
```

To create a user:
```
curl -X POST http://localhost:3000/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Example",
    "email": "alic123@example.com",
    "password": "supersecure1234"
  }'
```

To authenticate:
```
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alic123@example.com",
    "password": "supersecure1234"
  }'
```

Then use as such: 
```
curl -X GET http://localhost:3000/v1/accounts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

```
curl -X DELETE http://localhost:3000/v1/users/556437fe-9266-4825-9335-516bbd8354d4 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTY0MzdmZS05MjY2LTQ4MjUtOTMzNS01MTZiYmQ4MzU0ZDQiLCJpYXQiOjE3NTI2OTQ3MDUsImV4cCI6MTc1MjY5ODMwNX0.qOUZJb-kmfX9nrq2yk3LYMidksMrwokGYlgt0AUiGY0"
```

```
curl -X PATCH http://localhost:3000/v1/users/c7d85595-a5cb-40ca-859a-6c3ed7e9d9ca \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjN2Q4NTU5NS1hNWNiLTQwY2EtODU5YS02YzNlZDdlOWQ5Y2EiLCJpYXQiOjE3NTI2OTU3NzYsImV4cCI6MTc1MjY5OTM3Nn0.sg54k9pbaIUpSWvae5uI7i_hY8jbugLJBOWgrqDS5k0" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Alice",
    "email": "updated.alice@example.com"
  }'
```

a0ad0a79-b9bf-4651-8d32-a0a8fd6a240d

TODO:
- Switch properties depending on if runninig in shell or in Docker