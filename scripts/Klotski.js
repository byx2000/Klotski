/*
	包含游戏的基础数据结构
*/

//棋子
function Chess(left, top, type)
{
	this.left = left;
	this.top = top;
	this.width = 0;
	this.height = 0;
	this.type = type;
	
	switch(type)
	{
	case LARGE:
		this.width = 2;
		this.height = 2;
		break;
	case MEDIUMV:
		this.width = 1;
		this.height = 2;
		break;
	case MEDIUMH:
		this.width = 2;
		this.height = 1;
		break;
	case SMALL:
		this.width = 1;
		this.height = 1;
		break;
	}
	
	//移动
	this.move = function(direction)
	{
		switch (direction)
		{
		case UP:
			this.top = Math.max(0, this.top-1)
			break;
		case DOWN:
			this.top = Math.min(5-this.height, this.top+1);
			break;
		case LEFT:
			this.left = Math.max(0, this.left-1);
			break;
		case RIGHT:
			this.left = Math.min(4-this.width, this.left+1);
			break;
		default:
			break;
		}
	};
}

//游戏布局
function Layout(layout)
{
	var setVal = function(map, i, j, val){map[i*4+j] = val}; //设置数组第i行第j列的元素
	var getVal = function(map, i, j){return map[i*4+j]}; //获取数组第i行第j列的元素
	
	//this.map = layout;
	this.map= new Array();
	for (var i = 0; i <= 4; ++i)
	{
		for (var j = 0; j <= 3; ++j)
		{
			setVal(this.map, i, j, getVal(layout, i, j));
		}
	}
	
	//this.printMap();
	
	this.chesses = new Array();
	
	//解析局面，创建所有棋子
	var book = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	for (var i = 0; i <= 4; ++i)
	{
		for (var j = 0; j <= 3; ++j)
		{
			var c = getVal(this.map, i, j);
			if (c !== BLANK && !book[c])
			{
				switch (c)
				{
				case 0:
					this.chesses[0] = new Chess(j, i, LARGE);
					book[0] = 1;
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					if (getVal(this.map, i+1, j) === c)
						this.chesses[c] = new Chess(j, i, MEDIUMV);
					else
						this.chesses[c] = new Chess(j, i, MEDIUMH);
					book[c] = 1;
					break;
				case 6:
				case 7:
				case 8:
				case 9:
					this.chesses[c] = new Chess(j, i, SMALL);
					book[c] = 1;
					break;
				}
			}
		}
	}
	
	//更新地图
	this.updateMap = function()
	{
		for (var i = 0; i <= 4; ++i)
		{
			for (var j = 0; j <= 3; ++j)
			{
				setVal(this.map, i, j, BLANK);
			}
		}
		
		for (var i = 0; i < this.chesses.length; ++i)
		{
			var y = this.chesses[i].left; //列
			var x = this.chesses[i].top; //行
			if (this.chesses[i].type === LARGE)
			{
				setVal(this.map, x, y, i);
				setVal(this.map, x+1, y, i);
				setVal(this.map, x, y+1, i);
				setVal(this.map, x+1, y+1, i);
			}
			else if (this.chesses[i].type === MEDIUMV)
			{
				setVal(this.map, x, y, i);
				setVal(this.map, x+1, y, i);
			}
			else if (this.chesses[i].type === MEDIUMH)
			{
				setVal(this.map, x, y, i);
				setVal(this.map, x, y+1, i);
			}
			else
			{
				setVal(this.map, x, y, i);
			}
		}
		//this.printMap();
	};
	
	//打印地图
	this.printMap = function()
	{
		for (var i = 0; i <= 4; ++i)
		{
			var s = "";
			for (var j = 0; j <= 3; ++j)
			{
				s += getVal(this.map, i, j);
			}
			console.log(s);
		}
	};
	
	//判断是否能移动棋子
	this.canMove = function(which, direction)
	{
		//if (this.chesses[which].left+this.chesses[which].width==)
		
		var tc = new Chess(this.chesses[which].left, this.chesses[which].top, this.chesses[which].type);
		tc.move(direction);
		
		if (tc.left === this.chesses[which].left && tc.top === this.chesses[which].top)
			return false;
		
		switch (direction)
		{
		case UP:
			for (var i = 0; i < tc.width; ++i)
			{
				if (getVal(this.map, tc.top, tc.left+i) !== BLANK)
					return false;
			}
			break;
		case DOWN:
			for (var i = 0; i < tc.width; ++i)
			{
				if (getVal(this.map, tc.top+tc.height-1, tc.left+i) !== BLANK)
					return false;
				//console.log(getVal(this.map, tc.top+tc.height-1, tc.left+i));
			}
			break;
		case LEFT:
			for (var i = 0; i < tc.height; ++i)
			{
				if (getVal(this.map, tc.top+i, tc.left) !== BLANK)
					return false;
			}
			break;
		case RIGHT:
			for (var i = 0; i < tc.height; ++i)
			{
				if (getVal(this.map, tc.top+i, tc.left+tc.width-1) !== BLANK)
					return false;
			}
			break;
		default:
			return false;
			break;
		}
		
		return true;
	};
	
	//移动棋子
	this.move = function(which, direction)
	{
		if (this.canMove(which, direction))
		{
			this.chesses[which].move(direction);
			this.updateMap();
		}
	}
	
	//this.printMap();
}