'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const MinhasTurmas= () => {
  return (
    <PageContainer title="Minhas turmas" description="this is Sample page">
      <DashboardCard title="Minhas turmas">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default MinhasTurmas;

