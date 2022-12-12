//Yandex ecommerce

window.dataLayer = window.dataLayer || [];

//detail
$('.b-catalog-detail').bind('detail.ecommerce', function () {
  var variant = '';
  $('#propListBlock [data-prop]').each(function (index, elem) {
    variant += $(elem).find('.i-active').text() + ' ';
  });

  var productObj = {
    id: $('.b-catalog-detail').data('id'),
    name: $('.b-catalog-detail h1').text(),
    price: parseInt(
      $('.b-catalog-detail__price').text().split(' ').join(''),
      10
    ),
    category: $('#catalogDetailData').data('category'),
    brand: $('#catalogDetailData').data('brand'),
    quantity: 1,
    variant: $.trim(variant),
  };

  var currencyCode = $(
    '#catalogDetailData div[ data-id=' + $('.b-catalog-detail').data('id') + ']'
  ).data('cur');

  window.dataLayer.push({
    ecommerce: {
      currencyCode: currencyCode,
      detail: {
        products: [productObj],
      },
    },
  });
});

//add to cart
//catalog detail buy button
$('.b-catalog-detail__button-block .btn-100:not( .i-gray )').click(function () {
  var variant = '';
  $('#propListBlock [data-prop]').each(function (index, elem) {
    variant += $(elem).find('.i-active').text() + ' ';
  });

  var productObj = {
    id: $('.b-catalog-detail').data('id'),
    name: $('.b-catalog-detail h1').text(),
    price: parseInt(
      $('.b-catalog-detail__price').text().split(' ').join(''),
      10
    ),
    category: $('#catalogDetailData').data('category'),
    brand: $('#catalogDetailData').data('brand'),
    quantity: 1,
    variant: $.trim(variant),
  };

  var currencyCode = $(
    '#catalogDetailData div[ data-id=' + $('.b-catalog-detail').data('id') + ']'
  ).data('cur');

  window.dataLayer.push({
    ecommerce: {
      currencyCode: currencyCode,
      add: {
        products: [productObj],
      },
    },
  });
});

//catalog element buy button
$('.b-catalog-element__button .btn').bind('add.ecommerce', function () {
  var $element = $(this).closest('.b-catalog-element');

  var variant = '';
  $element
    .find('.b-catalog-element__propList-block [data-prop]')
    .each(function (index, elem) {
      variant += $(elem).find('.i-active').text() + ' ';
    });

  var productObj = {
    id: $element.data('id'),
    name: $element.find('.b-catalog-element__title').text(),
    price: parseInt(
      $element
        .find('.b-catalog-element__price span')
        .text()
        .split(' ')
        .join(''),
      10
    ),
    category: $element.find('.b-catalog-element__data').data('category'),
    brand: $element.find('.b-catalog-element__data').data('brand'),
    quantity: 1,
    variant: $.trim(variant),
  };

  var currencyCode = $element
    .find('.b-catalog-element__data div[ data-id=' + $element.data('id') + ']')
    .data('cur');

  window.dataLayer.push({
    currencyCode: currencyCode,
    ecommerce: {
      add: {
        products: [productObj],
      },
    },
  });

  //GA
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'add2cart' });
});

//remove from cart
$('#basket-root .basket-item-actions-remove').bind('click', function () {
  var $element = $(this).closest('.basket-items-list-item-container');

  var variant = '';
  $('#propListBlock [data-prop]').each(function (index, elem) {
    variant += $(elem).find('.i-active').text() + ' ';
  });

  var productObj = {
    id: $element.data('id'),
    name: $element.find('.basket-item-info-name').text(),
    price: parseInt(
      String(
        $element
          .find(
            '.basket-items-list-item-price-for-one .basket-item-price-current-text'
          )
          .html()
      )
        .replace('&nbsp;', '')
        .replace('&amp;nbsp;', '')
        .replace(' ', ''),
      10
    ),
    category: $element.data('category'),
    brand: $element.data('brand'),
    quantity: $element.find('input.basket-item-amount-filed').val(),
  };

  var currencyCode = $element.data('cur');

  window.dataLayer.push({
    ecommerce: {
      currencyCode: currencyCode,
      remove: {
        products: [productObj],
      },
    },
  });
});

//purchase
//create order
$('.bx-soa-button-block a').click(function () {
  if (
    window.BX &&
    window.BX.Sale.OrderAjaxComponent &&
    window.BX.Sale.OrderAjaxComponent.result.GRID.ROWS
  ) {
    let rows = window.BX.Sale.OrderAjaxComponent.result.GRID.ROWS,
      products = [],
      entryObject = {
        sku: 'PROPERTY_CML2_ARTICLE_VALUE',
        name: 'NAME',
        category: 'PROPERTY_GRUPPA_DLYA_SAYTA_UROVEN_1_VALUE',
        price: 'SUM_NUM',
        quantity: 'QUANTITY',
      };

    Object.entries(rows).forEach((entry) => {
      let product = {};
      Object.keys(entryObject).forEach((key) => {
        if (entry[1].data[entryObject[key]]) {
          product[key] = entry[1].data[entryObject[key]];
        }
      });

      products.push(product);
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'purchase',
      transactionId: '1234',
      transactionTotal: window.BX.Sale.OrderAjaxComponent
        ? window.BX.Sale.OrderAjaxComponent.result.TOTAL.ORDER_TOTAL_PRICE
        : 0,
      transactionProducts: products,
    });
  }
});
