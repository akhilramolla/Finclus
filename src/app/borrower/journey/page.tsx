"use client";

import {Shell} from "@/components/presenter/Shell";
import {PhoneFrame} from "@/components/borrower/PhoneFrame";
import {JourneyGraph} from "@/components/borrower/JourneyGraph";

export default function BorrowerJourneyPage() { return <Shell><PhoneFrame step="04" english={<JourneyGraph/>} telugu={<JourneyGraph telugu/>}/></Shell>; }
