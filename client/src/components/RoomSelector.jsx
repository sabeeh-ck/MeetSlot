import { rooms } from "../constants";

const RoomSelector = ({ selectedRoom, onClick }) => {
    return (
        <div className="bg-bg border-border fixed bottom-0 flex w-full flex-col gap-4 rounded-2xl border-t p-4 pb-50">
            <h2 className="text-textmute">Rooms</h2>
            {rooms.map((room) => {
                const isSelected = selectedRoom === room;

                return (
                    <button
                        key={room}
                        onClick={() => onClick(room)}
                        className={`rounded-lg px-2 py-2 text-left ${isSelected ? "bg-border" : "bg-transparent"}`}
                    >
                        {room}
                    </button>
                );
            })}
        </div>
    );
};

export default RoomSelector;
