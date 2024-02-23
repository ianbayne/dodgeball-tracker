class CreateHits < ActiveRecord::Migration[7.1]
  def change
    create_table :hits do |t|
      t.references :hitter, null: false
      t.references :hittee, null: false

      t.timestamps
    end

    add_foreign_key :hits, :players, column: :hitter_id
    add_foreign_key :hits, :players, column: :hittee_id
  end
end
