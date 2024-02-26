# frozen_string_literal: true

require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Mutations::CreateCatch, type: :request do
  describe 'resolve' do
    it 'creates a catch ' do
      catcher = create(:player)
      catchee = create(:player)

      expect do
        post '/graphql', params: { query: query(catcher_id: catcher.id, catchee_id: catchee.id) }
      end.to change { Catch.count }.by(1)
    end

    it 'returns a catch' do
      catcher = create(:player)
      catchee = create(:player)

      post '/graphql', params: { query: query(catcher_id: catcher.id, catchee_id: catchee.id) }
      json = JSON.parse(response.body)
      data = json['data']['createCatch']['catch']

      expect(data).to include(
        'id' => be_present,
        '__typename' => 'Catch',
        'catcher' => { 'id' => catcher.id.to_s },
        'catchee' => { 'id' => catchee.id.to_s }
      )
    end
  end

  def query(catcher_id:, catchee_id:)
    <<~GQL
      mutation {
        createCatch(input: { catcherId: #{catcher_id}, catcheeId: #{catchee_id} }) {
          catch {
            id
            __typename
            catcher {
              id
            }
            catchee {
              id
            }
          }
        }
      }
    GQL
  end
end
# rubocop:enable Metrics/BlockLength
