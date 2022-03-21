class CurrenciesController < ApplicationController
  def index
    @currencies = Currency.all
    render json: @currencies
  end

  def search
    render json: { currencies: }
  end

  # Takes in the currency id and the ammount owned
  # Returns final calculations
  def calculate
    amount = params[:amount]
    render json: {
      currency:,
      current_price: currency.current_price,
      amount:,
      value: currency.calculate_value(amount)
    }
  end

  private

  def currency
    @currency ||= Currency.find(params[:id])
  end

  def currencies
    @currencies ||= Currency.where('LOWER(name) LIKE ?', "%#{params[:search].downcase}%")
  end
end
