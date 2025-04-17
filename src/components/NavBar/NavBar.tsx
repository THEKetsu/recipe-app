import React from 'react';
import { Button } from '@/components/ui/button';    
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from 'lucide-react';

export default function NavBar() {
    return (
        <div className="flex justify-between items-center p-4 text-white">
        <div className='flex items-center space-x-4'>
        <div className="flex text-xl font-bold text-black">RecipeApp</div>
            <DropdownMenu>
            <DropdownMenuTrigger className='flex text-black items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-200'>
                <ChevronDownIcon className="h-4 w-4" color='black' />
                    Products
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className='text-xl text-black'>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
            <DropdownMenuTrigger className='flex text-black items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-200'>
                <ChevronDownIcon className="h-4 w-4" color='black' />
                    Pricing
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className='text-xl text-black'>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        <div className="flex space-x-4">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-md" >
                <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-md" >
                <Link href="/auth/signup">Sign Up</Link>
            </Button>
        </div>
        </div>
    );
}