function startGame() {
	//disable Deal button after click
	$("#btnStay").removeClass("invisible");
	$("#btnHit").removeClass("invisible");
	//draw 3 cards
	pc1 = getCard();
	pc2 = getCard();
	dc1 = getCard();
	//set images based on drawn cards
	$("#playerCard1").attr('src', 'images/' + pc1 + '.png')
	$("#playerCard2").attr('src', 'images/' + pc2 + '.png')
	$("#dealerCard1").attr('src', 'images/' + dc1 + '.png')
	//slice off the number and keep suit
	cardValue1 = pc1.slice(0,-1);
	cardValue2 = pc2.slice(0,-1);
	cardValue3 = dc1.slice(0,-1);
	//ceck card values
	var playerCardValue1 = getCardScore(cardValue1);
	var playerCardValue2 = getCardScore(cardValue2);
	var dealerCardValue1 = getCardScore(cardValue3);
	//calculate scores
	playerScore = playerCardValue1+playerCardValue2;
	dealerScore = dealerCardValue1;
	//Show scores
	$("#playerScore span").text(playerScore);
	$("#dealerScore span").text(dealerScore);
}

function getCard() {
	//create card deck with image names
	var deck = ["AC","2C","3C","4C","5C","6C","7C","8C","9C","JC","QC","KC",
				"AH","2H","3H","4H","5H","6H","7H","8H","9H","JH","QH","KH",
				"AD","2D","3D","4D","5D","6D","7D","8D","9D","JD","QD","KD",
				"AS","2S","3S","4S","5S","6S","7S","8S","9S","JS","QS","KS"];
	//draw a random card
	card = deck[Math.floor(Math.random() * deck.length)];
/* 	var removeThisCard = card;
	var tester = deck.splice($.inArray(removeThisCard, deck),1);
	console.log(tester); */
	//slice off suit
	suit = card.slice(1,2);
	//evaluate card
	if(suit === 'C' || suit === 'H' || suit === 'D' || suit === 'S') {
		return card;
	}
}

function hit() {
	//draw a card
	var playerHit = getCard();
	//get current player score
	var currentPscore = $('#switchScore').text();
	//append new card
	$('#playerCard3').append('<img id="playerCard3" src="images/'+ playerHit +'.png" />')
	//slice off suit
	newCardValue = playerHit.slice(0,-1);
	//get value of card
	var hitCardValue = getCardScore(newCardValue);
	//calculate new score
	var newPscore = parseInt(currentPscore) + hitCardValue;
	//determine if player wins or less than 21 or bust
	if(newPscore === 21){
		$("#playerScore span").text(newPscore);
	} else if(newPscore < 21) {
		$("#playerScore span").text(newPscore);
	} else {
		$('#alertLose').removeClass("collapse");
		$("#playerScore span").text(newPscore);
		$("#playButtons").addClass("invisible");
		$("#resetButton").removeClass("invisible");
	}
}

function stay() {
	//disable hit button
	//deal cards until winner is found
	for (i = 0; i < 1000; i++) {
		var dealerHit = getCard();
		//lock in player score
		var currentDealerScore = $('#switchDealerScore').text();
		//append new cards
		$('#dealerCard3').append('<img id="dealerCard3" src="images/'+ dealerHit +'.png" />')
		//get value of cards
		newDealerCard = dealerHit.slice(0,-1);
		//get value of card
		var checkedCard = getCardScore(newDealerCard);
		//determine if dealer wins or less than 21 or bust
		var newDealerScore = parseInt(currentDealerScore) + checkedCard;
		//dealer score
		if(newDealerScore === 21){
			$("#dealerScore span").text(newDealerScore);
		} else if(newDealerScore < 21) {
			$("#dealerScore span").text(newDealerScore);
		} else {
			$("#dealerScore span").text(newDealerScore);
		}
		//display final scores and winner
		var finalPlayerScore = $('#switchScore').text();
		//determine winner
		if(newDealerScore > finalPlayerScore && newDealerScore <= 21 ) {
			$('#alertLose').removeClass("collapse");
			$("#resetButton").removeClass("invisible");
			$("#playButtons").addClass("invisible");
			return;
		} else if(newDealerScore > 21) {
			$('#alertWin').removeClass("collapse");
			$("#resetButton").removeClass("invisible");
			$("#playButtons").addClass("invisible");
			return;
		}
	}
}

//get the number value of the card
function getCardScore(cardScore) {
	//if its a face card assign 10
	if(cardScore === 'J' || cardScore === 'Q' || cardScore === 'K') {
		return cardScore =  10;
	//if its an Ace assign 11
	} else if(cardScore === 'A') {
		return cardScore = 11;
	//else assign the number for number card
	} else {
		return cardScore = parseInt(cardScore);
	}
}
//get bet amounts based on clicking of buttons
$(function () {
	//bet 50 then add to current bet
	$("#btn50").click( function()
	{
		var currentBet = $('#pot').text();
		playerBetAmount = 50;
		newCurrentBet = parseInt(currentBet) + playerBetAmount;
		$("#playerBet span").text(newCurrentBet);
    }
    );
	//bet 100 and add to current bet
    $("#btn100").click( function()
    {
		var currentBet = $('#pot').text();
		playerBetAmount = 100;
		newCurrentBet = parseInt(currentBet) + playerBetAmount;
		$("#playerBet span").text(newCurrentBet);
    }
    );
	//bet 150 and add to current bet
    $("#btn150").click( function()
    {
		var currentBet = $('#pot').text();
		playerBetAmount = 150;
		newCurrentBet = parseInt(currentBet) + playerBetAmount;
		$("#playerBet span").text(newCurrentBet);
    }
    );
	//bet 200 and add to current bet
    $("#btn200").click( function()
    {
		var currentBet = $('#pot').text();
		playerBetAmount = 200;
		newCurrentBet = parseInt(currentBet) + playerBetAmount;
		$("#playerBet span").text(newCurrentBet);
    }
    );
	//if done betting is clicked show the play buttons; hide all other buttons
    $("#btnDoneBetting").click( function()
    {
		$("#playButtons").removeClass("invisible");
		$("#bettingButtons").addClass("invisible");
		$("#btnHit").addClass("invisible");
		$("#btnStay").addClass("invisible");
    }
    );
});

function reset() {
	//empty the appended cards
	$("#playerCard3").empty();
	$("#dealerCard3").empty();
	//assign cardback images
	$("#playerCard1").attr('src', 'images/cardback.png')
	$("#playerCard2").attr('src', 'images/cardback.png')
	$("#dealerCard1").attr('src', 'images/cardback.png')
	//hold scores
	var pscore = $("#switchScore").text();
	var dscore = $("#switchDealerScore").text()
	//set scores back to 0
	$("#playerScore span").text("0");
	$("#dealerScore span").text("0");
	//hide the alerts
	$("#alertWin").addClass("collapse");
	$("#alertLose").addClass("collapse");
	//hide reset buttons and show betting buttons
	$("#resetButton").addClass("invisible");
	$("#bettingButtons").removeClass("invisible");
	//store wager and total money
	var wager = $("#pot").text();
	var totalMoney = $("#money").text();
	//add or subtract money based on wether the player or dealer wins
	if(dscore > 21 || pscore > dscore) {
		newMoney = parseInt(totalMoney) + parseInt(wager);
		$("#playerTotalMoney span").text(newMoney);
		$("#playerBet span").text("0");
	} else if(pscore > 21 || dscore > pscore) {	
		newMoney = parseInt(totalMoney) - parseInt(wager);
		$("#playerTotalMoney span").text(newMoney);
		$("#playerBet span").text("0");
	}
	//alert the player that they're out of money if total money is 0
	if(newMoney <= 0) {
		alert("You're out of cash. Please deposit more money to continue playing");
	}
}