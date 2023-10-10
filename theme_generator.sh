#!/bin/bash

# Check if an argument was provided
if [ $# -eq 0 ]; then
    echo "Usage: enter a project name in quotation marks like so \"input string\""
    echo "$0  \"input string\""
    exit 1
fi

# Convert input string to lowercase and replace spaces with hyphens
input_string="$1"
slug=$(echo "$input_string" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9-' '-' | sed 's/-$//;s/^-//')

echo "Generated slug: $slug"

theme_name=theme-$slug

# git clone git@gitlab.fokus.fraunhofer.de:piveau/hub/piveau-hub-ui.git theme-$theme_name
# cd $theme_name

git checkout -b $theme_name

rm -r config images public tests types
rm -r babel.config.js .browserslistrc CONTRIBUTING.md cypress.json Dockerfile .dockerignore .editorconfig .eslintignore .eslintrc.js index.html jest.config.js nginx.vh.default.conf .npmrc .nvmrc package.json package-lock.json README.md runtimeconfig.sh theme_generator.sh theme-run-dev.sh tsconfig.json vite.config.ts

read -p "Do you want to push this brach to origin? Type 'y' or 'n': " user_input

if [ "$user_input" != "y" ]; then
    echo "Operation aborted."
    exit 1
else
  git push origin $theme_name
fi

echo "**************"
echo "All done"
echo "**************"
echo "To launch the theme editor enter:"
echo "sudo docker-compose -f theme-builder-docker-compose-dev.yml --env-file ./theme-env.sample up"
echo "**************"
echo ""
