set :application, "the-city"
set :repository, "file:///home/kiba/repos/the-city"
set :local_repository, "git+ssh://bitcoinweekly.com/home/kiba/repos/the-city"
set :deploy_to, "/home/kiba/projects/thecity"
set :scm, :git
set :use_sudo, false
set :branch, "master"

server "thecity.kibabase.com", :app, :primary => true
