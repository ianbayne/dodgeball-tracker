# frozen_string_literal: true

class Catch < ApplicationRecord
  belongs_to :catcher, class_name: 'Player'
  belongs_to :catchee, class_name: 'Player'
end
