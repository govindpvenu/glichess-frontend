import { ModeToggle } from "./ModeToggle"
import ProfileAvatar from "./ProfileAvatar"
import { NavigationMenu, navigationMenuTriggerStyle, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Link } from "@tanstack/react-router"
import type { RootState } from "../store"
import { useSelector } from "react-redux"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavBar() {
    const { userInfo } = useSelector((state: RootState) => state.auth)

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NavigationMenu>
                    <NavigationMenuList>
                        {userInfo?.verified ? (
                            <>
                                <NavigationMenuItem>
                                    <Link to="/" className="text-2xl font-bold text-primary">
                                        Glitchess
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/" className={navigationMenuTriggerStyle()}>
                                        Home
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/community" className={navigationMenuTriggerStyle()}>
                                        Community
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link to="/ranking" className={navigationMenuTriggerStyle()}>
                                        Ranking
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        ) : (
                            <>
                                <NavigationMenuItem>
                                    <Link to="/" className="text-2xl font-bold text-primary">
                                        Glitchess
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/" className={navigationMenuTriggerStyle()}>
                                        Home
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                            Glitchess
                        </Link>
                        {userInfo?.verified ? (
                            <>
                                <Link to="/" className="hover:text-foreground">
                                    Home
                                </Link>
                                <Link to="/community" className="text-muted-foreground hover:text-foreground">
                                    Community
                                </Link>
                                <Link to="/ranking" className="text-muted-foreground hover:text-foreground">
                                    Ranking
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:text-foreground">
                                    Home
                                </Link>
                            </>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex sm:flex-initial">
                    <ModeToggle />
                </div>
                {userInfo?.verified ? (
                    <ProfileAvatar />
                ) : (
                    <Link to="/login">
                        <Button variant={"outline"}>Sign in</Button>
                    </Link>
                )}
            </div>
        </header>
    )
}
