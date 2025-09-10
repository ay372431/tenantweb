#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/*.js 
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_AUTH_URL|'${VUE_APP_AUTH_URL}'|g' $file
  sed -i 's|VUE_APP_TENANT_URL|'${VUE_APP_TENANT_URL}'|g' $file
  sed -i 's|VUE_APP_MANAGE_URL|'${VUE_APP_MANAGE_URL}'|g' $file
  sed -i 's|VUE_APP_SERVER_URL|'${VUE_APP_SERVER_URL}'|g' $file

done
echo "Starting Nginx"
nginx -g 'daemon off;'