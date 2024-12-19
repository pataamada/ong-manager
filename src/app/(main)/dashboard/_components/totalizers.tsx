import { Card } from "@/components/dashboard/card";

export function Totalizers() {
  const cardData = [
    {
      title: "R$ 300,00",
      subtitle: "Esse Mês",
      content: "Total receita",
      textColor: "",
    },
    {
      title: "R$ 1600,00",
      subtitle: "Esse Mês",
      content: "Doações",
      textColor: "text-green-400",
    },
    {
      title: "R$ 1300,00",
      subtitle: "Esse Mês",
      content: "Despesas",
      textColor: "text-red-400",
    },
  ];
  return (
    <>
      {cardData.map((card) => (
        <Card
          key={card.content}
          title={card.title}
          subtitle={card.subtitle}
          textColor={card.textColor}
        >
          <p>{card.content}</p>
        </Card>
      ))}
    </>
  );
}
