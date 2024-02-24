# frozen_string_literal: true

class Catch < ApplicationRecord
  belongs_to :catcher, class_name: 'Player'
  belongs_to :catchee, class_name: 'Player'

  validate :catcher_and_catchee_must_be_different

  private

  def catcher_and_catchee_must_be_different
    errors.add(:base, 'Catcher and catchee must be different players') if catcher == catchee
  end
end
