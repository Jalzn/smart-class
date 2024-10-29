'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const MinhasDisciplinas= () => {
  return (
    <PageContainer title="Minhas disciplinas" description="this is Sample page">
      <DashboardCard title="Minhas disciplinas">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default MinhasDisciplinas;

