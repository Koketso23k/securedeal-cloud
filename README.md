# SecureDeal – Cloud

A small web app for recording a deal between a buyer and a seller. It runs in the browser and is
hosted on **AWS** (Amazon Web Services).

**Live app:** _paste your AWS website link here after you deploy it_

## What the app does

- Create a transaction with a **buyer name**, an **item name** and a **price**.
- Every new transaction starts as `PENDING`.
- Change the status to `SHIPPED` or `RECEIVED`.
- Rules: the buyer name and item name cannot be empty, and the price must be more than zero.
  Anything else is rejected with an error message.

There are no real payments, couriers or database. The project is small on purpose, so the
focus stays on getting an app running in the cloud.

## Files

| File | What it is |
|------|------------|
| `index.html` | The page (form and list) |
| `style.css` | How the page looks |
| `app.js` | The rules and the behaviour |

## How it is deployed on AWS

The app is a **static website** (means: just files, with no server code running behind them).
It is hosted on **Amazon S3** (a service for storing files in the cloud) with static website
hosting turned on.

Steps taken:

1. _Fill in as you do each step, for example: "Created an S3 bucket named ..."._
2. _Uploaded `index.html`, `style.css` and `app.js` to the bucket._
3. _Turned on static website hosting and set `index.html` as the home page._
4. _Allowed public read access to the files only (nothing else)._
5. _Opened the website link and tested it._

## Cloud security

- No passwords or AWS keys are stored in this repository.
- _Describe what you really did, for example: "I used an IAM user (means: an AWS login with only the permissions it needs) and not my main account."_
- Only the website files are public. There is no private data in the app.

## Cost management

- _Describe what you really did, for example: "I set an AWS budget alert so I get an email if costs go above $1."_
- S3 static hosting for a few small files costs very little and is covered by the AWS free tier
  for new accounts (check the current free tier rules on the AWS site).
- _Say whether you deleted or emptied the bucket after the demo._

## How it could scale

Right now the transactions are saved in the user's own browser, so each person sees only their
own list. To grow this into a real shared app, it could use:

- **Amazon CloudFront** (means: a service that keeps copies of the site close to users, so it loads fast everywhere).
- **A database** such as Amazon DynamoDB, with a small backend (for example AWS Lambda) so all
  users share the same transactions.

These were not built, because they are beyond the scope of this small project.

## Run it on your own computer

Open `index.html` in a web browser. No installation is needed.

## Demo

_Paste your YouTube demo link here._
