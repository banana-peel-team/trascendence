module Presenters
  module User
    def self.auth(data)
      user = data[:user]

      {
        user: {
          username: user.username
        }
      }
    end
  end
end
