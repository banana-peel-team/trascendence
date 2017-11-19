require 'web_helper'

RSpec.describe Routes::V1::Games do
  describe 'POST create' do
    let(:params) do
      { name: 'test' }
    end

    xcontext 'when not authenticated' do
      it 'reports unauthorized' do
        post_json('/v1/games', params)

        expect(last_response).to be_forbidden
      end
    end

    context 'when authenticated' do

      it 'responds with ok' do
        post_json('/v1/games', params)

        expect(last_response).to be_ok
      end

      describe 'response' do
        let(:response) do
          post_json('/v1/games', params)

          json_response
        end
      end

      context 'with invalid params' do
        pending
      end
    end
  end
end
