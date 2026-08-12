"use client";

import {Shell} from "@/components/presenter/Shell";
import {PhoneFrame} from "@/components/borrower/PhoneFrame";
import {PathwayList} from "@/components/borrower/PathwayList";

export default function BorrowerOptionsPage() { return <Shell><PhoneFrame step="03" english={<PathwayList/>} telugu={<PathwayList telugu/>}/></Shell>; }
