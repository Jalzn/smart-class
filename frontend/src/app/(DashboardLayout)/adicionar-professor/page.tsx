'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const AdicionarProfessor= () => {
  return (
    <PageContainer title="Adicionar professor" description="this is Sample page">
      <DashboardCard title="Adicionar professor">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AdicionarProfessor;

