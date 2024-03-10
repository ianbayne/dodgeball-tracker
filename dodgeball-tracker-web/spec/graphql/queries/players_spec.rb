# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe 'Query players', type: :request do
  describe 'resolve' do
    context 'when no arguments' do
      it 'returns all players' do
        player1 = create(:player)
        player2 = create(:player)

        post '/graphql', params: { query: }
        json = JSON.parse(response.body)
        players = json['data']['players']

        expect(players).to eq([{
                                'id' => player1.id.to_s,
                                '__typename' => 'Player',
                                'firstName' => player1.first_name,
                                'lastName' => player1.last_name
                              }, {
                                'id' => player2.id.to_s,
                                '__typename' => 'Player',
                                'firstName' => player2.first_name,
                                'lastName' => player2.last_name
                              }])
      end
    end

    context 'when arguments' do
      it 'returns players with matching names' do
        bob_brown = create(:player, first_name: 'Bob', last_name: 'Brown')
        bob_smith = create(:player, first_name: 'Bob', last_name: 'Smith')
        _brian_brown = create(:player, first_name: 'Brian', last_name: 'Brown')

        post '/graphql', params: { query: query('Bob') }
        json = JSON.parse(response.body)
        players = json['data']['players']

        expect(players.count).to eq 2
        expect(players).to eq([{
                                'id' => bob_brown.id.to_s,
                                '__typename' => 'Player',
                                'firstName' => bob_brown.first_name,
                                'lastName' => bob_brown.last_name
                              }, {
                                'id' => bob_smith.id.to_s,
                                '__typename' => 'Player',
                                'firstName' => bob_smith.first_name,
                                'lastName' => bob_smith.last_name
                              }])
      end
    end
  end

  def query(search_term = nil)
    <<~GQL
      query {
        players(search: "#{search_term}") {
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
