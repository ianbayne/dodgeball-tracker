# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe 'Query players', type: :request do
  describe 'resolve' do
    it 'returns all players' do
      player1 = create(:player)
      player2 = create(:player)

      post '/graphql', params: { query: }
      json = JSON.parse(response.body)
      data = json['data']['players']

      expect(data).to eq([{
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

  def query
    <<~GQL
      query {
        players {
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
