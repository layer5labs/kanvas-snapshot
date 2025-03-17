#!/bin/bash
# ENV Variables expected:
# MESHERY_CLOUD_API_URL: Base URL of the Layer5 Cloud API (e.g., "https://cloud.layer5.io")
# PROVIDER_TOKEN: Meshery provider authentication token
# EMAIL: Recipient email address
# IMAGE_URI: The URI of the snapshot image


response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$MESHERY_CLOUD_API_URL/api/snapshot/email" \
  -H 'Accept: application/json' \
  -H 'Connection: close' \
  -H 'Content-Type: application/json' \
  -H "Cookie: provider_token=$PROVIDER_TOKEN" \
  --data-raw "{
    \"to\": \"$EMAIL\",
    \"subject\": \"Kanvas Design Snapshot\",
    \"imageURI\": \"$IMAGE_URI\"
  }" \
  --compressed)

# Check HTTP status code
if [ "$response" -eq 200 ]; then
  echo "Email sent"
else
  echo "Failed to send email. HTTP response code: $response"
fi
