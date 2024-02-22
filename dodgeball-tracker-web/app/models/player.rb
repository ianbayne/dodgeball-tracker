# frozen_string_literal: true

class Player < ApplicationRecord
  with_options presence: true do
    validates :first_name
    validates :last_name
  end
end
