module Routes
  module V1
    class User < Cuba
      define do
        on(post, 'signin') do
          result = Services::Users::Signin.perform(
            json_params['username'], json_params['password']
          )

          if result
            render_json(Presenters::User.auth(result))
          else
            res.status = 422
            halt(res.finish)
          end
        end

        on(post, 'register') do
          result = Services::Users::Signup.perform(
            json_params['username'], json_params['password']
          )

          if result
            render_json(Presenters::User.auth(result))
          else
            res.status = 422
            render_json({})
          end
        end
      end
    end
  end
end
