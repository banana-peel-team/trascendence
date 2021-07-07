module Support
  module Web
    def post_json(path, params, options = {})
      post(path, JSON.generate(params), json_request(options))
    end

    def json_response
      JSON.parse(last_response.body)
    end

    def json_request(options = {})
      options.merge('CONTENT_TYPE' => 'application/json')
    end

    def auth(user, options = {})
      options.merge('HTTP_USER_ID' => user.username)
    end
  end
end
