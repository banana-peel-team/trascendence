require 'rubygems'
require 'bundler/setup'
require 'sequel'

DB = Sequel.connect(ENV.fetch('DATABASE_URL'))
DB.extension(:freeze_datasets)

require_relative 'models'
require_relative 'services'

if ENV['RACK_ENV'] == 'development'
  require 'logger'
  DB.logger = Logger.new(STDERR)
end
