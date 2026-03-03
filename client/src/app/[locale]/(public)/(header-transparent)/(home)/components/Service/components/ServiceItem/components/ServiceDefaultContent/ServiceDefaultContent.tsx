type Props = {
    title: string;
};
function ServiceDefaultContent({ title }: Props) {
    return (
        <div className="absolute bottom-6 left-6 flex flex-col gap-1 transition-opacity duration-500 select-none group-hover/service:opacity-0">
            <div className="flex items-center gap-3">
                <span className="h-5 w-0.75 bg-(--primary-color)" />
                <h4 className="text-xl font-semibold text-white">{title}</h4>
            </div>

            <p className="mt-2.5 text-xl font-semibold text-white">
                {/* {item.subTitle} */}
            </p>
        </div>
    );
}

export default ServiceDefaultContent;
