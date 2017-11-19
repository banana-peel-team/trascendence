module Presenters
  module Game
    def self.details(data)
      game = data[:game]

      {
        game: {
          name: game.name,
          players: []
        },
        errors: []
      }
    end
  end
end
