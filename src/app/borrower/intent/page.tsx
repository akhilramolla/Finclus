"use client";

import {Shell} from "@/components/presenter/Shell";
import {IntentInput} from "@/components/borrower/IntentInput";
import {PhoneFrame} from "@/components/borrower/PhoneFrame";

export default function BorrowerIntentPage() { return <Shell><PhoneFrame step="01" english={<IntentInput/>} telugu={<IntentInput telugu/>}/></Shell>; }
