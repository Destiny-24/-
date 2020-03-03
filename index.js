let backgroundColors = [ '#f50','#2db7f5','#87d068','#108ee9','#cccccc'];
let messageList = [];
const PAGE = {
  data:{
    backgroundColors:backgroundColors,
    itemWidth: 320,
    itemHeight: 150,
    paddingOffset: 30,
    zIndex:0,
    item: null,
    itemOffsetTop: null,
    itemOffsetLeft: null,
    pageX: null,
    pageY: null,
    isLock: true,
  },
  init:function(){
    this.bind();
  },
  bind:function(){
    let button = document.getElementById('button');
    button.addEventListener('click',this.clickButton);
    let messageList = document.getElementById('message-list');
    this.onEventLister(messageList,'mousedown','message-item',this.handleMouseDown);
    window.addEventListener('mousemove',this.handleMouseMove);
    window.addEventListener('mouseup',this.handleMouseup);
  },
  onEventLister: function(parentNode,action,childClassName,callback) {
    parentNode.addEventListener(action,function(e){
      e.target.className.indexOf(childClassName) >= 0 && callback(e);
    })
  },
  handleMouseDown:function(e){
    let item = e.target;
    item.style.zIndex = ++PAGE.data.zIndex;
    PAGE.data.itemOffsetLeft = item.offsetLeft;
    PAGE.data.itemOffsetTop = item.offsetTop;
    PAGE.data.pageX = e.pageX;
    PAGE.data.pageY = e.pageY;
    PAGE.data.item = item;
    PAGE.data.isLock = false;
  },
  handleMouseMove:function(e){
    if(!PAGE.data.isLock){
      let messageList = document.getElementById('message-list');
      let containerWidth = messageList.offsetWidth;
      let containerHeight = messageList.offsetHeight;
      let itemWidth  = PAGE.data.itemWidth;
      let itemHeight = PAGE.data.itemHeight;
      let paddingOffset = PAGE.data.paddingOffset;
      let maxWidth  = containerWidth - itemWidth - paddingOffset;
      let maxHeight = containerHeight - itemHeight - paddingOffset;
      let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
      let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop;
      translateX = translateX > maxWidth ? maxWidth : translateX;
      translateY = translateY > maxHeight ? maxHeight : translateY;
      translateX = translateX < paddingOffset ? paddingOffset : translateX;
      translateY = translateY < paddingOffset ? paddingOffset : translateY;
      PAGE.data.item.style.left = translateX + 'px';
      PAGE.data.item.style.top = translateY + 'px';
    }
  },
  handleMouseup:function(){
    PAGE.data.isLock = true;
  },
  clickButton:function(){
    let input = document.getElementById('input');
    let value = input.value;
    if(value){
      let messageList = document.getElementById('message-list');
      let containerWidth = messageList.offsetWidth;
      let containerHeight = messageList.offsetHeight;
      let itemWidth = PAGE.data.itemWidth;
      let itemHeight = PAGE.data.itemHeight;
      let paddingOffset = PAGE.data.paddingOffset;
      let maxWidth = containerWidth - itemWidth - paddingOffset;
      let maxHeiht = containerHeight - itemHeight - paddingOffset;
      let randomTop = PAGE.randomBetween(paddingOffset,maxHeiht);
      let randomLeft = PAGE.randomBetween(paddingOffset,maxWidth);
      let zIndex = ++PAGE.data.zIndex;
      let backgroundColors = PAGE.data.backgroundColors;
      let backgroundColor = backgroundColors[zIndex%backgroundColors.length];
      let messageItem = document.createElement('div');
      let messageItemCard = document.createElement('p');
      messageItemCard.setAttribute('class','message-item-card');
      messageItem.setAttribute('class','message-item');
      messageItemCard.innerText = value;
      let styleSrt =`
        z-index:${zIndex};
        background-color:${backgroundColor};
        top:${randomTop}px;
        left:${randomLeft}px;`;
      messageItem.setAttribute('style',styleSrt);
      messageList.appendChild(messageItem);
      messageItem.appendChild(messageItemCard);
      input.value = '';
    }
  },
  randomBetween:function(min,max){
    return Math.floor(Math.random()*(max - min) + min);
  }
}
PAGE.init(); 