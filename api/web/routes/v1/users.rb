module Routes
  module V1
    class Users < Cuba
      define do
        on post, 'register' do
          render_json({
            user: { username: 'test' }
          })
        end

        on post, 'signin' do
          render_json({
            user: { username: 'test' }
          })
        end
      end
    end
  end
end
