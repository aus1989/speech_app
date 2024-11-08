$(document).ready(function (){

  $(document).on('click', '.increment_btn', function(e){
    e.preventDefault();

    var qty = $(this).closest('.token_data').find('.input_qty').val();
    
    var value = parseInt(qty, 10);
    value = isNaN(value) ? 0 : value;
    if(value < 15){
      value++;
      $(this).closest('.token_data').find('.input_qty').val(value); 
    }
  });

  $(document).on('click', '.decrement_btn', function(e){
    e.preventDefault();

    var qty = $(this).closest('.token_data').find('.input_qty').val();
    
    var value = parseInt(qty, 10);
    value = isNaN(value) ? 0 : value;
    if(value > 1){
      value--;
      $(this).closest('.token_data').find('.input_qty').val(value); 
    }
  });


  $(document).on('click', '.addToCart_btn', function(e){
    
    e.preventDefault();

    var qty = $(this).closest('.token_data').find('.input_qty').val();
    
    var token_id = $(this).val();
    
    $.ajax({
      method: "POST",
      url: "function/handleCart.php",
      data: {
        "token_id": token_id,
        "token_qty": qty,
        "scope": "add"
      },
      success: function (response){
        if(response == 201){
          alertify.success('Token added');
        }
        else if(response == 'existing'){
          alertify.success('Token already added');
        }
        else if(response == 401){
          alertify.success('Login to continue');
        }
        else if(response == 500){
          alertify.success('Something went wrong');
        }
      }

    });
  });


  $(document).on('click', '.updateQty', function(){
    var qty = $(this).closest('.token_data').find('.input_qty').val();
    var token_id = $(this).closest('.token_data').find('.tokenId').val();
    
    $.ajax({
      method: "POST",
      url: "function/handleCart.php",
      data: {
        "token_id": token_id,
        "token_qty": qty,
        "scope": "update"
      },
      success: function (response){
        
      }
    })
  });


  $(document).on('click', '.deleteItem', function(){
    var cart_id = $(this).val();
    
    $.ajax({
      method: "POST",
      url: "function/handleCart.php",
      data: {
        "cart_id": cart_id,
        "scope": "delete"
      },
      success: function (response){
        if(response == 200){
          alertify.success('Token deleted successfully');
          // $("#myCart").load(location.href + " #myCart");
        }
        else{
          alertify.success(response);
        }
      }
    })
  });


});
