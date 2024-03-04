import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


export function PhoneMenu(props: any) {
    const { data } = props;

    const Section = (props: any) => {
        const { item } = props;
        return <div className="flex flex-col">
            <h2 className="border-b-2 border-primary text-primary my-1 cursor-default">{item.label}</h2>
            {
                item.menu.map((item: any, index: number) => <p className="cursor-pointer hover:bg-primary hover:text-primary-foreground my-1 rounded transition duration-300 ease-in-out" key={index}>{item.label}</p>)
            }

        </div>

    }
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Exams</AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-col justify-between select-none">
                        {data.section.map((item: any, index: number) => <Section key={index} item={item} />)}
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Subjects</AccordionTrigger>
                <AccordionContent>
                    <div className="w-full flex flex-col justify-between select-none">
                        {data.subject.map((item: any, index: number) => <Section key={index} item={item} />)}
                    </div>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}