'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const AlunosCadastrados = () => {
  return (
    <PageContainer title="Alunos cadastrados" description="this is Sample page">
      <DashboardCard title="Alunos cadastrados">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AlunosCadastrados;

