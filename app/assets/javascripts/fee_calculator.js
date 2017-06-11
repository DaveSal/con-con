$(function() {
  $('#publication_price').on('change input', function() {
    $('.fee-block').hide();
    $('.fee-info-block').show();

    var val = parseFloat($(this).val());
    var fee_percentage = '0.1';
    var stripe_fee_percentage = '0.029'

    if (isNaN(val) || val <= 0) { return; }

    var application_fee = +(val * fee_percentage).toFixed(2);
    var stripe_fee = +((val * stripe_fee_percentage) + 0.3).toFixed(2);
    var price_total = +(val - application_fee - stripe_fee).toFixed(2);

    if (isNaN(price_total) || price_total <= 0) { return; }

    $('.fee-block').find('.application-fee').text(application_fee + '$');
    $('.fee-block').find('.stripe-fee').text(stripe_fee + '$');
    $('.fee-block').find('.price-total').text(price_total + '$');
    $('.fee-block').show();
    $('.fee-info-block').hide();
  });
});
