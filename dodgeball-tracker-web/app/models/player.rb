# frozen_string_literal: true

class Player < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  with_options presence: true do
    validates :first_name
    validates :last_name
  end

  # TODO: What happens when this player is destroyed?
  has_many :hits, foreign_key: 'hitter_id'
  has_many :times_hit, class_name: 'Hit', foreign_key: 'hittee_id'

  has_many :catches, foreign_key: 'catcher_id'
  has_many :times_caught, class_name: 'Catch', foreign_key: 'catchee_id'
end
