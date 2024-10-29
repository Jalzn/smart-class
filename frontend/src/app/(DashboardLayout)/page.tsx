'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Typography } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import Calendar from './components/calendar/calendar';
// import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
// import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
// import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
// import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
// import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <DashboardCard title="SmartSCHED">
        <Typography>Quadro de horários gerado para turmas, disciplinas e professores</Typography>
      </DashboardCard>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Calendar />
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
