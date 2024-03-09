# frozen_string_literal: true

class Hit < ApplicationRecord
  belongs_to :hitter, class_name: 'Player'
  belongs_to :hittee, class_name: 'Player'

  validates :hitter, comparison: { other_than: :hittee, message: 'must be a different player than the hittee' }
  validates :hittee, comparison: { other_than: :hitter, message: 'must be a different player than the hitter' }
end
