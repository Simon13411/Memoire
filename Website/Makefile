FRONTEND = front-end

build-front:
	docker build -t front $(FRONTEND)/

run-front:
	docker run -p 1050:80 --name frontc front

stop-front:
	docker stop frontc

clean-front:
	docker rm frontc
