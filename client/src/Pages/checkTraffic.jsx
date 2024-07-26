import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CheckTraffic() {

    const [date, setDate] = useState(null);
    const { toast } = useToast();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(date);
        try {
            const resp = await axios.get(import.meta.env.VITE_URI + '/fetch-date-record?seldate='+date);
            
            console.log('Succesful Response is : ', resp);
        } catch (error) {
            toast({
                variant: 'destructive',
                description: error.message
            });
            console.log(error);
        }
    }

    return (
        <div className="px-16 py-8 w-full h-full">

            <div className="flex flex-col gap-2 ">
                <p className="text-lg">
                    Choose a Date to check Traffic
                </p>

                <div className="flex gap-2 items-center">
                    <DatePicker date={date} setDate={setDate} />
                    <Button disabled={date == null} onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>

                <div>
                    <DataTable data={[]} />
                </div>


            </div>
        </div>
    )
}