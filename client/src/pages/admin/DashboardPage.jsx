import { useEffect, useState } from "react";
import StatCards from "../../components/admin/StatCards";
import api from "../../api/axios";
import RecentActivity from "../../components/admin/RecentActivity";
import TodaysBookings from "../../components/admin/TodaysBookings";

const DashboardPage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const recentActivity = data?.recentActivity ?? [];
    const masterSchedule = data?.masterSchedule ?? [];

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

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <section className="m-4 flex flex-col gap-4">
            <h2 className="font-semibold">Dashboard Summary</h2>
            <div className="flex flex-col gap-6">
                <div>
                    <StatCards data={data} loading={loading} />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <TodaysBookings
                            data={masterSchedule}
                            loading={loading}
                            refetch={fetchDashboard}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <RecentActivity
                            loading={loading}
                            data={recentActivity}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
