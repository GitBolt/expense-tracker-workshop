import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { Expense } from '@/types/expense';
import { Flex, Text } from '@chakra-ui/react';


type Props = {
  data?: { merchant: string, amount: number }[]
}
export const DistributionChart = ({ data }: Props) => {

  if (!data) {
    data = [{ merchant: "None", amount: 1 }]
  }
  const merchants: string[] = [];
  const amounts: number[] = [];

  data.forEach((expense) => {
    const merchantIndex = merchants.indexOf(expense.merchant);
    if (merchantIndex === -1) {
      merchants.push(expense.merchant);
      amounts.push(expense.amount);
    } else {
      amounts[merchantIndex] += expense.amount;
    }
  });


  const dataEntry = {
    labels: merchants,
    datasets: [{
      data: amounts,
      backgroundColor: [
        "#2DB3FF",
        "#2DFF42",
        "#FFD12D",
        "#FF2D2D",
        "#FF2DF7"
      ],
      // hoverBackgroundColor: "#7eb7ff"
    }]
  };

  return (
    <Flex flexFlow="column" align="center" w="30%">
      <Text color="gray.500" fontSize="1.5rem">Distribution of expenses</Text>
      <Doughnut
        data={dataEntry}
        width={200}
        height={200}
      />
    </Flex>
  )
}