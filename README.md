# Acquisition Campaigns Demo Server

A server to demonstrate how Acquisition Campaigns plugin for Framer works. This demo server stores data in memory only and will lose everything when it's shutdown.

## Setup

Run `npm ci` to install NPM Packages.

## Run Server

Run `npm start` to start server.

## Development

There are a few development tasks to aid development

- `npm run dev` to start server in watching mode, which will restart the server whenever changes are made to source files.
- `npm run codegen` to generate GraphQL typings. This task is executed before `npm start` and `npm run dev` so it does not need to be executed manually.
