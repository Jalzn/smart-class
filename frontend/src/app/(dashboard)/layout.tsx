import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Navbar />
            <Sidebar />
            <Box ms={64}>
                {children}
            </Box>
        </Box>
    )
}