# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Player, type: :model do
  describe 'validations' do
    it 'must have a first name' do
      player = build(:player, first_name: nil)

      player.valid?

      expect(player.errors.where(:first_name)).to be_present
    end

    it 'must have a last name' do
      player = build(:player, last_name: nil)

      player.valid?

      expect(player.errors.where(:last_name)).to be_present
    end

    it 'is valid with a first and last name' do
      player = build(:player, first_name: 'test_first_name', last_name: 'test_last_name')

      expect(player).to be_valid
    end
  end
end
