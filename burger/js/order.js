/** 

write your code here
for page order.html

**/

var imageUrl = "img/";
var currency = "$";

var order = localStorage.getItem('order');
var isProcessed = localStorage.getItem('isProcessed');

if(order && isProcessed){
	order = JSON.parse(order);
	if(Array.isArray(order.data) && order.time < new Date().getTime() && new Date(order.time)){
		if(isProcessed === "false"){
			localStorage.setItem('isProcessed', "true");
			draw();
			process();
		}
		else{
			if(window.confirm("Pesanan sedang di proses! Kembali ke menu utama")){
				localStorage.removeItem('order');
				localStorage.removeItem('isProcessed');
				window.location.href = "main.html";
			}
			else{
				draw();
			}
		}
	}
	else{
		alert('Invalid Request');
		window.location.href = "main.html";
	}
}
else{
	alert('Invalid Request');
	window.location.href = "main.html";
}

function process(){
	/* Send Ajax Here */
}

function draw(){
	$('#detail, #total').empty();

	var total = 0;
	order.data.forEach(function(bahan){
		$('<tr></tr>')
			.append(
				$('<td></td>').text(bahan.name)
			)
			.append(
				$('<td></td>').text(currency+bahan.cost)
			)
			.prependTo('#detail');

		total += bahan.cost;
	});

	$('<tr></tr>')
		.append('<td>TOTAL</td>')
		.append(
			$('<td></td>').text(currency+total)
		)
		.prependTo('#total');

	console.log(order);
	console.log(localStorage.getItem('order'));
}