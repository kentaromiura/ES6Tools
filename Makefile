build:
	./node_modules/.bin/wrup browser -t ./node_modules/harmonify/index.js -r ./index.js > dist/ES6Tools.js

test:
	./node_modules/.bin/wrup browser -t ./node_modules/harmonify/index.js -r ./Specs/index.js > dist/ES6ToolsSpec.js
	./node_modules/.bin/mocha --reporter nyan ./dist/ES6ToolsSpec.js
