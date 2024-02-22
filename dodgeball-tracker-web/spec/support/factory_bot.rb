# frozen_string_literal: true

# Instead of FactoryBot.create(:a_factory), FactoryBot.build(:a_factory), etc., the following allows
# create(:a_factory), build(:a_factory), etc.
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
