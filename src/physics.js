export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function random(seed=42){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
export const DEFAULT_POLICY=[2.6,.55,.08,.7,.25,.4,1.1,.9,.22,.6,.35,.2];
export const POLICY_BOUNDS=[[1,5],[0,1.2],[-.6,.6],[0,1.8],[0,1.2],[0,1.5],[.1,2],[.1,2],[0,.6],[0,1.5],[0,1],[0,1]];
export class Walker{
 constructor(policy=DEFAULT_POLICY,{target=1.4,seed=42,assist=.8}={}){this.policy=[...policy];this.target=target;this.assist=assist;this.rng=random(seed);this.reset();}
 reset(){this.t=0;this.steps=0;this.reward=0;this.energy=0;this.fallen=false;this.contacts=[false,false];this.nodes=[this.node(0,1.02,2),this.node(0,1.55,2),this.node(-.12,.59,1),this.node(-.2,.16,1),this.node(.12,.59,1),this.node(.2,.16,1)];this.links=[[0,1,.53],[0,2,.45],[2,3,.45],[0,4,.45],[4,5,.45]];this.startX=0;this.velocity=0;this.lastX=0;this.lastReward=0;}
 node(x,y,m){return{x,y,px:x,py:y,inv:1/m};}
 motor(a,b,target,gain){const A=this.nodes[a],B=this.nodes[b],dx=B.x-A.x,dy=B.y-A.y,len=Math.hypot(dx,dy);const err=wrap(target-Math.atan2(dx,-dy));const old=Math.atan2(B.px-A.px,-(B.py-A.py));const rate=wrap(Math.atan2(dx,-dy)-old)/this.dt;const torque=clamp(gain*err-.12*rate,-12,12);const f=torque/Math.max(len,.1);const fx=-dy/len*f,fy=dx/len*f;B.x+=fx*B.inv*this.dt*this.dt;B.y+=fy*B.inv*this.dt*this.dt;A.x-=fx*A.inv*this.dt*this.dt;A.y-=fy*A.inv*this.dt*this.dt;this.energy+=Math.abs(torque*rate)*this.dt;}
 step(){if(this.fallen)return 0;const dt=this.dt=1/120,p=this.policy;this.t+=dt;const phase=this.t*p[0]*Math.PI*2;const torso=this.nodes[1],hip=this.nodes[0];const lean=Math.atan2(torso.x-hip.x,torso.y-hip.y);this.motor(0,1,Math.PI+p[2]*.3-lean*p[9],10+30*p[10]);
 for(let side=0;side<2;side++){const s=phase+side*Math.PI;const h=p[2]+p[1]*Math.sin(s)+clamp(this.target-this.velocity,-1,1)*p[8];const k=h+p[4]+p[3]*Math.max(0,Math.sin(s+p[5]));this.motor(0,2+side*2,h,5*p[6]);this.motor(2+side*2,3+side*2,k,5*p[7]);}
 hip.y+=this.assist*clamp(90*(.94-hip.y)-12*(hip.y-hip.py)/dt+9.81,-30,50)*dt*dt;
for(const n of this.nodes){const vx=(n.x-n.px)*(1-.001-p[11]*.003),vy=(n.y-n.py)*.998;n.px=n.x;n.py=n.y;n.x+=vx;n.y+=vy-9.81*dt*dt;}
 this.contacts=[false,false];for(let iter=0;iter<12;iter++){for(const[a,b,l]of this.links){const A=this.nodes[a],B=this.nodes[b],dx=B.x-A.x,dy=B.y-A.y,d=Math.max(1e-8,Math.hypot(dx,dy)),e=(d-l)/d/(A.inv+B.inv);A.x+=dx*e*A.inv;A.y+=dy*e*A.inv;B.x-=dx*e*B.inv;B.y-=dy*e*B.inv;}
 for(let i=0;i<this.nodes.length;i++){const n=this.nodes[i],floor=i===3||i===5?.055:.025;if(n.y<floor){n.y=floor;if(i===3||i===5){this.contacts[(i-3)/2]=true;n.px=n.x-(n.x-n.px)*.7;}n.py=n.y;}}}
 this.velocity=.9*this.velocity+.1*(hip.x-this.lastX)/dt;this.lastX=hip.x;this.steps++;this.fallen=hip.y<.47||torso.y<.75||Math.abs(lean)>1.2;
 const speedReward=Math.exp(-Math.pow((this.velocity-this.target)/Math.max(.6,this.target),2));const upright=clamp((torso.y-hip.y)/.53,0,1);this.lastReward=dt*(1.5*speedReward+2*clamp(this.velocity,-2,this.target)+.2*upright+.1- .002*this.energy/Math.max(dt,this.t));if(this.fallen)this.lastReward-=2;this.reward+=this.lastReward;return this.lastReward;
 }
}
export function evaluate(policy,options={}){const w=new Walker(policy,options);for(let i=0;i<(options.steps??720)&&!w.fallen;i++)w.step();return{reward:w.reward,distance:w.nodes[0].x,survival:w.t,velocity:w.velocity,energy:w.energy,fallen:w.fallen};}
export class Trainer{
 constructor({seed=42,target=1.4,population=24,steps=720,assist=.8}={}){this.seed=seed;this.target=target;this.assist=assist;this.population=population;this.steps=steps;this.rng=random(seed);this.mean=[...DEFAULT_POLICY];this.sigma=POLICY_BOUNDS.map(([a,b])=>(b-a)*.24);this.best=[...this.mean];this.bestScore=-Infinity;this.generation=0;this.history=[];this.samples=[];this.baseline=evaluate(this.mean,{target,steps,assist}).reward;}
 normal(){return Math.sqrt(-2*Math.log(Math.max(1e-9,this.rng())))*Math.cos(2*Math.PI*this.rng());}
 candidate(index){if(index===0)return[...this.best];return this.mean.map((v,i)=>clamp(v+this.sigma[i]*this.normal(),...POLICY_BOUNDS[i]));}
 record(policy,result){this.samples.push({policy,result});}
 finish(){if(!this.samples.length)throw new Error('No evaluated candidates');this.samples.sort((a,b)=>b.result.reward-a.result.reward);const champion=this.samples[0];if(champion.result.reward>this.bestScore){this.bestScore=champion.result.reward;this.best=[...champion.policy];}const elite=this.samples.slice(0,Math.max(2,Math.floor(this.samples.length*.25)));for(let i=0;i<this.mean.length;i++){const m=elite.reduce((s,e)=>s+e.policy[i],0)/elite.length;const sd=Math.sqrt(elite.reduce((s,e)=>s+(e.policy[i]-m)**2,0)/elite.length);this.mean[i]=.3*this.mean[i]+.7*m;this.sigma[i]=Math.max((POLICY_BOUNDS[i][1]-POLICY_BOUNDS[i][0])*.025,.3*this.sigma[i]+.7*sd);}this.generation++;const row={generation:this.generation,best:this.bestScore,mean:this.samples.reduce((s,e)=>s+e.result.reward,0)/this.samples.length,...champion.result};this.history.push(row);this.samples=[];return row;}
 runGeneration(){for(let i=0;i<this.population;i++){const p=this.candidate(i);this.record(p,evaluate(p,{target:this.target,steps:this.steps,assist:this.assist}));}return this.finish();}
}
