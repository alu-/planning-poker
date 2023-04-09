node_modules:
	docker run --rm -it -u node:node -v $(shell pwd):/app -w /app node:18.15-alpine3.16 npm install --no-fund --no-audit

.PHONY: image
image:
	docker build . -t planning-poker

.PHONY: shell
shell:
	docker run --rm -it -u node:node -v $(shell pwd):/app -w /app -p 80:80 node:18.15-alpine3.16 sh