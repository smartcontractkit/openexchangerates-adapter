# Chainlink Open Exchange Rates External Adapter

## Input Params
- `from`: The currency symbol to convert from
- `to`: The currency symbol to convert to
- `endpoint`: The endpoint to use (default: convert)
- `amount`: The amount to convert (default: 1)


## Output

```
{
 "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
 "data": {
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  "request": {
   "query": "/convert/1/XAU/USD",
   "amount": 1,
   "from": "XAU",
   "to": "USD"
  },
  "meta": {
   "timestamp": 1576277319,
   "rate": 1475.639987
  },
  "response": 1475.639987,
  "result": 1475.639987
 },
 "result": 1475.639987,
 "statusCode": 200
}
```

## Install

```bash
yarn install
```

## Test

```bash
yarn test
```

## Create the zip

```bash
zip -r cl-openexchangerates.zip .
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

```bash
docker build . -t openexchangerates-adapter
```

Then run it with:

```bash
docker run -p 8080:8080 -e API_KEY='YOUR_API_KEY' -it openexchangerates-adapter:latest
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 12.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-openexchangerates.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-openexchangerates.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key
