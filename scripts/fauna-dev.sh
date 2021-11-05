#!/usr/bin/env bash

KEY=secret
ENDPOINT_NAME=localhost
FAUNA_PORT=8443

docker pull fauna/faunadb
docker container stop faunadb || true && docker container rm faunadb || true
CID=$(docker run --name faunadb -d \
  --health-cmd="faunadb-admin status" --health-interval=2s \
  -p 8443:8443 \
  -p 8084:8084 \
  fauna/faunadb)

./scripts/wait-for-healthy.sh faunadb 30

ENDPOINT_EXIST=$(fauna list-endpoints | grep ${ENDPOINT_NAME})

if [ -z "$ENDPOINT_EXIST" ]
then
  echo n | fauna add-endpoint http://localhost:8443/ --alias ${ENDPOINT_NAME} --key ${KEY}
else
  echo "endpoint ${ENDPOINT_NAME} already exist"
fi

fauna create-database notes --endpoint ${ENDPOINT_NAME} --secret ${KEY}
OUTPUT=$(fauna create-key notes --endpoint ${ENDPOINT_NAME} --secret ${KEY})

[[ "${OUTPUT}" =~ secret\:[[:space:]]([A-Za-z0-9_\-]+) ]]

echo "${OUTPUT}"

SECRET="${BASH_REMATCH[1]}"
echo "Secret: ${SECRET}"
echo "Docker container: $CID"

DOCKER_IP=$(docker inspect $CID | grep '"IPAddress"' | head -n 1)
DOCKER_IP=$(echo $DOCKER_IP | sed -E -e 's/ |"|:|,|IPAddress//g')

echo "Docker IP: ${DOCKER_IP}"

echo "JWT_SECRET=test
FAUNADB_SCHEME=http
FAUNA_ADMIN_KEY=${SECRET}
FAUNADB_PORT=${FAUNA_PORT}
FAUNADB_DOMAIN=${DOCKER_IP}" > ".env.test";
