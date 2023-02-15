FRONTEND = front-end
APIGATEWAY =  back-end/APIGateway
DATABASE = back-end/Database
DBOPS = back-end/DBOps

build: build-front build-gate build-dbops build-db

build-front:
	docker build -t front $(FRONTEND)/

build-db:
	docker build -t postgres $(DATABASE)/

build-gate:
	docker build -t apigate $(APIGATEWAY)/

build-dbops:
	docker build -t dbops $(DBOPS)/


run: run-front run-db run-gate run-dbops

run-front:
	docker run -p 1050:80 --name frontc front

run-db:
	docker run -v DataInsects:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -p 5432:5432 --name postgresc postgres

run-gate:
	docker run -p 4000:80 --name apigatec apigate

run-dbops:
	docker run -p 4001:80 --name dbopsc --link postgresc dbops


stop: stop-front stop-db stop-gate stop-dbops

stop-front:
	docker stop frontc

stop-db:
	docker stop postgresc

stop-gate:
	docker stop apigatec

stop-dbops:
	docker stop dbopsc


clean: clean-front clean-db clean-gate clean-dbops

clean-front:
	docker rm frontc

clean-db:
	docker rm postgresc

clean-gate:
	docker rm apigatec

clean-dbops:
	docker rm dbopsc
