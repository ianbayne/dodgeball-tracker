# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: 'Fetches an object given its ID.' do
      argument :id, ID, required: true, description: 'ID of the object.'
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, { null: true }], null: true,
                                                     description: 'Fetches a list of objects given a list of IDs.' do
      argument :ids, [ID], required: true, description: 'IDs of the objects.'
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :players, [Types::PlayerType], null: false do
      argument :search, String, required: false
    end
    field :player, Types::PlayerType, null: false do
      argument :id, ID, required: true
    end

    def players(search: nil)
      if search
        Player.where('first_name ILIKE ? OR last_name ILIKE ?', "%#{search}%", "%#{search}%").excluding(Player.first)
      else
        Player.all
      end
    end

    def player(id:)
      Player.find(id)
    end
  end
end
