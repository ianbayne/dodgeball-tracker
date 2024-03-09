# frozen_string_literal: true

class Catch < ApplicationRecord
  belongs_to :catcher, class_name: 'Player'
  belongs_to :catchee, class_name: 'Player'

  validates :catcher, comparison: { other_than: :catchee, message: 'must be a different player than the catchee' }
  validates :catchee, comparison: { other_than: :catcher, message: 'must be a different player than the catcher' }
end
