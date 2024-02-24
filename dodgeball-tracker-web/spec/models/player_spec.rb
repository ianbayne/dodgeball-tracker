# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
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

  describe 'associations' do
    it 'can have many hits' do
      hitter = create(:player)
      hittee = create(:player)
      hitter.hits.build([{ hittee: }, { hittee: }])

      hitter.save

      expect(hitter.errors).to be_empty
    end

    it 'can have many times_hit' do
      hittee = create(:player)
      hitter = create(:player)
      hittee.times_hit.build([{ hitter: }, { hitter: }])

      hittee.save

      expect(hittee.errors).to be_empty
    end

    it 'can have many catches' do
      catcher = create(:player)
      catchee = create(:player)
      catcher.catches.build([{ catchee: }, { catchee: }])

      catcher.save

      expect(catcher.errors).to be_empty
    end

    it 'can have many times_caught' do
      catchee = create(:player)
      catcher = create(:player)
      catchee.times_caught.build([{ catcher: }, { catcher: }])

      catchee.save

      expect(catchee.errors).to be_empty
    end
  end
end
# rubocop:enable Metrics/BlockLength
