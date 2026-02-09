import { useAuth } from "../context/AuthContext";

const UserPage = () => {
    const { user } = useAuth();

    return (
        <main>
            <section className="my-4 flex flex-col gap-4">
                <h1>Hi, {user.name}</h1>
                <h2>My meetings</h2>
            </section>
        </main>
    );
};

export default UserPage;
