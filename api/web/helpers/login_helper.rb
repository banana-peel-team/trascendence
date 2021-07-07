module Helpers
  module LoginHelper
    def signed_in?
      current_user
    end

    def unauthorized!
      res.status = 422

      halt(res.finish)
    end

    def require_login!
      return if signed_in?

      res.status = 403

      halt(res.finish)
    end

    def current_user
      User.where(username: req.env['HTTP_USER_ID']).first
    end
  end
end
