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
    "email": "alic1234@example.com",
    "password": "supersecure1234"
  }'
```

To authenticate:
```
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alic1234@example.com",
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
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZWVkYzdiMy04MTRkLTQxODctYmUxZi0zM2FkN2YwMGJiYjAiLCJpYXQiOjE3NTI2OTMyNjMsImV4cCI6MTc1MjY5Njg2M30.XX3aYCs05qowWjVV96EcNSuD49bJadq4JOwrSG5zweY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Alice",
    "email": "updated.alice@example.com"
  }'
```

```
curl -X POST http://localhost:3000/v1/account \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Personal Bank Account",
    "accountType": "personal"
  }'

```

curl -X GET http://localhost:3000/v1/users/cb3792b4-c5d0-453d-8655-0be412cad417 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYjM3OTJiNC1jNWQwLTQ1M2QtODY1NS0wYmU0MTJjYWQ0MTciLCJpYXQiOjE3NTI2OTczODEsImV4cCI6MTc1MjcwMDk4MX0.WFKBdi1Ow7ipqJxDML13CPtjJF4JKuCexH3sKGYAX94" \
  -H "Content-Type: application/json" 
a0ad0a79-b9bf-4651-8d32-a0a8fd6a240d


cb3792b4-c5d0-453d-8655-0be412cad417
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYjM3OTJiNC1jNWQwLTQ1M2QtODY1NS0wYmU0MTJjYWQ0MTciLCJpYXQiOjE3NTI2OTczODEsImV4cCI6MTc1MjcwMDk4MX0.WFKBdi1Ow7ipqJxDML13CPtjJF4JKuCexH3sKGYAX94

TODO:
- Switch properties depending on if runninig in shell or in Docker