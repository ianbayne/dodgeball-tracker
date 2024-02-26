# frozen_string_literal: true

module Mutations
  class CreateHit < BaseMutation
    # TODO: Should this be the return field?
    # type Types::HiType
    field :hit, Types::HitType, null: false
    # TODO: Or these?
    # field :id, ID, null: false
    # field :hitter, Types::PlayerType, null: false
    # field :hittee, Types::PlayerType, null: false

    argument :hitter_id, ID, required: true
    argument :hittee_id, ID, required: true

    # TODO: Change to `resolve(hitter_id:, hittee_id)`?
    def resolve(args = {})
      hit = create_hit(args)
      hit_errors = hit.errors.full_messages.join(', ')
      raise GraphQL::ExecutionError, hit_errors if hit.errors.present?

      { hit: }
    end

    private

    def create_hit(attributes)
      Hit.create(hitter_id: attributes.fetch(:hitter_id, nil),
                 hittee_id: attributes.fetch(:hittee_id, nil))
    end
  end
end
