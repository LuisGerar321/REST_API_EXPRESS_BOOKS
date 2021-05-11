#!/bin/bash
sudo chmod 777 -R /var/www/html/
cd /var/www/html

npm install
pm2 start app.js