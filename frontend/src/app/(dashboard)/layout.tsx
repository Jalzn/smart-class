import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Navbar />
            <Sidebar />
            <Box ms={64} mt={16} pb={16}>
                {children}
            </Box>
        </Box>
    )
}