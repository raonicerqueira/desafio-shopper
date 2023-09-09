import { Key } from "react";
import ToolTip from "./ToolTip";

type ProductToUpdate = {
  product_code: string;
  product_name: string | undefined;
  product_actual_price: string | undefined;
  new_price: string;
  validation: {
    empty_fields?: boolean;
    invalid_product_code?: boolean;
    invalid_product_price?: boolean;
    price_below_cost?: boolean;
    overvalued_new_price?: boolean;
  };
};

function validationMessages(product: ProductToUpdate) {
  let finalMessage = "";
  if (product.validation.empty_fields) {
    finalMessage += "Existem campos vazios. ";
  }
  if (product.validation.invalid_product_code) {
    finalMessage += " Código de produto inválido. ";
  }
  if (product.validation.invalid_product_price) {
    finalMessage += " Novo preço no formato inválido. ";
  }
  if (product.validation.overvalued_new_price) {
    finalMessage += " Reajuste maior que 10%. ";
  }
  if (product.validation.price_below_cost) {
    finalMessage += " Novo preço menor que preço de custo.";
  }
  return finalMessage;
}

export default function Table({ validation }) {
  return (
    <>
      <div className="relative w-full flex flex-col rounded-2xl shadow-2xl items-center my-4">
        <div>
          <h3 className="font-semibold text-lg py-2">
            Códigos encontrados no arquivo .csv
          </h3>
        </div>
        <div className="block bg-transparent overflow-auto max-h-[400px] m-4 p-4 w-full">
          <table className="w-full">
            <thead>
              <tr className="border border-solid border-x-0">
                <th className="text-md px-3 py-3">Código</th>
                <th className="text-md px-3 py-3">Nome</th>
                <th className="text-md px-3 py-3">Preço Atual</th>
                <th className="text-md px-3 py-3">Novo Preço</th>
              </tr>
            </thead>
            <tbody>
              {validation.map((product: ProductToUpdate, index: Key) => {
                return (
                  <tr key={index}>
                    <td className="text-md py-3 flex gap-4 justify-center align-middle relative">
                      {(product.validation.empty_fields ||
                        product.validation.invalid_product_code ||
                        product.validation.invalid_product_price ||
                        product.validation.overvalued_new_price ||
                        product.validation.price_below_cost) && (
                        <ToolTip tooltip={validationMessages(product)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 absolute right-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                          </svg>
                        </ToolTip>
                      )}

                      <span className="absolute">{product.product_code}</span>
                    </td>
                    <td className="text-md py-3">{product.product_name}</td>
                    <td className="text-md py-3">
                      R$ {product.product_actual_price}
                    </td>
                    <td className="text-md py-3">R$ {product.new_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
