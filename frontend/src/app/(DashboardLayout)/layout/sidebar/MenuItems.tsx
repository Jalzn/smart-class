import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconSchool,
  IconSquareRoundedPlus,
  IconCertificate,
  IconChalkboard,
  IconUser,
  IconCalendarStats
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "SmartSched",
  },

  {
    id: uniqueId(),
    title: "Quadro de horários",
    icon: IconCalendarStats,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Turmas",
  },
  {
    id: uniqueId(),
    title: "Minhas turmas",
    icon: IconSchool,
    href: "/minhas-turmas",
  },
  {
    id: uniqueId(),
    title: "Adicionar turma",
    icon: IconSquareRoundedPlus,
    href: "/adicionar-turma",
  },
  {
    navlabel: true,
    subheader: "Disciplinas",
  },
  {
    id: uniqueId(),
    title: "Minhas disciplinas",
    icon: IconCertificate,
    href: "/minhas-disciplinas",
  },
  {
    id: uniqueId(),
    title: "Adicionar disciplina",
    icon: IconSquareRoundedPlus,
    href: "/adicionar-disciplina",
  },
  {
    navlabel: true,
    subheader: "Professores",
  },
  {
    id: uniqueId(),
    title: "Professores cadastrados",
    icon: IconChalkboard,
    href: "/professores-cadastrados",
  },
  {
    id: uniqueId(),
    title: "Adicionar professor",
    icon: IconSquareRoundedPlus,
    href: "/adicionar-professor",
  },
  {
    navlabel: true,
    subheader: "Alunos",
  },
  {
    id: uniqueId(),
    title: "Alunos cadastrados",
    icon: IconUser,
    href: "/alunos-cadastrados",
  },
  {
    id: uniqueId(),
    title: "Adicionar aluno",
    icon: IconSquareRoundedPlus,
    href: "/adicionar-aluno",
  },
];

export default Menuitems;
