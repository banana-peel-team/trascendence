module Services
  module Games
    module Current
      def self.perform(user)
        Game.new
      end
    end
  end
end
