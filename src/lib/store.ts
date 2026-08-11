"use client";
import {create} from "zustand"; import {persist} from "zustand/middleware";
interface DemoState { started:boolean; current:number; scale:number; notes:boolean; governance:boolean; retracted:boolean; set:(p:Partial<DemoState>)=>void; reset:()=>void; }
export const useDemoStore=create<DemoState>()(persist((set)=>({started:false,current:0,scale:1,notes:false,governance:false,retracted:false,set:(p)=>set(p),reset:()=>set({started:false,current:0,scale:1,notes:false,governance:false,retracted:false})}),{name:"finclus-demo-v1"}));
