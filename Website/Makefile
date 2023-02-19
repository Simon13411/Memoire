FRONTEND = front-end
APIGATEWAY =  back-end/APIGateway
DATABASE = back-end/Database
DBOPS = back-end/DBOps
DLDER = back-end/FileDownloader

build: build-front build-gate build-dbops build-db build-dlder

build-front:
	docker build -t front $(FRONTEND)/

build-db:
	docker build -t postgres $(DATABASE)/

build-gate:
	docker build -t apigate $(APIGATEWAY)/

build-dbops:
	docker build -t dbops $(DBOPS)/
	
build-dlder:
	docker build -t dlder $(DLDER)/


run: run-front run-db run-gate run-dbops run-dlder

run-front:
	docker run -p 1050:80 --name frontc front

run-db:
	docker run -v DataInsects:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -p 5432:5432 --name postgresc postgres

run-gate:
	docker run -p 4000:80 --name apigatec apigate

run-dbops:
	docker run -p 4001:80 --name dbopsc --link postgresc dbops
	
run-dlder:
	docker run -p 4002:80 --name dlderc dlder


stop: stop-front stop-db stop-gate stop-dbops stop-dlder

stop-front:
	docker stop frontc

stop-db:
	docker stop postgresc

stop-gate:
	docker stop apigatec

stop-dbops:
	docker stop dbopsc
	
stop-dlder:
	docker stop dlderc


clean: clean-front clean-db clean-gate clean-dbops clean-dlder

clean-front:
	docker rm frontc

clean-db:
	docker rm postgresc

clean-gate:
	docker rm apigatec

clean-dbops:
	docker rm dbopsc
	
clean-dlder:
	docker rm dlderc
