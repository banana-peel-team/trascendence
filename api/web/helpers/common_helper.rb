module Helpers
  module CommonHelper
    def render_json(obj)
      res.headers['Content-Type'] = 'application/json; charset=utf-8'
      res.write(JSON.generate(obj))
    end
  end
end
