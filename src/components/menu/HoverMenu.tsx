import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverMenu(props: any) {
    const {data, menuLabel, contentStyle} = props;

    const Section = (props:any) =>{
        const {item} = props;
        return <div className="flex flex-col">
            <h2 className="border-b-2 border-primary text-primary mb-2 cursor-default">{item.label}</h2>
            {
                item.menu.map((item: any)=><p className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-2 rounded transition duration-300 ease-in-out">{item.label}</p>)
            }

        </div>

    }
    
  return (
    <HoverCard openDelay={50}>
      <HoverCardTrigger asChild>
        <Button variant="default">{menuLabel}</Button>
      </HoverCardTrigger>
      <HoverCardContent className={contentStyle || "w-[450px]"}>
        <div className="w-full flex justify-between select-none">
            {data.map((item:any, index: number)=><Section key={index} item={item} />)}

        </div>
        
      </HoverCardContent>
    </HoverCard>
  )
}
