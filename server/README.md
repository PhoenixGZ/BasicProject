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
    "email": "alic@example.com",
    "password": "supersecure123"
  }'
```

Then use as such: 
```
curl -X GET http://localhost:3000/v1/accounts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

```
curl -X GET http://localhost:3000/v1/users/0eedc7b3-814d-4187-be1f-33ad7f00bbb0 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZWVkYzdiMy04MTRkLTQxODctYmUxZi0zM2FkN2YwMGJiYjAiLCJpYXQiOjE3NTI2OTMyNjMsImV4cCI6MTc1MjY5Njg2M30.XX3aYCs05qowWjVV96EcNSuD49bJadq4JOwrSG5zweY"
```

```
curl -X PATCH http://localhost:3000/v1/users/0eedc7b3-814d-4187-be1f-33ad7f00bbb0 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZWVkYzdiMy04MTRkLTQxODctYmUxZi0zM2FkN2YwMGJiYjAiLCJpYXQiOjE3NTI2OTMyNjMsImV4cCI6MTc1MjY5Njg2M30.XX3aYCs05qowWjVV96EcNSuD49bJadq4JOwrSG5zweY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Alice",
    "email": "updated.alice@example.com"
  }'
```

a0ad0a79-b9bf-4651-8d32-a0a8fd6a240d

TODO:
- Switch properties depending on if runninig in shell or in Docker