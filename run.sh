#!/usr/bin/env bash
set -e -o pipefail

name="ui-react-docs"
url="ui-react-docs.kibalabs.com"
dockerImageName="ghcr.io/kibalabs/ui-react-docs"
dockerTag="latest"
dockerImage="${dockerImageName}:${dockerTag}"
version="$(git rev-list --count HEAD)"
varsFile=~/.${name}.vars

touch ${varsFile}
docker pull ${dockerImage}
docker stop ${name} && docker rm ${name} || true
docker run \
    --name ${name} \
    --detach \
    --publish-all \
    --restart on-failure \
    --env NAME=$name \
    --env VERSION=$version \
    --env VIRTUAL_HOST=$url \
    --env LETSENCRYPT_HOST=$url \
    --env-file ${varsFile} \
    ${dockerImage}
