# frozen_string_literal: true

class Hit < ApplicationRecord
  belongs_to :hitter, class_name: 'Player'
  belongs_to :hittee, class_name: 'Player'
end
