module Routes
  module V1
    class Games < Cuba
      define do
        on post, root do
          res.status = 201
          render_json({
            game: {
              _id: "game-id",
              name: 'test'
            }
          })
        end

        on 'current' do
          on root do
            render_json({
              game: {
                _id: "game-id",
                name: 'test'
              }
            })
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
