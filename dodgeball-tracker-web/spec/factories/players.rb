# frozen_string_literal: true

FactoryBot.define do
  factory :player do
    first_name { 'test_first_name' }
    last_name { 'test_last_name' }
    sequence(:email) { |n| "test_email#{n}@example.com" }
    password { 'password' }
  end
end
