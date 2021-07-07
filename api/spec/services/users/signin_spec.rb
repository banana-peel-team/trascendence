require 'spec_helper'

RSpec.describe Services::Users::Signin do
  let(:service) { Services::Users::Signin }

  describe '.perform' do
    let(:user_password) { 'test-password' }
    let!(:user) do
      Services::Users::Signup.perform(username, user_password)
    end

    context 'with valid credentials' do
      let(:password) { user_password }
      let(:username) { 'johndoe' }

      it 'returns the user' do
        expect(service.perform(username, password)).to eq(user)
      end
    end
  end
end
