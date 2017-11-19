module Services
  module Games
    module Create
      def self.perform(user, params)
        # TODO: validate
        {
          game: Game.create(game_params(user, params)),
          valid: true
        }
      end

      def self.game_params(user, params)
        params.merge(
          creator: user.username,
          is_active: true,
          start_time: Time.now.utc,
          current_turn: 0
        )
      end
      private_class_method :game_params
    end
  end
end
