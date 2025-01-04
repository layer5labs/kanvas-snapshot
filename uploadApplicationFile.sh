#!/bin/bash
# ENV Variables expected
# MESHERY_SERVER_BASE_URL
# UPLOAD_TYPE: can be "Kubernetes Manifest" | "Helm Chart" | "Docker Compose" | "Meshery Design" 
# PROVIDER_TOKEN: MESHERY provider token

# Get Meshery pattern file as escaped YAML string
MESHERY_PATTERN_FILE=$(pattern_file=$(cat __intermediate_file.yml) node ./action/normalize-configuration-file/index.js)

# Convert to URI-encoded string
UPLOAD_TYPE=$(printf %s "$UPLOAD_TYPE" | jq -sRr @uri)

# Step 1: Perform the curl request and save the response to a file
RESPONSE_FILE="upload_design_response.log"
curl "$MESHERY_SERVER_BASE_URL/api/pattern/$UPLOAD_TYPE" \
  -H 'Accept: */*' \
  -H 'Connection: close' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H "Cookie: meshery-provider=Meshery; token=$MESHERY_TOKEN;" \
  --data-raw "{\"save\":true, \"pattern_data\": {\"pattern_file\":$MESHERY_PATTERN_FILE}}" \
  --compressed > "$RESPONSE_FILE"

# Step 2: Log the response to the console
echo "Raw response logged to $RESPONSE_FILE:"
cat "$RESPONSE_FILE"

# Step 3: Pass the response content to jq
echo "Processing response with jq..."
jq ".[0].id" < "$RESPONSE_FILE"
