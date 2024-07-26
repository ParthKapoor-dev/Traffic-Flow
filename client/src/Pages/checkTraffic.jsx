import { DataTable } from "@/components/Table";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CheckTraffic() {

    const [date, setDate] = useState(null);
    const [data, setData] = useState([]);
    const { toast } = useToast();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(date);
        const chosenDate = new Date(date);
        const month = chosenDate.getMonth() < 10 ? `0${chosenDate.getMonth() + 1}` : (chosenDate.getMonth() + 1).toString();
        const currentDate = chosenDate.getDate() < 10 ? `0${chosenDate.getDate()}` : chosenDate.getDate().toString();
        const finalDate = `${chosenDate.getFullYear()}-${month}-${currentDate}`;

        try {
            const resp = await axios.get(import.meta.env.VITE_URI + '/fetch-date-record?seldate=' + finalDate);

            console.log('Succesful Response is : ', resp.data.data.data);
            setData(resp.data.data.data);
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
                    <DataTable data={data} />
                </div>


            </div>
        </div>
    )
}