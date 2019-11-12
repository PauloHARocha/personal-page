# Deploy heroku 
## commands https://devcenter.heroku.com/articles/heroku-cli-commands

## install
`brew tap heroku/brew && brew install heroku`      
`heroku plugins:install @heroku-cli/plugin-container-registry`   

## login
`heroku container:login`

## create app
`heroku create`

## push container to app
`heroku container:push web`

## start container (release)
`heroku container:release web`

## open app on browser
`heroku open`

## get logs
`heroku logs`

## stop container (rm)
`heroku container:rm web`

## rename app
`heroku apps:rename --app oldname newname`