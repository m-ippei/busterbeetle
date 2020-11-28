var gph = [
	[4],
	[2,3],
	[3],
	[],
	[2,0]
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  translate(200,200);
  drawGraph(gph);
}

function drawGraph(arr,radius){
if(!radius){radius=100}
	drawEdge(arr,radius);
	drawNode(arr.length-1,radius);
}

function drawNode(num,radius){
	if(!radius){radius=100}
	var arr = fSets(num);
	for (var i = 0; i<arr.length;i++){
		ellipse(cos(arr[i])*radius,sin(arr[i])*radius,10,10);
	}
}

function drawEdge(arr,radius){
	var in_arr = fSets(arr.length-1);
	for(var i = 0; i < arr.length;i++){
		for(var j = 0; j < arr[i].length;j++){
			line(cos(in_arr[i])*radius,sin(in_arr[i])*radius,cos(in_arr[arr[i][j]])*radius,sin(in_arr[arr[i][j]])*radius);
		}
	}
}


function fSets(num){
	var H = -HALF_PI;
	switch(num){
		case 0:
			return [0];
		case 1:
			return [0,-PI];
		case 2:
			return [H,H-(TWO_PI/3),H-(TWO_PI/3)-(TWO_PI/3)]
		case 3:
			return [QUARTER_PI,QUARTER_PI+HALF_PI,QUARTER_PI+PI,QUARTER_PI+HALF_PI+PI];
		default:
			return over3(num,H);
	}
}

function over3(num,H){
	num+=1;
	var arr = [];
	var spl = TWO_PI/num;
	for(var i =0;i<num;i++){
		append(arr,H-(spl*i));
	}
	return arr;
}
