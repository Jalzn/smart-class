import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { Box } from "@chakra-ui/react"

export default function HomePage() {
    return (
        <Box background="gray.200">
            <Navbar />
            <Sidebar />
        </Box>
    )
}