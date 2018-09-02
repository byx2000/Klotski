/*
	包含页面元素的事件处理函数
*/

//上
function onUpClick()
{
	views[indexOfSelected].move(UP);
	views[indexOfSelected].elem.focus();
}

//下
function onDownClick()
{
	views[indexOfSelected].move(DOWN);
	views[indexOfSelected].elem.focus();
}

//左
function onLeftClick()
{
	views[indexOfSelected].move(LEFT);
	views[indexOfSelected].elem.focus();
}

//右
function onRightClick()
{
	views[indexOfSelected].move(RIGHT);
	views[indexOfSelected].elem.focus();
}

//下一关
function onNextLayoutClick() //事件处理方法名不能与元素id相同
{
	//改变布局
	if (indexOfSelected != -1)
		views[indexOfSelected].hideArrow();
	indexOfSelected = -1;
	indexOfLayout = Math.min(indexOfLayout+1, layoutList.length-1);
	views = createViews(layout[indexOfLayout], unit);
	
	//改变关卡名
	document.getElementById("layoutName").innerHTML = layoutName[indexOfLayout];
}

//上一关
function onPreviousLayoutClick()
{
	//改变布局
	if (indexOfSelected != -1)
		views[indexOfSelected].hideArrow();
	indexOfSelected = -1;
	indexOfLayout = Math.max(indexOfLayout-1, 0);
	views = createViews(layout[indexOfLayout], unit);
	
	//改变关卡名
	document.getElementById("layoutName").innerHTML = layoutName[indexOfLayout];
}

//重置布局
function onRefreshLayout()
{
	layout[indexOfLayout] = new Layout(layoutList[indexOfLayout]);
	views = createViews(layout[indexOfLayout], unit);
	if (indexOfSelected !== -1)
	{
		views[indexOfSelected].hideArrow();
		indexOfSelected = -1;
	}
}

//弹出游戏提示
function onTitleClick()
{
	window.open("help/help.html", "popwindow", "width=100;height=50;");
}