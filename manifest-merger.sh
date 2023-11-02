touch __intermediate_file.yml
for file in $FILE_PATH/*; do # FILE_PATH is the environment variable
  echo $file
  if [[ $file == *yaml ]] ||  [[ $file == *yml ]]
  then 
    cat $file >> __intermediate_file.yml
    echo "\n---\n" >> __intermediate_file.yml
  fi
done;
