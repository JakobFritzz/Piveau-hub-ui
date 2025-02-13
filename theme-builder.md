
## Piveau Theme builder

Given that the highly optimized files generated by vue.js are not suitable for creating Themes on runtime, the closest approach to have a "Theme" is to build the distribution files from source files.

Such theme consists of a reduced set of files that can be modified with a minimal understanding of CSS and HTML.

In this case this is achieved by encapsulating most of the needed vue.js files into a docker image. Users only need to modify the folders "src" and "static". Everything (eg. package.json, node modules, translations, configuration updates) else will be automatically delivered through the docker images.


## Development

1. Use the theme-builder-docker-compose-dev.yml to launch the needed containers with the corresponding volumes.

```
git clone https://gitlab.com/piveau/hub/piveau-hub-ui
cd piveau-hub-ui
sudo docker-compose -f theme-builder-docker-compose-dev.yml up
```

If you want to specify a file with environment variables you can use the following command. The file theme-env.sample is an example for this.

```
sudo docker-compose -f theme-builder-docker-compose-dev.yml --env-file ./.env.local up
```

Note: if you want to keep the container running in background, you can start it with the option detached:

```
sudo docker-compose -f theme-builder-docker-compose-dev.yml up -d
```

2. Wait until the server starts (This will take a while). An instance of piveau-hub-ui will be launched in the port 17085.

3. Edit the contents of the local folders 'src' and 'static' to adopt the UI.

4. You should see the changes live in [http://localhost:17085](http://localhost:17085)



## Deployment

1. Use the dockerfile to create an image with your optimized theme.

```
docker build theme-builder-deploy-dockerfile -f .
```

2. The resulting docker image will contain an optimized version of piveau-ui with your customization.

3. Register / deploy the image with the method of your preference.
