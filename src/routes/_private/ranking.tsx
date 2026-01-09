import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_private/ranking")({
    component: Ranking,
})
import { columns } from "@/components/Ranking/column"
import { DataTable } from "@/components/Ranking/data-table"

import { useGetAllUsersQuery } from "../../slices/userApiSlice"

function Ranking() {
    const { data, isLoading } = useGetAllUsersQuery({})

    console.log("data:", data)
    return (
        <div className="container mx-auto py-10">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">Here&apos;s a list of all players based on their ranks!</p>
                    </div>
                    <div className="flex items-center space-x-2"></div>
                </div>
                {isLoading ? <div>Loading..</div> : <DataTable columns={columns} data={data} />}
            </div>
        </div>
    )
}
