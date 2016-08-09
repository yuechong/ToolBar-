function require(tool){

	if(!Object.create){
		Object.create = function(proto){
			function F(){}
			F.prototype = proto;
			return new F();
		}
	}

	//继承
	function inherit(subClass,superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
	}
	/*
	 *ToolBar基类
	 *
	*/
	function ToolBar(options) {
		
		this.options = options;
	}

	//ToolBar.prototype.toolBarBox = "#Box";
	//共有函数
	ToolBar.prototype.createHTML = function() {
		
		//循环
		for(var i in this.options){
			//判断类型
			switch (this.options[i].type) {
			    case "input":
			    	var obj = new InputBar(this.options[i]);
			    	console.log(obj);
			    	obj.createHTML();
			    	obj == null;
		
			        break;
			    case "button":
			    	var obj = new ButtonBar(this.options[i]);
			    	console.log(obj);
			    	obj.createHTML();
			    	obj == null;
			
			        break;
			    case "dropdown":
			    	var obj = new DropdownBar(this.options[i]);
			    	console.log(obj);
			    	obj.createHTML();
			    	obj == null;
			   
			        break;
			    case "checkbox":

			    	var obj = new CheckBoxBar(this.options[i]);
			    	console.log(obj);			
			    	obj.createHTML();
			    	obj == null;
			     
			        break;
			    default:
			        // ...
			        break;
			}
		}
		
	};
	//input生成器--子类
	function InputBar(options){
		ToolBar.call(this,options);
	}
	inherit(InputBar,ToolBar);
	InputBar.prototype.createHTML = function(){
		var obj = document.createElement("div");
		obj.setAttribute("class","ui icon input "+this.options.class);
		if(this.options.text ==null){
			this.options.text = "";
		}
		//没有icon，单纯的input
		if(this.options.icon === "" || this.options.icon == null){
			obj.innerHTML = "<div>"+this.options.text+"<input class='ml4' type='text' value='' placeholder='"+this.options.placeholder+"'/></div>";
			if(this.options.func !=null && this.options.func !==""){
				obj.addEventListener("click",this.options.func);
			}

		}else{
			obj.innerHTML = "<div>"+this.options.text+" <input class='ml4' type='text' value='"+this.options.placeholder+"'/></div>";
			obj.innerHTML += "<i class='"+this.options.icon+"'></i>";

			if(this.options.func !=null && this.options.func !==""){
				obj.getElementsByTagName("i")[0].addEventListener("click",this.options.func);
	    	}
			
		}
		
    	this.toolBarBox.appendChild(obj);
	}

	//button生成器--子类
	function ButtonBar(options){
		ToolBar.call(this,options);
	}
	inherit(ButtonBar,ToolBar);
	ButtonBar.prototype.createHTML = function(){

		var botton = document.createElement("button");
		//没有icon，单纯的button
		if(this.options.icon === "" || this.options.icon == null){
			botton.innerHTML = this.options.text;
		}else{
			botton.innerHTML = "<i class='"+this.options.icon+"'></i> "+this.options.text;
		}
    	
    	botton.setAttribute("class",this.options.class); 
    	
    	if(this.options.func !=null && this.options.func !==""){
			botton.addEventListener("click",this.options.func);
    	}
    	
    	this.toolBarBox.appendChild(botton);
	}

	//checkbox生成器--子类
	function CheckBoxBar(options) {
		ToolBar.call(this,options);
	}
	inherit(CheckBoxBar,ToolBar);
	CheckBoxBar.prototype.createHTML = function(){

		var obj = document.createElement("div");
		obj.setAttribute("class","ui checkbox");
		obj.innerHTML = "<input type='checkbox'><label class='cp'>"+this.options.text+"</label>";
		if(this.options.func !=null && this.options.func !==""){
			obj.addEventListener("click",this.options.func);
    	}
		this.toolBarBox.appendChild(obj);
	}

	//dropdown生成器--子类
	function DropdownBar(options){
		ToolBar.call(this,options);
	}
	inherit(DropdownBar,ToolBar);
	//menu -- arry []
	function downMenu(menu,html){
		if(typeof menu === "object" && menu){
			//menu div
			var menuObj = document.createElement("div");
			menuObj.setAttribute("class","menu");
			//html.appendChild(menuObj);
			for(var i in menu){
				//div element
				var obj = document.createElement("div");
				obj.setAttribute("class","item");
				//description
				if(menu[i].description != null && menu[i].description !==""){						
					obj.innerHTML = "<span class='description'>"+menu[i].description+"</span> "+menu[i].text;
				}else{
					//icon
					if(menu[i].icon !=null && menu[i].icon !== ""){
						obj.innerHTML = "<i class='"+menu[i].icon+"'></i> "+menu[i].text;
					}else{
						obj.innerHTML = menu[i].text;
					}
					
				}
				
				if(menu[i].func !=null && menu[i].func !==""){
					obj.addEventListener("click",menu[i].func);
				}
				menuObj.appendChild(obj); 

				//改item下是否有menu
				if(menu[i].menu && typeof menu[i].menu === "object"){
					
					downMenu(menu[i].menu,obj);
				}
			}

			html.appendChild(menuObj);

			return html;
		}else{
			return;
		}
		
	}
	DropdownBar.prototype.createHTML =  function(){
		var obj = document.createElement("div");
		obj.setAttribute("class","ui dropdown "+this.options.class);
		obj.innerHTML = "<div class='text'>"+this.options.text+"</div>";
		obj.innerHTML +="<i class='"+this.options.icon+"'></i>";

		var html=document.createDocumentFragment();

		html = downMenu(this.options.menu,html);
		
		obj.appendChild(html);

		if(this.options.func !=null && this.options.func !== ""){
			obj.addEventListener("click",this.options.func);
		}

		this.toolBarBox.appendChild(obj);

	}


	//ToolBar实例化函数
	function toolBarPro(toolBar,toolBarBox){
		var args = arguments;

		if(typeof args[0] === "object" && args[0]){
			//ToolBar的实例化
			ToolBar.prototype.toolBarBox = args[1];
			var bar = new ToolBar(args[0]);
			bar.createHTML();
			bar == null;
		}
	}



	//require  toolBar
	switch(tool)
	{
		case "toolBar":
			return toolBarPro;
			break;
		case "navBar":
			return
			break;
		default:
			break;
	}
	
	


}