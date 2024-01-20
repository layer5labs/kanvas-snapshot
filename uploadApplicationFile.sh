#!/bin/bash
# ENV Variables expected
# MESHERY_SERVER_BASE_URL
# UPLOAD_TYPE: can be "Kubernetes Manifest" | "Helm Chart" | "Docker Compose"
# PROVIDER_TOKEN: MESHERY provider token

function convertToASCII() {
    data="$1"
    echo "$data" >&2
    convertedPattern=([)
        for ((i=0; i < "${#data}"; i++)); do
        character="${data:i:1}"
        a=$(printf "%d" "'$character")
        if (( $i == ${#data} - 1 )); then
            convertedPattern=(${convertedPattern[@]}"$a")
        else    
            convertedPattern=(${convertedPattern[@]}"$a,")
        fi
        done
    convertedPattern=(${convertedPattern[@]}"]")
    echo "${convertedPattern[@]}"
}

# convert Meshery Pattern file into bytes.
MESHERY_PATTERN_FILE=$(convertToASCII "$(cat __intermediate_file.yml)")

# # convert to uri-encoded str
UPLOAD_TYPE=$(printf %s "$UPLOAD_TYPE" | jq -sRr @uri)

curl "$MESHERY_SERVER_BASE_URL/api/pattern/$UPLOAD_TYPE" \
  -H 'Accept: */*' \
  -H 'Connection: close' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H "Cookie: meshery-provider=Meshery; token=$PROVIDER_TOKEN;" \
  --data-raw "{\"save\":true, \"pattern_data\": {\"pattern_file\": $MESHERY_PATTERN_FILE}}" \
  --compressed | jq ".[0].id"

