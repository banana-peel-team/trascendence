require 'spec_helper'
require_relative 'support/web'

require 'cuba'
require 'rack/test'
require 'capybara/rspec'
require './web/server.rb'

Capybara.app = Cuba

RSpec.configure do |config|
  config.include(Rack::Test::Methods)
  config.include(Support::Web)
end
