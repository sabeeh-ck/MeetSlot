import { useEffect, useState } from "react";
import StatCards from "../../components/admin/StatCards";
import TodaysMeetings from "../../components/admin/TodaysMeetings";
import api from "../../api/axios";

const DashboardPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/admin/dashboard");
                setData(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div className="my-4 flex flex-col gap-4">
            <h2 className="font-semibold">Dashboard Summary</h2>
            <div>
                <StatCards data={data} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-2">
                    <TodaysMeetings data={data.masterSchedule} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
