module Routes
  module V1
    class Games < Cuba
      define do
        require_login!

        on post, root do
          result = Services::Games::Create.perform(current_user, json_params)

          if result
            render_json(Presenters::Game.details(result))
          else
            render_errors(result)
          end
        end

        on 'current' do
          on root do
            service = Services::Games::Current.perform(current_user)

            if (game = service.perform)
              render_json(Presenters::Game.details(game))
            else
              # service.errors
              not_found
            end
          end

          on 'players' do
            on post do
              res.status = 204
              halt(res.finish)
            end

            on ':id' do |id|
              on put do
                res.status = 204
                halt(res.finish)
              end
            end
          end
        end
      end
    end
  end
end
