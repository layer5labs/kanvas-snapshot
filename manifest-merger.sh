touch __intermediate_file.yml
echo $FILE_PATH
if [[ -d $FILE_PATH ]]; then
  for file in $FILE_PATH/*; do # FILE_PATH is the environment variable
    echo $file
    if [[ $file == *yaml ]] ||  [[ $file == *yml ]]
    then 
      cat $file >> __intermediate_file.yml
      echo "---" >> __intermediate_file.yml
    fi
  done;
else
 cat $FILE_PATH >> __intermediate_file.yml
fi
