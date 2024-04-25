# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::CatchType do
  it 'defines all required fields' do
    expect(described_class.fields.keys).to eq(%w[id catcher catchee createdAt updatedAt])
  end
end
