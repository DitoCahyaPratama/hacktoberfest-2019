/** 

write your code here
for page main.html

**/

/*
* Init
*/
var currentTarget = $('.slide').removeClass('show').first().addClass('show');
var data = [0, 1];
var imageUrl = "img/";
var currency = "$";
/*
* Init Slider
*/

function prev(){
	var prev = currentTarget.prev();
	var target = (prev.length > 0 && prev.hasClass('slide')) ? prev : $('.slide').last();

	currentTarget.removeClass('show');
	target.addClass('show');
	
	currentTarget = target;
}

function next(){
	var next = currentTarget.next();
	var target = (next.length > 0 && next.hasClass('slide')) ? next : $('.slide').first();

	currentTarget.removeClass('show');
	target.addClass('show');
	
	currentTarget = target;
}

$('.prev').click(function(){
	prev();
});

$('.next').click(function(){
	next();
});

/* Init drag bahan */

$('.slide img').on('dragstart', function(event){
	var id = $(this).attr('id');
	var type = 'copy';

	event.originalEvent.dataTransfer.setData('id', id);
	event.originalEvent.dataTransfer.setData('type', type);
});

$('#order').on('dragstart', '.scale', function(event){
	var id = data.length - $(this).index() - 1;
	var type = 'move';

	event.originalEvent.dataTransfer.setData('id', id);
	event.originalEvent.dataTransfer.setData('type', type);
});

/* Init drop order */

$('#order, #trash').on('dragover', function(event){
	/* Preventing Default Action */
	event.preventDefault();
});

$('#order').on('drop', function(event){
	var id = event.originalEvent.dataTransfer.getData('id');
	var type = event.originalEvent.dataTransfer.getData('type');
	var indexTarget = data.length - $(event.target).index() - 1;

	id = parseInt(id);

	if(type == 'copy' && isItemAllowed(id)){
		if(event.currentTarget == event.target){
			data.splice(1, 0, id);
			draw();
		}
		else if($(event.target).hasClass('scale')){
			var injectPoint = 1;
			var index = $(event.target).index();

			if(index < (data.length - 1)){
				injectPoint = data.length - index - 1;
			}

			data.splice(injectPoint, 0, id);
			draw();
		}
		else{
			alert('Something getting wrong');
		}
	}
	else if(type == 'move' && isItemAllowed(data[id]) && $(event.target).hasClass('scale') && isItemAllowed(data[indexTarget])){
		var temp = data[id];
		data[id] = data[indexTarget];
		data[indexTarget] = temp;

		draw();
	}
	else{
		alert('Not allowed');
	}
});

$('#trash').on('drop', function(event){
	var id = event.originalEvent.dataTransfer.getData('id');
	var type = event.originalEvent.dataTransfer.getData('type');

	if(type == 'move' && isItemAllowed(data[id])){
		data.splice(id, 1);
		draw();
	}
	else{
		alert('Not Allowed');
	}
});

/* Init button function */

$('#reset').click(function(event){
	event.preventDefault();

	data = [0,1];
	draw();
});

$('#process').click(function(event){
	event.preventDefault();

	var order = {
		data: [],
		time: new Date().getTime()
	};

	data.forEach(function(id){
		order.data.push(copy(itemList[id]));
	});

	order = JSON.stringify(order);
	
	localStorage.setItem('order', order);
	localStorage.setItem('isProcessed', "false");

	window.location.href = "order.html";
});

/* Utilities */

function copy(data){
	if(Array.isArray(data)){
		return Object.assign([], data);
	}
	else{
		return Object.assign({}, data);
	}
}

function draw(){
	$('#order, #detail, #total').empty();

	var total = 0;
	data.forEach(function(id){
		var bahan = itemList[id];

		$('<img>')
			.attr('src', imageUrl+bahan.img)
			.addClass('scale')
			.prependTo('#order');

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

}

function isItemAllowed(id){
	return ((id != 0 && id != 1) && itemList != undefined);
}

/* We will go and ready */

$(document).ready(function(){
	draw();
});