For future reference, here are the correct Docker commands:

Rebuild and restart everything:
docker-compose down && docker-compose up --build -d

Or if containers are already running, just rebuild:
docker-compose up --build -d

To see logs (useful for debugging):
docker-compose logs -f frontend
or
docker-compose logs -f backend

To restart just one service:
docker-compose restart frontend

docker-compose up --build

to see the builds
