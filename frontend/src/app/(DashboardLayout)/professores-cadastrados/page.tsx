'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';


const ProfessoresCadastrados= () => {
  return (
    <PageContainer title="Professores cadastrados" description="this is Sample page">
      <DashboardCard title="Professores cadastrados">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProfessoresCadastrados;

