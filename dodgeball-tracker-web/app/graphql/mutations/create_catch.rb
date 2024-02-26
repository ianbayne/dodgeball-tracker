# frozen_string_literal: true

module Mutations
  class CreateCatch < BaseMutation
    # TODO: Should this be the return field?
    # type Types::CatchType
    field :catch, Types::CatchType, null: false
    # TODO: Or these?
    # field :id, ID, null: false
    # field :catcher, Types::PlayerType, null: false
    # field :catchee, Types::PlayerType, null: false

    argument :catcher_id, ID, required: true
    argument :catchee_id, ID, required: true

    # TODO: Change to `resolve(catcher_id:, catchee_id)`?
    def resolve(args = {})
      catch = create_catch(args)
      catch_errors = catch.errors.full_messages.join(', ')
      raise GraphQL::ExecutionError, catch_errors if catch.errors.present?

      { catch: }
    end

    private

    def create_catch(attributes)
      Catch.create(catcher_id: attributes.fetch(:catcher_id, nil),
                   catchee_id: attributes.fetch(:catchee_id, nil))
    end
  end
end
