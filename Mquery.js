function Mquery(obj){
    this.elements=[];
    switch (typeof obj){
        case 'function' :addEvent(window,'load',obj);break;
        case 'string' :this.elements=getElm(obj);break;
        case 'object' :break;
    };
    return this;
};
//根据选择器获取元素
function getElm(str,el){
    var enm=[];
    var doc=document;
    if(el && el.length>0){
        enm=el;
        doc=null;
    }
    var arr= str.split(' ');
    for(var i=0; i<arr.length;i++){
        if(doc){
            var t;
            switch(arr[i].charAt(0)){
                case '#': t=document.getElementById(arr[i].substring(1));break;
                case '.': t=doc.getElementsByClassName(arr[i].substring(1));break;
                default : t= doc.getElementsByTagName(arr[i]);
            }
            if(t){
                if(t.length){
                    for(var v=0;v< t.length;v++){
                        enm.push(t[v]);
                    }
                }else if(arr[i].charAt(0)=='#'){
                    enm.push(t);
                }
                doc=null;
            }
        }else if(enm.length>0){
            enm=(forelm(arr[i],enm));
        }
    }
    return enm;
}
function forelm(str,arr){
    var newarr=[];
    for(var i=0;i<arr.length;i++){
        switch (str.charAt(0)){
            case '#':var a= document.getElementById(str.substring(1)); if(a) newarr.push(a);break;
            case '.':var b= arr[i].getElementsByClassName(str.substring(1));
                if(b.length>0) {
                    for(var x =0;x< b.length;x++){
                        newarr.push(b[x])
                    }
                };break;
            default :var c= arr[i].getElementsByTagName(str);
                if(c.length>0){
                    for(var z=0;z< c.length;z++)
                        newarr.push(c[z]);
                };break;
        }
    }
    return newarr;
};
function addEvent(obj,eventname,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+eventname,function(){fn.call(obj)});
    }else{
        obj.addEventListener(eventname,function(){
         return fn()
     },false);
    }
};
//取样式
 Mquery.prototype.css=function(attr,value){
     for(var i=0; i<this.elements.length;i++){
         if(arguments.length===2){
             this.elements[i].style[attr]=value;
         }else if(arguments.length===1){
             return getelementStyle(this.elements[i],attr);
         }
   }
 };
//获取当前样式
function getelementStyle(obj,attr){
  if(obj.currentStyle){
     return obj.currentStyle[attr];
  }else{
     return window.getComputedStyle(obj,attr)
  }
};
//添加事件
Mquery.prototype.click=function(fn){
for(var i=0;i<this.elements.length;i++){
    addEvent(this.elements[i],'click',fn);
}
};
//toggle事件模仿
Mquery.prototype.toggle=function(){
    var _arguments=arguments;
for(var i=0;i<this.elements.length;i++){
    (function(obj,count){
        addEvent(obj,'click',function(){_arguments[count++%_arguments.length].call();});
  })(this.elements[i],0)
}
};
//元素显示
Mquery.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';
    }
};
//元素隐藏
Mquery.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
     this.elements[i].style.display='none';
    }
};
//替换HTML元素或获取文本
Mquery.prototype.html=function(strhtml){
        for(var i=0;i<this.elements.length;i++){
            if(strhtml){
                this.elements[i].innerHTML=strhtml;
            }else{
           return this.elements[i].innerHTML;
            }
        }
};
//设置和获取文本
Mquery.prototype.text=function(strtext){
    var text='';
    for(var i=0;i<this.elements.length;i++){
        if(strtext){
            this.elements[i].innerText=strtext;
        }else{
            text+= this.elements[i].innerText;
        }
    }
    if(strtext) {return this.elements;}else {return text;}
};
//元素节点移除
Mquery.prototype.remove=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].parentNode.removeChild(this.elements[i]);
    }
};
//数字快速排序
Mquery.prototype.numbersort=function(arr){
    if(arr.length<=1){
        return arr;
    }
   var index=Math.floor(arr.length/2);
    var val=arr.splice(index,1);
    var left=[];
    var right=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<val){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return this.numbersort(left).concat(val,this.numbersort(right));
};
//查找特定元素下的html元素
Mquery.prototype.find=function(str){
   this.elements= getElm(str,this.elements);
}
//委托绑定事件处理
Mquery.prototype.delegate=function(el,event,data,fn){
    for(var i=0;i<this.elements.length;i++){
        (function (obj){
        addEvent(obj,event,function(ev){
            var e=ev || window.event;
            var eventsouroce=e.srcElement || e.target;
            var elobj=getElm(el,obj);
            if(elobj && elobj.length>0){
                if(eventsouroce.id!=elobj[0].id){
                     return false;
                }else if(eventsouroce.className !=elobj[0].className){
                    return false;
                }else if(eventsouroce.tagName.toUpperCase()!=elobj[0].tagName.toUpperCase()){
                    return false;
                }else{
                    fn.call(this);
                }
            }
        });
    })(this.elements[i])
    }
};
//计算字符长度中文为2个字符长度，英文数字一个字符长度
Mquery.prototype.StrLength=function(str){
        if (str == null) return 0;
        if (typeof str != "string"){
                str += "";
            }
        return str.replace(/[^\x00-\xff]/g,"01").length;
}
//对象深拷贝
Mquery.prototype.depthcopy=function(obj){
    var newobj={};
    for(var key in obj){
            if(typeof obj[key]=='object'){
                newobj[key]= this.depthcopy(obj[key])
            }else{
                newobj[key]=obj[key];
            }
        }
    return newobj;
};
Mquery.prototype.ajax=function(){
    alert(1)
};
function $(obj){
   return new Mquery(obj);
}