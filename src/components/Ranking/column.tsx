"use client"
import { UserRoundSearch } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { Button } from "../ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {}

export const columns: ColumnDef<User>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
            const index = row.index
            return <p>#{index + 1}</p>
        },
        header: "Rank",
    },
    {
        accessorKey: "username",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
    {
        accessorKey: "wins",
        header: "Wins",
    },
    {
        accessorKey: "draw",
        header: "Draws",
    },
    {
        accessorKey: "loss",
        header: "Loses",
    },
    {
        id: "actions",
        header:"View profile",
        cell: ({ row }) => {
            const user = row.original
            return (
                <Button variant={"ghost"} onClick={() => console.log((user as any)._id )}>
                    <UserRoundSearch />
                </Button>
            )
        },
    },
]
