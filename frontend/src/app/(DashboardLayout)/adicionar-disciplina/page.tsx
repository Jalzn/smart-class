'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const AdicionarDisciplina= () => {
  return (
    <PageContainer title="Adicionar disciplina" description="this is Sample page">
      <DashboardCard title="Adicionar disciplina">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AdicionarDisciplina;

