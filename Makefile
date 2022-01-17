
deploy:
	docker build -t gendocu/grpc-docs -f docker/Dockerfile .
	docker push gendocu/grpc-docs
	yarn publish
