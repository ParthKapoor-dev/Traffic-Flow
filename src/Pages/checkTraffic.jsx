import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { useState } from "react";

export default function CheckTraffic() {

    const [date, setDate] = useState(null);

    return (
        <div className="px-16 py-8 w-full h-full">

            <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                    Choose a Date to check Traffic
                </p>

                <div className="flex gap-2 items-center">
                    <DatePicker date={date} setDate={setDate} />
                    <Button disabled={date == null} >
                        Submit
                    </Button>
                </div>

                <div>
                    <DataTable />
                </div>


            </div>
        </div>
    )
}