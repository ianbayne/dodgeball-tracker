# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe 'Query player', type: :request do
  describe 'resolve' do
    it 'returns queried player' do
      player1 = create(:player)
      _player2 = create(:player)

      post '/graphql', params: { query: query(player_id: player1.id) }
      json = JSON.parse(response.body)
      data = json['data']['player']

      expect(data).to eq(
        'id' => player1.id.to_s,
        '__typename' => 'Player',
        'firstName' => player1.first_name,
        'lastName' => player1.last_name
      )
    end
  end

  def query(player_id:)
    <<~GQL
      query {
        player(id: #{player_id}) {
          id
          __typename
          firstName
          lastName
        }
      }
    GQL
  end
end
# rubocop:enable Metrics/BlockLength
