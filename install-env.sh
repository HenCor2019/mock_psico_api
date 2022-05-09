#!/bin/bash

echo "Setting enviroment..."

while read line; do
  heroku config:set $line
done < .env

echo "Heroku enviroments are ready."

