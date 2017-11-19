require 'cuba'

require './app/application'

require_relative 'helpers/common_helper'

Cuba.plugin(Helpers::CommonHelper)

require_relative 'routes/v1/users'
require_relative 'routes/v1/games'

Cuba.define do
  on('v1/users') { run Routes::V1::Users }
  on('v1/games') { run Routes::V1::Games }
end
