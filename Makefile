
deploy:
	yarn publish
	make deploy-docker
deploy-docker:
	docker build -t gendocu/grpc-docs -f docker/Dockerfile .
	docker push gendocu/grpc-docs
