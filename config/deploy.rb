set :application, "the-city"
set :repository,  "git://github.com/kiba/repos/the-city.git"
set :deploy_to, "/home/kiba/projects/thecity"
set :scm, :git
set :use_sudo, false
set :branch, "master"

server "thecity.kibabase.com", :app, :primary => true
