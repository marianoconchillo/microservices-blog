# Simple Microservices Blog App

This is a microservices-based blog app where users can add new posts and comments to existing posts. The app is implemented using Docker and Kubernetes to orchestrate the collections of services, Skaffold for the development environment, and React with Vite and TypeScript for the client.

## Architecture
The app is made up of three services:

-   **Posts Service**: This service handles the creation and retrieval of posts.
-   **Comments Service**: This service handles the creation and retrieval of comments for posts.
-   **Moderation Service**: This service handles the comments moderation.
-   **Query Service**: This service is responsible for aggregating data from the Posts and Comments services to provide a complete view of the blog.
-   **Event-bus service**: This service handles the communication between services.

## Requirements
-   Docker
-   Kubernetes
-   Skaffold

## Installation
-   Clone this repository.
-   Run skaffold dev to start the development environment.

## Usage
Once the app is running, you can access it by visiting http://localhost:3000 in your browser.

To add a new post, simply click the "New Post" button and fill in the required fields. To add a comment to an existing post, click on the post and scroll down to the comment section. Fill in the required fields and click "Add Comment".