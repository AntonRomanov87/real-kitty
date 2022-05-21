### Как запустить проект

В .env прописывается:
1. Infura Rinkeby endpoint: https://rinkeby.infura.io/v3/...
2. https://etherscan.io/ API KEY
3. Wallet private key начинающийся с "0x"


Деплой смарт-контракта:
```
npm i -g hardhat-shorthand
hh clean
hh compile
hh run scripts/deploy.js --network rinkeby
hh verify --network rinkeby  --contract contracts/RealKittyNFT.sol:RealKittyNFT  <CONTRACT ADDRESS>
```


Далее работа с контрактом:
https://docs.openzeppelin.com/learn/deploying-and-interacting?pref=hardhat

```
hh console --network rinkeby

> const realKittyFactory = await ethers.getContractFactory('RealKitty');
undefined

> const realKittyContract = await realKittyFactory.attach('0xB12B6fc033697ce58a222b24429f11BcE11C1C55');
undefined

> await realKittyContract.setBaseURI('ipfs://bafybeihmcg6j7zhht5w55lky4t6cwkddnm6lmbm5glhzotn3ojlze5oi7a/');

> await realKittyAttached.safeMint('0x1dA724969d376FC19c40e069D50745D214AC4d02');

> await realKittyAttached.mint(2, { value: ethers.utils.parseEther("0.02") });
```



Запуск сайта локально:
```
npm run start
```




### Загрузка проекта в Heroku

Устанавливаем heroku-cli https://devcenter.heroku.com/articles/heroku-cli


Далее:
```
heroku login -i
heroku git:remote -a nft-mint-kitty
git push heroku main
heroku logs --tail
```

Опубликовать production-версию в heroku
```
git push heroku  
```
Используется nginx-solo: см. `Procfile` и `config/nginx.conf.erb`. 
Production-сборка лежит в директории `build` которая собриается через `npm run build`. 


Подробнее:
1. https://create-react-app.dev/docs/deployment/
2. https://create-react-app.dev/docs/using-the-public-folder/
3. https://devcenter.heroku.com/articles/config-vars 
4. https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nginx




### Список команд при помощи которых создан проект

Используется:
1. https://chakra-ui.com/guides/getting-started/cra-guide
2. https://create-react-app.dev/




```
npx create-react-app real-kitty
cd real-kitty

git remote add origin git@github.com:AntonRomanov87/real-kitty.git
git branch -M main
git push -u origin main

npm i -D hardhat
npm i -D @openzeppelin/contracts

npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6

npm i -D dotenv
npm i -D @nomiclabs/hardhat-etherscan

# Переносим из devDependencies в dependencies
npm i ethers -P 


heroku git:remote -a nft-mint-kitty
```






# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


