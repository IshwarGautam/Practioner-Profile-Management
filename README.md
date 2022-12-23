# Practitioner Profile Management

<b>To run this program:</b><br>

1. Clone this repository.

2. Create environment file (.env) in the server repository. The example file for the environment is already in the server repository.<br>
   (Note: Database used is MongoDb)

3. Api-server is dockerized. So, to start server, install docker compose in your system and run this command:

```
cd server
```

```
sudo docker compose up --build

or

sudo docker-compose up --build
```

After this, server will run. Keep running the server.

4. Open another terminal and install all the packages required for this project for client side.

```
cd client
npm install
```

5. Start the client.

```
npm run dev
```

Now both client and server are running.

<hr>
You will see the output at <a href="http://localhost:3000">port 3000</a> if the port is not used.<br><br>

<div style="border: 1px solid; padding: 4px">
<b>Postman link: <a href="https://elements.getpostman.com/redirect?entityId=8495691-936d24bc-9f47-4b2a-bdff-6d4165e42e5c&entityType=collection">here</a>
<br>
<b>API Documentation Using <a href="http://localhost:5000/docs">Swagger</a></b>
</div>
