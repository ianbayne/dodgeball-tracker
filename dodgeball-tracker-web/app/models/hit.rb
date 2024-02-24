# frozen_string_literal: true

class Hit < ApplicationRecord
  belongs_to :hitter, class_name: 'Player'
  belongs_to :hittee, class_name: 'Player'

  validate :hitter_and_hittee_must_be_different

  private

  def hitter_and_hittee_must_be_different
    errors.add(:base, 'Hitter and hittee must be different players') if hitter == hittee
  end
end
