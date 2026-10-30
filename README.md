# SecureDeal - Cloud

SecureDeal is a small web app where you record a deal between a buyer and a seller and follow its status. I hosted it on AWS as my cloud elective project.

**Live app:** http://securedeal-koketso-2026.s3-website.eu-north-1.amazonaws.com

## What it does

You fill in a buyer name, an item name and a price, and the app adds the deal to a list. Every new deal starts as PENDING, and you can change it to SHIPPED or RECEIVED from a dropdown.

The app has a few rules. The buyer name and item name can't be empty, and the price has to be more than zero. If you break a rule, you get an error message and nothing is saved.

There are no real payments, couriers or database. I kept it small on purpose so I could focus on getting something running in the cloud.

## Files

- `index.html`: the page with the form and the list
- `style.css`: how the page looks
- `app.js`: the rules and what happens when you click things

## How I deployed it

The app is a static website, so it's just files with no server code behind it. I hosted it on Amazon S3, which is AWS's service for storing files.

What I did:

1. Signed in to the AWS console with my AWS account.
2. Created an S3 bucket called `securedeal-koketso-2026` in the Europe (Stockholm) region, `eu-north-1`.
3. Turned off "Block all public access" on this bucket, otherwise nobody could open the site.
4. Uploaded `index.html`, `style.css` and `app.js`. The README stays on GitHub only.
5. Turned on static website hosting and set `index.html` as the home page.
6. Added a bucket policy that lets anyone read the files in the bucket (`s3:GetObject`) and nothing else.
7. Opened the website link and tested it. I created a deal, tried a price that wasn't more than zero (it was rejected), and changed a status from PENDING to SHIPPED.

## Security

- There are no passwords or AWS keys in this repo or in the bucket.
- I used the root user of my own AWS account because this is a small project. On a bigger project I would make an IAM user with only the permissions it needs.
- Only the three website files are public, and the policy only lets people read them. Nobody can upload, change or delete anything. The app has no private data.
- The link is http, not https, because S3 website hosting doesn't do https by itself. CloudFront could add that later.

## Cost

I set up an AWS zero-spend budget called "My Zero-Spend Budget", so I get an email if the account ever costs anything. A few small files on S3 cost very little, and new accounts get free credits (the exact rules are on the AWS site).

I'm leaving the bucket online until the project is marked so the link keeps working.

## How it could scale

Right now the deals are saved in the browser, so they stay after a refresh but only on that device. Each person only sees their own list. To make it a proper shared app I would add:

- CloudFront, which keeps copies of the site close to users so it loads quickly and gives it https.
- A database like DynamoDB with a small backend (for example AWS Lambda), so everyone sees the same deals.

I didn't build these because they're beyond the scope of this project.

## Run it on your own computer

Open `index.html` in a browser. You don't need to install anything.

## Demo

Demo video link coming soon.
