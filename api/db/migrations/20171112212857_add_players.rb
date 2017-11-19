Sequel.migration do
  up do
    create_table(:users) do
      primary_key(:username, String)

      column(:encrypted_password, String, null: false)
      column(:salt, String, null: false)
    end

    create_table(:games) do
      primary_key(:id)

      foreign_key(:creator, :users, type: String, null: false)

      column(:name, String, null: false)
      column(:is_active, :boolean, null: false)

      column(:start_time, DateTime, null: false)
      column(:end_time, DateTime)
      column(:current_turn, :integer, null: false)
    end

    create_table(:players) do
      primary_key(:id)

      foreign_key(:username, :users, type: String, null: false)
      foreign_key(:game_id, :games, null: false)

      column(:life, :integer, null: false)
      column(:is_winner, :boolean)
    end
  end

  down do
    drop_table(:players)
    drop_table(:games)
    drop_table(:users)
  end
end
