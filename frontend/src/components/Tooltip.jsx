import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const Tooltip = ({ content, children }) => {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    {/* Wrapping the children (buttons) in Tooltip.Trigger */}
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                    side="top"
                    className="bg-black text-white rounded-md px-2 py-1 text-sm"
                >
                    {content}
                    <TooltipPrimitive.Arrow className="fill-black" />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
};

export default Tooltip;

