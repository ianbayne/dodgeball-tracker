class CreateCatches < ActiveRecord::Migration[7.1]
  def change
    create_table :catches do |t|
      t.references :catcher, null: false, foreign_key: { to_table: :players }
      t.references :catchee, null: false, foreign_key: { to_table: :players }

      t.timestamps
    end
  end
end
