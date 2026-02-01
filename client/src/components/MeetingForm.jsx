const MeetingForm = ({ selectedDate, selectedSlots, closeSheet }) => {
    return (
        <div className="flex flex-col py-4">
            <form className="flex flex-col gap-4 text-sm">
                <div className="flex flex-col gap-2">
                    <label htmlFor="purpose">Meeting title</label>
                    <input type="text" id="purpose" required />
                </div>
                <div className="flex gap-4">
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="date">Date</label>
                        <input type="date" />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="time">Beginning</label>
                        <input type="time" />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="date">Ending</label>
                        <input type="time" />
                    </div>
                </div>

                <button className="bg-text text-bg mx-auto mt-15 rounded-2xl px-8 py-2">
                    Save
                </button>
            </form>
        </div>
    );
};

export default MeetingForm;
