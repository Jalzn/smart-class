"use client"

import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import { Button } from './ui/button';
import { HiChevronDown, HiLogout, HiUser } from 'react-icons/hi';
import { logouAction } from '@/actions/auth.action';

export const NavbarMenu = () => {

    const handleSelect = async ({ value }: { value: string }) => {
        if (value === "logout") {
            await logouAction()
        }
    }

    return (
        <MenuRoot onSelect={handleSelect}>
            <MenuTrigger asChild>
                <Button variant="ghost" p={2}>
                    <HiChevronDown />
                </Button>
            </MenuTrigger>
            <MenuContent w={48}>
                <MenuItem value="logout" cursor="pointer">
                    <HiUser />
                    Meu Perfil
                </MenuItem>
                <MenuItem value="logout" cursor="pointer">
                    <HiLogout />
                    Sair
                </MenuItem>
            </MenuContent>
        </MenuRoot >
    )
}
