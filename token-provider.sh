#!/bin/bash

PROVIDER_TOKEN=${{inputs.providerToken}} node node-file-upload/index.js > __fileResponse.txt
        outputstr=$(head -n 1  __fileResponse.txt)
        required_string="https"
        echo $outputstr

        if [[ "$outputstr" == "$required_string"* ]]; then
            echo "RESOURCE_URL=$outputstr" >> $GITHUB_ENV
        else
            echo "RESOURCE_URL=false" >> $GITHUB_ENV
        fi