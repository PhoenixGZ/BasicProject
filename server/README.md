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
    "email": "alic@example.com",
    "password": "supersecure1234"
  }'
```

To authenticate:
```
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "supersecure123"
  }'
```

Then use as such: 
```
curl -X GET http://localhost:3000/v1/accounts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

```
curl -X GET http://localhost:3000/v1/users/1234-doesnt-exist \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZWVkYzdiMy04MTRkLTQxODctYmUxZi0zM2FkN2YwMGJiYjAiLCJpYXQiOjE3NTI2ODc2NjMsImV4cCI6MTc1MjY5MTI2M30.CusyU8NiCzmkVbRAOY_wYkfDM4s3ZAirJLgVbDfC9r8"
```

TODO:
- CORS is not set up properly currently
- Switch properties depending on if runninig in shell or in Docker