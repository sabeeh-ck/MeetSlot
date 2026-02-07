import { rooms } from "../constants";

const RoomSelector = ({ selectedRoom, selectRoom, closeSheet }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="">Rooms</h2>
            {rooms.map((room) => {
                const isSelected = selectedRoom === room;

                return (
                    <button
                        key={room}
                        onClick={() => {
                            selectRoom(room);
                            closeSheet();
                        }}
                        className={`active:bg-border rounded-lg px-2 py-2 text-left ${isSelected ? "bg-border" : "bg-transparent"}`}
                    >
                        {room}
                    </button>
                );
            })}
        </div>
    );
};

export default RoomSelector;
