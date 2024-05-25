require 'rails_helper'

RSpec.describe Hit, type: :model do
  describe 'validations' do
    it 'is only valid with both a hitter and a hittee' do
      player_1 = create(:player)
      player_2 = create(:player)

      hit = build(:hit, hitter: nil, hittee: nil)

      expect(hit).not_to be_valid

      hit.hitter = player_1
      expect(hit).not_to be_valid

      hit.hittee = player_2
      expect(hit).to be_valid
    end


    it 'cannot have the same player as both hitter and hittee' do
      player = create(:player)
      hit = build(:hit, hitter: player, hittee: player)

      expect(hit).not_to be_valid
      expect(hit.errors.messages[:hitter]).to eq ['must be a different player than the hittee']
      expect(hit.errors.messages[:hittee]).to eq ['must be a different player than the hitter']
    end

    it 'is valid when hitter and hittee are different players' do
      player_1 = create(:player)
      player_2 = create(:player)
      hit = build(:hit, hitter: player_1, hittee: player_2)

      expect(hit).to be_valid
    end
  end
end
