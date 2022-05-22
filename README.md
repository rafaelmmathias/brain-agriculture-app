# Getting Started

You just need create a `.env` file in the root folder with the following API endpoint.

Example:
```
REACT_APP_API_ENDPOINT=http://localhost:4000
```

Running the app:
```
yarn install

yarn start
```

> ⚠️ **Since the app backend is fully mocked, whenever you refresh the page the 'database' will reset.**

# Charts color config
## crop colors
    you can define the crop's color just editing the file `crops-data.json`. (like that data would be in a database).

## state colors
    you can set the color of each state editing the file `state-colors.json`.

> ⚠️ When doesn't have any colors provided from these files the system will auto-generate one based on their name string. <br>So, for example, I've only defined colors to MG and RJ states, then, SP will receive one color generated based on "SP" string, that color will not change because will always be generated based on the same value. <br> it also applies to Crop colors.

# Unit tests

### `yarn tdd`
Runs tests in watch mode for development time

### `yarn test`
Runs tests withou watch (for CI)