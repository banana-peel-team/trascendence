require 'rubygems'
require 'bundler/setup'

if ENV['RACK_ENV'] == 'development'
  require 'logger'
  DB.logger = Logger.new(STDERR)
end
