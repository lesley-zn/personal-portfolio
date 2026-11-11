(() => {
 const model=window.TrainSimulation,viewport=document.querySelector('.viewport'),dashboard=document.querySelector('.dashboard'),shell=document.querySelector('.demo-shell');
 const embedded=new URLSearchParams(location.search).get('embedded')==='1';document.body.classList.toggle('embedded',embedded);
 let state=model.createState(),paused=matchMedia('(prefers-reduced-motion: reduce)').matches,visible=true;
 const ns='http://www.w3.org/2000/svg',byId=id=>document.getElementById(id);
 function svg(tag,attrs,parent){const node=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));parent.appendChild(node);return node;}
 function grid(parent,min,max){for(let i=0;i<=6;i++){const y=24+i*25;svg('line',{x1:28,x2:415,y1:y,y2:y},parent);const label=svg('text',{x:21,y:y+4,'text-anchor':'end'},parent);label.textContent=(max-i*(max-min)/6).toFixed(max===4?1:0);}for(let i=0;i<7;i++){const label=svg('text',{x:47+i*58,y:198,'text-anchor':'middle'},parent);label.textContent=`采样${i+1}`;}}
 grid(byId('efficiency-grid'),40,46);grid(byId('quality-grid'),0,4);
 const bars=Array.from({length:7},(_,i)=>{const g=svg('g',{},byId('efficiency-bars'));const rect=svg('rect',{x:39+i*58,width:24,y:80,height:94,fill:'url(#bar-fill)'},g);const cap=svg('rect',{x:39+i*58,width:24,y:80,height:2,fill:'#1ed6ff'},g);const title=svg('title',{},g);return {rect,cap,title};});
 const dots=Array.from({length:7},()=>svg('circle',{r:2.5},byId('quality-points')));
 const cells=Array.from({length:44},(_,i)=>{const node=document.createElement('span');node.textContent=i+1;byId('carriages').appendChild(node);return node;});
 const num=n=>n.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1});
 function render(){
  const s=model.summary(state),loadedInTrain=state.loadedCars%44;
  byId('tonnage').innerHTML=`${num(state.totalWeight)} <small>吨</small>`;
  byId('progress').textContent=s.progress.toFixed(1)+'%';byId('tonnage-bar').style.width=s.progress+'%';
  byId('trains').innerHTML=`${s.trains} <small>列</small>`;byId('cars').innerHTML=`${state.loadedCars} <small>节</small>`;
  byId('car-caption').textContent=s.complete?'全部完成':`第${s.currentCar}节`;
  byId('efficiency').innerHTML=`${state.efficiency[6].toFixed(1)} <small>分钟/列</small>`;
  byId('train-number').textContent=s.complete?'计划完成':`DJ${s.trainNumber}`;
  byId('current-weight').textContent=state.currentWeight.toFixed(1)+' t';byId('current-progress').textContent=s.complete?'100%':Math.round(state.currentWeight/model.carTarget*100)+'%';
  byId('loaded-in-train').textContent=s.complete?'全部完成':`已装 ${loadedInTrain} 节`;
  byId('task-state').textContent=s.complete?'已完成':'进行中';
  byId('expected-time').textContent=s.complete?'已完成':`约${Math.ceil((44-loadedInTrain)*39/44)} min`;
  byId('alert-count').textContent=state.alerts.filter(a=>!a.resolved).length;
  byId('quality-current').textContent=state.quality[6].toFixed(1)+'%';
  state.efficiency.forEach((v,i)=>{const height=(v-40)/6*150,y=174-height;bars[i].rect.setAttribute('y',y);bars[i].rect.setAttribute('height',height);bars[i].cap.setAttribute('y',y);bars[i].title.textContent=`采样${i+1}：${v}分钟`;});
  const points=state.quality.map((v,i)=>[47+i*58,174-v/4*150]);byId('quality-path').setAttribute('d',points.map(([x,y],i)=>(i?'L':'M')+x+' '+y).join(' '));points.forEach(([x,y],i)=>{dots[i].setAttribute('cx',x);dots[i].setAttribute('cy',y);});
  cells.forEach((node,i)=>{const loaded=s.complete||i<loadedInTrain,current=!s.complete&&i===loadedInTrain;node.className=loaded?'loaded':current?'loading':'';node.title=`第${i+1}节 / ${loaded?'已装':current?'装载中':'未装'}`;});
  const tbody=byId('events-body');tbody.replaceChildren();
  if(!state.alerts.length){const row=tbody.insertRow();const cell=row.insertCell();cell.colSpan=4;cell.textContent='当前无模拟异常，演示继续后更新';}
  state.alerts.forEach(a=>{const row=tbody.insertRow(),elapsed=a.tick*2.4;const vals=[`+${Math.floor(elapsed/60).toString().padStart(2,'0')}:${Math.floor(elapsed%60).toString().padStart(2,'0')}`,a.kind,a.description,a.resolved?'已处理':'待复核'];vals.forEach((value,i)=>{const cell=row.insertCell();cell.textContent=value;cell.title=value;if(i===1||i===3)cell.className=a.resolved?'event-resolved':'event-warning';});});
 }
 function controls(){shell.classList.toggle('paused',paused);byId('pause').textContent=paused?'继续':'暂停';byId('pause').setAttribute('aria-pressed',String(paused));byId('demo-status').textContent=paused?'动态演示已暂停':'动态演示正在运行';}
 function scale(){const w=viewport.clientWidth,h=viewport.clientHeight;dashboard.style.setProperty('--screen-scale',Math.min(w/1920,h/1080));}
 new ResizeObserver(scale).observe(viewport);scale();render();controls();
 byId('pause').addEventListener('click',()=>{paused=!paused;controls();});
 byId('reset').addEventListener('click',()=>{state=model.createState();paused=matchMedia('(prefers-reduced-motion: reduce)').matches;controls();render();byId('demo-status').textContent='已回到初始演示数据';});
 byId('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await shell.requestFullscreen();}catch{byId('demo-status').textContent='当前浏览器不支持全屏，请打开独立大屏查看';byId('demo-status').classList.remove('sr-only');}});
 document.addEventListener('fullscreenchange',()=>{byId('fullscreen').textContent=document.fullscreenElement?'退出全屏':'全屏';scale();});
 document.addEventListener('visibilitychange',()=>{visible=!document.hidden;});
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:0}).observe(shell);
 function clock(){byId('clock').textContent=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());}
 clock();setInterval(clock,1000);setInterval(()=>{if(paused||!visible||document.hidden)return;state=model.step(state);render();if(model.summary(state).complete){paused=true;controls();byId('demo-status').textContent='本轮计划已完成，可以重播';}},2400);
})();
