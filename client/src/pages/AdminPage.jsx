import Nav from "../components/Nav";

const AdminPage = () => {
    return (
        <main className="flex h-[calc(100vh-64px)] w-full">
            <div className="border-border flex h-full w-1/4 flex-col justify-between border-r pt-4 pr-4 pb-8">
                <Nav />
            </div>

            <div className="flex-1 p-4">
                <section>
                    <h2>Dashboard Summary</h2>
                </section>
            </div>
        </main>
    );
};

export default AdminPage;
