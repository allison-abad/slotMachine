//User gets to make a bet
//User clicks on a button to start the reels
//User clicks on each button to stop each individual reel
//Displays win or lose (based off the matching images
// 3 of a kind user wins big prize
// Win, bet gets add to  individual’s pot
//Lose, bet gets subtracted to individual’s pot
$(document).ready(function(){
  //global Array
  var cars = ['img/tesla.png','img/maserati.png','img/mercedes.png','img/bugChiron.png','img/barbie.png','img/lamborghini.png','img/junkCar.jpeg'];
  var gamePot = 0;
  var playerPot = [];
  var min = 1;
  var max = 2;
  var bankAccount = 0;
  var intervalOne;
  var intervalTwo;
  var intervalThree;
  var rotateStopped1 = false;
  var rotateStopped2 = false;
  var rotateStopped3 = false;

  $('#pot').html(gamePot)
  $('#player').html(bankAccount)

  //Event listener for amount of coins
  $('#enter').on('click',function(){
    var money = parseInt( $('#money').val() )
    playerPot.push(money)
    bankAccount = playerPot[0]
    $('#player').html(bankAccount)
    $('#money').val('')
  });

  //Event listener for min bet
  $('#min').on('click',function(){
    if(bankAccount === 0){
      alert('Purchase tokens')
    }else{
    minBet()
  }
  });
  //Event listener for max bet
  $('#max').on('click',function(){
    if(bankAccount === 0){
      alert('Purchase tokens')
    }else if(bankAccount <= 1){
      alert('Purchase more tokens')
    }
    else{
    maxBet()
  }
  });
  function minBet(){
    //takes money from your bank account
    bankAccount = bankAccount - min;
    //add that money into the game pot
    var computerBet = min;
    gamePot = min + computerBet;
    $('#pot').html(gamePot)
    $('#player').html(bankAccount)
    $('#results').html('')
  }
  function maxBet(){
    //takes money from your bank account
    bankAccount = bankAccount - max;
    //deducts that money into the game pot
    var computerBet = max;
    gamePot = computerBet + max;
    $('#pot').html(gamePot)
    $('#player').html(bankAccount)
    $('#results').html('')
  }
  function rotate1() {
    var randomImage1 = cars[Math.floor(Math.random() * cars.length)];
    $('#firstSlot').attr('src',randomImage1);
  }
  function rotate2() {
    var randomImage2 = cars[Math.floor(Math.random() * cars.length)];
    $('#secondSlot').attr('src',randomImage2);
  }
  function rotate3() {
    var randomImage3 = cars[Math.floor(Math.random() * cars.length)];
    $('#thirdSlot').attr('src',randomImage3);
  }
  function beginRotation1(){
    intervalOne = setInterval(rotate1,800);
    rotateStopped1 = false
  }
  function beginRotation2(){
    intervalTwo = setInterval(rotate2,800);
    rotateStopped2 = false
  }
  function beginRotation3(){
    intervalThree = setInterval(rotate3,800);
    rotateStopped3 = false
  }
  //Event listener for spinning all 3 reels
  $('#start').on('click',function(){
    if(bankAccount === 0){
      alert('Purchase tokens')
    }else if(gamePot === 0){
      alert('Make a bet')
    }else{
    //starts a function that randomize the reel1
    beginRotation1()
    beginRotation2()
    beginRotation3()
    }
  });
  //Event listener to stop slot 1
  $('#stopOne').on('click',function(){
    stopRotation1()
  });
  //Event listener to stop slot 2
  $('#stopTwo').on('click',function(){
    stopRotation2()
  });
  //Event listener to stop slot 3
  $('#stopThree').on('click',function(){
    stopRotation3()
  });
  function stopRotation1() {
    clearInterval(intervalOne);
    rotateStopped1 = true
    if(rotateStopped1 === rotateStopped2 && rotateStopped1 === rotateStopped3){
      winningCondition()
    }
  }
  function stopRotation2() {
    clearInterval(intervalTwo);
    rotateStopped2 = true
    if(rotateStopped1 === rotateStopped2 && rotateStopped1 === rotateStopped3){
      winningCondition()
    }
  }
  function stopRotation3() {
    clearInterval(intervalThree);
    rotateStopped3 = true
    if(rotateStopped1 === rotateStopped2 && rotateStopped1 === rotateStopped3){
      winningCondition()
    }
  }
  //Conditional function to compare the results from slot 1 , slot 2 and slot 3
  function winningCondition(){

    var slotOne = $('#firstSlot').attr('src')
    var slotTwo = $('#secondSlot').attr('src')
    var slotThree = $('#thirdSlot').attr('src')

    if(slotOne === slotTwo && slotTwo === slotThree && slotOne === slotThree){
      bankAccount += gamePot;
      $('#player').html(bankAccount)
      gamePot = 0;
      $('#pot').html(gamePot)
      $('#results').html('Winner! Winner! Chicken dinner!');
    }
    else {
      gamePot = 0;
      $('#pot').html(gamePot)
        //display you lose
      $('#results').html('Keep Trying!')
    }
  }
});
