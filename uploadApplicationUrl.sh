#!/bin/bash
# ENV Variables expected
# MESHERY_SERVER_BASE_URL
# UPLOAD_TYPE: can be "Kubernetes Manifest" | "Helm Chart" | "Docker Compose"
# PROVIDER_TOKEN: MESHERY provider token
# UPLOAD_URL: Pattern's url upload link

# # convert to uri-encoded str
UPLOAD_TYPE=$(printf %s "$UPLOAD_TYPE" | jq -sRr @uri)

curl "$MESHERY_SERVER_BASE_URL/api/pattern/$UPLOAD_TYPE" \
  -H 'Accept: */*' \
  -H 'Connection: close' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H "Cookie: meshery-provider=Meshery; token=$MESHERY_TOKEN;" \
  --data-raw "{\"save\":true, \"url\": \"$UPLOAD_URL\"}" \
  --compressed | jq ".[0].id"
