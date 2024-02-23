class CreateCatches < ActiveRecord::Migration[7.1]
  def change
    create_table :catches do |t|
      t.references :catcher, null: false
      t.references :catchee, null: false

      t.timestamps
    end

    add_foreign_key :catches, :players, column: :catcher_id
    add_foreign_key :catches, :players, column: :catchee_id
  end
end
