# bluespark.ro
BlueSpark Technoligies Website

## Running with Docker

### Build the Docker image

```sh
docker build -t my-nextjs-app .
```

### Run the Docker container

```sh
docker run -p 3000:3000 my-nextjs-app
```

The app will be available at http://localhost:3000

---

## Running with Docker Compose

### Build and start all services (Next.js app and MongoDB)

```sh
docker-compose up --build
```

- The Next.js app will be available at http://localhost:3000
- MongoDB will be available at mongodb://localhost:27017 (default credentials are set in `docker-compose.yml`)

### Stopping the services

```sh
docker-compose down
```

---


