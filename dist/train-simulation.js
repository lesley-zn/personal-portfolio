/* Deterministic portfolio simulation. No production connection. */
(function(root){
 const plannedCars=220,carTarget=15000/plannedCars;
 function createState(){return {tick:0,loadedCars:120,currentWeight:carTarget*.42,totalWeight:120*carTarget+carTarget*.42,efficiency:[44.5,43,42,44.7,42.6,44,45.2],quality:[1.6,2,1,3.3,2.6,3.5,3.2],alerts:[]};}
 function step(previous){
  const s={...previous,tick:previous.tick+1,efficiency:[...previous.efficiency],quality:[...previous.quality],alerts:[...previous.alerts]};
  if(s.loadedCars>=plannedCars)return s;
  const amount=Math.min(4.2,carTarget-s.currentWeight);s.currentWeight+=amount;s.totalWeight+=amount;
  if(s.currentWeight>=carTarget-.00001){s.loadedCars++;s.currentWeight=0;}
  s.totalWeight=Math.min(15000,s.totalWeight);
  if(s.tick%3===0){s.efficiency=s.efficiency.slice(1).concat(+(43.2+1.8*Math.sin(s.tick*.31)).toFixed(1));s.quality=s.quality.slice(1).concat(+(2.3+1.1*Math.sin(s.tick*.21)).toFixed(1));}
  if(s.tick%6===0){const kind=s.tick%12===0?'设备温度':'偏载预警';s.alerts.unshift({tick:s.tick,kind,description:kind==='设备温度'?'皮带机温度波动，进入检查流程':'演示车厢载荷偏差，待复核',resolved:false});s.alerts=s.alerts.slice(0,5);}
  s.alerts=s.alerts.map(a=>({...a,resolved:s.tick-a.tick>=9}));return s;
 }
 function summary(s){return {progress:s.totalWeight/15000*100,trains:Math.floor(s.loadedCars/44),currentCar:s.loadedCars%44+1,trainNumber:1040+Math.floor(s.loadedCars/44),complete:s.loadedCars>=plannedCars};}
 const api={createState,step,summary,carTarget,plannedCars};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TrainSimulation=api;
})(typeof globalThis!=='undefined'?globalThis:this);
