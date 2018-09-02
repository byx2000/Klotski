/*
	全局变量和入口函数
*/

//全局变量
var layout;
var unit;
var views;
var indexOfSelected;
var indexOfLayout;
var runtimeData;

//入口函数
window.onload = function()
{	
	setInterface();
	
	//加载游戏数据
	layout = new Array();
	for (var i = 0; i < layoutList.length; ++i)
	{
		layout[i] = new Layout(layoutList[i]);
	}
	
	//开始游戏
	indexOfLayout = 0;
	indexOfSelected = -1;
	document.getElementById("layoutName").innerHTML = layoutName[indexOfLayout];
	views = createViews(layout[indexOfLayout], unit);
};

window.onresize  = function()
{
	setInterface();
	
	views = createViews(layout[indexOfLayout], unit);
};

function setInterface()
{
	//获取屏幕宽度和高度
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	unit = Math.floor(screenHeight / 6);
	
	//调整棋盘位置
	var chessboard = document.getElementById("chessboard");
	chessboard.style.position = "relative";
	chessboard.style.width = 4 * unit + "px";
	chessboard.style.height = 5 * unit + "px";
	chessboard.style.left = (screenWidth-4 * unit-10) / 2 + "px";
	chessboard.style.top = screenHeight-10-5 * unit + "px";
	
	//设置箭头图片
	setElement("up", 0, 0, Math.floor(unit)/2, Math.floor(unit)/2, "", "", onUpClick);
	setElement("down", 0, 0, Math.floor(unit)/2, Math.floor(unit)/2, "", "", onDownClick);
	setElement("left", 0, 0, Math.floor(unit)/2, Math.floor(unit)/2, "", "", onLeftClick);
	setElement("right", 0, 0, Math.floor(unit)/2, Math.floor(unit)/2, "", "", onRightClick);
	
	//设置“华容道”图片
	setElement("titleImg", 0, (screenHeight-5*unit)/2, 0, 5*unit, "", "", onTitleClick);
	hideElement("titleImg", false);
	
	//设置关卡图片
	setElement("nextLayout", screenWidth/2 + unit*2 + 5, (screenHeight-nextLayout.height)/2 + unit/2, unit, unit, "", "", onNextLayoutClick);
	setElement("previousLayout", screenWidth/2 - unit*2 - unit - 5, (screenHeight-previousLayout.height)/2 + unit/2, unit, unit, "", "", onPreviousLayoutClick);
	hideElement("nextLayout", false);
	hideElement("previousLayout", false);
	
	//设置刷新图片
	setElement("refresh", screenWidth - unit, 0, unit, unit, "", "", onRefreshLayout);
	hideElement("refresh", false);
	
	//设置关卡名字标签
	var name = document.getElementById("layoutName");
	name.style.width = 4*unit + "px";
	name.style.height = unit + "px";
	name.style.left = (screenWidth-4*unit)/2 + "px";
	name.style.fontSize = unit*9/11 + "px";
}