# GraphQL-social-media-app
Social media app with GraphQL API

# Social Media App

This project is a full-stack social media application with a NestJS GraphQL backend and a React Native mobile frontend.

## Table of Contents

- [Overview](#overview)
- [Server (Backend)](#server-backend)
  - [Technologies Used](#technologies-used-backend)
  - [Setup and Installation](#setup-and-installation-backend)
  - [Running the Server](#running-the-server)
  - [API Documentation](#api-documentation)
- [Client (Frontend)](#client-frontend)
  - [Technologies Used](#technologies-used-frontend)
  - [Setup and Installation](#setup-and-installation-frontend)
  - [Running the App](#running-the-app)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Overview

This social media app allows users to create accounts, make posts, comment on posts, and like content. It features a GraphQL API backend built with NestJS and MongoDB, and a mobile frontend developed using React Native.

## Server (Backend)

### Technologies Used (Backend)

- NestJS
- GraphQL
- MongoDB
- Redis (for caching)
- Apollo Server

### Setup and Installation (Backend)

1. Clone the repository: git clone https://github.com/your-username/your-repo-name.git cd your-repo-name/server
2. Install dependencies: npm install
3. Set up environment variables:
Create a `.env` file in the server directory and add the following:
MONGODB_URI=your_mongodb_connection_string
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port

### Running the Server
To start the server in development mode: npm run start:dev
The server will be running at `http://localhost:3000/graphql`.

### API Documentation

The GraphQL API includes the following main types:

- User
- Post
- Comment

For detailed API documentation, visit the GraphQL Playground at `http://localhost:3000/graphql` when the server is running.

## Client (Frontend)

### Technologies Used (Frontend)

- React Native
- Apollo Client
- React Navigation

### Setup and Installation (Frontend)

1. Navigate to the client directory: cd GraphQL-social-media-app/client
2. Install dependencies: npm install

### Running the App

To start the React Native development server: npm run start

## Features

- User authentication (register, login)
- Create, read, update, and delete posts
- Comment on posts
- Like/unlike posts
- User profiles
- Real-time updates (optional, if implemented)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

