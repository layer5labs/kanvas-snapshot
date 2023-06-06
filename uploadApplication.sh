# ENV Variables expected
# MESHERY_SERVER_BASE_URL
# UPLOAD_TYPE: can be "Kubernetes Manifest" | "Helm Chart" | "Docker Compose"
# PROVIDER_TOKEN: MESHERY provider token

# get Meshery application file as escaped yaml str
MESHERY_APPLICATION_FILE=$(awk '{printf "%s\\n", $0}' __intermediate_file.yml)

# convert to uri-encoded str
UPLOAD_TYPE=$(printf %s "$UPLOAD_TYPE" | jq -sRr @uri)

curl "$MESHERY_SERVER_BASE_URL/api/application/$UPLOAD_TYPE" \
  -H 'Accept: */*' \
  -H 'Connection: close' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H "Cookie: meshery-provider=Meshery; token=$PROVIDER_TOKEN;" \
  --data-raw "{\"save\":true, \"application_data\": {\"application_file\":\"$MESHERY_APPLICATION_FILE\"}}" \
  --compressed --trace-ascii - | jq ".[0].id"

