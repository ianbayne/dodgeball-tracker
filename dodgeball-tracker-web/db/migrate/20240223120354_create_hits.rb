class CreateHits < ActiveRecord::Migration[7.1]
  def change
    create_table :hits do |t|
      t.references :hitter, null: false, foreign_key: { to_table: :players }
      t.references :hittee, null: false, foreign_key: { to_table: :players }

      t.timestamps
    end
  end
end
