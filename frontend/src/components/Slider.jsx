import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
    return (
        <SliderPrimitive.Root
            className="relative flex w-full touch-none select-none items-center"
            value={[value]}
            min={min}
            max={max}
            step={step}
            onValueChange={(val) => onChange(val[0])}
        >
            <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-600">
                <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg focus:outline-none" />
        </SliderPrimitive.Root>
    );
};

export default Slider;
