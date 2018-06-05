$(function() {
	var chooseColor, 
	myCanvas = document.getElementById("canvas"), 
	ctx = myCanvas.getContext("2d"), 
	image = new Image();
	image.onload = function() {
		ctx.drawImage(image, 0, 0)
	};
	// 原始
	// image.src = "img/img_canvas.png";
	
	// 测试
	image.src = "img/test_img_canvas.png";
	$("#wire").on("click", function(e) {
		if (!chooseColor) {
			alert("请选择要填充的颜色");
			return false
		}
		e = e.originalEvent || e;
		console.log('e')
		console.log(e)
		console.log('e')
		var wireOffset = $(this).offset();

		console.log('$(this)')
		console.log($(this))//div#wire
		console.log($(this).offset())
		console.log('$(this)')
		// pageX pageY jQuery鼠标位置
		// left top 就是鼠标在#wire的点击位置
		var left = Math.floor(e.pageX - wireOffset.left);
		var top = Math.floor(e.pageY - wireOffset.top);
		// 返回一个imageData对象，用来描述canvas区域隐含的像素数据。这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh
		// sx将要被提取的图像数据矩形区域的左上角x坐标
		// sy将要被提取的图像数据矩形区域的左上角y坐标
		// sw将要被提取的图像数据矩形区域的宽度
		// sh将要被提取的图像数据矩形区域的高度
		var imgData = ctx.getImageData(left, top, 1, 1);
		console.log('imgData')
		console.log(imgData);//data:Uint8ClampedArray(4) [255, 255, 255, 255]
		console.log('imgData')
		// 获取到点击区域的颜色
		var colorArr = imgData.data;
		// 四个0，说明点击到线条外面了
		if (colorArr[0] === 0 && colorArr[1] === 0 && colorArr[2] === 0 && colorArr[3] === 0) {
			alert("此处不能上色");
			return false
		}
		//判断是否点在线条上，是的话不能上色
		if(colorArr[0] < 50 && colorArr[1] < 50 && colorArr[2] < 50 && colorArr[3] === 255){
			alert("线条处不能上色");
			return false
		}
		var fillColor = hexToRgb(chooseColor).split(",");
		// ["0", "80", "161", 255]
		fillColor.push(255);
		// 绘制
		floodFillLinear(myCanvas, left, top, fillColor, 80);
	});
	$("#colors").on("click", "li:not(.checked)", function() {
		$(this).addClass("checked").siblings(".checked").removeClass("checked");
		chooseColor = $(this).html()
	});
});