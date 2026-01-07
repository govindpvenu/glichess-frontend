import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_public/about")({
    component: About,
})

function About() {
  return(
<>
</>
  )
    // return (
    //   <div className="flex justify-center items-center flex-1 overflow-y-auto">

    //     <Card className="mx-auto max-w-sm">
    //       <CardHeader>
    //         <CardTitle className="text-xl">Sign Up</CardTitle>
    //         <CardDescription>
    //           Enter your information to create an account
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="grid gap-4">
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="grid gap-2">
    //               <Label htmlFor="first-name">First name</Label>
    //               <Input id="first-name" placeholder="Max" required />
    //             </div>
    //             <div className="grid gap-2">
    //               <Label htmlFor="last-name">Last name</Label>
    //               <Input id="last-name" placeholder="Robinson" required />
    //             </div>
    //           </div>
    //           <div className="grid gap-2">
    //             <Label htmlFor="email">Email</Label>
    //             <Input
    //               id="email"
    //               type="email"
    //               placeholder="m@example.com"
    //               required
    //             />
    //           </div>
    //           <div className="grid gap-2">
    //             <Label htmlFor="password">Password</Label>
    //             <Input id="password" type="password" />
    //           </div>
    //           <Button type="submit" className="w-full">
    //             Create an account
    //           </Button>
    //           <Button variant="outline" className="w-full">
    //             Sign up with GitHub
    //           </Button>
    //         </div>
    //         <div className="mt-4 text-center text-sm">
    //           Already have an account?{" "}
    //           <Link to={"/"} className="underline">
    //             Sign in
    //           </Link>
    //         </div>
    //       </CardContent>
    //     </Card>
    //     </div>
    //   )
    
    // return (
    //     <Card className="mx-auto max-w-sm">
    //         <CardHeader>
    //             <CardTitle className="text-2xl">Login</CardTitle>
    //             <CardDescription>Enter your email below to login to your account</CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //             <div className="grid gap-4">
    //                 <div className="grid gap-2">
    //                     <Label htmlFor="email">Email</Label>
    //                     <Input id="email" type="email" placeholder="example@gmail.com" required />
    //                 </div>
    //                 <div className="grid gap-2">
    //                     <div className="flex items-center">
    //                         <Label htmlFor="password">Password</Label>
    //                         <Link to={"/"} className="ml-auto inline-block text-sm underline">
    //                             Forgot your password?
    //                         </Link>
    //                     </div>
    //                     <Input id="password" placeholder="Enter your password" type="password" required />
    //                 </div>
    //                 <Button type="submit" className="w-full">
    //                     Login
    //                 </Button>
    //                 <div className="relative">
    //                     <div className="absolute inset-0 flex items-center">
    //                         <span className="w-full border-t" />
    //                     </div>
    //                     <div className="relative flex justify-center text-xs uppercase">
    //                         <span className=" px-2 text-foreground">Or continue with</span>
    //                     </div>
    //                 </div>
    //                 {/* <Button variant="outline" onClick={googleAuth}>
    //                         <Icons.google className="mr-2 h-4 w-4" />
    //                         Google
    //                     </Button> */}
    //             </div>
    //             <div className="mt-4 text-center text-sm">
    //                 Don&apos;t have an account?{" "}
    //                 <Link to={"/"} className="underline">
    //                     Sign up
    //                 </Link>
    //             </div>
    //         </CardContent>
    //     </Card>
    // )

    // return (
    //     <div className="flex h-full w-full flex-col">
    //         <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    //             <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
    //                 <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
    //                     <Package2 className="h-6 w-6" />
    //                     <span className="sr-only">Acme Inc</span>
    //                 </Link>
    //                 <Link to="/" className="text-foreground transition-colors hover:text-foreground">
    //                     Dashboard
    //                 </Link>
    //                 <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
    //                     Orders
    //                 </Link>
    //                 <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
    //                     Products
    //                 </Link>
    //                 <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
    //                     Customers
    //                 </Link>
    //                 <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
    //                     Analytics
    //                 </Link>
    //             </nav>
    //             <Sheet>
    //                 <SheetTrigger asChild>
    //                     <Button variant="outline" size="icon" className="shrink-0 md:hidden">
    //                         <Menu className="h-5 w-5" />
    //                         <span className="sr-only">Toggle navigation menu</span>
    //                     </Button>
    //                 </SheetTrigger>
    //                 <SheetContent side="left">
    //                     <nav className="grid gap-6 text-lg font-medium">
    //                         <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
    //                             <Package2 className="h-6 w-6" />
    //                             <span className="sr-only">Acme Inc</span>
    //                         </Link>
    //                         <Link to="/" className="hover:text-foreground">
    //                             Dashboard
    //                         </Link>
    //                         <Link to="/" className="text-muted-foreground hover:text-foreground">
    //                             Orders
    //                         </Link>
    //                         <Link to="/" className="text-muted-foreground hover:text-foreground">
    //                             Products
    //                         </Link>
    //                         <Link to="/" className="text-muted-foreground hover:text-foreground">
    //                             Customers
    //                         </Link>
    //                         <Link to="/" className="text-muted-foreground hover:text-foreground">
    //                             Analytics
    //                         </Link>
    //                     </nav>
    //                 </SheetContent>
    //             </Sheet>
    //             <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
    //                 <form className="ml-auto flex-1 sm:flex-initial">
    //                     <div className="relative">
    //                         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    //                         <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
    //                     </div>
    //                 </form>
    //                 <DropdownMenu>
    //                     <DropdownMenuTrigger asChild>
    //                         <Button variant="secondary" size="icon" className="rounded-full">
    //                             <CircleUser className="h-5 w-5" />
    //                             <span className="sr-only">Toggle user menu</span>
    //                         </Button>
    //                     </DropdownMenuTrigger>
    //                     <DropdownMenuContent align="end">
    //                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //                         <DropdownMenuSeparator />
    //                         <DropdownMenuItem>Settings</DropdownMenuItem>
    //                         <DropdownMenuItem>Support</DropdownMenuItem>
    //                         <DropdownMenuSeparator />
    //                         <DropdownMenuItem>Logout</DropdownMenuItem>
    //                     </DropdownMenuContent>
    //                 </DropdownMenu>
    //             </div>
    //         </header>

    //         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    //             <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    //                 <Card>
    //                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //                         <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    //                         <DollarSign className="h-4 w-4 text-muted-foreground" />
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">$45,231.89</div>
    //                         <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //                         <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
    //                         <Users className="h-4 w-4 text-muted-foreground" />
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">+2350</div>
    //                         <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //                         <CardTitle className="text-sm font-medium">Sales</CardTitle>
    //                         <CreditCard className="h-4 w-4 text-muted-foreground" />
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">+12,234</div>
    //                         <p className="text-xs text-muted-foreground">+19% from last month</p>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //                         <CardTitle className="text-sm font-medium">Active Now</CardTitle>
    //                         <Activity className="h-4 w-4 text-muted-foreground" />
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">+573</div>
    //                         <p className="text-xs text-muted-foreground">+201 since last hour</p>
    //                     </CardContent>
    //                 </Card>
    //             </div>
    //             <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
    //                 <Card className="xl:col-span-2">
    //                     <CardHeader className="flex flex-row items-center">
    //                         <div className="grid gap-2">
    //                             <CardTitle>Transactions</CardTitle>
    //                             <CardDescription>Recent transactions from your store.</CardDescription>
    //                         </div>
    //                         <Button asChild size="sm" className="ml-auto gap-1">
    //                             <Link to="/">
    //                                 View All
    //                                 <ArrowUpRight className="h-4 w-4" />
    //                             </Link>
    //                         </Button>
    //                     </CardHeader>
    //                     <CardContent>
    //                         {/* <Table>
    //                             <TableHeader>
    //                                 <TableRow>
    //                                     <TableHead>Customer</TableHead>
    //                                     <TableHead className="hidden xl:table-column">Type</TableHead>
    //                                     <TableHead className="hidden xl:table-column">Status</TableHead>
    //                                     <TableHead className="hidden xl:table-column">Date</TableHead>
    //                                     <TableHead className="text-right">Amount</TableHead>
    //                                 </TableRow>
    //                             </TableHeader>
    //                             <TableBody>
    //                                 <TableRow>
    //                                     <TableCell>
    //                                         <div className="font-medium">Liam Johnson</div>
    //                                         <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
    //                                     </TableCell>
    //                                     <TableCell className="hidden xl:table-column">Sale</TableCell>
    //                                     <TableCell className="hidden xl:table-column">
    //                                         <Badge className="text-xs" variant="outline">
    //                                             Approved
    //                                         </Badge>
    //                                     </TableCell>
    //                                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">2023-06-23</TableCell>
    //                                     <TableCell className="text-right">$250.00</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell>
    //                                         <div className="font-medium">Olivia Smith</div>
    //                                         <div className="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
    //                                     </TableCell>
    //                                     <TableCell className="hidden xl:table-column">Refund</TableCell>
    //                                     <TableCell className="hidden xl:table-column">
    //                                         <Badge className="text-xs" variant="outline">
    //                                             Declined
    //                                         </Badge>
    //                                     </TableCell>
    //                                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">2023-06-24</TableCell>
    //                                     <TableCell className="text-right">$150.00</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell>
    //                                         <div className="font-medium">Noah Williams</div>
    //                                         <div className="hidden text-sm text-muted-foreground md:inline">noah@example.com</div>
    //                                     </TableCell>
    //                                     <TableCell className="hidden xl:table-column">Subscription</TableCell>
    //                                     <TableCell className="hidden xl:table-column">
    //                                         <Badge className="text-xs" variant="outline">
    //                                             Approved
    //                                         </Badge>
    //                                     </TableCell>
    //                                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">2023-06-25</TableCell>
    //                                     <TableCell className="text-right">$350.00</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell>
    //                                         <div className="font-medium">Emma Brown</div>
    //                                         <div className="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
    //                                     </TableCell>
    //                                     <TableCell className="hidden xl:table-column">Sale</TableCell>
    //                                     <TableCell className="hidden xl:table-column">
    //                                         <Badge className="text-xs" variant="outline">
    //                                             Approved
    //                                         </Badge>
    //                                     </TableCell>
    //                                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">2023-06-26</TableCell>
    //                                     <TableCell className="text-right">$450.00</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell>
    //                                         <div className="font-medium">Liam Johnson</div>
    //                                         <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
    //                                     </TableCell>
    //                                     <TableCell className="hidden xl:table-column">Sale</TableCell>
    //                                     <TableCell className="hidden xl:table-column">
    //                                         <Badge className="text-xs" variant="outline">
    //                                             Approved
    //                                         </Badge>
    //                                     </TableCell>
    //                                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">2023-06-27</TableCell>
    //                                     <TableCell className="text-right">$550.00</TableCell>
    //                                 </TableRow>
    //                             </TableBody>
    //                         </Table> */}
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle>Recent Sales</CardTitle>
    //                     </CardHeader>
    //                     <CardContent className="grid gap-8">
    //                         <div className="flex items-center gap-4">
    //                             <Avatar className="hidden h-9 w-9 sm:flex">
    //                                 <AvatarImage src="/avatars/01.png" alt="Avatar" />
    //                                 <AvatarFallback>OM</AvatarFallback>
    //                             </Avatar>
    //                             <div className="grid gap-1">
    //                                 <p className="text-sm font-medium leading-none">Olivia Martin</p>
    //                                 <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
    //                             </div>
    //                             <div className="ml-auto font-medium">+$1,999.00</div>
    //                         </div>
    //                         <div className="flex items-center gap-4">
    //                             <Avatar className="hidden h-9 w-9 sm:flex">
    //                                 <AvatarImage src="/avatars/02.png" alt="Avatar" />
    //                                 <AvatarFallback>JL</AvatarFallback>
    //                             </Avatar>
    //                             <div className="grid gap-1">
    //                                 <p className="text-sm font-medium leading-none">Jackson Lee</p>
    //                                 <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
    //                             </div>
    //                             <div className="ml-auto font-medium">+$39.00</div>
    //                         </div>
    //                         <div className="flex items-center gap-4">
    //                             <Avatar className="hidden h-9 w-9 sm:flex">
    //                                 <AvatarImage src="/avatars/03.png" alt="Avatar" />
    //                                 <AvatarFallback>IN</AvatarFallback>
    //                             </Avatar>
    //                             <div className="grid gap-1">
    //                                 <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
    //                                 <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
    //                             </div>
    //                             <div className="ml-auto font-medium">+$299.00</div>
    //                         </div>
    //                         <div className="flex items-center gap-4">
    //                             <Avatar className="hidden h-9 w-9 sm:flex">
    //                                 <AvatarImage src="/avatars/04.png" alt="Avatar" />
    //                                 <AvatarFallback>WK</AvatarFallback>
    //                             </Avatar>
    //                             <div className="grid gap-1">
    //                                 <p className="text-sm font-medium leading-none">William Kim</p>
    //                                 <p className="text-sm text-muted-foreground">will@email.com</p>
    //                             </div>
    //                             <div className="ml-auto font-medium">+$99.00</div>
    //                         </div>
    //                         <div className="flex items-center gap-4">
    //                             <Avatar className="hidden h-9 w-9 sm:flex">
    //                                 <AvatarImage src="/avatars/05.png" alt="Avatar" />
    //                                 <AvatarFallback>SD</AvatarFallback>
    //                             </Avatar>
    //                             <div className="grid gap-1">
    //                                 <p className="text-sm font-medium leading-none">Sofia Davis</p>
    //                                 <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
    //                             </div>
    //                             <div className="ml-auto font-medium">+$39.00</div>
    //                         </div>
    //                     </CardContent>
    //                 </Card>
    //             </div>
    //         </main>
    //     </div>
    // )
}
