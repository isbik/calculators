import { createSignal } from "solid-js";
import { toCurrency } from "../lib/toCurrency";
import { InputNumber } from "../ui/InputNumber";

export const BusinessForm = () => {
  const [data, setData] = createSignal({
    duration: 10,
    investment: 200_000,
    expensesPerMonth: 1000,
    profitPerMonth: 20000,
  });

  const onInput = (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
    }
  ) => {
    setData((prev) => ({
      ...prev,
      [event.currentTarget.name]: Number(event.currentTarget.value),
    }));
  };

  const getExpensesPerMonthTable = () => {
    const { expensesPerMonth, profitPerMonth, investment, duration } = data();

    const diff = profitPerMonth - expensesPerMonth;

    return Array.from({ length: duration })
      .map((_, month) => {
        const inMonth = (investment + diff * (month + 1)) / (month + 1);

        return (
          <tr>
            <td>{month + 1}</td>
            <td>{toCurrency(inMonth)}</td>
            <td>{toCurrency(inMonth / 12)}</td>
          </tr>
        );
      })
      .reverse();
  };

  return (
    <>
      <div class="flex gap-1 flex-col mb-4">
        <div class="flex gap-1 flex-wrap justify-center m-auto">
          <InputNumber
            onInput={onInput}
            name="investment"
            value={data().investment}
            type="text"
            placeholder="Вложения"
          />
          <InputNumber
            onInput={onInput}
            name="duration"
            value={data().duration}
            type="text"
            placeholder="Срок окупаемости (месяцев)"
          />
        </div>
        <div class="flex gap-1 flex-wrap justify-center m-auto">
          <InputNumber
            onInput={onInput}
            name="expensesPerMonth"
            value={data().expensesPerMonth}
            type="text"
            placeholder="Расходы в месяц"
          />
          <InputNumber
            onInput={onInput}
            name="profitPerMonth"
            value={data().profitPerMonth}
            type="text"
            placeholder="Прибыль в месяц"
          />
        </div>
      </div>

      <div class="overflow-auto mb-8 w-fit  m-auto rounded border border-gray-200 flex-grow">
        <table class="w-full border-collapse bg-white text-base  text-center">
          <thead class="bg-gray-50 whitespace-nowrap">
            <tr>
              <th class="py-2 px-4">Месяц</th>
              <th class="py-2 px-4">Продажи в месяц</th>
              <th class="py-2 px-4">Продажи в день</th>
            </tr>
          </thead>
          <tbody>{getExpensesPerMonthTable()}</tbody>
        </table>
      </div>
    </>
  );
};
