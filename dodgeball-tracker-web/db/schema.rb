# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_02_23_123246) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "catches", force: :cascade do |t|
    t.bigint "catcher_id", null: false
    t.bigint "catchee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["catchee_id"], name: "index_catches_on_catchee_id"
    t.index ["catcher_id"], name: "index_catches_on_catcher_id"
  end

  create_table "hits", force: :cascade do |t|
    t.bigint "hitter_id", null: false
    t.bigint "hittee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hittee_id"], name: "index_hits_on_hittee_id"
    t.index ["hitter_id"], name: "index_hits_on_hitter_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "catches", "players", column: "catchee_id"
  add_foreign_key "catches", "players", column: "catcher_id"
  add_foreign_key "hits", "players", column: "hittee_id"
  add_foreign_key "hits", "players", column: "hitter_id"
end
