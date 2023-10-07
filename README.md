# Blog App

A full-stack blog application built using the MERN (MongoDB, Express, React, Node.js) stack.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This blog app provides a platform for users to create, edit, and view blog posts, as well as interact through comments. It is built using modern web technologies, providing a responsive and user-friendly experience.

## Features

- User authentication and authorization
- Blog post creation, editing, and deletion
- Commenting system with moderation features
- Responsive and intuitive user interface
- RESTful API for easy integration with other applications

## Requirements

- Node.js
- MongoDB
- npm or yarn
- ...

## Installation

1. Clone the repository:

    git clone `https://github.com/Njokujr/MERN-BlogApp.git`
    cd MERN-BlogApp

2. Install dependencies in both client & server folders:

    npm install
        OR
    yarn install

## Configuration

1. Create a `.env` file in the root directory based on the `.env.example` file.
2. Set the required environment variables such as database connection details, API keys, etc.

## Usage

1. Start the backend server:

    npm run dev
        OR
    yarn dev

2. Start the frontend development server:

    npm start
        OR
    yarn start

"Then visit `http://localhost:3000`in your browser to access the blog app".

## Folder Structure

    MERN-BlogApp/
    |-- client/
    |   |-- public/
    |   |-- src/
    |-- server/
    |-- ...

**client/**- This directory houses all required files and folders to structure the frontend of the app.

**server/**- This directory structures the requirments for the backend to run functionally.

## API Endpoints

### User Routes (Protected) - `/api/`
Document the available API endpoints, request and response formats, and any authentication requirements.

- `GET /api/posts`: Retrieve all blog posts.

- `GET /api/posts/:id`: Retrieve a specific blog post.

- `POST /api/posts`: Create a new blog post.

- `PUT /api/posts`: Updates a blog post.

- `DELETE /api/posts/:id`: Deletes a specific blog post.

- `GET /api/comments/:postId`: Retrieve comments for a specific blog post.

- `POST /api/comments`: Create a new comment.
