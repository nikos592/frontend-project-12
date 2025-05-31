# Chat
[![hexlet-check](https://github.com/nikos592/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nikos592/frontend-project-12/actions/workflows/hexlet-check.yml) - Hexlet tests and linter status.

[![Lint Check](https://github.com/nikos592/frontend-project-12/actions/workflows/lint-check.yml/badge.svg)](https://github.com/nikos592/frontend-project-12/actions/workflows/lint-check.yml) - Linter check status.

[![Maintainability](https://api.codeclimate.com/v1/badges/4d0144d2a60abb102a7a/maintainability)](https://codeclimate.com/github/nikos592/frontend-project-12/maintainability) - Codeclimate.

## About

**"Chat (Slack)"** is real-time application, analog of Slack chat (simplified version) on React/Redux, using AJAX, REST, Websockets, React (with hooks) + Redux (@reduxjs/toolkit) + Formik.

## Render Deployment
https://frontend-project-12-vxpr.onrender.com/login

## Usage

You should have Node.js installed before proceeding. Only test JS against v21 and on macOS.

```shell
# Clone the repo
git clone https://github.com/nikos592/frontend-project-12
cd frontend-project-12

# Runs the linter to check frontend code for errors and style violations.
make lint-frontend

# Performs installation of project dependencies from package.json
make install

# Starts the development server for the frontend
make start-frontend

# Starts the development server for the backend
make start-backend

# Runs concurrent development for both frontend and backend in watch mode
make develop

# Cleans the frontend build directory (frontend/build) and runs the build process
make build

# Starts the server to serve the application in a production environment.
make start
```
