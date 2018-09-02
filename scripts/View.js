/*
	包含游戏控件的行为
*/

//棋子控件
function View(chess, id, unit, isSelected, isMove)
{
	//基本属性
	this.id = id;
	this.elem = document.getElementById(id);
	this.left = chess.left * unit;
	this.top = chess.top * unit;
	this.width = chess.width * unit;
	this.height = chess.height * unit;
	this.color = appearent[id];
	setElement(id, this.left, this.top, this.width-2, this.height-2, this.color, "1px", null);
	
	//状态
	this.isSelected = isSelected;
	this.isMove = this.elem.isMove;
	
	//事件
	this.elem.onmousedown = onMouseDown;
	this.elem.onfocus = onMouseDown;
	this.elem.onkeydown = onKeyDown;
	
	//保存当前上下文
	var context = this;
	
	this.updatePos = function()
	{
		context.left = parseInt(context.elem.style.left);
		context.top = parseInt(context.elem.style.top);
	}
	
	this.move = function(direction)
	{
		switch (direction)
		{
		case UP:
			if (layout[indexOfLayout].canMove(indexOfSelected, UP))
			{
				context.hideArrow();
				layout[indexOfLayout].move(indexOfSelected, UP);
				moveElement(context.id, context.left, context.top-unit, Math.floor(unit/7));
			}	
			break;
		case DOWN:
			if (layout[indexOfLayout].canMove(indexOfSelected, DOWN))
			{
				context.hideArrow();
				layout[indexOfLayout].move(indexOfSelected, DOWN);
				moveElement(context.id, context.left, context.top+unit, Math.floor(unit/7));
			}
			break;
		case LEFT:
			if (layout[indexOfLayout].canMove(indexOfSelected, LEFT))
			{
				context.hideArrow();
				layout[indexOfLayout].move(indexOfSelected, LEFT);
				moveElement(context.id, context.left-unit, context.top, Math.floor(unit/7));
			}	
			break;
		case RIGHT:
			if (layout[indexOfLayout].canMove(indexOfSelected, RIGHT))
			{
				context.hideArrow();
				layout[indexOfLayout].move(indexOfSelected, RIGHT);
				moveElement(context.id, context.left+unit, context.top, Math.floor(unit/7));
			}	
			break;
		default:
			break;
		}
	}
	
	//按下鼠标，将当前元素标记为selected，并显示可移动的方向
	function onMouseDown()
	{
		//console.log("click");
		context.isSelected = true;
		indexOfSelected = index[id];
		for (var i = 0; i < views.length; ++i)
		{
			if (i != indexOfSelected)
			{
				views[i].isSelected = false;
			}
		}
		
		if (!context.elem.isMove)
		{
			context.updatePos();
			context.showArrow();
		}	
	}
	
	//按下键盘，当可以移动时移动元素
	function onKeyDown(event)
	{
		context.updatePos();
		
    	if (context.isSelected && !context.elem.isMove)
		{
			context.move(event.keyCode);
		}
	}
	
	//显示箭头
	this.showArrow = function()
	{
		//上
		if (layout[indexOfLayout].canMove(indexOfSelected, UP))
		{
			setElement("up", context.left+context.width/2-unit/4, context.top-unit/4, 0, 0, "", "", null);
			hideElement("up", false);
		}
		else
		{
			hideElement("up", true);
		}
		
		//下
		if (layout[indexOfLayout].canMove(indexOfSelected, DOWN))
		{
			setElement("down", context.left+context.width/2-unit/4, context.top+context.height-unit/4, 0, 0, "", "", null);
			hideElement("down", false);
		}
		else
		{
			hideElement("down", true);
		}
		
		//左
		if (layout[indexOfLayout].canMove(indexOfSelected, LEFT))
		{
			setElement("left", context.left-unit/4, context.top+context.height/2-unit/4, 0, 0, "", "", null);
			hideElement("left", false);
		}
		else
		{
			hideElement("left", true);
		}
		
		//右
		if (layout[indexOfLayout].canMove(indexOfSelected, RIGHT))
		{
			setElement("right", context.left+context.width-unit/4, context.top+context.height/2-unit/4, 0, 0, "", "", null);
			hideElement("right", false);
		}
		else
		{
			hideElement("right", true);
		}
	}
	
	//隐藏箭头
	this.hideArrow = function()
	{
		hideElement("up", true);
		hideElement("down", true);
		hideElement("left", true);
		hideElement("right", true);
	}
}

//创建所有棋子的控件
function createViews(layout, unit)
{
	var views = new Array();
	
	for (var i = 0; i < layout.chesses.length; ++i)
	{
		views[i] = new View(layout.chesses[i], id[i], unit, false, false);
	}
	
	return views;
}
