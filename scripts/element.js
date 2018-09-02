/*	
	包含HTML元素的基本操作
*/

//设置元素
function setElement(id, left, top, width, height, color, paddings, onclick)
{
	var elem = document.getElementById(id);
	elem.style.position = "absolute";
	elem.style.left = left + "px";
	elem.style.top = top + "px";
	if (width != 0)		elem.style.width = width + "px";
	if (height != 0)	elem.style.height = height + "px";
	if (color != "")	elem.style.backgroundColor = color;
	if (paddings != "")	elem.style.paddings = paddings;
	if (onclick != null)	elem.onclick = onclick;
}

//隐藏元素		true表示隐藏，false表示显示
function hideElement(id, isHide)
{
	var elem = document.getElementById(id);
	if (isHide)	elem.style.display = "none";
	else	elem.style.display = "inline";
}

//移动元素		elem.isMove表示元素是否在移动中
/*function moveElement(id, xDes, yDes, v, t)
{
	var elem = document.getElementById(id);
	if (elem.movement)
	{
		clearTimeout(elem.movement);
		elem.isMove = false;//
	}
	
	elem.isMove = true;
	var xPos = parseInt(elem.style.left);
	var yPos = parseInt(elem.style.top);
	
	if (xPos === xDes && yPos === yDes)
	{
		clearTimeout(elem.movement);
		elem.isMove = false;//
		views[index[id]].updatePos();
		views[index[id]].showArrow();
		return true;
	}
	
	if (xPos < xDes)	xPos += Math.min(v, xDes-xPos);
	else if (xPos > xDes)	xPos -= Math.min(v, xPos-xDes);
	if (yPos < yDes)	yPos += Math.min(v, yDes-yPos);
	else if (yPos > yDes)	yPos -= Math.min(v, yPos-yDes);
	
	elem.style.left = xPos + "px";
	elem.style.top = yPos + "px";
	
	var exp = "moveElement(\"" + id + "\"" + "," + xDes + "," + yDes + "," + v + "," + t + ")";
	elem.movement = setTimeout(exp, t);
}*/

var g_elem;
var g_xDes, g_yDes;
var g_v;
var g_movement;

function animate(time)
{
	if (g_elem.isMove)
	{
		var xPos = parseInt(g_elem.style.left);
		var yPos = parseInt(g_elem.style.top);
		if (xPos == g_xDes && yPos == g_yDes)
		{
			g_elem.isMove = false;
			g_elem = null;
			cancelAnimationFrame(g_movement);
			views[indexOfSelected].updatePos();
			views[indexOfSelected].showArrow();
			return;
		}
		
		if (xPos < g_xDes)		xPos += Math.min(g_v, g_xDes-xPos);
		else if (xPos > g_xDes)	xPos -= Math.min(g_v, xPos-g_xDes);
		if (yPos < g_yDes)		yPos += Math.min(g_v, g_yDes-yPos);
		else if (yPos > g_yDes)	yPos -= Math.min(g_v, yPos-g_yDes);
		
		g_elem.style.left = xPos + "px";
		g_elem.style.top = yPos + "px";
		requestAnimationFrame(animate);
	}
}

//移动元素		elem.isMove表示元素是否在移动中
function moveElement(id, xDes, yDes, v)
{
	g_elem = elem = document.getElementById(id);
	elem.isMove = true;
	g_xDes = xDes;
	g_yDes = yDes;
	g_v = v;
	g_movement = animate();
}