# <img src="https://github.com/reijjo/budget/assets/95418273/f85d418a-e594-44b7-985e-549e361b3f96" alt="bag-logo" title="BAG" height="100px" /> </br> top notch budget tracking app

## About

- Budget app to see how much you are spending and on what
- More features for registered users

![thebag](https://github.com/reijjo/budget/assets/95418273/3f2ed90f-0039-4988-96d9-93e6f5e1bbc6)

- Using Bun for both frontend and backend <img src="https://github.com/reijjo/budget/assets/95418273/0f1660ca-51a0-45d6-b352-9fedb4ed9a5a" alt="bun" title="bun" height="30px" />

## Technologies

|              | Frontend                  |
| ------------ | ------------------------- |
| **Template** | React + TypeScript + Vite |
| **Other**    | Chart.js                  |

|               | Backend        |
| ------------- | -------------- |
| **Toolkit**   | Bun            |
| **Framework** | ElysiaJS       |
| **Database**  | MongoDB        |
| **Other**     | JSON Web Token |

## How to use
<details>
  <summary>Install Bun</summary>

  - https://bun.sh/docs/installation
</details>

<details>
  <summary>.env</summary>

  - rename server/ENV file to .env
  - add a mongoDB uri
  - add a secret (can be anything)
  - add Outlook credentials
  - add a port where to run backend
</details>

<details>
  <summary>run frontend and backend</summary>


  - in the client folder ```bun run dev```
  - in the server folder ```bun dev```
</details>

## TODO

- TESTS! vscode REST client (superapi is a mess with elysiajs)

- email confirmation
- refresh token popup
- security
- localstorage -> cookies
- Chart for incomes
- more mobile/responsive
- sorting etc
- Redux for not registered users (maybe)

