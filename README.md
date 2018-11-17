# Sms-Management-Api

[![Build Status](https://travis-ci.com/victor-enogwe/Sms-Management-Api.svg?branch=master)](https://travis-ci.com/victor-enogwe/Sms-Management-Api) [![Coverage Status](https://coveralls.io/repos/github/victor-enogwe/Sms-Management-Api/badge.svg)](https://coveralls.io/github/victor-enogwe/Sms-Management-Api)

an SMS management API

## Technologies

NodeJS, GraphQL, ExpressJS, Postgraphille, Postgres

## Requirements

The following software are required to run this app:

- NodeJS
- Node Package Manager (npm)
- Postgres - Database

## Local Development

Start local development using the following steps:

- Clone the repository locally
- setup a local `postgres` database
- clone the `env.sample` file and rename it to `.env`
- replace default `.env` variables with yours if neccessary
- run `npm install` to install node packages
- run `export NODE_ENV=development && npm run db:prepare` to seed and migrate your database
- Run `npm run start:dev` to start up the application
- access the application via http at [localhost:3000](localhost:3000)

## Testing

This application can be tested locally by running `npm test`

### GraphQL

All documentations can be obtained on the  graphql api itself

local development docs [localhost:3000](here)

- **Queries**

  - **Find All**

    - Contacts example

      - query
        ``` GQL
          query {
            allContacts {
              nodes {
                id,
                name,
                phone,
                createdAt,
                updatedAt,
                shortMessagesBySenderId  {
                  nodes {
                    senderId,
                    recieverId
                  }
                },
                shortMessagesByRecieverId {
                  nodes {
                    id,
                    senderId,
                    recieverId,
                    message,
                    status,
                    createdAt,
                    updatedAt
                  }
                }
              }
            }
          }
        ```

    - Sms example

      - query
        ``` GQL
          query {
            allShortMessages {
              nodes {
                id,
                senderId,
                recieverId,
                message,
                status,
                createdAt,
                updatedAt
              }
            }
          }
        ```
  - **Find By Id**

    - Contacts example

      - query
      ``` GQL
        query($contactId: Int!) {
          contactById(id: $contactId) {
            id,
            name,
            phone,
            createdAt,
            shortMessagesBySenderId {
              nodes {
                id,
                senderId,
                contactBySenderId {
                  name
                }
              }
            }
          }
        }
      ```

      - query variables
        ```  JSON
          "contactId": 1
        ```
  - Sms example

    - query
      ``` GQL
        query($smsId: Int!) {
          shortMessageById(id: $smsId) {
            id,
            senderId,
            recieverId,
            message,
            status,
            createdAt,
            updatedAt,
          }
        }
      ```

    - query variables
      ``` JSON
        "smsId": 1
      ```

- **Mutations**

  - **Create**
    - Contacts example
      - mutation
        ``` GQL
        mutation($contact: CreateContactInput!) {
          createContact(input: $contact) {
            contact {
              id,
              name,
              phone,
              createdAt,
              updatedAt
            }
          }
        }
        ```
      - argument variables
        ``` JSON
        {
          "contact": {
            "contact": {
              "name": "enogwe",
              "phone": "02233233232"
            }
          }
        }
        ```
    - Sms example

      - mutation
        ``` GQL
          mutation($sms: CreateShortMessageInput!) {
            createShortMessage(input: $sms) {
              shortMessage {
                id,
                senderId,
                recieverId,
                message,
                status,
                createdAt,
                contactByRecieverId {
                  id,
                  name,
                  nodeId
                },
                contactBySenderId {
                  id,
                  name,
                  phone
                }
              }
            }
          }
        ```
      - query variables
        ``` JSON
          "sms": {
            "shortMessage": {
              "senderId": 4,
              "recieverId": 4,
              "message": "hello world"
            }
          }
        ```
  - **Delete**

    - Contacts example

      - mutation
        ``` GQL
          mutation($contactId: DeleteContactByIdInput!) {
            deleteContactById(input: $contactId) {
              deletedContactId
            }
          }
        ```

      - query variables
        ``` JSON
          "contactId": {
            "id": 5
          }
        ```

## How To Contribute

To contribute, fork this repository, make required changes and open a pull request.
