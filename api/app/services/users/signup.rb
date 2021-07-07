require 'bcrypt'

module Services
  module Users
    module Signup
      def self.perform(username, password)
        User.create(username: username) do |user|
          user.salt = BCrypt::Engine.generate_salt
          user.encrypted_password = BCrypt::Engine.hash_secret(
            password, user.salt
          )
        end
      end

      def password=(value)
      end
    end
  end
end
