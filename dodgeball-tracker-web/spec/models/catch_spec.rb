require 'rails_helper'

RSpec.describe Catch, type: :model do
  describe 'validations' do
    it 'cannot have the same player as both catcher and catchee' do
      player = create(:player)
      catch = build(:catch, catcher: player, catchee: player)

      catch.valid?

      expect(catch.errors.messages[:base]).to eq ['Catcher and catchee must be different players']
    end
  end
end
