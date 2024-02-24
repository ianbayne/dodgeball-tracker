require 'rails_helper'

RSpec.describe Hit, type: :model do
  describe 'validations' do
    it 'cannot have the same player as both hitter and hittee' do
      player = create(:player)
      hit = build(:hit, hitter: player, hittee: player)

      hit.valid?

      expect(hit.errors.messages[:base]).to eq ['Hitter and hittee must be different players']
    end
  end
end
