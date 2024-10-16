# Smartclass Server

## Como rodar em ambiente de desenvolvimento

```
docker compose up --build --watch
```

# Cuidados ao fazer commit

Enquanto não integramos o repositorio com github actions, sempre rode os
seguintes comandos antes de fazer um commit

```
npm run format
npm run lint
```

Dessa forma garantimos que o código esteja dentro dos padrões de desenvolvimento.
