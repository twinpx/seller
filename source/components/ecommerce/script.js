( function($) {

  'use strict';
  
  $( function() {
  
    //Yandex ecommerce
    
    //detail
    $( '.b-catalog-detail' ).bind( 'detail.ecommerce', function() {
      var productObj = {
          "id": $( '.b-catalog-detail' ).data( 'id' ),
          "name": $( '.b-catalog-detail h1' ).text(),
          "price": $( '.b-catalog-detail__price' ).text(),
          //"category": "Аксессуары/Сумки",
          "quantity": 1
        };
      if ( $( '.i-ecom-brand' ).length ) {
        productObj.brand = $( '.i-ecom-brand' ).text();
      }
      dataLayer.push({
          "ecommerce": {
              "detail": {
                  "products": [ productObj ]
              }
          }
      });
    });
    
    //add to cart
    //catalog detail buy button
    $( '.b-catalog-detail__button-block .btn-100' ).click( function() {
      var productObj = {
                    "id": $( '.b-catalog-detail' ).data( 'id' ),
                    "name": $( '.b-catalog-detail h1' ).text(),
                    "price": $( '.b-catalog-detail__price' ).text(),
                    //"category": "Аксессуары/Сумки",
                    "quantity": 1
                   };
      if ( $( '.i-ecom-brand' ).length ) {
        productObj.brand = $( '.i-ecom-brand' ).text();
      }
      dataLayer.push({
          "ecommerce": {
              "add": {
                  "products": [ productObj ]
              }
          }
      });
    });
    
    //catalog element buy button
    $( '.b-catalog-element__button .btn' ).bind( 'add.ecommerce', function() {
      var $element = $( this ).closest( '.b-catalog-element' );
      var productObj = {
                    "id": $element.data( 'id' ),
                    "name": $element.find( '.b-catalog-element__title' ).text(),
                    "price": $element.find( '.b-catalog-element__price span' ).text(),
                    //"category": "Аксессуары/Сумки",
                    "quantity": 1
                   };
      if ( $element.find( '.i-ecom-brand' ).length ) {
        productObj.brand = $element.find( '.i-ecom-brand' ).text();
      }
      dataLayer.push({
          "ecommerce": {
              "add": {
                  "products": [ productObj ]
              }
          }
      });
    });
    
    //purchase
    //one click
    $( '.b-catalog-detail__button-block [data-toggle]' ).not( '.btn' ).click( function() {
      var productObj = {
                    "id": $( '.b-catalog-detail' ).data( 'id' ),
                    "name": $( '.b-catalog-detail h1' ).text(),
                    "price": $( '.b-catalog-detail__price' ).text(),
                    //"category": "Аксессуары/Сумки",
                    "quantity": 1
                   };
      if ( $( '.i-ecom-brand' ).length ) {
        productObj.brand = $( '.i-ecom-brand' ).text();
      }
      dataLayer.push({
          "ecommerce": {
              "add": {
                  "products": [ productObj ]
              }
          }
      });
    });
    
    //one click success
    $( '#oneClick' ).bind( 'onClickSuccess.ecommerce', function() {
      dataLayer.push({
          "ecommerce": {
              "purchase": {
                  "actionField": "",
                  "products": [ productObj ]
              }
          }
      });
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));