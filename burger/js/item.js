/** 

List of items
for page all page

**/

function item (id, name, cost, img) {
 	this.id = id;
	this.name = name;
	this.cost = cost;
	this.img = img;
}

var itemList = [];

// set the function item(itemID, itemName, itemCost) 
itemList[0] = new item ('0', 'Top Bread', 1, 'bread-top.png');
itemList[1] = new item ('1', 'Bottom Bread', 1, 'bread-bottom.png');
itemList[2] = new item ('2', 'Vegetable', 0.5, 'vegetable.png');
itemList[3] = new item ('3', 'Beef', 5, 'beef.png');
itemList[4] = new item ('4', 'Egg', 2, 'egg.png');
itemList[5] = new item ('5', 'Tomato', 1, 'tomato.png');
itemList[6] = new item ('6', 'Cheese', 2, 'cheese.png');
itemList[7] = new item ('7', 'Onion', 1, 'onion.png');
itemList[8] = new item ('8', 'pickle', 1, 'pickle.png');