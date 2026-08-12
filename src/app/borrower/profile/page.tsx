"use client";

import {Shell} from "@/components/presenter/Shell";
import {PhoneFrame} from "@/components/borrower/PhoneFrame";
import {QuestionFlow} from "@/components/borrower/QuestionFlow";

export default function BorrowerProfilePage() { return <Shell><PhoneFrame step="02" english={<QuestionFlow/>} telugu={<QuestionFlow telugu/>}/></Shell>; }
