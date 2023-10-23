# cypress-test-tiny

> Tiny Cypress E2E test case

Build status | Name | Description
:--- | :--- | :---
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/cypress-io/cypress-test-tiny/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/cypress-io/cypress-test-tiny/tree/master) | CircleCI | Linux & Mac & Win 64

## Background

A Simple CRA webapp has been setup as an optional localhost page for testing though the example.cypress.io is also kept.

This Repo is to show the network degradation when running lighthouse tests against the cypress browser. As of 13.3.1 we've noticed a sharp increase in time  to fetch resources with a minimum delay of 2 seconds. This impacts the performance scores massively

Lighthouse is run as spawn process that runs against the chrome browser using the browser dev port.
This runs lighthouse in a new Tab. where it can easily manipulate the screen dimensions etc.
Though we experience some network delay when doing this.


## Setup

1. clone project
   - git clone git@github.com:metalix2/cypress-lighthouse-slow.git
2. cd cypress-lighthouse-slow
3. nvm use
4. npm ci
5. cd webapp in new tab
   - npm ci
   - npm run build
   - npx serve ./build -p 5000 (y) if serve not installed.
6. in original tab
   - npm run cypress:perf
7. Wait for tests to finish and check the .lighthouseci folder for results or check cypress logs.