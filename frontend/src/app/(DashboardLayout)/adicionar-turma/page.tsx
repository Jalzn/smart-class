'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const AdicionarTurma= () => {
  return (
    <PageContainer title="Adicionar turma" description="this is Sample page">
      <DashboardCard title="Adicionar turma">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AdicionarTurma;

