# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!

_____________________________________________________________________________________________________________
# Notes from Farah.A

## Prerequests
same as above

## Installation
* required to run one of the below commands again as new packages were added
    ```bash
    yarn i
    npm i
    ```
* public/private keys
    * using the following command, please generate new public/private ssh key.
        ```bash
        ssh-keygen
        ```
    * save the public key in node-challenge/certs/public.key
    * save the private key in node-challenge/certs/private.key
* DB migration
    * create `challenge` database
    * from the root, run the following command to load the new SQL file
        ```bash
        psql challenge < dump.sql
        ```

## New packages
###### "@types/bcrypt": "^5.0.0"
to support password hash
###### "jsonwebtoken": "^8.5.1"
to support the authorization layer

## bonus
* Two extra fields were added to the users table (email & pass).
* Login endpoint was added (API details mentioned below).
    * As signup API wasn't introduced in the new code, required to add email & pass to the users table.
    * Password should be hashed before added to the DB (use this website to hash your password using becrypt https://bcrypt-generator.com/)
    * Login is now returning `Password Grant Flow`, future enhancement is to change to `Authorization Code Flow`.
    * Login API should return a valid access token in case of 200 response code.
* New middleware was added to the code to support authorization
    * All APIs have an authrization layer, hence Bearer access token should be added in the Authorization header.
    * A valid access-token can be taken from the login API.
    * Access-Token expiry = 10 min (can be changed from node-challenge/packages/utils/jwt.ts)
    * supported algorithm: RS256

# Lets run the code
Run the following command
```bash
NODE_DEBUG=DEBUG yarn start
```

# APIs details

##### POST user login
###### request
curl --location --request POST 'http://localhost:9001/user/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "amawifarah@gmail.com",
    "password": "Admin@123"
}'
###### response
{
    "access_token": "JWT",
    "expires_in": "10m",
    "token_type": "Bearer"
}

_____________________________________________________________________________
##### GET user details
###### request
curl --location --request GET 'http://localhost:9001/user/v1/user_id/{USER_ID}' \
--header 'Authorization: Bearer JWT'
###### response
{
    "id": "da140a29-ae80-4f0e-a62d-6c2d2bc8a474",
    "email": "jeppe@pleo.com",
    "first_name": "Jeppe",
    "last_name": "Rindom",
    "company_name": "pleo",
    "ssn": "1"
}
_____________________________________________________________________________
##### GET user expenses
###### request
curl --location --request GET 'http://localhost:9001/expense/v1/user_id/{USER_ID}?page=1&sort=asc&order_by=date_created' \
--header 'Authorization: Bearer JWT'
###### response
[
    {
        "id": "f20866f9-7d46-45f2-822c-4b568e216a13",
        "merchant_name": "Donkey Republic",
        "amount_in_cents": 6000,
        "status": "processed",
        "user_id": "da140a29-ae80-4f0e-a62d-6c2d2bc8a474"
    },
    {
        "id": "314d54f4-8a5f-4c1d-b735-426b54794a44",
        "merchant_name": "Sliders",
        "amount_in_cents": 12000,
        "status": "processed",
        "user_id": "da140a29-ae80-4f0e-a62d-6c2d2bc8a474"
    },
]

| Query Param | Default value | Note |
-------------|-------------|-------------|
| page | 1 | page limit can be changed from (node-challenge/packages/utils/db.ts) |
| sort | desc | values (desc, asc)  |
| order_by | date_created | You can choose any value from inside the expenses table |






