import { CogIconOutline } from "../../icons";

const StatCards = ({ data }) => {
    const cardDetails = [
        {
            title: "Total Bookings",
            value: data.totalBookings,
        },
    ];

    return (
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
            {cardDetails.map(({ title, value }) => (
                <div className="border-border bg-surface flex flex-col gap-2 rounded-xl border p-4">
                    <span className="text-lg">{title}</span>
                    <span className="text-4xl font-bold">{value}</span>
                </div>
            ))}
        </div>
    );
};

export default StatCards;
