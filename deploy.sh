#!/bin/bash

echo "Deploying Frontend"
cd FrontEnd

echo "Installing dependencies"
npm install

echo "Building Frontend"
npm run build

echo "Deploying Frontend to VPS"

# Using sshpass to automate the password entry for scp
scp -r dist/* root@88.222.213.64:/var/www/funboyprojects.com

echo "Frontend deployed successfully"

cd ..