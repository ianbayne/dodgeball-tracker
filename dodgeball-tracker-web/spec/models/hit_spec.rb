require 'rails_helper'

RSpec.describe Hit, type: :model do
  describe 'validations' do
    it 'cannot have the same player as both hitter and hittee' do
      player = create(:player)
      hit = build(:hit, hitter: player, hittee: player)

      hit.valid?

      expect(hit.errors.messages[:hitter]).to eq ['must be a different player than the hittee']
      expect(hit.errors.messages[:hittee]).to eq ['must be a different player than the hitter']
    end
  end
end
