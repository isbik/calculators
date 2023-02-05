import { createSignal } from "solid-js";
import { toCurrency } from "../lib/toCurrency";
import { InputNumber } from "../ui/InputNumber";

export const PercentForm = () => {
  const [data, setData] = createSignal({
    duration: 5,
    initial: 100000,
    percent: 15,
    additionalPayment: 50000,
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

  const getPercentTable = () => {
    const totalAdditionPayment = data().additionalPayment * 12;

    let total = data().initial + totalAdditionPayment;

    return Array.from({ length: data().duration }).map((_, year) => {
      if (year !== 0) {
        total += totalAdditionPayment;
      }

      const newTotal = (total * data().percent) / 100;

      total += newTotal;

      return (
        <tr>
          <td>{year + 1}</td>
          <td>{toCurrency(total)}</td>
          <td>{toCurrency(newTotal / 12)}</td>
          <td>{toCurrency(newTotal)}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div class="flex gap-1 flex-col mb-4">
        <div class="flex gap-1 flex-wrap justify-center m-auto">
          <InputNumber
            onInput={onInput}
            name="duration"
            value={data().duration}
            type="text"
            placeholder="Срок вклада (лет)"
          />
          <InputNumber
            onInput={onInput}
            name="initial"
            value={data().initial}
            type="text"
            placeholder="Размер вклада"
          />
        </div>
        <div class="flex gap-1 flex-wrap justify-center m-auto">
          <InputNumber
            onInput={onInput}
            name="percent"
            value={data().percent}
            type="text"
            placeholder="Процентная ставка"
          />
          <InputNumber
            onInput={onInput}
            name="additionalPayment"
            value={data().additionalPayment}
            type="text"
            placeholder="Довложение в месяц"
          />
        </div>
      </div>

      <div class="overflow-auto mb-8 w-full  m-auto rounded border border-gray-200 flex-grow">
        <table class="w-full border-collapse bg-white text-base  text-center">
          <thead class="bg-gray-50 whitespace-nowrap">
            <tr>
              <th class="py-2 px-4">Год</th>
              <th class="py-2 px-4">Итого на счету</th>
              <th class="py-2 px-4">Доход в месяц</th>
              <th class="py-2 px-4">Доход за год</th>
            </tr>
          </thead>
          <tbody>{getPercentTable()}</tbody>
        </table>
      </div>
    </>
  );
};
