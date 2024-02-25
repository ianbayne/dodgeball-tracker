# frozen_string_literal: true

module Types
  class CatchType < Types::BaseObject
    field :id, ID, null: false
    field :catcher, Types::PlayerType, null: false
    field :catchee, Types::PlayerType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
