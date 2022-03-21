class Currency < ApplicationRecord
  def calculate_value(amount)
    (current_price.to_f * amount.to_f).round(4)
  end

  def current_price
    url = 'https://api.coingecko.com/api/v3/coins/'
    request = HTTParty.get(url + self.slug)
    response = JSON.parse(request.body)
    response.dig('tickers').first.dig('last')
  end
end
