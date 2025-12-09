import CreateUserForm from "@/components/form/createUserForm";
import UsersTable from "@/components/ui/usersTable";
import { getTranslations } from "next-globe-gen";

export default function Users() {
    const t = getTranslations("users");
    return (
        <div className="flex flex-col gap-8 items-center bg-white h-full pt-14">
            <h1 className="text-preset-2 text-dark">{t("title")}</h1>
            <div className="flex flex-col justify-center items-center gap-8 lg:flex-row lg:items-start bg-accent p-8 w-full h-full">
                <UsersTable />
                <CreateUserForm />
            </div>
        </div>
    );
}