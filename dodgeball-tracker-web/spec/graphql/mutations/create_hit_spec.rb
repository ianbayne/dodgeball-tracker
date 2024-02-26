# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Mutations::CreateHit, type: :request do
  describe 'resolve' do
    it 'creates a hit ' do
      hitter = create(:player)
      hittee = create(:player)

      expect do
        post '/graphql', params: { query: query(hitter_id: hitter.id, hittee_id: hittee.id) }
      end.to change { Hit.count }.by(1)
    end

    it 'returns a hit' do
      hitter = create(:player)
      hittee = create(:player)

      post '/graphql', params: { query: query(hitter_id: hitter.id, hittee_id: hittee.id) }
      json = JSON.parse(response.body)
      data = json['data']['createHit']['hit']

      expect(data).to include(
        'id' => be_present,
        '__typename' => 'Hit',
        'hitter' => { 'id' => hitter.id.to_s },
        'hittee' => { 'id' => hittee.id.to_s }
      )
    end
  end

  def query(hitter_id:, hittee_id:)
    <<~GQL
      mutation {
        createHit(input: { hitterId: #{hitter_id}, hitteeId: #{hittee_id} }) {
          hit {
            id
            __typename
            hitter {
              id
            }
            hittee {
              id
            }
          }
        }
      }
    GQL
  end
end
# rubocop:enable Metrics/BlockLength
