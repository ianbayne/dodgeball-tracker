# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::HitType do
  it 'defines all required fields' do
    expect(described_class.fields.keys).to eq(%w[id hitter hittee createdAt updatedAt])
  end
end
