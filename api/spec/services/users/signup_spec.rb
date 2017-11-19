require 'spec_helper'

RSpec.describe Services::Users::Signup do
  let(:service) { Services::Users::Signup }

  describe '.perform' do
    let(:password) { 'test' }
    let(:username) { 'johndoe' }

    it 'creates a user' do
      expect {
        service.perform(username, password)
      }.to change(User, :count).by(1)
    end

    it 'returns the user' do
      result = service.perform(username, password)
      expect(result).to be_a(User)
    end

    it 'allows signin' do
      result = service.perform(username, password)

      user = Services::Users::Signin.perform(username, password)
      expect(result).to eq(user)
    end
  end
end
