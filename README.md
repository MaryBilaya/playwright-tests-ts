//команда сбилдить контейнер docker
docker build -t playwright-tests .

//запуск автотестов в docker
docker run --rm --ipc=host -v "$(PWD):/app" playwright-tests

//просмотр репорта playwright
npx playwright show-report

//запуск codegen
npx playwright codegen https://www.saucedemo.com/
