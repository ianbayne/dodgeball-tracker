require 'rails_helper'

RSpec.describe Catch, type: :model do
  describe 'validations' do
    it 'is only valid with both a catcher and a catchee' do
      player_1 = create(:player)
      player_2 = create(:player)

      catch = build(:catch, catcher: nil, catchee: nil)

      expect(catch).not_to be_valid

      catch.catcher = player_1
      expect(catch).not_to be_valid

      catch.catchee = player_2
      expect(catch).to be_valid
    end

    it 'is invalid when both catcher and catchee are same player' do
      player = create(:player)
      catch = build(:catch, catcher: player, catchee: player)

      expect(catch).not_to be_valid
      expect(catch.errors.messages[:catcher]).to eq ['must be a different player than the catchee']
      expect(catch.errors.messages[:catchee]).to eq ['must be a different player than the catcher']
    end

    it 'is valid when catcher and catchee are different players' do
      player_1 = create(:player)
      player_2 = create(:player)
      catch = build(:catch, catcher: player_1, catchee: player_2)

      expect(catch).to be_valid
    end
  end
end
