'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const AdicionarAluno = () => {
  return (
    <PageContainer title="Adicionar aluno" description="this is Sample page">
      <DashboardCard title="Adicionar aluno">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AdicionarAluno;

