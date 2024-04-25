# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::PlayerType do
  it 'defines all required fields' do
    expect(described_class.fields.keys).to eq(%w[id firstName lastName email createdAt updatedAt])
  end
end
