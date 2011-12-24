set :application, "the-city"
set :repository,  "git://github.com/kiba/the-city.git"
set :deploy_to, "/home/kiba/projects/the-city"
set :scm, :git
set :use_sudo, false
set :branch, "master"

server "the-city.kibabase.com", :app, :primary => true
