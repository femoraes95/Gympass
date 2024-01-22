

npx prisma init 

## Para criar a tipagem do banco de dados
npx prisma generate 

# Sincronizar os dados do banco de dados
npx prisma migrate dev

# Abrir visualizacao do banco
npx prisma studio


## docker
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql

## para saubir o docker posteriormente 
docker start api-solid-pg
docker stop api-solid-pg


# iniciar a aplicacao usando o docker compose 
docker compose up -d