import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultCategories = [
  {
    name: "income",
    displayName: "Renda",
    icon: "work",
    background: "#B565D9",
    isIncome: true,
    isDefault: true
  },
  {
    name: "food",
    displayName: "Alimentação",
    icon: "fastfood",
    background: "#D96BA8",
    isIncome: false,
    isDefault: true
  },
  {
    name: "house",
    displayName: "Casa",
    icon: "home",
    background: "#8E6AD8",
    isIncome: false,
    isDefault: true
  },
  {
    name: "education",
    displayName: "Educação",
    icon: "book",
    background: "#5F6FD6",
    isIncome: false,
    isDefault: true
  },
  {
    name: "travel",
    displayName: "Viagens",
    icon: "airplanemode-active",
    background: "#2FA7C9",
    isIncome: false,
    isDefault: true
  }
];

async function main() {
  for (const category of defaultCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {
        displayName: category.displayName,
        icon: category.icon,
        background: category.background,
        isIncome: category.isIncome,
        isDefault: category.isDefault
      },
      create: category
    });
  }

  console.log("Seed concluído.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
