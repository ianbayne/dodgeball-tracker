require 'rails_helper'

RSpec.describe Catch, type: :model do
  describe 'validations' do
    it 'cannot have the same player as both catcher and catchee' do
      player = create(:player)
      catch = build(:catch, catcher: player, catchee: player)

      catch.valid?

      expect(catch.errors.messages[:catcher]).to eq ['must be a different player than the catchee']
      expect(catch.errors.messages[:catchee]).to eq ['must be a different player than the catcher']
    end
  end
end
