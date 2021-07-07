module Helpers
  module CommonHelper
    def render_json(obj)
      res.headers['Content-Type'] = 'application/json; charset=utf-8'
      res.write(JSON.generate(obj))
    end

    def json_params
      @json_params ||= begin
        data = req.body.read

        JSON.parse(data)
      end
    rescue JSON::ParserError
      {}
    end
  end
end
